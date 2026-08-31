import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error(
    "ANTHROPIC_API_KEY não definida. Copie .env.example para .env e preencha a chave " +
      "(console.anthropic.com → API Keys)."
  );
}

/**
 * Cliente único e compartilhado da API Anthropic.
 *
 * - maxRetries: erros de rede/5xx são retentados automaticamente com backoff
 *   exponencial pelo próprio SDK — não precisa reimplementar isso na mão.
 * - timeout: evita que uma chamada trave o script indefinidamente se a API
 *   ficar lenta (padrão do SDK é 10min, alto demais pra uma chamada síncrona
 *   de geração de post).
 */
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  maxRetries: 3,
  timeout: 60_000, // 60s
});

/**
 * Modelo padrão, configurável via .env (CLAUDE_MODEL) — nunca hardcoded em 2
 * lugares. Se não setado, cai no Sonnet 5.
 */
export const DEFAULT_MODEL = process.env.CLAUDE_MODEL || "claude-sonnet-5";

type CacheableBlock = {
  text: string;
  /** true = cacheia com TTL padrão (5m); "1h" = cache longo pra conteúdo bem estável */
  cache?: true | "1h";
};

function toContentBlocks(blocks: CacheableBlock[]): Anthropic.TextBlockParam[] {
  return blocks.map((b) => ({
    type: "text",
    text: b.text,
    ...(b.cache
      ? { cache_control: { type: "ephemeral", ...(b.cache === "1h" ? { ttl: "1h" } : {}) } }
      : {}),
  })) as Anthropic.TextBlockParam[];
}

/**
 * Força o Claude a retornar um objeto que segue exatamente `schema`, via
 * tool_choice — sem prosa, sem risco de markdown/texto ao redor do JSON.
 *
 * Aceita o prompt já separado por "taxa de mudança" pra aproveitar prompt
 * caching (ver CLAUDE.md § "Agente/LLM"):
 * - `system`: regras fixas, iguais em toda chamada da Sollun → cache 1h
 * - `context`: bloco que se repete entre chamadas próximas (ex: identidade
 *   visual do mesmo cliente) → cache 5m, opcional
 * - `prompt`: parte única desta chamada (ex: o brief) → nunca cacheada
 *
 * Cache só compensa a partir da 2ª chamada que reaproveita o mesmo bloco —
 * a 1ª chamada de cada bloco paga o custo de escrita no cache (mais caro que
 * input normal), não fica mais barata sozinha.
 */
export async function generateStructuredOutput<T = unknown>(params: {
  prompt: string;
  system?: string;
  context?: string;
  schema: Anthropic.Tool.InputSchema;
  toolName?: string;
  maxTokens?: number;
  /** Sobrescreve DEFAULT_MODEL só nesta chamada — útil pra rotear tarefas
   *  simples (classificação patch vs. generativo, por ex.) pro Haiku, que é
   *  bem mais barato que o Sonnet pra esse tipo de decisão de baixo risco. */
  model?: string;
}): Promise<T> {
  const toolName = params.toolName ?? "return_structured_output";

  const contentBlocks: CacheableBlock[] = [];
  if (params.context) contentBlocks.push({ text: params.context, cache: true });
  contentBlocks.push({ text: params.prompt });

  const response = await anthropic.messages.create({
    model: params.model ?? DEFAULT_MODEL,
    max_tokens: params.maxTokens ?? 1024,
    system: params.system
      ? toContentBlocks([{ text: params.system, cache: "1h" }])
      : undefined,
    messages: [{ role: "user", content: toContentBlocks(contentBlocks) }],
    tools: [
      {
        name: toolName,
        description: "Retorna o resultado estruturado solicitado.",
        input_schema: params.schema,
        // Schema é idêntico em toda chamada que usa esse toolName — cache 1h
        // evita reprocessar o mesmo schema a cada request.
        cache_control: { type: "ephemeral", ttl: "1h" },
      },
    ],
    tool_choice: { type: "tool", name: toolName },
  });

  const toolUseBlock = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
  );
  if (!toolUseBlock) {
    throw new Error(
      `Claude não retornou a ferramenta "${toolName}". Resposta: ${JSON.stringify(response.content)}`
    );
  }

  return toolUseBlock.input as T;
}
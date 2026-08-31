import "dotenv/config";
import { generateStructuredOutput } from "./lib/anthropic.js";
import type Anthropic from "@anthropic-ai/sdk";
import { Pool } from "pg";
import OpenAI from "openai";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Brief que seria digitado pelo cliente no chat, hardcoded pra esse teste
const BRIEF = "Post de lançamento de um combo novo: burger duplo + batata + refri por R$29,90";
const CLIENT_NAME = "Burger Test";

// Estrutura em camadas: o formato que o editor (front) vai consumir depois.
// Minimalista de propósito — cresce conforme o editor exigir, não antes.
const postStructureSchema = {
  type: "object",
  properties: {
    layers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", enum: ["background", "text"] },
          role: {
            type: "string",
            enum: ["headline", "subtext", "cta", "fill"],
            description: "papel da camada dentro do post",
          },
          content: { type: "string", description: "texto da camada (headline/subtext/cta) ou descrição visual (background)" },
          color: { type: "string", description: "hex, deve vir da paleta da marca" },
          font: { type: "string" },
        },
        required: ["id", "type", "role", "color", "content"],
      },
    },
  },
  required: ["layers"],
};

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // 1. Busca o cliente de teste e sua identidade visual mockada
    const clientResult = await pool.query(
      "SELECT id, name, niche, brand_colors, brand_font FROM clients WHERE name = $1",
      [CLIENT_NAME]
    );
    if (clientResult.rowCount === 0) {
      throw new Error(`Cliente "${CLIENT_NAME}" não encontrado — rodou o schema.sql?`);
    }
    const client = clientResult.rows[0];

    // Regras fixas — idênticas em toda geração da Sollun, qualquer cliente.
    // Cache de 1h: muda raríssimo, então vale o TTL mais longo.
    const SYSTEM_RULES = `
Você é o agente de criação da Sollun, uma plataforma de marketing pra pequenos negócios.
Gere a estrutura em camadas de um post de Instagram.

Regras:
- Use SOMENTE cores da paleta da marca do cliente.
- Gere no mínimo: 1 camada de background (role=fill), 1 headline, 1 cta.
- Para a camada de background, o campo "content" deve ser uma DESCRIÇÃO VISUAL
  (em inglês, pra virar prompt de geração de imagem depois) do que deve aparecer
  na imagem de fundo — não um texto de post.
- Para headline/subtext/cta, "content" é o texto real que aparece no post.
- Nunca prometa resultado de saúde/estética (regra fixa, vale mesmo fora desse nicho).
`.trim();

    // Identidade do cliente — muda por cliente, mas se repete em TODO post que
    // esse mesmo cliente gerar. Cache de 5m: se vierem vários posts seguidos
    // (ex: reprovação/regeneração), as próximas chamadas leem do cache.
    const CLIENT_CONTEXT = `
Cliente: ${client.name}
Nicho: ${client.niche}
Paleta de cores da marca: ${JSON.stringify(client.brand_colors)}
Fonte da marca: ${client.brand_font}
`.trim();

    // Única parte que muda a cada chamada — nunca cacheada.
    const prompt = `Brief do post: "${BRIEF}"`;

    // 2. Chama a API com 1 ferramenta cujo schema É a estrutura que queremos —
    // tool_choice força o Claude a preencher exatamente esse formato, sem prosa.
    // (client configurado em src/lib/anthropic.ts — timeout, retries, modelo padrão)
    const structuredOutput = await generateStructuredOutput<{
      layers: Array<Record<string, string>>;
    }>({
      system: SYSTEM_RULES,
      context: CLIENT_CONTEXT,
      prompt,
      schema: postStructureSchema as Anthropic.Tool.InputSchema,
      toolName: "return_post_structure",
    });

    // 3. Valida o formato e grava o post (ainda sem imagem) pra ter um id pro
    // nome do arquivo. A API não garante 100% que o JSON bate com o schema —
    // validar antes de usar evita um TypeError genérico lá na frente.
    const structure = structuredOutput as { layers: Array<Record<string, string>> };
    if (!Array.isArray(structure?.layers)) {
      throw new Error(
        "O Claude não retornou 'layers' como array — a API não garante validação " +
          "estrita do schema, então isso pode acontecer ocasionalmente. Resposta " +
          `recebida: ${JSON.stringify(structuredOutput, null, 2)}`
      );
    }

    // JSON.stringify explícito: o driver `pg` não serializa objeto JS
    // sozinho pra coluna jsonb — sem isso, grava lixo tipo "[object Object]".
    const insertResult = await pool.query(
      "INSERT INTO posts (client_id, brief, structure) VALUES ($1, $2, $3) RETURNING id",
      [client.id, BRIEF, JSON.stringify(structure)]
    );
    const postId: string = insertResult.rows[0].id;

    // 4. Gera a imagem de fundo (fase de teste/comparação: GPT Image, Flux 2 Pro e
    // Seedream 4.5 sendo avaliados lado a lado — ver CLAUDE.md. Higgsfield descartado
    // por custo, sem ganho de qualidade relevante pro caso da Sollun.)
    const backgroundLayer = structure.layers.find((l) => l.role === "fill");

    if (backgroundLayer) {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const imageResult = await openai.images.generate({
        // Geração PRINCIPAL — usa o modelo em teste na comparação (GPT Image vs.
        // Flux 2 Pro vs. Seedream 4.5), nunca o Mini. Regeneração/ajuste rápido
        // é um call site separado (a construir), hardcoded pra "gpt-image-1-mini"
        // — não reaproveita GPT_IMAGE_MODEL pra evitar o dois-papéis-1-variável
        // que causou confusão de custo antes.
        model: process.env.GPT_IMAGE_MODEL || "gpt-image-1",
        prompt: `${backgroundLayer.content}. Paleta de cores: ${JSON.stringify(client.brand_colors)}.`,
        // Explícito de propósito: sem isso a API decide sozinha ("auto"), que
        // tende a resolver pra qualidade alta (~4.160 tokens de saída) mesmo
        // quando "medium" (~1.056 tokens, ~4x mais barato) já é suficiente pra
        // um post de Instagram. Ajuste pra "low" no caminho de regeneração
        // rápida (GPT Image Mini) quando esse fluxo existir.
        quality: "medium",
        size: "1024x1024",
      });

      const b64 = imageResult.data?.[0]?.b64_json;
      if (!b64) throw new Error("GPT Image não retornou imagem.");

      const outputDir = path.resolve("output");
      await mkdir(outputDir, { recursive: true });
      const filePath = path.join(outputDir, `${postId}.png`);
      await writeFile(filePath, Buffer.from(b64, "base64"));

      backgroundLayer.asset_path = filePath;

      await pool.query("UPDATE posts SET structure = $1 WHERE id = $2", [
        JSON.stringify(structure),
        postId,
      ]);
    }

    console.log("Post gerado e salvo:", postId);
    console.log(JSON.stringify(structure, null, 2));
  } finally {
    // Sempre fecha o pool, erro ou não — sem isso, o processo derruba com
    // conexão TCP aberta, e no Windows isso vira o crash de
    // "UV_HANDLE_CLOSING" que você viu, mascarando o erro real.
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
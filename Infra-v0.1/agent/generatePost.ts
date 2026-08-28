import "dotenv/config";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { Pool } from "pg";

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
          content: { type: "string", description: "texto da camada, vazio para background" },
          color: { type: "string", description: "hex, deve vir da paleta da marca" },
          font: { type: "string" },
        },
        required: ["id", "type", "role", "color"],
      },
    },
  },
  required: ["layers"],
};

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // 1. Busca o cliente de teste e sua identidade visual mockada
  const clientResult = await pool.query(
    "SELECT id, name, niche, brand_colors, brand_font FROM clients WHERE name = $1",
    [CLIENT_NAME]
  );
  if (clientResult.rowCount === 0) {
    throw new Error(`Cliente "${CLIENT_NAME}" não encontrado — rodou o schema.sql?`);
  }
  const client = clientResult.rows[0];

  const prompt = `
Você é o agente de criação da Sollun, uma plataforma de marketing pra pequenos negócios.
Gere a estrutura em camadas de um post de Instagram para o seguinte cliente:

Nome: ${client.name}
Nicho: ${client.niche}
Paleta de cores da marca: ${JSON.stringify(client.brand_colors)}
Fonte da marca: ${client.brand_font}

Brief do post: "${BRIEF}"

Regras:
- Use SOMENTE cores da paleta da marca.
- Gere no mínimo: 1 camada de background (role=fill), 1 headline, 1 cta.
- Nunca prometa resultado de saúde/estética (não se aplica a esse nicho, mas é regra fixa).
`.trim();

  // 2. Chama o Agent SDK pedindo output estruturado (validado contra o schema acima)
  let structuredOutput: unknown = null;

  for await (const message of query({
    prompt,
    options: {
      outputFormat: { type: "json_schema", schema: postStructureSchema },
    },
  })) {
    if (message.type === "result") {
      if (message.subtype === "success" && message.structured_output) {
        structuredOutput = message.structured_output;
      } else {
        throw new Error(`Agente falhou: ${message.subtype}`);
      }
    }
  }

  if (!structuredOutput) {
    throw new Error("Nenhum structured_output retornado.");
  }

  // 3. Grava o post gerado, linkado ao cliente
  const insertResult = await pool.query(
    "INSERT INTO posts (client_id, brief, structure) VALUES ($1, $2, $3) RETURNING id",
    [client.id, BRIEF, structuredOutput]
  );

  console.log("Post gerado e salvo:", insertResult.rows[0].id);
  console.log(JSON.stringify(structuredOutput, null, 2));

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

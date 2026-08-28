# Fatia vertical — infra mínima

## Rodando

1. Tenha o Docker Desktop instalado e rodando (WSL2 backend).
2. Nessa pasta, rode:
   ```
   docker compose up -d
   ```
3. Confirme que subiu certo:
   ```
   docker compose ps
   ```
   Deve mostrar `sollun-postgres` como `healthy`.
4. Confirme que o schema e o cliente de teste foram criados:
   ```
   docker exec -it sollun-postgres psql -U sollun -d sollun -c "SELECT name, niche FROM clients;"
   ```
   Deve retornar `Burger Test | lanchonete`.

## Conexão

```
host: localhost
port: 5432
user: sollun
password: sollun_dev
database: sollun
```

## Passo 2 — script do agente

Pasta `agent/`. Ele busca o cliente "Burger Test" no banco, manda um brief pro Claude
Agent SDK com output estruturado (schema JSON validado pela própria SDK), e grava o
resultado na tabela `posts`.

```
cd agent
npm install
cp .env.example .env
```

Edite o `.env` e cole sua `ANTHROPIC_API_KEY` (o `DATABASE_URL` já vem certo pro
Postgres local). Depois:

```
npm run generate
```

Deve imprimir o `id` do post salvo e o JSON de camadas gerado. Confirma no banco:

```
docker exec -it sollun-postgres psql -U sollun -d sollun -c "SELECT brief, structure FROM posts;"
```

## Critério de sucesso

O JSON de camadas veio coerente (usa só cores da paleta, tem headline + cta) e está
salvo no Postgres linkado ao cliente certo. Isso valida a parte mais incerta do
produto: o agente conseguindo gerar uma estrutura usável.

## Próximo passo (depois de validar isso)

Decidir se a próxima fatia é "tela crua pra visualizar o post salvo" ou "geração de
imagem de verdade entrando na camada de background".

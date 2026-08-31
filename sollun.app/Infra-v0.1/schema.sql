-- Extensões
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS vector;    -- pgvector, não usado ainda nesta fatia, mas já disponível

-- Cliente com identidade visual mockada à mão (sem Scrapling/onboarding real ainda)
CREATE TABLE clients (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name          text NOT NULL,
    niche         text NOT NULL,          -- ex: "lanchonete", "clínica de estética"
    brand_colors  jsonb NOT NULL,         -- ex: ["#FF5A1F", "#1A1A1A", "#FFFFFF"]
    brand_font    text,                   -- ex: "Poppins"
    created_at    timestamptz NOT NULL DEFAULT now()
);

-- Post gerado pelo agente: estrutura em camadas (texto, layout, cores) — sem imagem ainda
CREATE TABLE posts (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id   uuid NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    brief       text NOT NULL,            -- o brief dado ao agente
    structure   jsonb NOT NULL,           -- output do agente: camadas (texto, layout, cores)
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- Cliente de teste pra rodar a fatia vertical
INSERT INTO clients (name, niche, brand_colors, brand_font)
VALUES (
    'Burger Test',
    'lanchonete',
    '["#FF5A1F", "#1A1A1A", "#FFFFFF"]'::jsonb,
    'Poppins'
);

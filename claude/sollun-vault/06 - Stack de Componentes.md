---
title: Stack de Componentes
tags:
  - sollun
  - infra
---

# Stack de Componentes

## Na VPS (Docker)

| Componente | Função |
|---|---|
| **Traefik** | Proxy reverso; roteia por domínio/subdomínio e gerencia SSL automático (Let's Encrypt) |
| **Portainer** | Painel visual de Docker — logs, restart, uso de recurso por container |
| **PostgreSQL + pgvector** | Banco de tudo; pgvector com índice **HNSW** para busca semântica |
| **Redis** | Cache e fila de jobs em background |
| **MinIO** | Object storage compatível com S3; guarda as imagens geradas |

> [!note] Por que MinIO e não imagem no banco
> O Postgres guarda só o caminho/URL. Se um dia migrar para S3 de verdade, a troca é quase transparente.

## Serviços externos (fora do Docker)

| Serviço | Função |
|---|---|
| **Zernio** | WhatsApp oficial + Instagram — OAuth, token, publicação → [[10 - Integracao Instagram e Zernio]] |
| **trigger.dev Cloud** | Orquestração durável de tarefas → [[11 - Agente Claude SDK e trigger.dev]] |
| **Claude API** | Raciocínio do agente |
| **Resend** | E-mail transacional (cadastro, cobrança, recuperação de senha) |
| **Asaas** | Cobrança recorrente → [[14 - Juridico e Pagamentos]] |
| **Scrapling** | Biblioteca de scraping (chamada sob demanda, não serviço 24h) → [[09 - Onboarding e Identidade Visual]] |

## O que saiu da stack

> [!failure] Removidos
> - **n8n** — saiu completamente, inclusive uso interno
> - **Evolution API** — substituída pelo Zernio (canal oficial, sem risco de ban)
> - **Chatwoot** — saiu junto com o atendimento automatizado

Ver [[17 - Ideias Descartadas]].

## Guardado para depois

**Postiz** (`gitroomhq/postiz-app`) — alternativa open-source e self-hosted ao Zernio. Só faz sentido quando o custo por conta conectada justificar internalizar OAuth, app review e manutenção.

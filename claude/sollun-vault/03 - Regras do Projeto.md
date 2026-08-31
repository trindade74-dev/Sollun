---
title: Regras do Projeto
tags:
  - sollun
  - regras
---

# Regras do Projeto

## Supra-regra (acima de todas as outras)

> [!danger] Nicho saúde e estética
> **NUNCA prometer resultados** em criativos gerados para clientes de saúde/estética.
>
> Isso inclui, no mínimo: promessa de resultado, antes/depois, e comparação de preço — vedações de CFM/CRO. O risco jurídico é do cliente, mas o dano reputacional é da Sollun.

Guardrails técnicos detalhados ainda pendentes → [[16 - Riscos e Pontos em Aberto]].

## Regra nº 1 — Qualidade do criativo desde o primeiro cliente

O produto precisa entregar criativo bom **mesmo quando o prompt do cliente é ruim**. Por isso existe uma etapa de refinamento de prompt pelo Claude antes de acionar o agente de imagem.

## Regra nº 2 — Redução de gasto de token é prioridade ativa

A Regra nº 1 aumenta o consumo de token por natureza. A Regra nº 2 existe para compensar isso: toda operação que puder ser resolvida como **patch estrutural** (sem chamar modelo de imagem) deve ser resolvida assim.

Ver [[07 - Modelo de Dados - Post em Camadas]].

## Framework de copy

Framework fixo embutido no prompt (AIDA / PAS), **universal para todos os clientes** — não há prompt nem biblioteca exclusiva por nicho.

> [!bug] Dívida técnica registrada
> Framework universal resolve estrutura de copy, mas não resolve variação de eficácia por nicho. Biblioteca curada por nicho + RAG (pgvector) foi considerada e não escolhida — fica como opção futura.

## Permissões do agente

Permissões pré-prontas configuráveis pelo usuário. ==Usuário não define regras livres via prompt== — risco de responsabilização da Sollun se o agente quebrar por prompt mal escrito.

---
title: Agente Claude SDK e trigger.dev
tags:
  - sollun
  - tecnico
  - ia
---

# Agente Claude SDK e trigger.dev

## Divisão de papel

> [!abstract] A analogia
> O **trigger.dev** é o chefe de cozinha que não cozinha: garante que cada prato saia na hora certa, mesmo se a cozinha pegar fogo. O **Agent SDK** é quem cozinha.

Eles não competem — se completam. O Agent SDK **não tem persistência embutida**: sessão não sobrevive a restart. O trigger.dev cobre esse buraco.

## trigger.dev

O que ele resolve: agendamento, retry, e principalmente **durabilidade** — uma tarefa esperando resposta do cliente por 3 horas não fica travada consumindo memória, ela pausa de verdade e retoma no evento.

**Decisão: versão Cloud, não self-hosted.**

> [!failure] O que self-hosted custaria
> Provisionar e manter infra, aplicar patch de segurança, monitorar uptime, gerenciar registry de container e object storage, proteger o socket do Docker, travar versão manualmente — sem garantia de performance. Cada task roda em container isolado, então ele é a peça **mais pesada** da stack.

Preços Cloud: Free (US$0, US$5 de crédito, 20 runs concorrentes) → Hobby (US$10) → Pro (US$50). O volume dos 10 fundadores cabe em Free ou Hobby.

## Claude Agent SDK

É a mesma engine que roda por trás do Claude Code, chamada a partir do seu programa. Gerencia o loop de ferramentas, contexto e compactação automaticamente.

Peças relevantes:

| Peça | Uso na Sollun |
|---|---|
| **Tools** | "gerar imagem", "aplicar patch no JSON", "consultar identidade visual" |
| **Hooks** | Forçar a etapa de refinamento de prompt antes de acionar o agente de imagem (Regra nº 1) |
| **Sessions** | Fluxo que pausa esperando resposta do cliente no check-in diário |

## Custo por token

Billing padrão da Claude API (API key própria — sem camada de crédito separada).

| Modelo | Input | Output | Cache hit |
|---|---|---|---|
| Sonnet | $2/MTok | $10/MTok | $0.20/MTok |
| Haiku | $1/MTok | $5/MTok | $0.10/MTok |

> [!tip] Alavanca de custo
> Orquestração multi-modelo: Sonnet para raciocínio complexo, **Haiku para sub-tarefas simples e de alto volume**. Prompt caching reduz em até 90% o custo de reprocessar contexto repetido — a identidade visual do cliente se repete em toda geração.

## Isolamento

A recomendação oficial é rodar o SDK em ambiente containerizado com sandbox e limites de CPU/memória por sessão. ==O trigger.dev já cria e destrói container por execução== — encaixa naturalmente nessa exigência.

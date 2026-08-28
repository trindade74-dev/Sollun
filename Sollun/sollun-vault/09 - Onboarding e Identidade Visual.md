---
title: Onboarding e Identidade Visual
tags:
  - sollun
  - produto
---

# Onboarding e Identidade Visual

## O CTA

A página de entrada mostra os templates esqueleto em ==preto e branco, sem vida==. O CTA — "adicione a cara do seu negócio" — dispara duas coisas ao mesmo tempo:

1. Uma **transição animada** em que os templates ganham a identidade da marca.
2. O **fetch real** para rede social e/ou domínio do cliente, extraindo a identidade visual.

> [!tip] Por que isso funciona
> Comunica o valor do produto sem texto explicativo. O cliente vê a transformação acontecer.

## Caminhos de extração

| Situação | Método |
|---|---|
| Cliente **tem site** | Scrapling lê HTML/CSS público → paleta, fontes, padrões |
| Cliente **só tem Instagram** | Análise visual dos posts (não há CSS para ler) |

> [!warning] O caminho principal é o Instagram
> Boa parte do público-alvo (lanchonete, varejo, estética) **não tem domínio**. Desenhar o fluxo assumindo "só rede social" como padrão, não como fallback.

## Confirmação obrigatória

Extração automática **não substitui** a Regra nº 1 — ela acelera o rascunho.

A paleta extraída pode capturar cor errada (fundo do site que não é a cor da marca) ou fonte padrão do template que o cliente nunca escolheu. Por isso: tela de confirmação — "identificamos essas cores e fontes, confirma?" — antes de aplicar nos templates.

## Templates esqueleto

Em vez de desenhar template do zero por cliente:

- 5 a 8 **arquétipos genéricos**, construídos uma única vez: promoção, novidade, carrossel educativo, depoimento, anúncio de horário/evento.
- Onboarding vira **aplicar tokens de marca** (logo, paleta, fonte, tom) num esqueleto pronto.

Isso transforma trabalho de design em trabalho de configuração.

> [!bug] Gargalo ainda não resolvido
> Os templates iniciais ainda são montados manualmente por Matheus. Aceitável para 10 clientes fundadores; precisa de gatilho definido de quando vira autoatendimento. Ver [[16 - Riscos e Pontos em Aberto]].

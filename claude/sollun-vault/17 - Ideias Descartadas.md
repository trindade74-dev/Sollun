---
title: Ideias Descartadas
tags:
  - sollun
  - historico
---

# Ideias Descartadas

> [!info] Para que serve esta nota
> Contexto histórico apenas. Nada aqui faz parte do projeto. Serve para não reabrir discussão já encerrada — e para lembrar **por que** foi encerrada.

## SaaS financeiro

Módulo completo: agente de IA financeiro, emissão de NF-e (via Spedy), visão geral, relatórios, saúde financeira, folha de pagamento, mapas estratégicos, calculadoras. Chegou a ser considerado o wedge inicial, com schema de banco desenhado (vendas, pendências, transações).

**Por que saiu:** risco de alucinação do agente é mais grave no financeiro (cobrança errada, valor que não bate na dashboard) e pode gerar processo logo de cara. Além disso, o fosso regulatório fiscal é dominado por Bling/Omie/Conta Azul.

**Decisão final (ago/2026):** removido completamente. Pode virar iniciativa **separada** no futuro — nunca conjunta.

## Atendimento automatizado como produto

Inbox de atendimento (Chatwoot), agente respondendo clientes do cliente, fila, tags, histórico por contato. Chegou a estar previsto para os planos pro/max.

**Por que saiu:** mercado maduro e saturado, já resolvido por terceiros. E, principalmente: cada produto extra multiplica área de manutenção. ==Oferecer vários produtos agrega valor percebido e agrega problema real.==

**O que permanece:** automação de conversa apenas para a **própria Sollun** atender seu cliente — cliente manda mensagem, agente responde via Zernio. Isso é canal, não produto.

## Módulo de CRM

Leads, canais, agente autônomo, painel de organizações e contatos. Evaporou da conversa sem decisão explícita — depois cortado formalmente.

## Whitelabel / ambiente customizado por cliente

Cada empresa com identidade visual e domínio próprios, "Powered by Sollun". Duas variantes chegaram a ser desenhadas: marca d'água leve (logo/cor/nome) e whitelabel completo (domínio próprio, SSL por domínio, marca Sollun invisível).

**Por que saiu:** customização por cliente não escala. Custo de infra por cliente sem ganho de conversão nos primeiros 10. A Sollun é plataforma única.

## Site do cliente dentro do hub

Cliente teria acesso ao próprio site (feito por Matheus) como seção unificada do hub. Mesmo gargalo dos templates manuais, multiplicado.

## Evolution API

Canal de WhatsApp via engenharia reversa do protocolo do WhatsApp Web. Funcionava, mas ==sem garantia contratual da Meta e sujeito a ban a qualquer momento==. Substituída pelo Zernio (canal oficial).

## n8n

Ferramenta original de automação do projeto. Substituída por trigger.dev + Claude Agent SDK. Chegou a ser mantida "só para uso interno" — depois removida por completo.

## Kubernetes

Descartado para o estágio atual (VPS única, founder solo). Docker Compose cobre o caso. Gatilho de reavaliação em [[05 - Infraestrutura e VPS]].

## Integração própria com a Graph API da Meta

OAuth, ciclo de vida de token, publicação via container, app review de 2-8 semanas. Substituída pelo Zernio como provedor gerenciado. Postiz fica guardado como alternativa open-source se um dia valer internalizar.

## Biblioteca de exemplos por nicho com RAG

Considerada para resolver gancho fraco em criativos. Substituída por framework de copy fixo e universal (AIDA/PAS). Dívida técnica registrada em [[16 - Riscos e Pontos em Aberto]].

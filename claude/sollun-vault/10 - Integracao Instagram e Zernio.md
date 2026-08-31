---
title: Integração Instagram e Zernio
tags:
  - sollun
  - tecnico
  - integracao
---

# Integração Instagram e Zernio

## Por que Zernio e não integração própria

Uma integração funcional de Instagram não é "chamar uma API". São quatro peças que precisam funcionar **e continuar funcionando**:

1. OAuth completo (código → token curto → token longo → persistência).
2. Ciclo de vida do token (renovação antes dos 60 dias, revogação, re-login).
3. Publicação via container de mídia (criar → checar status → publicar).
4. Sobrevivência às mudanças da plataforma (Meta quebra integração periodicamente).

Somando app review (2-8 semanas, sujeito a rejeição), isso compete diretamente com o tempo de construir o core do produto.

> [!success] Decisão
> Zernio absorve tudo isso. Cobre **WhatsApp oficial + Instagram** — os dois canais que a Sollun realmente usa — com custo que começa em zero (2 contas grátis).

## Faixas de custo

Grátis até 2 contas → ~R$6/conta (3 a 10) → ~R$3/conta (11 a 100).

> [!note] É custo variável, não fixo
> Escala com a base de clientes. Registrar assim no modelo financeiro. Ver [[13 - Custos e Margem]].

## Requisitos que o onboarding precisa comunicar

> [!warning] Erros que o cliente precisa entender
> 1. **Conta pessoal não funciona.** Precisa ser Business/Creator **e** estar vinculada a uma Facebook Page. Sem isso, o OAuth falha ou volta com permissão limitada.
> 2. **Permissão concedida pode ser menor que a solicitada.** O cliente pode desmarcar "publicar conteúdo" na tela de consentimento e só falhar depois, sem erro óbvio. ==Checar explicitamente o que foi concedido e avisar o cliente== — nunca assumir que tudo foi aceito.

## Token

Token de longa duração expira em **60 dias**, mas renova por chamada direta ao endpoint de refresh — **sem re-autenticação do usuário**.

Re-login só é necessário se: (a) o token expirou de fato, ou (b) o cliente revogou o acesso manualmente.

**Arquitetura:** job automático a cada 45-50 dias renovando; tela de "reconecte sua conta" apenas quando o refresh falhar.

## Limite inicial

Contas novas na API oficial começam com **250 mensagens/dia**. Mensagem iniciada pela empresa fora da janela de 24h exige template aprovado — afeta diretamente o check-in diário de [[08 - Fluxo de Criacao de Criativo]].

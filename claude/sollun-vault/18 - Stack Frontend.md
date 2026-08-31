---
title: Stack Frontend
tags:
  - sollun
  - tecnico
  - frontend
---

# Stack Frontend

## As três superfícies

Nomes definidos para não se embolar depois:

| Superfície | O que é |
|---|---|
| **Landing page** | Página pública de conversão — o CTA "adicione a cara do seu negócio", templates P&B ganhando cor |
| **App / dashboard** | Área logada — lista de posts, calendário, contas conectadas, plano e créditos |
| **Editor** | Tela de edição do post em camadas → [[07 - Modelo de Dados - Post em Camadas]] |

## Decidido

- **Next.js + React** — um framework só cobre landing e app logado, sem manter dois projetos. A landing precisa de renderização no servidor: é a porta de entrada de venda, tem que carregar rápido e ser indexável.
- **GSAP na landing page** — a animação de onboarding é a demonstração do produto, não decoração. É uma sequência coreografada (vários elementos em ordem, com timing entre eles), e ==timeline é exatamente onde o GSAP ganha== de CSS puro.

## Editor: sem biblioteca de animação na v1

> [!important] A diferença é de natureza do movimento
> **GSAP anima o roteirizado:** destino, duração e easing definidos antes. Tem começo, meio e fim conhecidos.
> **O editor é movimento contínuo e imprevisível:** a camada segue o dedo do cliente em tempo real, muda de direção, é interrompida a qualquer momento. Não é animação tocando, é objeto respondendo a input.

Os três problemas do editor, separados:

1. **Capturar o gesto** — pointer events, arrastar, pinçar para redimensionar, multi-touch, distinguir clique de arraste. Candidato: `@use-gesture` (normaliza mouse e toque num modelo só).
2. **Movimento natural** — parar seco ou desacelerar ao soltar? Grudar com mola ao encaixar no alinhamento? Candidato: `framer-motion` ou lib de spring, porque a animação é dirigida por estado, não por timeline.
3. **Lógica do editor** — snap, z-index, seleção, undo/redo. ==Não vem pronto em biblioteca nenhuma== — é código próprio operando sobre o JSON de camadas.

> [!tip] Decisão para a v1
> Começar **sem lib de animação no editor** — só pointer events e CSS transform. O editor v1 não precisa de movimento bonito, precisa de arrastar que funciona. Adicionar física depois é fácil; ==tirar uma biblioteca amarrada cedo demais na arquitetura é que dói.==

O GSAP tem plugin de arrastar (Draggable) que cobre parte do item 1, se a preferência for stack única. Conferir a situação atual de licenciamento antes de apostar.

## Ordem de construção

> [!tip] Começar pelo renderizador de preview
> Uma tela que só **exibe** o JSON de camadas, sem editar. Valida o modelo de dados antes de investir em drag, resize e undo. Se o formato das camadas estiver errado, descobrir aqui custa dias em vez de custar a reescrita do editor inteiro.

## Decisões em aberto

- [ ] Biblioteca de componentes (headless tipo shadcn/ui vs. outra) — o produto vende design, a UI não pode parecer template genérico
- [ ] Gerenciamento de estado do editor (contexto React vs. store dedicada) — undo/redo depende disso
- [ ] Como o post vira imagem final na exportação (render no cliente vs. no servidor)
- [ ] Onde hospedar o frontend (junto da VPS ou plataforma de deploy separada)
- [ ] Tokens de marca da Sollun: cor, tipografia, espaçamento

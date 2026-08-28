---
title: Identidade Visual — Referência Antiga
tags:
  - sollun
  - produto
  - design
status: referencia-historica
---

# Identidade Visual — Referência Antiga

> [!info] Para que serve esta nota
> Documenta o sistema visual da landing antiga (sollun-project.vercel.app), da fase de "atendimento automatizado". Reaproveitado como base do `identidade/design-guide.md` do MazyOS. A *copy* e o *conceito de produto* dessa landing estão descartados (ver [[01 - Posicionamento e Escopo]] e [[17 - Ideias Descartadas]]) — só o sistema visual segue como referência.

## Conceito

Sol e lua não é só o nome — é o sistema visual inteiro. A metáfora era "atendimento que nunca dorme": sol de dia, lua de noite, cobertura constante. Isso se materializava numa animação em Canvas dedicada (`sol-lua.ts`), com efeito de hover, como peça central do hero.

## Paleta — "Desert Protocol"

| Nome | Hex | Papel |
|---|---|---|
| Night | `#0B0A14` | Fundo — quase preto, tom roxo-azulado |
| Ember | `#D97543` | Accent solar — laranja terroso |
| Ion | `#7DD3D8` | Sinal lunar — ciano |
| Sand | `#EBC9A0` | Primário — bege quente |
| Dust | `#C9A878` | Secundário — dourado empoeirado |

Paleta escura e quente, tipo "deserto à noite" — nada de branco puro nem azul corporativo de SaaS genérico. Coerente com a marca crescendo no escuro, mas puxa mais pro clima noturno do que pro sol propriamente.

## Interações e motivos visuais

- **Parallax e tilt 3D** no hero — camadas com profundidade ao mover o mouse.
- **Mockup de chat estilo WhatsApp Web** com múltiplos contatos ("Restaurante Bella Vista", "Clínica Saúde Total") simulando conversas reais — recurso forte de prova social visual, mas hoje ilustra um produto que não existe mais no escopo (ver [[17 - Ideias Descartadas]]).
- **Números animados** ("0% desistem", "0/7", "0min") — efeito de contagem, comum em página de conversão.
- **Tipografia** não especificada no README original, mas o restante do sistema (`--radius`, `--maxw`, grid/flexbox) sugere um design mais geométrico que orgânico.

## Stack de implementação

TypeScript + HTML/CSS vanilla (sem framework), Vite, animação em Canvas 2D puro — mais simples que a stack decidida pra versão nova (Next.js + GSAP). Performance era prioridade explícita (~56KB total, meta de Lighthouse > 90).

## O que reaproveitar vs. o que descartar

| Reaproveitar | Descartar |
|---|---|
| Paleta Desert Protocol (sol/lua, tons quentes e escuros) | Toda a copy de atendimento 24/7 |
| Conceito de animação sol-lua no hero | Mockup de chat como prova social (produto errado) |
| Case de uso por segmento (mesma lista: alimentação, saúde/estética, varejo — bate com o ICP atual, ver [[02 - Publico-Alvo e ICP]]) | Estrutura de FAQ voltada a atendimento |

## Relacionadas

- [[01 - Posicionamento e Escopo]]
- [[02 - Publico-Alvo e ICP]]
- [[09 - Onboarding e Identidade Visual]]
- [[17 - Ideias Descartadas]]

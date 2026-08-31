---
title: Riscos e Pontos em Aberto
tags:
  - sollun
  - riscos
status: aberto
---

# Riscos e Pontos em Aberto

> [!danger] O maior de todos
> ## Validação com cliente real
> ==Nenhuma decisão deste projeto teve uma conversa de venda de verdade por trás.== Posicionamento, preço, escopo, público — tudo foi decidido por raciocínio, não por alguém dizendo "eu pago por isso".
>
> Isso não invalida o planejamento, mas significa que qualquer premissa aqui pode cair no primeiro contato real.

## Em aberto

- [ ] **Provedor definitivo de geração de imagem** — GPT Image mantido durante os testes; comparação com outras referências de mercado pendente. Sem critério definido de quando a fase de teste termina.
- [ ] **Escala dos templates manuais** — arquétipos + extração assistida aliviam, mas o processo ainda passa por Matheus. Falta o gatilho: até quantos clientes isso aguenta antes de virar autoatendimento?
- [ ] **Guardrails técnicos para saúde/estética** — a supra-regra existe ([[03 - Regras do Projeto]]), a implementação em prompt não. Resolver **antes** de aceitar cliente desse nicho.
- [ ] **Template do WhatsApp para o check-in diário** — mensagem iniciada pela empresa exige aprovação prévia. Sem isso, o gatilho principal do produto não funciona.
- [ ] **Degrau de margem entre planos** — aceitável, mas precisa ser decisão consciente. Ver [[13 - Custos e Margem]].

## Dívidas técnicas registradas

> [!bug] Framework de copy universal
> Resolve estrutura, não resolve variação de eficácia por nicho. Biblioteca curada + RAG fica como opção futura.

> [!bug] Custos fora do modelo financeiro
> Suporte, infra real da geração prioritária, e crédito de cortesia por imaturidade do modelo.

## Padrão a vigiar

Este projeto tem histórico de **scope creep**: módulos apareceram, cresceram e sumiram sem decisão explícita (CRM), e o wedge chegou a ser revertido em sessões paralelas. A régua que funcionou: ==o que não escala nem valida hipótese fica de fora agora.==

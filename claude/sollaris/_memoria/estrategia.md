# Estratégia

> O que importa agora. Prioridades, metas, prazos.
> O Claude usa isso pra decidir o que sugerir primeiro e o que adiar.
> Atualize sempre que as prioridades mudarem.

## Fase

Pré-lançamento — MVP em construção, ainda sem cliente pagante validado. Buscando os 10 primeiros "clientes fundadores" (preço travado permanentemente). Nenhuma decisão de posicionamento, preço ou escopo teve uma conversa de venda real por trás ainda — esse é o maior risco em aberto do projeto.

## Gargalo atual

Dois gargalos simultâneos:
1. **Validação com cliente real** — tudo foi decidido por raciocínio, não por alguém dizendo "eu pago por isso".
2. **Templates esqueleto do onboarding** ainda montados manualmente por Matheus (5-8 arquétipos: promoção, novidade, carrossel educativo, depoimento, anúncio de horário/evento) — aceitável pra 10 clientes, mas sem gatilho definido de quando vira autoatendimento.

## Pra tirar das costas

Atualização semanal do progresso do MVP no Notion — repetitivo, candidata a virar skill via `/mapear-rotinas`.

## Próximas prioridades

Derivadas do gargalo — o que destrava os clientes fundadores primeiro:
1. **Landing page nova** (Next.js + GSAP) com a proposta certa — a atual (sollun-project.vercel.app) ainda vende atendimento 24/7, produto que saiu do escopo.
2. **Template do WhatsApp pro check-in diário** aprovado pela Meta — sem isso, o gatilho principal do fluxo de criativo (mensagem iniciada pela empresa fora da janela de 24h) fica bloqueado.
3. **Guardrails técnicos pra saúde/estética** implementados em prompt — a supra-regra existe, a implementação não; resolver antes de aceitar cliente desse nicho.
4. **Provedor definitivo de geração de imagem** — GPT Image mantido durante os testes, sem critério definido de quando a fase de teste termina.

## O que pode esperar

- Free trial e reavaliação de escopo — travado até bater os 10 clientes fundadores
- Degrau de margem entre planos (Standard 59% → Max 39%) — aceitável por desenho, mas revisar como decisão consciente quando houver dado real de uso
- Biblioteca de copy curada por nicho + RAG (pgvector) — dívida técnica registrada, framework universal (AIDA/PAS) resolve por ora

## Contexto com prazo

- Atualização semanal do progresso do MVP no Notion
- Template de WhatsApp pro check-in diário precisa de aprovação prévia da Meta antes do lançamento

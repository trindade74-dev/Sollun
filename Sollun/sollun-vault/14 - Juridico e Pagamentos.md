---
title: Jurídico e Pagamentos
tags:
  - sollun
  - negocio
  - juridico
---

# Jurídico e Pagamentos

## MEI

> [!note] MEI já é CNPJ
> Abrir MEI **é** abrir CNPJ — simplificado, gratuito, online, em minutos. Resolve 100% da fricção de cobrança recorrente, porque gateways exigem CNPJ.

| Item | Valor 2026 |
|---|---|
| DAS mensal (prestação de serviço) | ~R$ 86,05 fixo |
| Limite de faturamento | R$ 81 mil/ano (~R$ 6.750/mês) |
| Imposto percentual sobre faturamento | ==Nenhum, dentro do limite== |

O DAS vence dia 20 e é devido **mesmo sem faturamento**.

## Timing

**Decisão: adiar a abertura até haver faturamento.** Pagar DAS mensal sem cliente é queimar caixa. Abrir leva minutos, então não é gargalo de prazo.

> [!warning] Contradição resolvida
> O plano original era formalizar perto de R$10k/mês. Mas R$10k/mês está **acima** do teto do MEI (R$6.750/mês) — seguir esse critério significaria estourar o limite antes de decidir abrir. O critério correto: abrir MEI quando houver o primeiro faturamento, migrar para ME/EPP ao se aproximar de R$81k/ano.

## Asaas

Plataforma de pagamento confirmada. Regulada pelo Banco Central, API REST completa, cobra só sobre o que é recebido.

- Sem taxa de emissão de boleto; tarifa fixa por Pix recebido.
- Cartão recorrente: ~R$0,49 por cobrança + 1,99% sobre o valor em assinaturas.
- Cobre assinaturas, links de pagamento, split, subcontas, notas fiscais e webhooks.

> [!failure] SyncPay avaliada e não escolhida
> Cobre tecnicamente, mas o posicionamento é infoprodutor/afiliado, não SaaS B2B — e há reclamações envolvendo disputa de reembolso.

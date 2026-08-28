---
title: Custos e Margem
tags:
  - sollun
  - negocio
  - financeiro
---

# Custos e Margem

## Composição do custo por cliente

| Item | Natureza |
|---|---|
| Geração de imagem | ==Custo dominante== — escala quase linear com o uso |
| Token Claude | Menor que a imagem; reduzível com Haiku + cache |
| Zernio | Variável, por conta conectada |
| VPS + Asaas + DAS-MEI | Fixo, rateado entre a base |

> [!danger] A armadilha que quebrou a versão anterior dos planos
> Aplicar multiplicador de uso alto (10-20x) **uniformemente** sobre MTok e geração de imagem faz o custo de imagem explodir. Um plano "Max" de R$185 com 500 gerações custava ~R$405 para entregar — prejuízo garantido assim que o cliente usasse o que pagou.
>
> Regra: se o multiplicador de uso sobe Nx, o preço precisa acompanhar na **mesma ordem de grandeza**, ou o volume precisa ser cortado.

## Margem por plano

| Plano | Preço | Custo direto | DAS-MEI rateado | Margem líquida |
|---|---|---|---|---|
| Standard | R$ 109 | ~R$ 36 | R$ 8,60 | **~59%** |
| Pro | R$ 180 | ~R$ 85 | R$ 8,60 | **~48%** |
| Max | R$ 320 | ~R$ 186 | R$ 8,60 | **~39%** |

A queda de margem bruta para líquida é de só 2-3 pontos porque o DAS é **fixo**, não percentual — o que ajuda proporcionalmente mais o Standard.

## Cuidado com o degrau de margem

A margem cai de plano para plano por desenho. Isso é aceitável — é comum empurrar volume no tier intermediário — mas precisa ser ==decisão consciente==, não acidente de números fixados em conversas separadas.

## Custos ainda fora do modelo

- Suporte (tempo de Matheus)
- Infra real da "geração prioritária" em horário de pico
- Crédito de cortesia quando o estouro vem de imaturidade do modelo, não do cliente

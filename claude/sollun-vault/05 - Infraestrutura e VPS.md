---
title: Infraestrutura e VPS
tags:
  - sollun
  - infra
---

# Infraestrutura e VPS

## Especificação recomendada

**KVM 4 — 4 vCPU / 16 GB RAM / 200 GB NVMe**, provedor brasileiro.

Motivos:

- RAM é o recurso mais consumido pela stack, não CPU.
- Geração de imagem roda via **API externa**, não local — sem necessidade de GPU.
- Disco importa porque o MinIO acumula todo asset gerado (histórico + regenerações).
- Provedor BR simplifica conformidade com a ANPD (sem transferência internacional de dado) e tira variação cambial da conta mensal.

## Simulação de carga

Com todos os serviços ativos e 10 clientes simultâneos, a RAM fica **bem abaixo** do teto de 16 GB. O gargalo real, se aparecer, será **pico simultâneo** (todos gerando post na mesma hora), não uso constante.

> [!tip] Alívio de carga
> Com trigger.dev em Cloud (decisão tomada), a peça mais pesada da simulação sai da VPS por completo.

## Kubernetes

> [!failure] Descartado para o estágio atual
> Kubernetes se paga quando há múltiplos nós para orquestrar. Em VPS única, entrega complexidade sem os benefícios de escala. Docker Compose cobre o caso.
>
> **Gatilho de reavaliação:** quando uma VPS bem dimensionada não aguentar mais o tráfego — não "quando tiver mais clientes".

## Contrato

Evitar plano de 24-48 meses antes da validação com cliente real. A diferença promo → renovação é significativa em qualquer provedor, mas errar rápido num contrato curto sai mais barato que ficar preso a uma decisão de infra tomada sem cliente pagante.

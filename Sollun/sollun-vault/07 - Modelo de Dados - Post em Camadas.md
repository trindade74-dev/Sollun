---
title: Modelo de Dados — Post em Camadas
tags:
  - sollun
  - produto
  - tecnico
---

# Modelo de Dados — Post em Camadas

## Estrutura

Cada post é uma estrutura **JSON em camadas**, no espírito de Canva/Figma: texto, logo, forma e imagem de fundo são objetos editáveis separados.

```json
{
  "post_id": "...",
  "camadas": [
    { "tipo": "fundo", "asset_id": "..." },
    { "tipo": "texto", "conteudo": "...", "fonte": "...", "cor": "..." },
    { "tipo": "logo", "asset_id": "...", "posicao": {} }
  ]
}
```

## A decisão que economiza token

Toda edição pedida no chat é **classificada pelo Claude** em uma de duas categorias:

| Tipo | O que é | Custo |
|---|---|---|
| **Patch estrutural** | Mover, redimensionar, trocar cor, texto ou asset | ==Zero custo de modelo de imagem== — é edição direta no JSON |
| **Operação generativa** | Precisa gerar pixel novo | Aciona o agente de imagem **só na camada afetada** |

> [!tip] Isso é a Regra nº 2 na prática
> Ver [[03 - Regras do Projeto]]. A maior parte dos pedidos de ajuste é estrutural — resolver isso sem chamar modelo de imagem é a principal alavanca de custo do produto.

## Editor manual e chat compartilham a fonte

O editor manual da plataforma e o chat operam sobre **o mesmo JSON**. Não existe "versão do chat" e "versão do editor".

Quando o cliente reprova um criativo, o agente oferece explicitamente a opção de editar manualmente na plataforma — ==sem gastar token==.

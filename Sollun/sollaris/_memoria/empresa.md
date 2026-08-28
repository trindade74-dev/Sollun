# Empresa

> Memória central do negócio. O Claude lê esse arquivo antes de cada resposta.
> Preenchido pelo `/instalar` (a partir do `sollun-vault`) — você pode editar a qualquer momento.

**Nome:** Matheus Trindade
**Negócio:** Sollun
**O que faz:** Plataforma única de marketing automatizado por IA pra pequenos negócios — aprende a identidade visual do cliente no onboarding (via site ou Instagram), gera criativos (post, story, carrossel) por conversa, e publica nas redes conectadas depois da aprovação do dono, por chat (WhatsApp) ou pelo SaaS. Sem whitelabel, sem ambiente customizado por cliente — modelo centralizado, referência de mercado próxima: Predis.ai.
**Perfil:** Founder solo
**Atende clientes:** Lanchonetes e clínicas de estética/odontologia — negócios com dor de marketing diária, sem equipe própria e sem caixa pra agência, que compram solução pronta (não ferramenta pra configurar). Fase atual: captar os 10 primeiros "clientes fundadores" (preço travado permanentemente, reajustado só por inflação) via grupos locais de empreendedores, comunidades de nicho e indicação — tráfego pago e plataformas de freela descartados nesta fase.
**Equipe:** Matheus sozinho — inclusive os templates esqueleto do onboarding ainda são montados manualmente por ele.
**Ferramentas:** Postgres+pgvector, Redis, MinIO, Traefik, Portainer (Docker na VPS); Zernio (WhatsApp oficial + Instagram); trigger.dev Cloud; Claude Agent SDK/API; Resend; Asaas (cobrança); Scrapling (scraping sob demanda); Next.js+React e GSAP no frontend; Notion (acompanhamento do MVP).
**Principais entregas:** Geração de criativos em estrutura de camadas editável (texto/logo/forma/imagem — patch estrutural sem custo de modelo de imagem quando possível), publicação nas redes conectadas via Zernio, chat de aprovação (WhatsApp + SaaS nativo), atendimento da própria Sollun aos seus clientes via WhatsApp.

## Contexto adicional

- **Planos:** Standard R$109 (25 créditos, até 2 redes) · Pro R$180 (65 créditos, até 5 redes) · Max R$320 (140 créditos, até 20 redes). Créditos por peso: post=1, story=0,5, carrossel=4, reprovação/regeneração=mesmo peso do original.
- **Margem líquida:** Standard ~59% · Pro ~48% · Max ~39% — custo dominante é geração de imagem (não token Claude).
- **Supra-regra do produto:** nunca prometer resultado em criativos pra clientes de saúde/estética (vedação CFM/CRO) — guardrail de implementação em prompt ainda pendente, resolver antes de aceitar cliente desse nicho.
- **Pivot de escopo (ago/2026):** saíram do projeto o SaaS financeiro e o atendimento automatizado vendido como produto — hoje o foco é só geração/publicação de criativos. A landing antiga (sollun-project.vercel.app) ainda reflete a proposta descartada (atendimento 24/7).
- **Maior risco em aberto:** nenhuma decisão de posicionamento/preço/escopo/público teve validação com cliente pagante real ainda — tudo decidido por raciocínio, não por venda de verdade.
- **Fonte:** este arquivo foi montado a partir das notas em `sollun-vault/` (00 a 19) — consultar lá o detalhe técnico/estratégico por trás de cada ponto.

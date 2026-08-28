# Identidade visual

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Edite quando a marca evoluir.

---

## Conceito

Paleta **"Desert Protocol"** — sol e lua não é só o nome, é o sistema visual inteiro. Metáfora original: "atendimento que nunca dorme" (sol de dia, lua de noite, cobertura constante), materializada numa animação em Canvas dedicada no hero (`sol-lua.ts`), com efeito de hover.

Paleta escura e quente, clima "deserto à noite" — nada de branco puro nem azul corporativo de SaaS genérico. Confirmado em `sollun-vault/19 - Identidade Visual - Referencia Antiga.md` como referência histórica reaproveitável (a copy da landing antiga, não). Observação registrada lá: a paleta atual puxa mais pro clima noturno do que pro sol propriamente — considerar se isso é intencional ao evoluir o hero.

## Cores

| Nome | Hex | Papel |
|---|---|---|
| Night | `#0B0A14` | Fundo — quase preto, tom roxo-azulado |
| Ember | `#D97543` | Accent solar — laranja terroso |
| Ion | `#7DD3D8` | Sinal lunar — ciano |
| Sand | `#EBC9A0` | Primário — bege quente |
| Dust | `#C9A878` | Secundário — dourado empoeirado |

- **Fundo principal:** Night `#0B0A14`
- **Cor de destaque / CTA:** Ember `#D97543` (solar) e Ion `#7DD3D8` (lunar) — os dois accents da metáfora sol/lua
- **Texto principal:** Sand `#EBC9A0`
- **Fundo alternativo / cards:** Dust `#C9A878`
- **Cor proibida:** branco puro e azul corporativo genérico de SaaS — quebra o clima "deserto à noite"

---

## Tipografia

- **Títulos e destaques:** *(não especificado na referência — o sistema sugere algo mais geométrico que orgânico, coerente com grid/flexbox e `--radius`/`--maxw` como tokens)*

- **Corpo, subtítulos e botões:** *(a definir)*

- **Peso do título:** *(a definir)*

---

## Estilo geral

Escuro, quente, tech mas não corporativo — "deserto à noite". Parallax e tilt 3D no hero (camadas com profundidade ao mover o mouse). Números animados como efeito de contagem (recurso de conversão). Performance como prioridade explícita (~56KB total, meta Lighthouse > 90) — implementação de referência era TypeScript + HTML/CSS vanilla + Vite + Canvas 2D puro, sem framework.

> Referência histórica da landing antiga (sollun-project.vercel.app). O mockup de chat estilo WhatsApp como prova social e a copy de atendimento 24/7 **não devem ser reaproveitados** — ilustram o produto antigo (atendimento automatizado), fora do escopo atual. Ver detalhe completo em `sollun-vault/18 - Identidade Visual - Referencia Antiga.md`.

---

## Casos de uso por segmento

Alimentação, saúde/estética e varejo — mesma lista de segmentos da landing antiga, batendo com o ICP atual (lanchonetes e clínicas de estética/odontologia). Manter como referência de linguagem visual por segmento ao criar templates esqueleto.

## Elementos-chave

- Bordas: geométricas, coerentes com tokens de design (`--radius`, `--maxw`)
- Border-radius dos cards: *(a definir — sistema usa token `--radius`)*
- Botões: *(a definir)*
- Sombras: *(a definir)*

---

## O que NUNCA fazer

- Não usar branco puro nem azul corporativo genérico de SaaS — quebra o conceito "deserto à noite"
- Não reaproveitar o mockup de chat WhatsApp como prova social nem copy de atendimento 24/7 — produto errado, fora do escopo atual
- Não perder a metáfora sol/lua (animação Canvas no hero) — é o conceito central da marca

---

## Logo

- **Arquivo:** `identidade/logo.svg` (ícone completo)
- **Favicon:** `identidade/favicon.svg`
- **Fonte:** copiados de `style/sollun-icone.svg` e `style/sollun-icone-favicon.svg` na raiz do projeto Sollun
- **Versão pra fundo escuro:** *(a confirmar — checar se o SVG atual já funciona sobre Night `#0B0A14` ou se precisa de variante)*
- **Onde usar:** slide final do carrossel (CTA), header de propostas, slides de apresentação
- **Tamanho sugerido:** largura entre 120-200px nos HTMLs

---

## Observações adicionais

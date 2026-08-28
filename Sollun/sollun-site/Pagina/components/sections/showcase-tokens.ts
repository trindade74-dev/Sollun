/** Medidas compartilhadas entre a janela demo (RevealWindow) e o carrossel
 * (DetailCarousel) — os dois precisam usar exatamente as mesmas medidas
 * (largura, altura, inset inicial do clip-path), antes e depois de
 * renderizar. */
export const HEADER_HEIGHT_PX = 68
/** Folga entre o header fixo e a janela/carrossel já renderizados — maior
 * que antes (era 50px), pra não ficar colado na navbar. */
export const HEADER_GAP_PX = 100
export const RESTING_TOP_PX = HEADER_HEIGHT_PX + HEADER_GAP_PX
/** Distância fixa entre o fim da janela demo e o início do carrossel. */
export const SECTION_GAP_PX = 50
export const CORNER_RADIUS_PX = 24
export const BOX_WIDTH_PX = 1072
/** Altura no desktop (md+, ≥768px) — nos dois, hardcoded como `md:h-[620px]`
 * no className (Tailwind não resolve classes montadas via template string),
 * mesmo padrão já usado com CORNER_RADIUS_PX/`rounded-[24px]`. Mantenha em
 * sincronia se mudar esse valor. */
export const BOX_HEIGHT_PX = 620
/** Altura do carrossel abaixo de md — conteúdo (placeholder) é bem mais
 * enxuto que o da demo, então usa uma altura menor e própria (não teria
 * como caber os 620px sem sobrar espaço vazio). Hardcoded como `h-[320px]`
 * no className — mantenha em sincronia. A demo, abaixo de md, não usa altura
 * fixa: vira `h-auto` (o conteúdo empilhado de verdade precisa de mais
 * espaço que 620px, então uma altura fixa cortaria conteúdo). */
export const CAROUSEL_HEIGHT_MOBILE_PX = 340
/** Espaço fixo entre o fim do carrossel e a seção Powered by logo abaixo. */
export const CAROUSEL_BOTTOM_GAP_PX = 50
/** Inset inicial do clip-path (fase "pequena", antes de renderizar) — mesmo
 * valor pras duas seções. */
export const INITIAL_INSET_PERCENT = 20

"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import {
  BOX_WIDTH_PX,
  CAROUSEL_BOTTOM_GAP_PX,
  CORNER_RADIUS_PX,
  INITIAL_INSET_PERCENT,
  RESTING_TOP_PX,
  SECTION_GAP_PX,
} from "./showcase-tokens"

/** Fração do progresso de scroll da seção pinned reservada pro carrossel
 * crescer (clip-path, mesma técnica de Scroll Image Reveal do RevealWindow);
 * o resto ([GROW_END, 1]) é a leitura dos 3 painéis de detalhamento, já com
 * o carrossel parado no tamanho final. */
const GROW_END = 0.25
const TOTAL_SCROLL_VH = 380

const panels = [
  { title: "[painel 1]", body: "[placeholder — o que a Sollun faz]" },
  { title: "[painel 2]", body: "[placeholder — pra quem é]" },
  { title: "[painel 3]", body: "[placeholder — como funciona]" },
]

type PanelProps = {
  index: number
  title: string
  body: string
  panelProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}

/**
 * Estrutura é SEMPRE a mesma entre servidor e cliente (sem branch de JSX por
 * useReducedMotion — isso causa hydration mismatch, já que o hook resolve
 * diferente no servidor vs. no primeiro paint do cliente). A neutralização
 * sob prefers-reduced-motion é só CSS (motion-reduce:), nunca troca de árvore.
 */
function Panel({ index, title, body, panelProgress }: PanelProps) {
  const step = 1 / panels.length
  const start = index * step
  const mid = start + step / 2
  const end = start + step

  const opacity = useTransform(
    panelProgress,
    [Math.max(0, start - step * 0.4), start, end, Math.min(1, end + step * 0.4)],
    [0, 1, 1, 0]
  )
  const scale = useTransform(panelProgress, [start, mid, end], [0.92, 1, 0.92])
  const y = useTransform(panelProgress, [start, mid, end], [24, 0, -24])

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        zIndex: index + 1,
        willChange: "transform, opacity",
      }}
      className="border-border bg-card motion-reduce:!static motion-reduce:!opacity-100 motion-reduce:!scale-100 motion-reduce:!translate-y-0 motion-reduce:mb-6 absolute inset-0 flex flex-col justify-center gap-3 rounded-(--radius) border p-10"
    >
      <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        {title}
      </span>
      <p className="text-foreground max-w-md text-lg">{body}</p>
    </motion.div>
  )
}

/**
 * Carrossel de detalhamento — seção pinned própria (sticky, sem sobrepor a
 * janela demo, que fica SECTION_GAP_PX acima e CAROUSEL_BOTTOM_GAP_PX abaixo
 * do fim do carrossel, antes do Powered by). Mesma largura e inset inicial de
 * clip-path da janela demo (showcase-tokens.ts) — e mesma altura no desktop
 * (md+, 620px). Abaixo de md a altura é menor e própria (340px, não os 620px
 * da demo): os painéis do carrossel são absolutamente posicionados pra
 * ciclar (precisam de altura explícita, "auto" colapsaria a 0), então não dá
 * pra copiar a saída "h-auto" da demo — mas o conteúdo deles (placeholder
 * curto) também não precisa dos 620px cheios, o que deixaria espaço vazio
 * desproporcional. Entra pequeno e cresce via clip-path (mesma técnica de
 * Scroll Image Reveal usada em RevealWindow — não recria uma segunda técnica
 * de animação) até GROW_END do progresso da seção; a partir daí fica parado
 * no tamanho final e os 3 painéis ciclam no scroll restante.
 *
 * Ancorado a RESTING_TOP_PX do topo — o mesmo recuo de header usado pela
 * janela demo, pra manter a mesma régua de clearance ao longo da página.
 */
function DetailCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  })

  const growProgress = useTransform(scrollYProgress, [0, GROW_END], [0, 1])
  const panelProgress = useTransform(scrollYProgress, [GROW_END, 1], [0, 1])

  const clipPath = useTransform(
    growProgress,
    [0, 1],
    [
      `inset(0% ${INITIAL_INSET_PERCENT}% 0% ${INITIAL_INSET_PERCENT}% round ${CORNER_RADIUS_PX}px)`,
      `inset(0% 0% 0% 0% round ${CORNER_RADIUS_PX}px)`,
    ]
  )

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${TOTAL_SCROLL_VH}vh`,
        marginTop: `${SECTION_GAP_PX}px`,
        marginBottom: `${CAROUSEL_BOTTOM_GAP_PX}px`,
      }}
      className="motion-reduce:h-auto motion-reduce:mt-0 relative"
    >
      <div
        className="motion-reduce:static motion-reduce:h-auto sticky mx-auto h-[340px] px-6 md:h-[620px]"
        style={{
          top: `${RESTING_TOP_PX}px`,
          maxWidth: `${BOX_WIDTH_PX + 48}px`,
        }}
      >
        <motion.div
          style={{ clipPath, width: "100%", height: "100%", willChange: "clip-path" }}
          className="reveal-window-clip border-line bg-card motion-reduce:!static motion-reduce:!h-auto mx-auto max-w-full overflow-hidden rounded-[24px] border"
        >
          <div className="motion-reduce:static motion-reduce:h-auto motion-reduce:py-16 relative h-full p-10">
            {panels.map((panel, index) => (
              <Panel
                key={panel.title}
                index={index}
                title={panel.title}
                body={panel.body}
                panelProgress={panelProgress}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export { DetailCarousel }

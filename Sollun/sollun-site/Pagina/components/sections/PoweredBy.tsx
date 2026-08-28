"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

const techs = [
  "[tecnologia 1]",
  "[tecnologia 2]",
  "[tecnologia 3]",
  "[tecnologia 4]",
  "[tecnologia 5]",
  "[tecnologia 6]",
]

function TechTrack() {
  return (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {techs.map((tech, i) => (
        <span
          key={`${tech}-${i}`}
          className="font-display text-muted-foreground text-3xl font-semibold whitespace-nowrap md:text-4xl"
        >
          {tech}
        </span>
      ))}
    </div>
  )
}

/**
 * "Powered by" — marquee horizontal vinculado ao scroll ("Text Scroll" da motion.dev).
 * Estrutura é sempre a mesma (3 faixas duplicadas dentro de um container
 * overflow-hidden); sob prefers-reduced-motion o deslocamento é neutralizado
 * via CSS (motion-reduce:!translate-x-0), não por um branch de JSX — branch
 * de árvore baseado em useReducedMotion quebra a hidratação (servidor e
 * primeiro paint do cliente resolvem o hook de forma diferente).
 */
function PoweredBy() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-33%"])

  return (
    <section ref={ref} className="border-border/60 border-y py-16">
      <h2 className="mx-auto mb-10 max-w-(--maxw) px-6 font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Powered by
      </h2>

      <div className="overflow-hidden">
        <motion.div
          style={{ x, willChange: "transform" }}
          className="motion-reduce:!translate-x-0 flex w-max"
        >
          <TechTrack />
          <TechTrack />
          <TechTrack />
        </motion.div>
      </div>
    </section>
  )
}

export { PoweredBy }

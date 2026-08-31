"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

/**
 * Transição "Scroll Zoom Hero" — dá zoom e some ao sair do hero, antes da próxima
 * seção pesada começar (o range de scroll desta seção termina antes da RevealWindow
 * iniciar seu próprio efeito, evitando dois efeitos pesados simultâneos).
 */
function ScrollZoomTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.15]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    shouldReduceMotion ? [1, 1, 1] : [1, 1, 0]
  )

  return (
    <div ref={ref} aria-hidden="true" className="h-[40vh]">
      <motion.div
        style={{ scale, opacity, willChange: "transform, opacity" }}
        className="from-ember/10 via-background to-ion/10 sticky top-0 flex h-[40vh] items-center justify-center bg-gradient-to-b"
      >
        <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          [transição scroll zoom]
        </span>
      </motion.div>
    </div>
  )
}

export { ScrollZoomTransition }

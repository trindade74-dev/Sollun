"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP)

const SWAP_INTERVAL_MS = 30_000

type BrandDotsProps = {
  className?: string
}

/**
 * Os 2 pontos quadrados de marca (ember + ion) ao lado do wordmark "sollun".
 * A cada 30s trocam de posição em sequência: um corre até o lugar do outro,
 * só então o segundo se desloca pra posição vaga (não simultâneo, não stagger).
 */
function BrandDots({ className }: BrandDotsProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const dotARef = useRef<HTMLSpanElement>(null)
  const dotBRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const dotA = dotARef.current
      const dotB = dotBRef.current
      if (!dotA || !dotB) return

      const distance = dotB.offsetLeft - dotA.offsetLeft
      let swapped = false

      const runSwap = () => {
        swapped = !swapped
        const targetA = swapped ? distance : 0
        const targetB = swapped ? -distance : 0

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches

        if (reduceMotion) {
          gsap.set([dotA, dotB], { scaleX: 1 })
          gsap.set(dotA, { x: targetA })
          gsap.set(dotB, { x: targetB })
          return
        }

        gsap
          .timeline()
          .to(dotA, {
            x: targetA,
            scaleX: 1.5,
            duration: 0.35,
            ease: "power2.in",
          })
          .to(dotA, { scaleX: 1, duration: 0.15, ease: "power1.out" }, "-=0.05")
          .to(
            dotB,
            { x: targetB, scaleX: 1.5, duration: 0.45, ease: "power3.out" },
            ">"
          )
          .to(dotB, { scaleX: 1, duration: 0.15, ease: "power1.out" }, "-=0.1")
      }

      const intervalId = setInterval(runSwap, SWAP_INTERVAL_MS)

      return () => {
        clearInterval(intervalId)
      }
    },
    { scope: containerRef }
  )

  return (
    <span
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative inline-flex items-center gap-0.5", className)}
    >
      <span
        ref={dotARef}
        className="size-1 rounded-[1px] bg-ember will-change-transform"
      />
      <span
        ref={dotBRef}
        className="size-1 rounded-[1px] bg-ion will-change-transform"
      />
    </span>
  )
}

export { BrandDots }

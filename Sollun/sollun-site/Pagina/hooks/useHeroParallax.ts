"use client"

import { useEffect, type RefObject } from "react"

const LERP = 0.08

function shouldSkip(): boolean {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)")
  return reducedMotion.matches || coarsePointer.matches
}

/**
 * Parallax de mouse nas camadas do hero — porta de Pagina/src/parallax.ts (initParallax).
 * Preserva o transform base de cada camada via WeakMap (crítico: .hero__rings tem
 * translateY(-50%) que não pode ser sobrescrito pelo translate3d do parallax).
 */
export function useHeroParallax(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    if (shouldSkip()) return

    const layers = Array.from(
      hero.querySelectorAll<HTMLElement>("[data-parallax]")
    )
    if (!layers.length) return

    const baseTransform = new WeakMap<HTMLElement, string>()
    layers.forEach((el) => {
      const computed = getComputedStyle(el).transform
      baseTransform.set(el, computed === "none" ? "" : computed)
    })

    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      tx = (e.clientX - rect.left) / rect.width - 0.5
      ty = (e.clientY - rect.top) / rect.height - 0.5
    }

    const onLeave = () => {
      tx = 0
      ty = 0
    }

    const tick = () => {
      cx += (tx - cx) * LERP
      cy += (ty - cy) * LERP

      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth ?? "10")
        const ox = cx * depth
        const oy = cy * depth
        const base = baseTransform.get(el) ?? ""
        el.style.transform = `${base} translate3d(${ox}px, ${oy}px, 0)`
      })

      raf = requestAnimationFrame(tick)
    }

    hero.addEventListener("mousemove", onMove, { passive: true })
    hero.addEventListener("mouseleave", onLeave, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener("mousemove", onMove)
      hero.removeEventListener("mouseleave", onLeave)
    }
  }, [heroRef])
}

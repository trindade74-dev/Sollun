import { cn } from "@/lib/utils"
import styles from "./HeroBackground.module.css"

/**
 * Background do hero — reprodução exata do site antigo (ver HeroBackground.module.css).
 * Sem lógica própria: data-parallax/data-depth são lidos por useHeroParallax, no Hero.tsx.
 */
function HeroBackground() {
  return (
    <>
      <div
        className={cn(styles["hero__dots"], styles["hero__dots--far"])}
        aria-hidden="true"
        data-parallax
        data-depth="6"
      />
      <div
        className={cn(styles["hero__dots"], styles["hero__dots--mid"])}
        aria-hidden="true"
        data-parallax
        data-depth="22"
      />
      <div
        className={cn(styles["hero__dots"], styles["hero__dots--near"])}
        aria-hidden="true"
        data-parallax
        data-depth="44"
      />
      <div
        className={styles["hero__glow"]}
        aria-hidden="true"
        data-parallax
        data-depth="20"
      />
      <div
        className={styles["hero__rings"]}
        aria-hidden="true"
        data-parallax
        data-depth="52"
      >
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" width="800" height="800">
          <circle cx="400" cy="400" r="140" fill="none" stroke="#EBC9A0" strokeWidth="1" opacity="0.05" />
          <circle cx="400" cy="400" r="230" fill="none" stroke="#7DD3D8" strokeWidth="1" opacity="0.06" />
          <circle cx="400" cy="400" r="318" fill="none" stroke="#EBC9A0" strokeWidth="1" opacity="0.04" />
          <circle cx="400" cy="400" r="395" fill="none" stroke="#D97543" strokeWidth="1.5" opacity="0.14" />
        </svg>
      </div>
    </>
  )
}

export { HeroBackground }

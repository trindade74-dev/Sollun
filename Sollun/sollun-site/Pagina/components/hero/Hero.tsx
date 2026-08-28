"use client"

import { useRef } from "react"
import {
  BuildingStorefrontIcon,
  LockClosedIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline"

import { useHeroParallax } from "@/hooks/useHeroParallax"
import { HeroBackground } from "./HeroBackground"

const badges = [
  {
    icon: BuildingStorefrontIcon,
    label: "Feito pra quem não tem equipe de marketing",
  },
  {
    icon: SwatchIcon,
    label: "Aprende a identidade visual do seu negócio",
  },
  {
    icon: LockClosedIcon,
    label: "Preço travado pros clientes fundadores",
  },
]

/**
 * Paridade 1:1 com o hero da página antiga (Sollunv1-clone/Pagina/src/style.css
 * .eyebrow, .hero__title, .hero__sub, .hero__actions, botões .btn, .hero__badges)
 * — só o conteúdo textual muda. Valores clonados literalmente, não aproximados.
 */
function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroParallax(heroRef)

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-[104px] pb-10"
    >
      <HeroBackground />

      <div className="relative z-10 flex max-w-[720px] flex-col items-center text-center">
        <span className="eyebrow">Marketing automatizado por IA</span>

        <h1 className="font-display my-5 text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
          Marketing <span className="text-grad">pronto</span>, sem
          contratar <span className="text-grad">agência</span>.
        </h1>

        <p className="max-w-[480px] text-[1.18rem] text-muted-foreground">
          A Sollun gera, edita e publica seus posts e carrosséis com a
          identidade visual do seu negócio — você só aprova, pelo WhatsApp
          ou pelo app.
        </p>

        <div className="mt-9 mb-7 flex flex-wrap justify-center gap-[14px]">
          <a
            href="#lista"
            className="btn-primary-glow inline-flex items-center justify-center rounded-full px-[28px] py-[15px] font-display text-base font-semibold text-[#fdf5ec] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Entrar na lista de espera
          </a>
          <a
            href="#produto"
            className="border-line text-foreground inline-flex items-center justify-center rounded-full border px-[28px] py-[15px] font-display text-base font-semibold transition-colors hover:border-sand hover:bg-[rgba(231,201,160,0.06)] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Ver como funciona
          </a>
        </div>

        <ul className="text-sand flex flex-wrap justify-center gap-[18px] text-[0.9rem] font-medium">
          {badges.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-3.5 shrink-0" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export { Hero }

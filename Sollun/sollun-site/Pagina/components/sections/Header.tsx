"use client"

import { useSyncExternalStore } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/brand/Logo"
import { buttonVariants } from "@/components/ui/button"
import { NavToggle } from "./NavToggle"

const navLinks = [
  { href: "#produto", label: "Produto" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
]

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true })
  return () => window.removeEventListener("scroll", callback)
}

function getIsScrolledSnapshot() {
  return window.scrollY > 8
}

function getIsScrolledServerSnapshot() {
  return false
}

function NavLinks() {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

/**
 * Fixed/overlay sobre o hero (página antiga usa sticky, mas isso ocuparia
 * espaço no fluxo e empurraria o hero pra baixo dos 100svh reais — mudança
 * estrutural necessária, mantida das correções anteriores). Visualmente,
 * porém, clona a página antiga: 68px de altura, background que só fica
 * opaco (.is-scrolled) depois que o usuário rola.
 */
function Header() {
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getIsScrolledSnapshot,
    getIsScrolledServerSnapshot
  )

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b backdrop-blur-[12px] transition-colors duration-300",
        isScrolled
          ? "bg-[rgba(11,10,20,0.9)] border-line"
          : "bg-[rgba(11,10,20,0.55)] border-transparent"
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-(--maxw) items-center justify-between px-6">
        <Logo />

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-7 md:flex"
        >
          <NavLinks />
          <Link href="#lista" className={buttonVariants({ size: "sm" })}>
            Entrar na lista
          </Link>
        </nav>

        <NavToggle>
          <nav
            aria-label="Navegação principal"
            className="flex flex-col items-start gap-4"
          >
            <NavLinks />
            <Link href="#lista" className={buttonVariants({ size: "sm" })}>
              Entrar na lista
            </Link>
          </nav>
        </NavToggle>
      </div>
    </header>
  )
}

export { Header }

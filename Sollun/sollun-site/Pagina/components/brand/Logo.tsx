import Link from "next/link"

import { BrandMark } from "./BrandMark"
import { BrandDots } from "./BrandDots"

type LogoProps = {
  className?: string
}

function Logo({ className }: LogoProps) {
  return (
    <Link
      href="#hero"
      aria-label="Sollun — início"
      className={className ?? "inline-flex items-center gap-2"}
    >
      <BrandMark />
      <span className="inline-flex items-center gap-1">
        <span className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-foreground">
          sollun
        </span>
        <BrandDots />
      </span>
    </Link>
  )
}

export { Logo }

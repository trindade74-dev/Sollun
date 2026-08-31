"use client"

import { useState } from "react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"

type NavToggleProps = {
  children: React.ReactNode
}

/** Menu mobile — isolado num client component pequeno pra manter o Header como server component. */
function NavToggle({ children }: NavToggleProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <XMarkIcon className="size-5" aria-hidden="true" />
        ) : (
          <Bars3Icon className="size-5" aria-hidden="true" />
        )}
      </Button>

      {open && (
        <div className="border-border bg-background absolute inset-x-0 top-full border-b p-6">
          {children}
        </div>
      )}
    </div>
  )
}

export { NavToggle }

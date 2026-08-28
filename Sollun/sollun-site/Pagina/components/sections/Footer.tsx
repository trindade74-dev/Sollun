import { Logo } from "@/components/brand/Logo"

function Footer() {
  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex max-w-(--maxw) flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <Logo />
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Sollun. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export { Footer }

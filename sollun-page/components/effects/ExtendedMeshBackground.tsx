import { cn } from "@/lib/utils"
import styles from "./ExtendedMesh.module.css"

type ExtendedMeshBackgroundProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Continua a malha pontilhada do hero até a seção Powered by, envolvendo
 * RevealWindow + DetailCarousel. Aplicado como background puro (sem
 * overflow-hidden) pra não quebrar o `position: sticky` do carrossel.
 */
function ExtendedMeshBackground({ children, className }: ExtendedMeshBackgroundProps) {
  return (
    <div className={cn(styles["extendedMesh"], className)}>{children}</div>
  )
}

export { ExtendedMeshBackground }

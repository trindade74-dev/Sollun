import type { Metadata } from "next"

import "./globals.css"
import { tektur, outfit, jetbrainsMono } from "./fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Sollun",
  description:
    "Sollun automatiza a criação e publicação de posts e carrosséis com a identidade visual do seu negócio.",
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport = {
  themeColor: "#0B0A14",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "antialiased",
        tektur.variable,
        outfit.variable,
        jetbrainsMono.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}

import { Header } from "@/components/sections/Header"
import { Hero } from "@/components/hero/Hero"
import { RevealWindow } from "@/components/sections/RevealWindow"
import { DetailCarousel } from "@/components/sections/DetailCarousel"
import { PoweredBy } from "@/components/sections/PoweredBy"
import { Planos } from "@/components/sections/Planos"
import { Footer } from "@/components/sections/Footer"
import { ExtendedMeshBackground } from "@/components/effects/ExtendedMeshBackground"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ExtendedMeshBackground>
          <RevealWindow />
          <DetailCarousel />
        </ExtendedMeshBackground>
        <PoweredBy />
        <Planos />
      </main>
      <Footer />
    </>
  )
}

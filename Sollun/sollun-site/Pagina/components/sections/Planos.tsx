import { PricingCard, type Plan } from "./PricingCard"
import styles from "@/components/effects/Glass3d.module.css"

const plans: Plan[] = [
  { name: "Standard", price: "R$ 109", credits: "25 créditos/mês", networks: "Até 2 redes conectadas" },
  { name: "Pro", price: "R$ 180", credits: "65 créditos/mês", networks: "Até 5 redes conectadas", highlighted: true },
  { name: "Max", price: "R$ 320", credits: "140 créditos/mês", networks: "Até 20 redes conectadas" },
]

/**
 * Seção de Planos — usa o efeito glass3d (compartilhado com o CTA secundário
 * do hero) aplicado ao wrapper de fundo. Precisa de border-radius explícito,
 * já que o CSS do glass3d usa `border-radius: inherit`.
 */
function Planos() {
  return (
    <section id="planos" className="mx-auto max-w-(--maxw) px-6 py-24">
      <div className={`${styles["glass3d"]} rounded-(--radius) bg-card/40 p-10 md:p-16`}>
        <div className="mb-12 flex flex-col gap-3 text-center">
          <span className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            Planos
          </span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Escolha o plano do seu negócio
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Planos }

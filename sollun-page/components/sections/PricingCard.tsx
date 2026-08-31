import { CheckIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

type Plan = {
  name: string
  price: string
  credits: string
  networks: string
  highlighted?: boolean
}

function PricingCard({ name, price, credits, networks, highlighted }: Plan) {
  return (
    <Card
      className={cn(
        "relative",
        highlighted && "ring-2 ring-primary"
      )}
    >
      {highlighted && (
        <Badge className="absolute top-4 right-4">Mais popular</Badge>
      )}
      <CardHeader>
        <CardTitle className="font-display text-xl">{name}</CardTitle>
        <CardDescription>
          <span className="text-foreground text-3xl font-semibold">
            {price}
          </span>{" "}
          /mês
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <span className="flex items-center gap-2">
          <CheckIcon className="text-ion size-4" aria-hidden="true" />
          {credits}
        </span>
        <span className="flex items-center gap-2">
          <CheckIcon className="text-ion size-4" aria-hidden="true" />
          {networks}
        </span>
      </CardContent>
      <CardFooter>
        <a
          href="#lista"
          className={cn(buttonVariants({ variant: highlighted ? "default" : "outline" }), "w-full")}
        >
          Escolher {name}
        </a>
      </CardFooter>
    </Card>
  )
}

export { PricingCard }
export type { Plan }

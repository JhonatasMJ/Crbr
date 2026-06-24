import { GsapScrubReveal } from "@/components/gsap-reveal";
import { ScrollReveal, ScrollStagger } from "@/components/scroll-reveal";
import { ChartLineUpIcon, ClockIcon, CurrencyCircleDollarIcon, ShieldCheckIcon, TrendUpIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { InvestmentCard } from "@/components/investmentCard"

const features = [
  { icon: ChartLineUpIcon, label: "Resultados instantâneos" },
  { icon: ShieldCheckIcon, label: "Renda fixa segura" },
  { icon: ClockIcon, label: "Simule em segundos" },
] as const

export function Simulator() {
  return (
    <section id="simulator" className="section-padding w-full scroll-mt-24 bg-blackLight">
      <div className="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <ScrollReveal direction="left" className="max-w-lg">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Simule um investimento e veja seu{" "}
              <span className="text-yellow-base">rendimento</span> em tempo real.
            </h1>
            <p className="my-4 text-base text-white md:my-6 md:text-lg">
              Ajuste o valor e o prazo na calculadora e veja quanto seu dinheiro
              pode render em renda fixa.
            </p>
          </ScrollReveal>

          <ScrollStagger className="grid grid-cols-1 gap-3 sm:grid-cols-2" stagger={0.1}>
            <div className="flex items-center gap-3 rounded-md bg-yellow-base px-4 py-3">
              <div className="shrink-0 rounded-sm bg-black p-2">
                <TrendUpIcon weight="fill" size={20} className="text-yellow-base" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-black/70">Rentabilidade base</p>
                <p className="text-sm font-bold text-black">10% em 4 meses</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md bg-black px-4 py-3">
              <div className="shrink-0 rounded-sm bg-yellow-base p-2">
                <CurrencyCircleDollarIcon weight="fill" size={20} className="text-black" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/70">Valor mínimo</p>
                <p className="text-sm font-bold text-white">R$ 4.000</p>
              </div>
            </div>
          </ScrollStagger>

          <ScrollStagger className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08}>
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="shrink-0 rounded-sm bg-yellow-base p-2">
                  <Icon weight="fill" size={22} className="text-black" />
                </div>
                <p className="text-sm text-white">{label}</p>
              </div>
            ))}
          </ScrollStagger>

          <ScrollReveal delay={0.15}>
            <Button size="lg" className="w-full sm:w-auto">
              Começar meu investimento
            </Button>
          </ScrollReveal>
        </div>

        <GsapScrubReveal rotate={-3} y={60}>
          <InvestmentCard />
        </GsapScrubReveal>
      </div>
    </section>
  )
}

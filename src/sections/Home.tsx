import { ScrollReveal, ScrollStagger } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChartLineIcon, CrosshairIcon, ShieldCheckIcon } from "@phosphor-icons/react";

const features = [
  { icon: CrosshairIcon, label: "Objetivos Claros" },
  { icon: ShieldCheckIcon, label: "Investimentos Seguros" },
  { icon: ChartLineIcon, label: "Crescimento Constante" },
] as const;

export function Home() {
    return (
        <section id="home" className="w-full scroll-mt-24 py-12 md:py-32 lg:py-50">
         <div className="container">
            <div className="max-w-full lg:max-w-[50%]">
            <ScrollReveal>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Deixe seu dinheiro trabalhar por <span className="text-yellow-base">você!</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="my-4 text-base text-white md:text-lg">
                Comprometido em ajudá-lo a alcançar seus objetivos, seja garantindo um{" "}
                <span className="text-yellow-base font-semibold">futuro financeiramente seguro</span>,
                ampliando seu patrimônio ou realizando projetos de vida.
              </p>
            </ScrollReveal>
            <ScrollStagger className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:my-12 lg:grid-cols-3" stagger={0.08}>
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="shrink-0 rounded-sm bg-yellow-base p-2">
                    <Icon weight="fill" size={22} className="text-black" />
                  </div>
                  <p className="text-sm text-white">{label}</p>
                </div>
              ))}
            </ScrollStagger>
            <ScrollReveal delay={0.2} className="my-6 flex flex-col gap-4 sm:flex-row">
                <Button icon={ArrowRightIcon} size="lg" variant="default" className="w-full sm:w-auto">
                  Começar Investir
                </Button>
                <Button icon={ArrowRightIcon} size="lg" variant="secondary" className="w-full sm:w-auto">
                  Fazer Simulação
                </Button>
            </ScrollReveal>
            </div>
        </div>
        </section>
    )
}

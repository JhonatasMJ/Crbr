import { GsapScrubReveal } from "@/components/gsap-reveal";
import { ScrollReveal, ScrollStagger } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { InvestmentCard } from "@/components/investmentCard";
import { whatsAppRedirect } from "@/utils/whatsAppRedirect";
import {
  ArrowRightIcon,
  ChartLineUpIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";

const features = [
  {
    icon: ChartLineUpIcon,
    title: "Simulação em tempo real",
    description: "Ajuste valor e prazo e veja o rendimento na hora",
  },
  {
    icon: ShieldCheckIcon,
    title: "Renda fixa segura",
    description: "Projeção clara, sem surpresas no seu planejamento",
  },
  {
    icon: ClockIcon,
    title: "Rápido e sem burocracia",
    description: "Simule em segundos e decida com tranquilidade",
  },
] as const;

const INVEST_WHATSAPP_MESSAGE =
  "Olá! Fiz uma simulação no site e gostaria de começar meu investimento na CRBR.";

const APP_STORE_URL =
  "https://apps.apple.com/br/app/crbr-investimentos/id6746351035";

export function Simulator() {
  return (
    <section
      id="simulator"
      className="section-padding w-full scroll-mt-24 bg-blackLight"
    >
      <div className="container grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="order-2 flex min-w-0 flex-col gap-6 sm:gap-8 lg:order-1">
          <ScrollReveal direction="left" className="max-w-lg">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Simule um investimento e veja seu{" "}
              <span className="text-yellow-base">rendimento</span> em tempo
              real.
            </h2>
            <p className="mt-3 text-sm text-white/80 sm:mt-4 sm:text-base md:text-lg">
              Use a calculadora{" "}
              <span className="lg:hidden">abaixo</span>
              <span className="hidden lg:inline">ao lado</span> para testar
              diferentes valores e prazos. Descubra quanto seu dinheiro pode
              render em renda fixa antes de investir.
            </p>
          </ScrollReveal>

          <ScrollStagger className="flex flex-col gap-4 sm:gap-6" stagger={0.1}>
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3 sm:gap-4">
                <div className="shrink-0 rounded-md bg-yellow-base p-2 sm:p-2.5">
                  <Icon
                    weight="fill"
                    className="size-5 text-black sm:size-6"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white sm:text-base">
                    {title}
                  </p>
                  <p className="mt-0.5 text-xs text-yellow-base sm:mt-1 sm:text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </ScrollStagger>

          <span className="h-px w-full bg-white/10" aria-hidden />

          <ScrollReveal delay={0.1}>
            <p className="mb-4 text-xs text-white/70 sm:text-sm">
              Gostou da projeção? Fale com nosso time e dê o próximo passo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                icon={ArrowRightIcon}
                className="w-full sm:w-auto sm:min-w-[220px]"
                onClick={() => whatsAppRedirect(INVEST_WHATSAPP_MESSAGE)}
              >
                Começar meu investimento
              </Button>
              <Button
                size="lg"
                variant="secondary"
                icon={ArrowRightIcon}
                className="w-full sm:w-auto sm:min-w-[180px]"
                onClick={() =>
                  window.open(APP_STORE_URL, "_blank", "noopener,noreferrer")
                }
              >
                Baixar app
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <GsapScrubReveal
          rotate={-3}
          y={60}
          className="order-1 w-full min-w-0 lg:order-2"
        >
          <InvestmentCard />
        </GsapScrubReveal>
      </div>
    </section>
  );
}

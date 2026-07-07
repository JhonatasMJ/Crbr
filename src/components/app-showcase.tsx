import print3 from "@/assets/app/print3.svg";
import print4 from "@/assets/app/print4.svg";
import { AppDownloadCta } from "@/components/app-download-cta";
import { useIntroComplete } from "@/components/intro-animation";
import { ScrollReveal } from "@/components/scroll-reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { SealCheckIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

const APP_STEPS = [
  {
    id: "download",
    number: "01",
    title: "Baixe o aplicativo",
    description:
      "Disponível na App Store e Google Play. Instale e comece em poucos minutos.",
    highlights: [] as const,
  },
  {
    id: "account",
    number: "02",
    title: "Crie sua conta",
    description:
      "Cadastro 100% digital, sem burocracia. Preencha seus dados com segurança.",
    screen: print3,
    highlights: [
      "Cadastro 100% digital",
      "Verificação em minutos",
      "Dados protegidos",
    ] as const,
  },
  {
    id: "invest",
    number: "03",
    title: "Crie seu investimento",
    description:
      "Escolha o valor, confirme a aplicação e coloque seu dinheiro para render.",
    screen: print4,
    highlights: [
      "A partir de R$ 4.000",
      "10% de rentabilidade em 4 meses",
      "Confirmação instantânea",
    ] as const,
  },
  {
    id: "track",
    number: "04",
    title: "Acompanhe seu investimento",
    description:
      "Veja patrimônio, rendimentos e extratos em tempo real, direto no app.",
    screen: print3,
    highlights: [
      "Patrimônio em tempo real",
      "Extrato detalhado",
      "Notificações automáticas",
    ] as const,
  },
] as const;

const STEP_COUNT = APP_STEPS.length;

function getSnappedPhase(progress: number) {
  if (STEP_COUNT <= 1) return 0;
  return Math.min(
    STEP_COUNT - 1,
    Math.round(progress * (STEP_COUNT - 1)),
  );
}

function refreshAllScrollTriggers() {
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function animateStepEntrance(
  card: HTMLElement | null,
  reducedMotion: boolean,
) {
  if (!card || reducedMotion) return;

  const number = card.querySelector<HTMLElement>("[data-step-number]");
  const content = card.querySelector<HTMLElement>("[data-step-content]");

  if (number) {
    gsap.killTweensOf(number);
    gsap.fromTo(
      number,
      { scale: 0.55, x: -14 },
      {
        scale: 1,
        x: 0,
        duration: 0.45,
        ease: "back.out(1.7)",
        overwrite: true,
        clearProps: "transform",
      },
    );
  }

  if (content) {
    gsap.killTweensOf(content);
    gsap.fromTo(
      content,
      { x: 16 },
      {
        x: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
        clearProps: "transform",
      },
    );
  }
}

function StepCard({
  step,
  isActive,
  hasNumber,
}: {
  step: (typeof APP_STEPS)[number];
  isActive: boolean;
  hasNumber: boolean;
}) {
  return (
    <article
      data-step-card={step.id}
      className={cn(
        "flex w-full items-center gap-3.5 rounded-md p-2 transition-colors duration-300 sm:gap-4 sm:p-2.5 lg:p-3",
        isActive && "bg-blackLight",
      )}
    >
      <div className="flex w-10 shrink-0 items-center sm:w-12 lg:w-14">
        <div
          data-step-number
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-md bg-yellow-base transition-all duration-300 ease-out sm:size-12 lg:size-14",
            hasNumber
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-90 opacity-0",
          )}
        >
          <span className="text-sm font-bold text-black sm:text-base lg:text-lg">
            {step.number}
          </span>
        </div>
      </div>

      <div data-step-content className="min-w-0">
        <h4
          className={cn(
            "text-left text-base font-bold transition-colors duration-300 sm:text-lg lg:text-xl",
            isActive ? "text-white" : "text-white/75",
          )}
        >
          {step.title}
        </h4>
        <p className="mt-1.5 text-left text-sm leading-relaxed text-white/45 transition-colors duration-300 sm:mt-2 lg:text-base">
          {step.description}
        </p>
      </div>
    </article>
  );
}

function AppScreenStage({ step }: { step: (typeof APP_STEPS)[number] }) {
  return (
    <div className="relative flex h-full min-h-[380px] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-yellow-base sm:min-h-[400px] lg:min-h-0 lg:items-stretch">
      <div
        data-screen-header
        className="relative z-10 flex w-full max-w-[320px] flex-1 flex-col justify-center gap-4 p-5 text-left sm:max-w-[340px] sm:gap-5 sm:p-6 lg:max-w-[58%] lg:gap-6 lg:p-7"
      >
        <div>
          <span className="inline-flex w-fit items-center rounded-md bg-black px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-base">
            Passo {step.number}
          </span>
          <h3 className="mt-2.5 text-xl font-bold leading-tight text-black sm:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[280px] text-sm font-semibold leading-relaxed text-black/65">
            {step.description}
          </p>

          {step.highlights.length > 0 && (
            <ul className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:gap-3 lg:mt-8">
              {step.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-black">
                    <SealCheckIcon
                      weight="fill"
                      size={13}
                      className="text-yellow-base"
                    />
                  </span>
                  <span className="text-xs font-semibold text-black/80 sm:text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {"screen" in step && step.screen ? (
        <img
          src={step.screen}
          alt={`Tela do app: ${step.title}`}
          className="pointer-events-none absolute -bottom-1 right-8 z-0 hidden w-auto max-h-[350px] object-contain object-bottom lg:block"
        />
      ) : null}
    </div>
  );
}

export function AppShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaPanelRef = useRef<HTMLDivElement>(null);
  const printStageRef = useRef<HTMLDivElement>(null);
  const introComplete = useIntroComplete();
  const [activeIndex, setActiveIndex] = useState(0);
  const showCta = activeIndex === 0;
  const prevActiveRef = useRef(-1);
  const phaseRef = useRef(0);
  const prevStepIndexRef = useRef(0);
  const wasShowingCtaRef = useRef(true);
  const panelInitializedRef = useRef(false);
  const panelShowCtaRef = useRef<boolean | null>(null);
  const sectionRevealedRef = useRef(false);

  useGSAP(
    () => {
      if (!introComplete || !wrapperRef.current || !pinRef.current) return;

      const syncPanelHeight = () => {
        if (!stepsRef.current || !panelRef.current) return;
        if (!window.matchMedia("(min-width: 1024px)").matches) {
          panelRef.current.style.height = "";
          return;
        }
        panelRef.current.style.height = `${stepsRef.current.offsetHeight}px`;
      };

      syncPanelHeight();
      window.addEventListener("resize", syncPanelHeight);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const scrollPerStep =
        window.innerHeight *
        (window.matchMedia("(min-width: 1024px)").matches ? 0.45 : 0.36);
      const endDistance = scrollPerStep * (STEP_COUNT - 1);

      const applyPhase = (phase: number) => {
        if (phase === phaseRef.current) return;
        phaseRef.current = phase;
        setActiveIndex(phase);
      };

      if (reducedMotion) {
        applyPhase(0);
        return () => window.removeEventListener("resize", syncPanelHeight);
      }

      let currentPhase = getSnappedPhase(0);

      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${endDistance}`,
        pin: pinRef.current,
        pinSpacing: true,
        pinType: "transform",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const phase = getSnappedPhase(self.progress);
          if (phase === currentPhase) return;
          currentPhase = phase;
          applyPhase(phase);
        },
        onLeave: () => {
          gsap.set(pinRef.current, {
            clearProps: "transform,filter",
          });
          refreshAllScrollTriggers();
        },
        onLeaveBack: () => {
          gsap.set(pinRef.current, {
            clearProps: "transform,filter",
          });
          currentPhase = 0;
          phaseRef.current = 0;
          setActiveIndex(0);
          prevActiveRef.current = -1;
          sectionRevealedRef.current = false;
          refreshAllScrollTriggers();
        },
        onEnterBack: () => {
          const phase = getSnappedPhase(trigger.progress);
          currentPhase = phase;
          applyPhase(phase);
          syncPanelHeight();
        },
      });

      currentPhase = getSnappedPhase(trigger.progress);
      applyPhase(currentPhase);

      ScrollTrigger.refresh();
      syncPanelHeight();

      return () => {
        window.removeEventListener("resize", syncPanelHeight);
        trigger.kill();
        gsap.set(pinRef.current, { clearProps: "transform,filter" });
        refreshAllScrollTriggers();
      };
    },
    { scope: wrapperRef, revertOnUpdate: true, dependencies: [introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !panelRef.current || !stepsRef.current) return;

      const syncPanelHeight = () => {
        if (!window.matchMedia("(min-width: 1024px)").matches) {
          panelRef.current!.style.height = "";
          return;
        }
        panelRef.current!.style.height = `${stepsRef.current!.offsetHeight}px`;
      };

      syncPanelHeight();
      window.addEventListener("resize", syncPanelHeight);
      return () => window.removeEventListener("resize", syncPanelHeight);
    },
    { dependencies: [activeIndex, introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !wrapperRef.current || !stepsRef.current) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-step-card]",
        stepsRef.current,
      );
      const panel = panelRef.current;

      const revealSection = () => {
        if (sectionRevealedRef.current) return;
        sectionRevealedRef.current = true;

        if (reducedMotion) {
          gsap.set(cards, { opacity: 1, y: 0 });
          if (panel) gsap.set(panel, { opacity: 1, y: 0 });
          animateStepEntrance(cards[0] ?? null, true);
          prevActiveRef.current = 0;
          return;
        }

        gsap.fromTo(
          cards,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "opacity,transform",
            onComplete: () => {
              animateStepEntrance(cards[0] ?? null, false);
              prevActiveRef.current = 0;
            },
          },
        );

        if (panel) {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.12,
              ease: "power3.out",
              clearProps: "opacity,transform",
            },
          );
        }
      };

      if (reducedMotion) {
        revealSection();
        return;
      }

      const entrance = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 85%",
        onEnter: revealSection,
        onEnterBack: revealSection,
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        if (ScrollTrigger.isInViewport(wrapperRef.current!, 0.15, true)) {
          revealSection();
        }
      });

      return () => entrance.kill();
    },
    { scope: wrapperRef, revertOnUpdate: true, dependencies: [introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !ctaPanelRef.current || !printStageRef.current) {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set(ctaPanelRef.current, {
          opacity: showCta ? 1 : 0,
          pointerEvents: showCta ? "auto" : "none",
        });
        if (printStageRef.current) {
          gsap.set(printStageRef.current, {
            opacity: showCta ? 0 : 1,
            visibility: showCta ? "hidden" : "visible",
          });
        }
        panelInitializedRef.current = true;
        return;
      }

      if (!panelInitializedRef.current) {
        gsap.set(ctaPanelRef.current, {
          opacity: showCta ? 1 : 0,
          pointerEvents: showCta ? "auto" : "none",
        });
        if (printStageRef.current) {
          gsap.set(printStageRef.current, {
            opacity: showCta ? 0 : 1,
            visibility: showCta ? "hidden" : "visible",
          });
        }
        panelInitializedRef.current = true;
        panelShowCtaRef.current = showCta;
        return;
      }

      if (panelShowCtaRef.current === showCta) return;

      gsap.to(ctaPanelRef.current, {
        opacity: showCta ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
        pointerEvents: showCta ? "auto" : "none",
        overwrite: true,
      });

      if (printStageRef.current) {
        gsap.to(printStageRef.current, {
          opacity: showCta ? 0 : 1,
          visibility: showCta ? "hidden" : "visible",
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });
      }

      panelShowCtaRef.current = showCta;
    },
    { scope: panelRef, dependencies: [showCta, introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !printStageRef.current) return;

      if (showCta) {
        wasShowingCtaRef.current = true;
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const header = printStageRef.current.querySelector<HTMLElement>(
        "[data-screen-header]",
      );
      if (!header) return;

      const stepChanged = prevStepIndexRef.current !== activeIndex;
      const enteringPrint = wasShowingCtaRef.current;

      if (!stepChanged && !enteringPrint) return;

      wasShowingCtaRef.current = false;

      if (reducedMotion) {
        gsap.set(header, { opacity: 1, y: 0 });
        prevStepIndexRef.current = activeIndex;
        return;
      }

      if (enteringPrint) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: true },
        );
      } else if (stepChanged) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          },
        );
      }

      prevStepIndexRef.current = activeIndex;
    },
    { scope: panelRef, dependencies: [activeIndex, showCta, introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !pinRef.current) return;
      if (activeIndex === prevActiveRef.current) return;
      if (prevActiveRef.current < 0) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const step = APP_STEPS[activeIndex];
      const card = pinRef.current.querySelector<HTMLElement>(
        `[data-step-card="${step.id}"]`,
      );

      animateStepEntrance(card, reducedMotion);
      prevActiveRef.current = activeIndex;
    },
    { scope: pinRef, dependencies: [activeIndex, introComplete] },
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        ref={pinRef}
        className="container relative z-0 "
      >
        <div
          ref={bodyRef}
          className="relative flex min-h-[50vh] items-center sm:min-h-[55vh] lg:min-h-[calc(100vh-6rem)]"
        >
          <div className="w-full">
            <ScrollReveal direction="left" className="mb-6 max-w-lg sm:mb-8 lg:mb-6">
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl xl:text-[2.5rem] xl:leading-tight">
                Nosso <span className="text-yellow-base">aplicativo</span>.
              </h2>
              <p className="mt-3 text-sm font-regular leading-relaxed text-white">
                Acompanhe seu investimento em tempo real, direto no app.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
              <div
                ref={stepsRef}
                className="order-2 flex flex-col justify-center gap-2 sm:gap-2.5 lg:order-1 lg:gap-3"
              >
                {APP_STEPS.map((step, index) => (
                  <StepCard
                    key={step.id}
                    step={step}
                    hasNumber={index <= activeIndex}
                    isActive={activeIndex === index}
                  />
                ))}
              </div>

              <div
                ref={panelRef}
                className="relative order-1 min-h-[380px] w-full sm:min-h-[400px] lg:order-2 lg:min-h-0"
              >
                <div
                  ref={ctaPanelRef}
                  className="absolute inset-0 z-10 overflow-visible rounded-md lg:overflow-hidden"
                  aria-hidden={!showCta}
                >
                  <AppDownloadCta variant="panel" className="lg:h-full" />
                </div>

                <div
                  ref={printStageRef}
                  data-print-stage
                  className="absolute inset-0 z-0 overflow-hidden rounded-md bg-yellow-base"
                  aria-hidden={showCta}
                >
                  {!showCta && (
                    <AppScreenStage step={APP_STEPS[activeIndex]} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

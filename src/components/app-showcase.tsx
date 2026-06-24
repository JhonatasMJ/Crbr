import print1 from "@/assets/app/print1.svg";
import print2 from "@/assets/app/print2.svg";
import { AppDownloadCta } from "@/components/app-download-cta";
import { useIntroComplete } from "@/components/intro-animation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const APP_STEPS = [
  {
    id: "download",
    number: "01",
    title: "Baixe o aplicativo",
    description:
      "Disponível na App Store e Google Play. Instale e comece em poucos minutos.",
    screen: print1,
  },
  {
    id: "account",
    number: "02",
    title: "Crie sua conta",
    description:
      "Cadastro 100% digital, sem burocracia. Preencha seus dados com segurança.",
    screen: print1,
  },
  {
    id: "invest",
    number: "03",
    title: "Crie seu investimento",
    description:
      "Escolha o valor, confirme a aplicação e coloque seu dinheiro para render.",
    screen: print2,
  },
  {
    id: "track",
    number: "04",
    title: "Acompanhe seu investimento",
    description:
      "Veja patrimônio, rendimentos e extratos em tempo real, direto no app.",
    screen: print2,
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
    gsap.from(number, {
      scale: 0.5,
      opacity: 0,
      x: -10,
      duration: 0.45,
      ease: "back.out(1.7)",
      overwrite: true,
    });
  }

  if (content) {
    gsap.killTweensOf(content);
    gsap.from(content, {
      x: 12,
      opacity: 0.65,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
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
        "flex w-full items-center gap-4 rounded-md p-5 transition-colors duration-300 sm:gap-5 sm:p-6",
        isActive && "bg-blackLight",
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center overflow-hidden transition-[width] duration-300 ease-out",
          hasNumber ? "w-12 sm:w-14" : "w-0",
        )}
      >
        <div
          data-step-number
          className="flex size-12 shrink-0 items-center justify-center rounded-md bg-yellow-base sm:size-14"
        >
          <span className="text-base font-bold text-black sm:text-lg">
            {step.number}
          </span>
        </div>
      </div>

      <div data-step-content className="min-w-0">
        <h4
          className={cn(
            "text-left text-lg font-bold transition-colors duration-300 sm:text-xl",
            isActive ? "text-white" : "text-white/75",
          )}
        >
          {step.title}
        </h4>
        <p className="mt-2 text-left text-sm leading-relaxed text-white/45 transition-colors duration-300 sm:text-base">
          {step.description}
        </p>
      </div>
    </article>
  );
}

export function AppShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introComplete = useIntroComplete();
  const [activeIndex, setActiveIndex] = useState(0);
  const showCta = activeIndex === 0;
  const prevActiveRef = useRef(-1);
  const introAnimatedRef = useRef(false);

  useGSAP(
    () => {
      if (!introComplete || !wrapperRef.current || !pinRef.current) return;

      const syncPanelHeight = () => {
        if (!stepsRef.current || !panelRef.current) return;
        if (!window.matchMedia("(min-width: 1024px)").matches) {
          panelRef.current.style.minHeight = "";
          return;
        }
        panelRef.current.style.minHeight = `${stepsRef.current.offsetHeight}px`;
      };

      syncPanelHeight();
      window.addEventListener("resize", syncPanelHeight);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const scrollPerStep = window.innerHeight * 0.45;
      const endDistance = scrollPerStep * (STEP_COUNT - 1);

      const applyPhase = (phase: number) => {
        setActiveIndex(phase);
      };

      if (reducedMotion) {
        applyPhase(0);
        return () => window.removeEventListener("resize", syncPanelHeight);
      }

      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${endDistance}`,
        pin: pinRef.current,
        pinSpacing: true,
        pinType: "transform",
        invalidateOnRefresh: true,
        snap:
          STEP_COUNT > 1
            ? {
                snapTo: (progress) =>
                  Math.round(progress * (STEP_COUNT - 1)) / (STEP_COUNT - 1),
                duration: { min: 0.12, max: 0.28 },
                delay: 0,
                ease: "power2.out",
              }
            : false,
        onUpdate: (self) => {
          applyPhase(getSnappedPhase(self.progress));
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
          applyPhase(0);
          prevActiveRef.current = -1;
          introAnimatedRef.current = false;
          refreshAllScrollTriggers();
        },
        onEnterBack: () => {
          applyPhase(getSnappedPhase(trigger.progress));
          syncPanelHeight();
        },
      });

      applyPhase(getSnappedPhase(trigger.progress));

      ScrollTrigger.refresh();
      syncPanelHeight();

      return () => {
        window.removeEventListener("resize", syncPanelHeight);
        trigger.kill();
        gsap.set(pinRef.current, { clearProps: "transform,filter" });
        refreshAllScrollTriggers();
      };
    },
    { scope: wrapperRef, dependencies: [introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !stepsRef.current || !panelRef.current) return;

      const syncPanelHeight = () => {
        if (!stepsRef.current || !panelRef.current) return;
        if (!window.matchMedia("(min-width: 1024px)").matches) {
          panelRef.current.style.minHeight = "";
          return;
        }
        panelRef.current.style.minHeight = `${stepsRef.current.offsetHeight}px`;
      };

      syncPanelHeight();
      const id = requestAnimationFrame(syncPanelHeight);
      return () => cancelAnimationFrame(id);
    },
    { scope: pinRef, dependencies: [activeIndex, introComplete] },
  );

  useGSAP(
    () => {
      if (!introComplete || !pinRef.current) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!introAnimatedRef.current) {
        const firstCard = pinRef.current.querySelector<HTMLElement>(
          '[data-step-card="download"]',
        );
        animateStepEntrance(firstCard, reducedMotion);
        introAnimatedRef.current = true;
        prevActiveRef.current = 0;
        return;
      }

      if (activeIndex === prevActiveRef.current) return;

      const step = APP_STEPS[activeIndex];
      const card = pinRef.current.querySelector<HTMLElement>(
        `[data-step-card="${step.id}"]`,
      );

      if (activeIndex > prevActiveRef.current) {
        animateStepEntrance(card, reducedMotion);
      }

      prevActiveRef.current = activeIndex;
    },
    { scope: pinRef, dependencies: [activeIndex, introComplete] },
  );

  const activeScreen = APP_STEPS[activeIndex].screen;

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        ref={pinRef}
        className="container relative z-0 px-4 py-10 sm:px-6 sm:py-12"
      >
        <div
          ref={bodyRef}
          className="relative flex min-h-[calc(100vh-6rem)] items-center"
        >
          <div className="w-full">
            <header className="mb-8 max-w-lg lg:mb-10">
              <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Nosso <span className="text-yellow-base">aplicativo</span>.
              </h2>
            </header>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16">
              <div
                ref={stepsRef}
                className="order-2 flex flex-col gap-2 sm:gap-3 lg:order-1"
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
                className="relative order-1 min-h-[300px] w-full lg:order-2 lg:min-h-0"
              >
                <div
                  className={cn(
                    "absolute inset-0",
                    showCta ? "z-10" : "pointer-events-none invisible z-0 opacity-0",
                  )}
                  aria-hidden={!showCta}
                >
                  <AppDownloadCta variant="panel" className="h-full" />
                </div>

                <div
                  data-print-stage
                  className={cn(
                    "absolute inset-0 flex items-center justify-center rounded-md bg-yellow-base p-4 sm:p-5",
                    showCta && "pointer-events-none invisible z-0 opacity-0",
                  )}
                  aria-hidden={showCta}
                >
                  <img
                    key={activeIndex}
                    src={activeScreen}
                    alt=""
                    className="h-full w-full max-w-[320px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

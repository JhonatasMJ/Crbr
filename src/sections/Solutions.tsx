import { Fragment } from "react";
import ImageHuman from "@/assets/humanSolutions.png";
import {
  GsapParallax,
  GsapRevealGroup,
  GsapScrubReveal,
} from "@/components/gsap-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { solutionsData, solutionsSpanData } from "@/data/SolutionsCard";
import { CaretRightIcon, SealCheckIcon } from "@phosphor-icons/react";
import { whatsAppRedirect } from "@/utils/whatsAppRedirect";

export function Solutions() {
  return (
    <section
      id="solutions"
      className="w-full scroll-mt-24 bg-yellow-base pt-16 md:pt-24 pb-0"
    >
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-10 lg:gap-16">
        <div className="flex min-w-0 flex-col gap-5 self-start sm:gap-6 md:gap-8">
          <ScrollReveal direction="left">
            <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Proteção e tranquilidade para você e seu patrimônio.
            </h2>
            <p className="text-sm text-black sm:text-base md:text-lg mt-3">
              Soluções completas em empréstimos, seguros e consórcios para
              realizar seus planos com segurança
            </p>
          </ScrollReveal>

          <GsapRevealGroup
            className="flex flex-col gap-3 sm:gap-8"
            variant="slide-left"
            stagger={0.1}
          >
            {solutionsData.map((solution) => (
              <button
                key={solution.title}
                className="gsap-reveal-item grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-md bg-black p-2.5 sm:gap-4 sm:p-4 group"
                onClick={() => whatsAppRedirect(solution.whatsAppMessage)}
              >
                <div className="shrink-0 rounded-sm bg-yellow-base p-2 sm:p-3 md:p-4">
                  <solution.icon
                    weight="fill"
                    className="size-6 text-black sm:size-7 md:size-8"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5 text-start sm:gap-1">
                  <h3 className="text-base font-bold text-yellow-base sm:text-lg md:text-xl">
                    {solution.title}
                  </h3>
                  <p className="text-xs leading-snug text-white sm:text-sm md:text-base">
                    {solution.description}
                  </p>
                </div>
                <CaretRightIcon
                  weight="bold"
                  className="size-5 shrink-0 text-yellow-base transition-transform duration-300 hover:scale-110 sm:size-6 group-hover:translate-x-1"
                />
              </button>
            ))}
          </GsapRevealGroup>

          <ScrollReveal
            delay={0.15}
            className="mt-8 hidden items-stretch sm:flex"
          >
            {solutionsSpanData.map((solution, index) => (
              <Fragment key={solution.description}>
                <div className="flex flex-1 items-center gap-3">
                  <div className="shrink-0 rounded-sm bg-yellow-base">
                    <solution.icon
                      weight="fill"
                      className="size-9 text-black md:size-10"
                    />
                  </div>
                  <p className="text-sm font-semibold text-black md:text-base lg:text-lg">
                    {solution.description}
                  </p>
                </div>
                {index < solutionsSpanData.length - 1 && (
                  <div
                    aria-hidden
                    className="mx-4 w-[3px] shrink-0 self-stretch rounded-full bg-yellow-dark"
                  />
                )}
              </Fragment>
            ))}
          </ScrollReveal>
        </div>

        <GsapParallax
          speed={-40}
          className="relative mx-auto flex w-full max-w-xs items-end justify-center sm:max-w-sm md:max-w-none md:justify-end"
        >
          <img
            src={ImageHuman}
            alt="Human Solutions"
            className="block w-full object-contain object-bottom"
          />
          <GsapScrubReveal className="absolute bottom-3 left-3 right-3 z-10 sm:bottom-6 sm:left-6 sm:right-auto md:bottom-24 md:left-8 lg:bottom-28 lg:left-10 max-w-xs sm:max-w-sm md:max-w-1/2">
            <div className="flex items-center gap-2.5 rounded-md bg-white p-2 sm:gap-3 sm:p-2.5 animate-float duration-300">
              <div className="shrink-0 rounded-sm bg-black p-2 sm:p-2.5 md:p-3 ">
                <SealCheckIcon
                  weight="fill"
                  className="size-6 text-yellow-base sm:size-7 md:size-8"
                />
              </div>
              <span className="text-xs font-semibold leading-tight text-black sm:text-sm md:text-base">
                Mais que soluções,{" "}
                <span className="font-bold text-yellow-base">
                  tranquilidade
                </span>{" "}
                para a vida.
              </span>
            </div>
          </GsapScrubReveal>
        </GsapParallax>
      </div>
    </section>
  );
}

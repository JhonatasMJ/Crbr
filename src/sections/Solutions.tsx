import SeparatorYellow from "@/assets/separatorYellow.svg";
import { SectionSeparator } from "@/components/section-separator";
import ImageHuman from "@/assets/humanSolutions.png";
import { solutionsData, solutionsSpanData } from "@/data/SolutionsCard";
import { CaretRightIcon, SealCheckIcon } from "@phosphor-icons/react";

export function Solutions() {
  return (
    <div className="relative">
      <SectionSeparator separator={SeparatorYellow} label="Nossas Soluções" />

      <section id="solutions" className="w-full scroll-mt-24 bg-yellow-base py-12 pb-0 ">
        <div className="container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col gap-6 md:gap-8">
            <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Proteção e tranquilidade para você e seu patrimônio.
            </h2>
            <p className="text-base text-black md:text-lg">
              Soluções completas em empréstimos, seguros e consórcios para
              realizar seus planos com segurança
            </p>

            <div className="flex flex-col  sm:gap-4 ">
              {solutionsData.map((solution) => (
                <button
                  key={solution.title}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-center rounded-md bg-black p-3 cursor-pointer sm:gap-4 sm:p-4 mb-2"
                >
                  <div className="shrink-0 rounded-sm bg-yellow-base p-3 sm:p-4">
                    <solution.icon weight="fill" size={30} className="text-black" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1 text-start sm:gap-2">
                    <h3 className="text-lg font-bold text-yellow-base sm:text-xl">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-white sm:text-base">{solution.description}</p>
                  </div>
                  <CaretRightIcon
                    size={24}
                    weight="bold"
                    className="shrink-0 text-yellow-base transition-all duration-300 hover:scale-110"
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between">
            {solutionsSpanData.map((solution) => (
              <div key={solution.description} className="flex items-center justify-between after:content-[''] after:block after:w-[3px] after:h-full after:bg-yellow-dark after:rounded-full after:mr-4 mt-8 ">
                <div className="shrink-0 rounded-sm bg-yellow-base ">
                  <solution.icon weight="fill" size={38} className="text-black" />
                </div>
                <p className="text-base text-black w-1/2 font-semibold">{solution.description}</p>
              </div>
            ))}
            </div>
          </div>

          <div className="relative w-full">
            <img
              src={ImageHuman}
              alt="Human Solutions"
              className="mx-auto w-full max-w-md object-contain md:max-w-none"
            />
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3 rounded-md bg-white p-2 sm:bottom-8 sm:left-8 sm:right-auto sm:gap-4 sm:p-2.5 md:bottom-30 md:left-10">
              <div className="shrink-0 rounded-sm bg-black p-2.5 sm:p-3">
                <SealCheckIcon weight="fill" size={30} className="text-yellow-base" />
              </div>
              <span className="text-sm font-semibold text-black sm:text-base">
                Mais que soluções,
                <br />
                <span className="font-bold text-yellow-base">tranquilidade</span> para a vida.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

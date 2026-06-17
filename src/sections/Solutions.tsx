import SeparatorYellow from "@/assets/separatorYellow.svg";
import { SectionSeparator } from "@/components/section-separator";
import ImageHuman from "@/assets/humanSolutions.png";
import { solutionsData } from "@/data/SolutionsCard";
import { CaretRightIcon, SealCheckIcon } from "@phosphor-icons/react";

export function Solutions() {
  return (
    <div className="relative">
      <SectionSeparator separator={SeparatorYellow} label="Nossas Soluções" />

      <section id="solutions" className="w-full scroll-mt-24 bg-yellow-base py-12 pb-0">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-bold text-black">
              Proteção e tranquilidade para você e seu patrimônio.
            </h2>
            <p className=" text-black text-lg">
              Soluções completas em empréstimos, seguros e consórcios para
              realizer seus planos com segurança
            </p>
 
            <div className="flex flex-col gap-4">
              {solutionsData.map((solution) => (
                <button
                  key={solution.title}
                  className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md bg-black p-4 cursor-pointer"
                >
                  <div className="shrink-0 rounded-sm bg-yellow-base p-4">
                    <solution.icon weight="fill" size={30} className="text-black" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2 text-start">
                    <h3 className="text-xl font-bold text-yellow-base">{solution.title}</h3>
                    <p className="text-base text-white">{solution.description}</p>
                  </div>
                  <CaretRightIcon
                    size={24}
                    weight="bold"
                    className="shrink-0 text-yellow-base hover:scale-110 transition-all duration-300"
                  />
                </button>
              ))}
            </div>
          
          </div>
            <div className="flex gap-4 relative">
                    <img src={ImageHuman} alt="Human Solutions" />
               <div className="absolute bottom-30 left-10 z-50 bg-white p-2.5 rounded-md flex items-center gap-4">
                <div className="bg-black rounded-sm p-3 max-w-fit">
                  <SealCheckIcon weight="fill" size={30} className="text-yellow-base" />
                </div>
                <span className="text-base font-semibold text-black ">
                Mais que soluções, 
                <br />
                <span className="text-yellow-base font-bold">tranquilidade</span> para a vida.
                </span>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}

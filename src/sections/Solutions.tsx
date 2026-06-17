import SeparatorYellow from "@/assets/separatorYellow.svg";
import { SectionSeparator } from "@/components/section-separator";
import ImageHuman from "@/assets/humanSolutions.png";
import { solutionsData } from "@/data/SolutionsCard";

export function Solutions() {
  return (
    <div className="relative">
      <SectionSeparator separator={SeparatorYellow} label="Nossas Soluções" />

      <section className="w-full bg-yellow-base py-24 pb-0" id="solutions">
        <div className="container grid grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-4xl font-bold text-black">
              Proteção e tranquilidade para você e seu patrimônio.
            </h2>
            <p className=" text-black text-lg">
              Soluções completas em empréstimos, seguros e consórcios para
              realizer seus planos com segurança
            </p>
 
            {solutionsData.map((solution) => (
                  <button key={solution.title} className="flex items-center gap-4 bg-black p-4 rounded-md cursor-pointer ">
                    <div className="bg-yellow-base rounded-sm p-4 max-w-fit">
                      <solution.icon weight="fill" size={30} className="text-black" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-yellow-base text-start">{solution.title}</h3>
                      <p className="text-white text-base">{solution.description}</p>
                    </div>
                  </button>
                ))}
          
          </div>
            <div className="flex gap-4">
                <div className="">
                    <img src={ImageHuman} alt="Human Solutions" />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}

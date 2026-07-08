import { RevealGroup, RevealItem, ScrollReveal } from "@/components/scroll-reveal";
import { cardData } from "@/data/InvestmentCard";

export function Investments() {
    const middleIndex = Math.floor(cardData.length / 2);
  return (
      <section id="investments" className="section-padding w-full scroll-mt-24 bg-black">
        <div className="container">
          <ScrollReveal className="max-w-full lg:max-w-[40%]">
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Invista com segurança em{" "}
              <span className="text-yellow-base">Renda Fixa</span>.{" "}
            </h1>
            <p className="my-4 text-sm text-white/90 md:my-6 md:text-base">
              Rentabilidade previsível, estabilidade e uma plataforma simples
              para acompanhar seus investimentos de forma transparente.
            </p>
          </ScrollReveal>
          <RevealGroup
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            stagger={0.14}
          >
            {cardData.map((card, index) => {
            const isMiddle = index === middleIndex;

              return (
                <RevealItem
                  key={card.title}
                  variant="scale-up"
                  index={index}
                  className={`group/card flex flex-col gap-4 rounded-md px-5 py-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(255,191,0,0.12)] sm:gap-6 sm:px-6 sm:py-8 ${
                    isMiddle ? "bg-yellow-base hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)]" : "bg-blackLight hover:bg-[#1a1a1a]"
                  }`}
                >
                  <div
                    className={`max-w-fit rounded-sm p-4 transition-transform duration-300 ease-out group-hover/card:scale-110 group-hover/card:-rotate-3 ${
                      isMiddle ? "bg-black" : "bg-yellow-base"
                    }`}>
                    <card.icon
                      weight="fill"
                      size={28}
                      className={isMiddle ? "text-yellow-base" : "text-black"}
                    />
                  </div>

                  <h3
                    className={`text-xl font-bold sm:text-2xl ${isMiddle ? "text-black" : "text-white"}`}>
                    {card.title}
                  </h3>
                  <p
                    className={`text-base ${isMiddle ? "text-black" : "text-white"}`}>
                    {card.description}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
  );
}

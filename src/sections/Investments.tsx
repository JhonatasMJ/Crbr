import { cardData } from "@/data/InvestmentCard";

export function Investments() {
    const middleIndex = Math.floor(cardData.length / 2);
  return (
      <section id="investments" className="w-full scroll-mt-24 bg-black py-16 pb-24 md:py-24 md:pb-50">
        <div className="container">
          <div className="max-w-full lg:max-w-[40%]">
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Invista com segurança em{" "}
              <span className="text-yellow-base">Renda Fixa</span>.{" "}
            </h1>
            <p className="my-4 text-sm text-white/90 md:my-6 md:text-base">
              Rentabilidade previsível, estabilidade e uma plataforma simples
              para acompanhar seus investimentos de forma transparente.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {cardData.map((card, index) => {
            const isMiddle = index === middleIndex;

              return (
                <div
                  key={card.title}
                  className={`flex flex-col gap-4 rounded-md px-5 py-6 sm:gap-6 sm:px-6 sm:py-8 ${
                    isMiddle ? "bg-yellow-base" : "bg-blackLight"
                  }`}
                >
                  <div
                    className={`rounded-sm p-4 max-w-fit ${
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
                </div>
              );
            })}
          </div>
        </div>
      </section>
  );
}

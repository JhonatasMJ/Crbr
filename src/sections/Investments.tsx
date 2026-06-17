import SeparatorBlack from "@/assets/separatorBlack.svg";
import { cardData } from "@/data/InvestmentCard";

export function Investments() {
    const middleIndex = Math.floor(cardData.length / 2);
  return (
    <div className="relative">
      <img
        src={SeparatorBlack}
        alt="Separator Black"
        className="w-3/4 absolute -top-12 left-0"
      />
      <section id="investments" className="w-full scroll-mt-24 bg-black py-24 pb-50">
        <div className="container">
          <div className="max-w-[40%]">
            <h1 className="text-4xl font-bold text-white">
              Invista com segurança em{" "}
              <span className="text-yellow-base">Renda Fixa</span>.{" "}
            </h1>
            <p className="my-6">
              Rentabilidade previsível, estabilidade e uma plataforma simples
              para acompanhar seus investimentos de forma transparente.
            </p>
          </div>
          <div className="flex justify-between gap-8 mt-8 ">
            {cardData.map((card, index) => {
            const isMiddle = index === middleIndex;

              return (
                <div
                  key={card.title}
                  className={`flex flex-col gap-6 px-6 py-8 rounded-md ${
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
                    className={`text-2xl font-bold ${isMiddle ? "text-black" : "text-white"}`}>
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
    </div>
  );
}

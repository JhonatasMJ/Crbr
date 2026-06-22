import { InvestmentCard } from "@/components/investmentCard";

export function Simulator() {
    return (
        <section id="simulator" className="w-full scroll-mt-24 bg-blackLight py-24">
            <div className="container grid grid-cols-2 gap-32">
                <div>
                    <h1 className="text-3xl font-bold text-white sm:text-4xl ">Simule um investimento e veja seu <span className="text-yellow-base">rendimento</span> em tempo real.</h1>
                    <p className="text-base text-white md:text-lg max-w-2/3 my-4">
                        Simule um investimento e veja seu rendimento em tempo real.
                    </p>
                </div>
                <div>
                    <InvestmentCard />
                </div>
            </div>
        </section>
    )
}
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ChartLineIcon, CrosshairIcon, ShieldCheckIcon } from "@phosphor-icons/react";

export function Home() {
    return (
        <section className="bg-url bg-cover bg-center w-full py-32 h-full ">
         <div className="container">
            <div className="max-w-1/2">
            <h1 className="text-6xl font-bold text-white ">Deixe seu dinheiro trabalhar por <span className="text-yellow-base">você!</span> </h1>
            <p className="my-4">Comprometido em ajudá-lo a alcançar seus objetivos, seja garantindo um  <span className="text-yellow-base font-semibold">futuro financeiramente seguro</span>, ampliando seu patrimônio ou realizando projetos de vida.</p>
            <div className="flex gap-4 my-12">
                 <div className="flex gap-4 items-center">
                    <div className="bg-yellow-base rounded-sm p-2">
                    <CrosshairIcon weight="fill" size={22} className="text-black" />
                    </div>
                    <p className="text-white text-sm max-w-1/2">Objetivos Claros</p>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="bg-yellow-base rounded-sm p-2">
                    <ShieldCheckIcon weight="fill" size={22} className="text-black" />
                    </div>
                    <p className="text-white text-sm max-w-1/2">Investimentos Seguros</p>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="bg-yellow-base rounded-sm p-2">
                    <ChartLineIcon weight="fill" size={22} className="text-black" />
                    </div>
                    <p className="text-white text-sm max-w-1/2">Crescimento Constante</p>
                 </div>
            </div>
            <div className="flex gap-4 my-6">
                <Button icon={ArrowRightIcon} size="lg" variant="default">Começar Investir</Button>
                <Button icon={ArrowRightIcon} size="lg" variant="secondary">Fazer Simulação</Button>
            </div>
            </div>
        </div>
        </section>
    )
}
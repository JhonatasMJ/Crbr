import { AppBentoGrid } from "@/components/appBentoGrid";
import { ScrollReveal } from "@/components/scroll-reveal";

export function AppGrid() {
  return (
    <section id="app" className="section-padding w-full scroll-mt-24 bg-black">
      <div className="container">
        <ScrollReveal>
          <h1 className="text-3xl font-bold text-white sm:text-4xl ">Conheça nosso  <span className="text-yellow-base">aplicativo</span>.</h1>
          <p className="text-base text-white md:text-lg max-w-2/3 my-4 mb-12">Gerencie seus investimentos de forma simples, segura e intuitiva. Acompanhe seu patrimônio, consulte históricos e acesse seus comprovantes quando precisar.</p>
        </ScrollReveal>
        <AppBentoGrid />
      </div>
    </section>
  );
}

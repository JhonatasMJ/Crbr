import { AppBentoGrid } from "@/components/appBentoGrid";

export function AppGrid() {
  return (
    <section id="app" className="w-full scroll-mt-24 bg-black py-24">
      <div className="container">
        <h1 className="text-3xl font-bold text-white sm:text-4xl ">Conheça nosso  <span className="text-yellow-base">aplicativo</span>.</h1>
        <p className="text-base text-white md:text-lg max-w-2/3 my-4 mb-12">Gerencie seus investimentos de forma simples, segura e intuitiva. Acompanhe seu patrimônio, consulte históricos e acesse seus comprovantes quando precisar.</p>
        <AppBentoGrid />
      </div>
    </section>
  );
}

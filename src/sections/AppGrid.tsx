import { AppShowcase } from "@/components/app-showcase";

export function AppGrid() {
  return (
    <section
      id="app"
      className="relative isolate z-0 w-full scroll-mt-24 overflow-x-clip bg-black py-12 md:py-0"
    >
      <AppShowcase />
    </section>
  );
}

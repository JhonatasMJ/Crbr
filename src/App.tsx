

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { IntroGate } from "./components/intro-animation"
import { SectionSeparator } from "./components/section-separator"
import { Home } from "./sections/Home"
import { Investments } from "./sections/Investments"
import { Solutions } from "./sections/Solutions"
import { AppGrid } from "./sections/AppGrid"
import { Simulator } from "./sections/Simulator"
import { Faq } from "./sections/Faq"

export function App() {
  return (
    <IntroGate>
      <main className="bg-black">
        <div className="relative min-h-[70vh] bg-url bg-cover bg-position-[center_top] bg-no-repeat sm:min-h-[80vh] md:bg-top">
          <ResizableNavbarDemo />
          <Home />
        </div>
        <SectionSeparator to="black" from="transparent" />
        <Investments />
        <SectionSeparator to="yellow" />
        <Solutions />
        <SectionSeparator to="black" />
        <AppGrid />
        <SectionSeparator to="blackLight" />
        <Simulator />
        <SectionSeparator to="yellow" />
        <Faq />
      </main>
    </IntroGate>
  )
}

export default App

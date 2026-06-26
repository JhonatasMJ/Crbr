

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { IntroGate } from "./components/intro-animation"
import { SectionSeparator } from "./components/section-separator"
import { Home } from "./sections/Home"
import { Investments } from "./sections/Investments"
import { Solutions } from "./sections/Solutions"
import { AppGrid } from "./sections/AppGrid"
import { Simulator } from "./sections/Simulator"
import { Faq } from "./sections/Faq"
import { Contact } from "./sections/Contact"
import { Footer } from "./sections/Footer"
import { ScrollToTop } from "./components/scroll-to-top"

export function App() {
  return (
    <IntroGate>
      <ResizableNavbarDemo />
      <main className="bg-black">
        <div className="relative min-h-[70vh] bg-url bg-cover bg-position-[center_top] bg-no-repeat sm:min-h-[80vh] md:bg-top">
          <Home />
        </div>
        <SectionSeparator to="black" from="transparent" className="hidden md:flex" />
        <Investments />
        <SectionSeparator to="yellow" className="hidden md:flex" />
        <Solutions />
        <SectionSeparator to="black" className="hidden md:flex" />
        <AppGrid />
        <SectionSeparator to="blackLight" className="hidden md:flex" />
        <Simulator />
        <SectionSeparator to="yellow" className="hidden md:flex" />
        <Faq />
        <SectionSeparator to="black" className="hidden md:flex" />
        <Contact />
        <Footer />
      </main>
      <ScrollToTop />
    </IntroGate>
  )
}

export default App

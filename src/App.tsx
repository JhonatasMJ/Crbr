

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { IntroGate } from "./components/intro-animation"
import { Home } from "./sections/Home"
import { Investments } from "./sections/Investments"
import { Solutions } from "./sections/Solutions"

export function App() {
  return (
    <IntroGate>
      <main>
        <div className="relative min-h-[70vh] bg-url bg-cover bg-position-[center_top] bg-no-repeat sm:min-h-[80vh] md:bg-top">
          <ResizableNavbarDemo />
          <Home />
        </div>
          < Investments />
          < Solutions />
      </main>
    </IntroGate>
  )
}

export default App

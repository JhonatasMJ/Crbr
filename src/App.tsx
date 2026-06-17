

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { IntroGate } from "./components/intro-animation"
import { Home } from "./sections/Home"
import { Investments } from "./sections/Investments"
import { Solutions } from "./sections/Solutions"

export function App() {
  return (
    <IntroGate>
      <main>
        <div className="relative  bg-url bg-cover bg-top bg-no-repeat">
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

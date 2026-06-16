

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { IntroGate } from "./components/intro-animation"
import { Home } from "./sections/Home"

export function App() {
  return (
    <IntroGate>
      <main>
        <div className="relative min-h-screen bg-url bg-cover bg-top bg-no-repeat">
          <ResizableNavbarDemo />
          <Home />
        </div>
          <Home />
          <Home />
      </main>
    </IntroGate>
  )
}

export default App

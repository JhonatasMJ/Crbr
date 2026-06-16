

import ResizableNavbarDemo from "./components/resizable-navbar-demo"
import { Home } from "./sections/Home"

export function App() {
  return (
    <main>
      <div className="relative bg-url bg-cover bg-top bg-no-repeat">
        <ResizableNavbarDemo />
        <Home />
      </div>
    </main>
  )
}

export default App

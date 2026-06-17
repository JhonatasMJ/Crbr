import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ScrollProgressProvider } from "./components/animate-ui/primitives/animate/scroll-progress.tsx"
import { SmoothScroll } from "./components/smoothScroll.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScroll>
    <ScrollProgressProvider global>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ScrollProgressProvider>
   </SmoothScroll>
  </StrictMode>
)

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./styles/index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { ScrollProgressProvider } from "./components/animate-ui/primitives/animate/scroll-progress.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScrollProgressProvider global>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ScrollProgressProvider>
  </StrictMode>
)

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles/index.css"
import App from "./App.tsx"
import { ScrollProgressProvider } from "./components/animate-ui/primitives/animate/scroll-progress.tsx"
import { CustomCursorProvider } from "./components/custom-cursor.tsx"
import { SmoothScroll } from "./components/smoothScroll.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomCursorProvider>
      <SmoothScroll>
        <ScrollProgressProvider global>
          <App />
        </ScrollProgressProvider>
      </SmoothScroll>
    </CustomCursorProvider>
  </StrictMode>
)

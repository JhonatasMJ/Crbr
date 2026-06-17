// src/components/smooth-scroll.tsx
import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,      // quanto maior, mais “lento/suave”
      smoothWheel: true,  // suaviza a roda do mouse
      wheelMultiplier: 1, // sensibilidade do scroll
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
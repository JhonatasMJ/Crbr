import {
  CursorTrailProvider,
  createCursorTrail,
} from "cursor-trail-react"
import { motion } from "framer-motion"
import { useEffect, useState, type ReactNode } from "react"

const CrbrCursor = createCursorTrail(
  ({ springX, springY, isHoveringInteractive }) => (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-99999 mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          width: isHoveringInteractive ? 44 : 36,
          height: isHoveringInteractive ? 44 : 36,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-transparent"
      />
      <motion.div
        animate={{
          width: isHoveringInteractive ? 12 : 10,
          height: isHoveringInteractive ? 12 : 10,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </motion.div>
  ),
  "smooth",
)

function useCustomCursorEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    setEnabled(hasFinePointer && !prefersReducedMotion)
  }, [])

  return enabled
}

export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const enabled = useCustomCursorEnabled()

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-cursor", enabled)
    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [enabled])

  if (!enabled) return children

  return (
    <CursorTrailProvider>
      <CrbrCursor />
      {children}
    </CursorTrailProvider>
  )
}

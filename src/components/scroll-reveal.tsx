import { useIntroComplete } from "@/components/intro-animation"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { motion, useInView, type HTMLMotionProps } from "motion/react"
import { Children, useRef, type ReactNode } from "react"

const ease = [0.25, 0.1, 0.25, 1] as const

type Direction = "up" | "down" | "left" | "right"

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 48, y: 0 },
  right: { x: -48, y: 0 },
}

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode
  delay?: number
  direction?: Direction
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.65,
  className,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isInView = useInView(ref, {
    once: false,
    margin: "0px 0px -12% 0px",
    amount: 0.2,
  })
  const offset = offsets[direction]
  const visible = introComplete && isInView

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        visible
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: introComplete ? duration : 0,
        delay: visible && introComplete ? delay : 0,
        ease,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type ScrollStaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  direction?: Direction
}

export function ScrollStagger({
  children,
  className,
  stagger = 0.1,
  direction = "up",
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isInView = useInView(ref, {
    once: false,
    margin: "0px 0px -12% 0px",
    amount: 0.15,
  })
  const offset = offsets[direction]
  const visible = introComplete && isInView

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {Children.map(children, (child, index) => (
        <motion.div
          key={
            child && typeof child === "object" && "key" in child
              ? child.key
              : index
          }
          variants={{
            hidden: { opacity: 0, x: offset.x, y: offset.y },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              transition: { duration: 0.55, ease },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

type IntroRevealProps = {
  children: ReactNode
  delay?: number
  direction?: Direction
  duration?: number
  className?: string
}

export function IntroReveal({
  children,
  delay = 0,
  direction = "down",
  duration = 0.55,
  className,
}: IntroRevealProps) {
  const introComplete = useIntroComplete()
  const prefersReducedMotion = usePrefersReducedMotion()
  const offset = offsets[direction]

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        introComplete
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={{
        duration: introComplete ? duration : 0,
        delay: introComplete ? delay : 0,
        ease,
      }}
    >
      {children}
    </motion.div>
  )
}

import { useIntroComplete } from "@/components/intro-animation"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"
import {
  Children,
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react"

const ease = [0.25, 0.1, 0.25, 1] as const
const power3Out = [0.33, 1, 0.68, 1] as const

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
    once: true,
    margin: "0px 0px -10% 0px",
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
    once: true,
    margin: "0px 0px -10% 0px",
    amount: 0.12,
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

type RevealVariant = "fade-up" | "scale-up" | "slide-left" | "slide-right"

const revealFrom: Record<
  RevealVariant,
  { opacity: number; x?: number; y?: number; scale?: number }
> = {
  "fade-up": { opacity: 0, y: 48 },
  "scale-up": { opacity: 0, y: 32, scale: 0.96 },
  "slide-left": { opacity: 0, x: -48 },
  "slide-right": { opacity: 0, x: 48 },
}

const revealTo = { opacity: 1, x: 0, y: 0, scale: 1 }

type RevealGroupContextValue = {
  visible: boolean
  stagger: number
  duration: number
}

const RevealGroupContext = createContext<RevealGroupContextValue>({
  visible: false,
  stagger: 0.12,
  duration: 0.65,
})

type RevealGroupProps = {
  children: ReactNode
  className?: string
  stagger?: number
  duration?: number
}

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  duration = 0.65,
}: RevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()
  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: 0.08,
  })
  const visible = introComplete && isInView

  return (
    <RevealGroupContext.Provider value={{ visible, stagger, duration }}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </RevealGroupContext.Provider>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  index?: number
  stagger?: number
  duration?: number
}

export function RevealItem({
  children,
  className,
  variant = "fade-up",
  index = 0,
  stagger: staggerOverride,
  duration: durationOverride,
}: RevealItemProps) {
  const {
    visible,
    stagger: groupStagger,
    duration: groupDuration,
  } = useContext(RevealGroupContext)
  const prefersReducedMotion = usePrefersReducedMotion()
  const stagger = staggerOverride ?? groupStagger
  const duration = durationOverride ?? groupDuration
  const from = revealFrom[variant]

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={visible ? revealTo : from}
      transition={{
        duration: visible ? duration : 0,
        delay: visible ? index * stagger : 0,
        ease: power3Out,
      }}
    >
      {children}
    </motion.div>
  )
}

type ParallaxProps = {
  children: ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed])

  if (!introComplete || prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div ref={ref} className={cn(className)} style={{ y }}>
      {children}
    </motion.div>
  )
}

type ScrubRevealProps = {
  children: ReactNode
  className?: string
  rotate?: number
  y?: number
}

export function ScrubReveal({
  children,
  className,
  rotate = 4,
  y = 40,
}: ScrubRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -8% 0px",
    amount: 0.15,
  })
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
          ? { opacity: 1, y: 0, rotate: 0 }
          : { opacity: 0, y, rotate }
      }
      transition={{ duration: 0.7, ease: power3Out }}
    >
      {children}
    </motion.div>
  )
}

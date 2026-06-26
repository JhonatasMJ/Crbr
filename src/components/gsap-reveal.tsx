import { useIntroComplete } from "@/components/intro-animation"
import { gsap, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"
import { useGSAP } from "@gsap/react"
import { useRef, type ReactNode } from "react"

gsap.registerPlugin(useGSAP)

type GsapRevealVariant = "fade-up" | "scale-up" | "slide-left" | "slide-right"

const variantFrom: Record<GsapRevealVariant, gsap.TweenVars> = {
  "fade-up": { opacity: 0, y: 48 },
  "scale-up": { opacity: 0, y: 32, scale: 0.96 },
  "slide-left": { opacity: 0, x: -48 },
  "slide-right": { opacity: 0, x: 48 },
}

const variantTo: gsap.TweenVars = { opacity: 1, x: 0, y: 0, scale: 1 }

type GsapRevealGroupProps = {
  children: ReactNode
  className?: string
  variant?: GsapRevealVariant
  stagger?: number
  duration?: number
  start?: string
  itemClassName?: string
}

export function GsapRevealGroup({
  children,
  className,
  variant = "fade-up",
  stagger = 0.12,
  duration = 0.65,
  start = "top 92%",
  itemClassName = "gsap-reveal-item",
}: GsapRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()

  useGSAP(
    () => {
      if (!introComplete || !containerRef.current) return

      const container = containerRef.current
      const items = gsap.utils.toArray<HTMLElement>(
        `.${itemClassName}`,
        container,
      )
      if (!items.length) return

      const from = variantFrom[variant]
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches

      if (reducedMotion) {
        gsap.set(items, variantTo)
        return
      }

      gsap.set(items, from)

      let revealed = false

      const reveal = () => {
        if (revealed) return
        revealed = true

        gsap.killTweensOf(items)
        gsap.to(items, {
          ...variantTo,
          duration,
          stagger,
          ease: "power3.out",
          overwrite: true,
          clearProps: "opacity,transform,scale",
        })
      }

      const trigger = ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        onEnter: reveal,
        invalidateOnRefresh: true,
      })

      requestAnimationFrame(() => {
        if (
          trigger.isActive ||
          ScrollTrigger.isInViewport(container, 0.08, true)
        ) {
          reveal()
        }
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: containerRef,
      revertOnUpdate: true,
      dependencies: [
        introComplete,
        variant,
        stagger,
        duration,
        start,
        itemClassName,
      ],
    },
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

type GsapParallaxProps = {
  children: ReactNode
  className?: string
  speed?: number
}

export function GsapParallax({ children, className, speed = 60 }: GsapParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()

  useGSAP(
    () => {
      if (!introComplete) return

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
      if (reducedMotion || !ref.current) return

      gsap.to(ref.current, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      })
    },
    { scope: ref, revertOnUpdate: true, dependencies: [introComplete, speed] },
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}

type GsapScrubRevealProps = {
  children: ReactNode
  className?: string
  rotate?: number
  y?: number
}

export function GsapScrubReveal({
  children,
  className,
  rotate = 4,
  y = 40,
}: GsapScrubRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const introComplete = useIntroComplete()

  useGSAP(
    () => {
      if (!introComplete) return

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
      if (reducedMotion || !ref.current) return

      const from = { opacity: 0, y, rotate }
      const to = { opacity: 1, y: 0, rotate: 0, duration: 0.7, ease: "power3.out" }

      gsap.set(ref.current, from)

      gsap.to(ref.current, {
        ...to,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 92%",
          once: true,
          invalidateOnRefresh: true,
        },
      })
    },
    { scope: ref, revertOnUpdate: true, dependencies: [introComplete, rotate, y] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

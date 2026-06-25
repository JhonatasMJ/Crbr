import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

let lenis: Lenis | null = null;

export const NAVBAR_OFFSET = 80;

export function setScrollLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(link: string, offset = NAVBAR_OFFSET) {
  const id = link.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  ScrollTrigger.refresh(true);

  gsap.to(document.documentElement, {
    duration: 1.15,
    ease: "power2.inOut",
    scrollTo: {
      y: el,
      offsetY: offset,
      autoKill: true,
    },
    onUpdate: () => ScrollTrigger.update(),
    onComplete: () => ScrollTrigger.refresh(true),
    onInterrupt: () => ScrollTrigger.refresh(true),
  });
}

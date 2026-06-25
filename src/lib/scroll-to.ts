import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

export const NAVBAR_OFFSET = 80;

export function setScrollLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(link: string, offset = NAVBAR_OFFSET) {
  const id = link.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  ScrollTrigger.refresh();

  if (lenis) {
    lenis.scrollTo(el, { offset: -offset, duration: 1.1 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

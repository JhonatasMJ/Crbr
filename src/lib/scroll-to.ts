import type Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;

export const NAVBAR_OFFSET = 80;

export function setScrollLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getScrollY(): number {
  return lenis?.scroll ?? window.scrollY;
}

export function refreshScrollLayout() {
  ScrollTrigger.refresh(true);
  lenis?.resize();
}

export function scrollToSection(link: string, offset = NAVBAR_OFFSET) {
  const id = link.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  refreshScrollLayout();

  if (lenis) {
    lenis.scrollTo(el, {
      offset: -offset,
      duration: 1.15,
      lock: true,
      force: true,
      onComplete: () => {
        refreshScrollLayout();
        ScrollTrigger.update();
      },
    });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function scrollToTop() {
  refreshScrollLayout();

  if (lenis) {
    lenis.scrollTo(0, {
      duration: 1.1,
      lock: true,
      force: true,
      onComplete: () => {
        refreshScrollLayout();
        ScrollTrigger.update();
      },
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

import { createContext, useContext, useEffect, useState } from "react";
import { setScrollLenis } from "@/lib/scroll-to";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 2.1,
      smoothWheel: true,
      wheelMultiplier: 0.5,
      touchMultiplier: 0.75,
    });

    instance.on("scroll", ScrollTrigger.update);

    const handleResize = () => {
      ScrollTrigger.refresh();
      instance.resize();
    };

    window.addEventListener("resize", handleResize);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    setLenis(instance);
    setScrollLenis(instance);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      instance.resize();
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      setScrollLenis(null);
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      setLenis(null);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

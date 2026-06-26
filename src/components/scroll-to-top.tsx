import { useLenis } from "@/components/smoothScroll";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getScrollY, scrollToTop } from "@/lib/scroll-to";
import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const SHOW_AFTER_PROGRESS = 0.62;

function getScrollProgress() {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (scrollHeight <= 0) return 0;

  return getScrollY() / scrollHeight;
}

export function ScrollToTop() {
  const lenis = useLenis();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(getScrollProgress() >= SHOW_AFTER_PROGRESS);
    };

    updateVisibility();

    if (lenis) {
      lenis.on("scroll", updateVisibility);
      return () => lenis.off("scroll", updateVisibility);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, [lenis]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          onClick={scrollToTop}
          className={cn(
            "fixed right-4 bottom-6 z-50 flex size-12 cursor-pointer items-center justify-center rounded-md bg-yellow-base text-black shadow-lg shadow-black/30 transition-shadow hover:shadow-xl hover:shadow-black/40 sm:right-6 sm:bottom-8",
          )}
        >
          <ArrowUpIcon weight="bold" size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

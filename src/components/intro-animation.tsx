import { AnimatedLogo } from "@/components/animated-logo";
import { useLenis } from "@/components/smoothScroll";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const INTRO_DURATION_MS = 7200;
const EXIT_FADE_S = 1.1;

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("exit"), INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-sans"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_S, ease }}
      onAnimationComplete={() => {
        if (phase === "exit") onComplete();
      }}
    >
      <AnimatedLogo phase={phase} />
    </motion.div>
  );
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    if (!showIntro) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.backgroundColor = "#000";
    body.style.backgroundColor = "#000";
    lenis?.stop();

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.backgroundColor = prevHtmlBg;
      body.style.backgroundColor = prevBodyBg;
      lenis?.start();
    };
  }, [showIntro, lenis]);

  return (
    <>
      <div className={showIntro ? "pointer-events-none" : undefined}>
        {children}
      </div>

      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

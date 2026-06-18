import { AnimatedLogo } from "@/components/animated-logo";
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
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation
            onComplete={() => {
              setShowIntro(false);
              setShowContent(true);
            }}
          />
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

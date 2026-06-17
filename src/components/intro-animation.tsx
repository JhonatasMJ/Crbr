import logo from "@/assets/logo.svg";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;
const brand = "CRBR";

function AnimatedBrand({ phase }: { phase: "enter" | "exit" }) {
  return (
    <h1
      className="flex text-4xl font-semibold tracking-tight text-white"
      aria-label={brand}
    >
      {brand.split("").map((letter, index) => (
        <span key={index} className="inline-block overflow-hidden py-1">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
            animate={
              phase === "exit"
                ? { y: "-110%", opacity: 0, filter: "blur(6px)" }
                : { y: 0, opacity: 1, filter: "blur(0px)" }
            }
            transition={{
              duration: 0.6,
              delay:
                phase === "exit"
                  ? (brand.length - 1 - index) * 0.07
                  : 1.15 + index * 0.11,
              ease,
            }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("exit"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black font-sans"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 1.1, ease }}
      onAnimationComplete={() => {
        if (phase === "exit") onComplete();
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.img
          src={logo}
          alt=""
          width={120}
          height={120}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: phase === "exit" ? 0 : 1,
            scale: phase === "exit" ? 0.92 : 1,
          }}
          transition={{
            duration: phase === "exit" ? 0.8 : 1.8,
            delay: phase === "exit" ? 0 : 0.15,
            ease,
          }}
        />

        <AnimatedBrand phase={phase} />
      </div>
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

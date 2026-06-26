"use client";
import { useIntroComplete } from "@/components/intro-animation";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ScrollProgress } from "@/components/animate-ui/primitives/animate/scroll-progress";
import logo from "/src/assets/logo.svg";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function useIsMobileNav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function useShowNavbarContent() {
  const introComplete = useIntroComplete();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobileNav();

  return introComplete || prefersReducedMotion || isMobile;
}


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  activeIndex?: number;
  onItemClick?: (link: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  isOpen?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

const navTransition = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const,
};

const introEase = [0.25, 0.1, 0.25, 1] as const;

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const showNavbar = useShowNavbarContent();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.div
      initial={false}
      animate={{
        top: scrolled ? 0 : 16,
        opacity: showNavbar ? 1 : 0,
        y: showNavbar ? 0 : -32,
      }}
      transition={{
        top: navTransition,
        opacity: {
          duration: 0.6,
          ease: introEase,
          delay: showNavbar && !prefersReducedMotion ? 0.05 : 0,
        },
        y: {
          duration: 0.65,
          ease: introEase,
          delay: showNavbar && !prefersReducedMotion ? 0.05 : 0,
        },
      }}
      className={cn("fixed inset-x-0 z-50 w-full", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-white/10"
        initial={false}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={navTransition}
      >
        <ScrollProgress className="h-full bg-yellow-base" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
        }}
        transition={navTransition}
        style={{ backgroundColor: "#111111" }}
      />
      <div className="relative w-full">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible: scrolled },
              )
            : child,
        )}
      </div>
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div className={cn("relative hidden w-full lg:block", className)}>
      <motion.div
        layout
        initial={false}
        animate={{
          borderRadius: visible ? 0 : 9999,
          backgroundColor: visible
            ? "rgba(17, 17, 17, 0)"
            : "rgba(0, 0, 0, 0.25)",
        }}
        transition={navTransition}
        className="container relative overflow-hidden"
      >
        <div className="relative flex w-full flex-row items-center justify-between py-3">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export const NavItems = ({
  items,
  className,
  activeIndex = 0,
  onItemClick,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const highlighted = hovered ?? activeIndex;
  const prefersReducedMotion = usePrefersReducedMotion();
  const showItem = useShowNavbarContent();

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-semibold text-white transition duration-200 hover:text-black lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isHighlighted = highlighted === idx;

        return (
          <motion.a
            onMouseEnter={() => setHovered(idx)}
            onClick={(e) => {
              e.preventDefault();
              onItemClick?.(item.link);
            }}
            className={cn(
              "relative px-4 py-2 transition-colors duration-200",
              isHighlighted ? "text-black" : "text-white hover:text-black",
            )}
            key={`link-${idx}`}
            href={item.link}
            initial={false}
            animate={
              showItem
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: -16 }
            }
            transition={{
              duration: 0.45,
              delay: showItem && !prefersReducedMotion ? 0.15 + idx * 0.07 : 0,
              ease: introEase,
            }}
          >
            {isHighlighted && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-yellow-base"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </motion.a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
  isOpen = false,
}: MobileNavProps) => {
  const isMobile = useIsMobileNav();

  return (
    <div className={cn("relative w-full lg:hidden", className)}>
      <motion.div
        layout
        initial={false}
        animate={{
          borderRadius: visible || isOpen ? 0 : 16,
          backgroundColor: isOpen
            ? "rgba(17, 17, 17, 0.92)"
            : visible
              ? "rgba(17, 17, 17, 0)"
              : isMobile
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.25)",
        }}
        transition={navTransition}
        className="container relative overflow-visible"
      >
        <div className="w-full py-3.5 sm:py-4">{children}</div>
      </motion.div>
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const backdropTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: introEase };

  const panelTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const };

  const backdrop = mounted
    ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.button
              type="button"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md lg:hidden"
            />
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      {backdrop}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: -12 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8 }
            }
            transition={panelTransition}
            className={cn(
              "absolute inset-x-0 top-full z-[60] flex w-full flex-col gap-2 rounded-b-2xl  border-t-0 bg-blackLight px-5 py-6 shadow-2xl shadow-black/40",
              className,
            )}
          >
            <div className="flex w-full flex-col gap-2">
              {React.Children.map(children, (child, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    delay: prefersReducedMotion ? 0 : 0.05 + index * 0.04,
                    ease: introEase,
                  }}
                  className="w-full"
                >
                  {child}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <button
      type="button"
      aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      onClick={onClick}
      className="relative z-60 flex size-11 cursor-pointer items-center justify-center rounded-md bg-yellow-base text-black"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isOpen ? (
          <motion.span
            key="close"
            initial={prefersReducedMotion ? false : { opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, rotate: 90 }}
            transition={{ duration: 0.25, ease: introEase }}
            className="flex items-center justify-center"
          >
            <IconX className="size-6" />
          </motion.span>
        ) : (
          <motion.span
            key="open"
            initial={prefersReducedMotion ? false : { opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, rotate: -90 }}
            transition={{ duration: 0.25, ease: introEase }}
            className="flex items-center justify-center"
          >
            <IconMenu2 className="size-6" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export const NavbarLogo = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const showLogo = useShowNavbarContent();

  return (
    <motion.a
      href="#inicio"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
      initial={false}
      animate={showLogo ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{
        duration: 0.5,
        delay: showLogo && !prefersReducedMotion ? 0.1 : 0,
        ease: introEase,
      }}
    >
      <img
        src={logo}
        alt="logo"
        width={40}
        height={30}
      />
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const showButton = useShowNavbarContent();

  const baseStyles =
    "px-6 py-2 rounded-md bg-yellow-base button bg-yellow-base text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <motion.div
      initial={false}
      animate={showButton ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{
        duration: 0.5,
        delay: showButton && !prefersReducedMotion ? 0.4 : 0,
        ease: introEase,
      }}
      className="inline-block"
    >
      <Tag
        href={href || undefined}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  );
};

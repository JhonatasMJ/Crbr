"use client";
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

import React, { useState } from "react";


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

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 50);
  });

  return (
    <motion.div
      initial={false}
      animate={{
        top: visible ? 0 : 16,
      }}
      transition={navTransition}
      className={cn("fixed inset-x-0 z-50 w-full", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-white/10"
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={navTransition}
      >
        <ScrollProgress className="h-full bg-yellow-base" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
        }}
        transition={navTransition}
        style={{ backgroundColor: "#111111" }}
      />
      <div className="relative w-full">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as React.ReactElement<{ visible?: boolean }>,
                { visible },
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
          <a
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
          >
            {isHighlighted && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-yellow-base"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <div className={cn("relative w-full lg:hidden", className)}>
      <motion.div
        layout
        initial={false}
        animate={{
          borderRadius: visible ? 0 : 16,
          backgroundColor: visible
            ? "rgba(17, 17, 17, 0)"
            : "rgba(0, 0, 0, 0.25)",
        }}
        transition={navTransition}
        className="container relative overflow-hidden"
      >
        <div className="w-full py-3">{children}</div>
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
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-full z-50 mt-2 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-[#111111] px-4 py-8",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="cursor-pointer text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="cursor-pointer text-white" onClick={onClick} />
  );
};

export const NavbarLogo = ({
  onClick,
}: {
  onClick?: () => void;
}) => {
  return (
    <a
      href="#inicio"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-white"
    >
      <img
        src={logo}
        alt="logo"
        width={40}
        height={30}
      />
    </a>
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
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};

"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { scrollToSection, useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Início", link: "#home" },
  { name: "Soluções", link: "#solutions" },
  { name: "Aplicativo", link: "#app" },
  { name: "Simulação", link: "#simulator" },
];

const sectionLinks = navItems.map((item) => item.link);

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeId = useScrollSpy(sectionLinks);
  const activeIndex = navItems.findIndex(
    (item) => item.link.replace("#", "") === activeId,
  );

  const handleNavClick = (link: string) => {
    scrollToSection(link);
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo onClick={() => handleNavClick("#home")} />
          <NavItems
            items={navItems}
            activeIndex={activeIndex >= 0 ? activeIndex : 0}
            onItemClick={handleNavClick}
          />
          <div className="flex items-center gap-4">
            <NavbarButton
              as="button"
              variant="primary"
              onClick={() => handleNavClick("#contact")}
            >
              Contato
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMobileMenuOpen}>
          <MobileNavHeader>
            <NavbarLogo onClick={() => handleNavClick("#home")} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.link);
                }}
                className={cn(
                  "block w-full rounded-md px-3 py-3 text-base font-medium transition-colors sm:text-lg",
                  activeIndex === idx
                    ? "bg-yellow-base font-semibold text-black"
                    : "text-white/90 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick("#contact")}
              className="mt-1 w-full rounded-md bg-yellow-base px-6 py-3.5 text-base font-bold text-black transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Contato
            </button>
          </MobileNavMenu>
        </MobileNav>
    </Navbar>
  );
}


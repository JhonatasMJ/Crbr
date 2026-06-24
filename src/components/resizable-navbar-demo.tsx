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
  { name: "Simulação", link: "#simulacao" },
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
            <NavbarButton variant="primary">Contato</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
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
                  "relative rounded-md px-3 py-2 transition-colors",
                  activeIndex === idx
                    ? "bg-yellow-base font-semibold text-black"
                    : "text-white/80 hover:text-white",
                )}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
          
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                href="#contact"
              >
                Contato
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
    </Navbar>
  );
}


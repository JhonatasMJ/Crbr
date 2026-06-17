import { useEffect, useMemo, useState } from "react";

const NAVBAR_OFFSET = 80;

export function scrollToSection(link: string, offset = NAVBAR_OFFSET) {
  const id = link.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function useScrollSpy(sectionIds: string[]) {
  const ids = useMemo(
    () => sectionIds.map((s) => s.replace("#", "")),
    [sectionIds],
  );
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const updateActive = () => {
      const scrollPosition = window.scrollY + NAVBAR_OFFSET + 1;

      if (window.scrollY < 50) {
        setActiveId(ids[0]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [ids]);

  return activeId;
}

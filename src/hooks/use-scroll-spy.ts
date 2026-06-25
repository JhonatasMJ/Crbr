import { NAVBAR_OFFSET, scrollToSection } from "@/lib/scroll-to";
import { useEffect, useMemo, useState } from "react";

export { scrollToSection } from "@/lib/scroll-to";

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

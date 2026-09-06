"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps `html[data-ground]` in step with whichever `[data-ground]` section is
 * sitting under the nav bar, so the bar takes that section's ink. The homepage
 * story marks every scene; interior pages mark only their dark bands and the
 * footer, and while nothing marked is under the bar the attribute is removed so
 * the normal theme cascade styles the header.
 */
export function GroundWatch() {
  const pathname = usePathname();

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = 40; // inside the bar
      let ground: string | null = null;
      for (const s of document.querySelectorAll<HTMLElement>("body [data-ground]")) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { ground = s.dataset.ground || null; break; }
      }
      const html = document.documentElement;
      if (ground === null) html.removeAttribute("data-ground");
      else if (html.getAttribute("data-ground") !== ground) html.setAttribute("data-ground", ground);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule, { passive: true });
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-ground");
    };
  }, [pathname]);

  return null;
}

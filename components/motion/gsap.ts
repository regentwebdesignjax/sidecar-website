"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Registering more than once is harmless, but doing it from one module keeps
// every consumer honest about importing plugins from the same place.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
}

/** The easing used across the whole site, matching the supplied components. */
export const EASE = "power3.out";
export const EASE_CUBIC = [0.22, 1, 0.36, 1] as const;

export { gsap, ScrollTrigger, SplitText, Flip };

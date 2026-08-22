"use client";

import { useMediaQuery } from "./use-media-query";

/** Tracks prefers-reduced-motion. False on the server and until proven otherwise. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

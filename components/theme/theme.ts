"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sidecar-theme";

/** Painted behind the page by the browser; keep it in step with the palette. */
const THEME_COLOR: Record<Theme, string> = {
  light: "#F7F0DB",
  dark: "#04201E",
};

/**
 * Runs before first paint, inlined into <head>. Resolves the stored choice (or
 * the system preference) onto <html data-theme> so the correct palette is
 * applied by the very first style recalculation — no flash of the wrong theme.
 *
 * Deliberately tiny and dependency-free: it blocks rendering while it runs.
 */
export const THEME_SCRIPT = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})()`;

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // Both meta tags carry a media attribute, so update each — whichever the
  // browser honours then matches the theme actually on screen.
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((tag) => tag.setAttribute("content", THEME_COLOR[theme]));
  notify();
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private browsing or blocked storage: the choice just won't persist.
  }
  apply(theme);
}

export function toggleTheme() {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  // Another tab changed the preference.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    if (event.newValue === "dark" || event.newValue === "light") {
      apply(event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);

  // The system preference changed. Only follow it if the visitor has not made
  // an explicit choice of their own.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = (event: MediaQueryListEvent) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "light" || stored === "dark") return;
    apply(event.matches ? "dark" : "light");
  };
  media.addEventListener("change", onSystem);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onSystem);
  };
}

/**
 * The theme actually on screen. Reads the DOM attribute the inline script set,
 * so it is correct on the first client render rather than after an effect.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, currentTheme, () => "light");
}

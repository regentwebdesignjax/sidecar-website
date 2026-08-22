"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query.
 *
 * useSyncExternalStore rather than useEffect + setState: matchMedia *is* an
 * external store, so this reads the real value on the client's first render
 * instead of rendering a wrong value and then correcting it.
 *
 * The server snapshot is always false — the server cannot know the user's
 * preferences, and every caller treats false as the conservative default.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** WebGL support. A one-shot capability probe, cached so it runs once. */
let webglSupport: boolean | null = null;

function probeWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

export function useHasWebGL(): boolean {
  return useSyncExternalStore(noopSubscribe, probeWebGL, () => false);
}

"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { gsap } from "./gsap";
import { useReducedMotion } from "./use-reduced-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of moving the wrapper as one block. */
  stagger?: boolean;
  y?: number;
};

/**
 * The site-wide scroll reveal: a short rise with a blur burn-off, matching the
 * [0.22, 1, 0.36, 1] curve the supplied Framer components already use so the
 * GSAP and Framer sections feel like one system.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  y = 18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const targets = stagger
        ? Array.from(ref.current.children)
        : [ref.current];

      const tween = gsap.from(targets, {
        opacity: 0,
        y,
        filter: "blur(6px)",
        duration: 0.7,
        ease: "power3.out",
        delay,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: ref, dependencies: [reduced, stagger, delay, y] },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

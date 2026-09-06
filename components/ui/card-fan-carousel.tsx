/* eslint-disable @next/next/no-img-element -- static export: no image optimizer, assets are pre-sized */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface FanCard {
  id: string;
  src: string;
  label: string;
  caption: string;
}

/**
 * A hand of phone screens fanned like playing cards. Adapted from the 21st.dev
 * card-fan-carousel: five cards are dealt at a time, the arrows cycle the
 * hand, and hovering a card lifts it while its neighbours make room. The
 * centre card's real App Store caption sits beneath the fan.
 */

const MAX_VISIBLE = 5;
const HALF = 2;

const FAN_POSITIONS = [
  { rot: -14, scale: 0.85, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.93, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.93, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.85, x: 22, y: 4.0, zIndex: 2 },
];

function widthMultiplier(width: number) {
  if (width < 480) return 0.27;
  if (width < 640) return 0.36;
  if (width < 768) return 0.56;
  if (width < 1024) return 0.78;
  return 1;
}

export function CardFanCarousel({ cards, className }: { cards: FanCard[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());
  const reduced = useReducedMotion();

  const total = cards.length;
  const [center, setCenter] = useState(HALF);

  const visibleMap = useCallback((c: number) => {
    const map = new Map<number, number>();
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set((((c + slot - HALF) % total) + total) % total, slot);
    }
    return map;
  }, [total]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenter((prev) => (direction === "right" ? (prev + 1) % total : (prev - 1 + total) % total));
  }, [total]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !total) return;
    const els = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    const map = visibleMap(center);
    const wasVisible = prevVisible.current;
    const direction = directionRef.current;
    const first = !hasEntered.current;
    const mult = widthMultiplier(window.innerWidth);
    const dur = reduced ? 0 : 1;

    if (first) isAnimating.current = true;
    let done = 0;
    const onDone = () => {
      if (++done >= map.size) {
        isAnimating.current = false;
        if (first) hasEntered.current = true;
      }
    };

    els.forEach((card, i) => {
      const slot = map.get(i);
      const seen = wasVisible.has(i);
      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = FAN_POSITIONS[slot];
        const target = { x: `${x * mult}rem`, y: `${y}rem`, rotation: rot, scale, opacity: 1, zIndex };
        if (first) {
          gsap.set(card, { x: 0, y: "10rem", rotation: 0, scale: 0.6, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.1 * dur, ease: "expo.out", delay: (0.15 + slot * 0.07) * dur, onComplete: onDone });
        } else if (!seen) {
          gsap.set(card, { x: `${(direction === "right" ? 34 : -34) * mult}rem`, y: `${y}rem`, rotation: direction === "right" ? 24 : -24, scale: 0.6, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6 * dur, ease: "power2.out", onComplete: onDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5 * dur, ease: "power2.out", onComplete: onDone });
        }
      } else if (seen) {
        gsap.to(card, { x: `${(direction === "right" ? -34 : 34) * mult}rem`, opacity: 0, scale: 0.6, rotation: direction === "right" ? -24 : 24, duration: 0.4 * dur, ease: "power2.in", zIndex: 0 });
      } else if (first) {
        gsap.set(card, { opacity: 0, scale: 0.4, x: 0, y: 0, zIndex: 0 });
      }
    });
    prevVisible.current = new Set(map.keys());

    // Hover: the card under the pointer lifts and the others lean away.
    const entries = els.map((el, i) => ({ el, slot: map.get(i) })).filter((e): e is { el: HTMLElement; slot: number } => e.slot !== undefined).sort((a, b) => a.slot - b.slot);
    let active: number | null = null;
    let leaveTimer: ReturnType<typeof setTimeout> | null = null;
    const layout = (hovered: number | null) => {
      const m = widthMultiplier(window.innerWidth);
      entries.forEach(({ el, slot }) => {
        const base = FAN_POSITIONS[slot];
        let tx = base.x * m, ty = base.y, rot = base.rot, sc = base.scale, delay = 0;
        if (hovered !== null) {
          const dist = Math.abs(slot - hovered);
          delay = dist * 0.02;
          if (slot === hovered) { ty -= 2; sc *= 1.06; }
          else {
            const push = 6 * (1 + 0.2 * Math.max(0, 2 - dist));
            if (slot < hovered) { tx -= push * m; rot -= 3 / (dist + 1); } else { tx += push * m; rot += 3 / (dist + 1); }
          }
        }
        gsap.to(el, { x: `${tx}rem`, y: `${ty}rem`, rotation: rot, scale: sc, duration: 0.5 * dur, delay: delay * dur, ease: "power3.out", overwrite: "auto" });
        gsap.set(el, { zIndex: slot === hovered ? 20 : base.zIndex });
      });
    };
    const handlers = entries.map(({ el, slot }) => {
      const h = () => { if (isAnimating.current) return; if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; } if (active !== slot) { active = slot; layout(slot); } };
      el.addEventListener("mouseenter", h);
      return { el, h };
    });
    const onLeave = () => { if (isAnimating.current) return; if (leaveTimer) clearTimeout(leaveTimer); leaveTimer = setTimeout(() => { active = null; layout(null); }, 50); };
    container.addEventListener("mouseleave", onLeave);
    const onResize = () => { if (!isAnimating.current) layout(active); };
    window.addEventListener("resize", onResize);
    return () => {
      handlers.forEach(({ el, h }) => el.removeEventListener("mouseenter", h));
      container.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [center, total, visibleMap, reduced]);

  if (!total) return null;
  const current = cards[center];

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <div ref={containerRef} className="fan-layout relative flex w-full items-center justify-center" aria-hidden="true">
        {cards.map((card) => (
          <div key={card.id} className="fan-card absolute">
            <div className="screen-radius aspect-[660/1434] w-full bg-deep shadow-[0_36px_70px_-28px_rgba(0,0,0,0.7),0_0_0_1px_rgba(243,232,188,0.08)]">
              <img src={card.src} alt="" width={660} height={1434} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex w-full max-w-md flex-col items-center gap-5 text-center" aria-live="polite">
        <p className="min-h-[3.4rem]">
          <span className="eyebrow block text-band-dim">{current.label}</span>
          <span className="mt-1 block font-serif text-2xl leading-tight text-band-ink sm:text-3xl">{current.caption}.</span>
        </p>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => cycle("left")} aria-label="Previous screen" className="grid size-11 place-items-center rounded-full border border-band-line text-band-ink transition-colors hover:border-sun/50 hover:bg-band-fill">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Screens">
            {cards.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === center}
                aria-label={c.label}
                onClick={() => { if (i !== center && !isAnimating.current) { isAnimating.current = true; directionRef.current = i > center ? "right" : "left"; setCenter(i); } }}
                className={cn("size-2 rounded-full transition-all duration-300", i === center ? "scale-[1.4] bg-sun" : "bg-band-ink/25 hover:bg-band-ink/50")}
              />
            ))}
          </div>
          <button type="button" onClick={() => cycle("right")} aria-label="Next screen" className="grid size-11 place-items-center rounded-full border border-band-line text-band-ink transition-colors hover:border-sun/50 hover:bg-band-fill">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Every screen and caption, for readers and search engines. */}
      <ul className="sr-only">
        {cards.map((c) => (
          <li key={c.id}>{c.label}: {c.caption}</li>
        ))}
      </ul>
    </div>
  );
}

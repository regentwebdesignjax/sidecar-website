/* eslint-disable @next/next/no-img-element -- static export: no image optimizer, assets are pre-sized */
"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import type { FanCard } from "./card-fan-carousel";

/**
 * A swipeable stack of phone screens for narrow viewports, adapted from the
 * Motion card-stack example: swipe the top card left or right and it goes to
 * the back; the next screen's caption fades in beneath. Tapping the dots or
 * the arrows works too.
 */

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const wrap = (n: number, v: number) => ((v % n) + n) % n;

function Card({ card, index, current, total, minDistance, onNext }: { card: FanCard; index: number; current: number; total: number; minDistance: number; onNext: () => void }) {
  const restRotate = mix(-4, 4, (Math.sin(index * 1.7) + 1) / 2);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [restRotate - 8, restRotate + 8], { clamp: false });
  const offset = wrap(total, index - current);
  const depth = Math.min(offset, 3);
  const zIndex = total - offset;
  const opacity = offset > 3 ? 0 : 1;
  const scale = 1 - depth * 0.05;
  const y = depth * 14;

  const onDragEnd = () => {
    const distance = Math.abs(x.get());
    const speed = Math.abs(x.getVelocity());
    if (distance > minDistance || speed > 500) {
      onNext();
      animate(x, 0, { type: "spring", stiffness: 500, damping: 40 });
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 40 });
    }
  };

  return (
    <motion.li
      className="absolute inset-0 list-none"
      style={{ zIndex, rotate, x, touchAction: "pan-y" }}
      initial={false}
      animate={{ opacity, scale, y }}
      transition={{ type: "spring", stiffness: 400, damping: 34 }}
      drag={index === current ? "x" : false}
      dragElastic={0.6}
      onDragEnd={onDragEnd}
    >
      <div className="screen-radius aspect-[660/1434] w-full bg-deep shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7),0_0_0_1px_rgba(243,232,188,0.08)]">
        <img src={card.src} alt="" width={660} height={1434} loading="lazy" decoding="async" draggable={false} onPointerDown={(e) => e.preventDefault()} className="block h-full w-full select-none object-cover" />
      </div>
    </motion.li>
  );
}

export function ScreenStack({ cards, className }: { cards: FanCard[]; className?: string }) {
  const [current, setCurrent] = useState(0);
  const stack = useRef<HTMLUListElement>(null);
  const [minDistance, setMinDistance] = useState(120);
  useEffect(() => {
    if (stack.current) setMinDistance(stack.current.offsetWidth * 0.45);
  }, []);
  const total = cards.length;
  const card = cards[current];

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      <ul ref={stack} className="relative m-0 aspect-[660/1434] w-[min(58vw,230px)] p-0" aria-hidden="true">
        {cards.map((c, i) => (
          <Card key={c.id} card={c} index={i} current={current} total={total} minDistance={minDistance} onNext={() => setCurrent((v) => wrap(total, v + 1))} />
        ))}
      </ul>
      <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-4 text-center" aria-live="polite">
        <p className="min-h-[3.2rem]">
          <span className="eyebrow block text-band-dim">{card.label}</span>
          <span className="mt-1 block font-serif text-2xl leading-tight text-band-ink">{card.caption}.</span>
        </p>
        <div className="flex items-center gap-2" role="tablist" aria-label="Screens">
          {cards.map((c, i) => (
            <button key={c.id} type="button" role="tab" aria-selected={i === current} aria-label={c.label} onClick={() => setCurrent(i)} className={cn("size-2 rounded-full transition-all duration-300", i === current ? "scale-[1.4] bg-sun" : "bg-band-ink/25")} />
          ))}
        </div>
        <p className="text-xs text-band-dim">Swipe the top screen to see the next one.</p>
      </div>
      <ul className="sr-only">
        {cards.map((c) => (
          <li key={c.id}>{c.label}: {c.caption}</li>
        ))}
      </ul>
    </div>
  );
}

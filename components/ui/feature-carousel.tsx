"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  BanknoteArrowUp,
  CalendarClock,
  ChartNoAxesColumn,
  Mail,
  ReceiptText,
  Split,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type CarouselFeature = {
  id: string;
  label: string;
  icon: LucideIcon;
  image: string;
  description: string;
};

/** The seven App Store screens, with their real captions. */
const FEATURES: CarouselFeature[] = [
  {
    id: "home",
    label: "Home",
    icon: Wallet,
    image: "/device/home.webp",
    description: "Every dollar gets a job.",
  },
  {
    id: "envelopes",
    label: "Envelopes",
    icon: Mail,
    image: "/device/envelopes.webp",
    description: "See what's left before you spend.",
  },
  {
    id: "split-expense",
    label: "Split a shop",
    icon: Split,
    image: "/device/split-expense.webp",
    description: "Split one shop across several envelopes.",
  },
  {
    id: "activity",
    label: "Activity",
    icon: ReceiptText,
    image: "/device/activity.webp",
    description: "And see exactly where it landed.",
  },
  {
    id: "split-income",
    label: "Paychecks",
    icon: BanknoteArrowUp,
    image: "/device/split-income.webp",
    description: "Divide your pay automatically.",
  },
  {
    id: "schedule",
    label: "Scheduled",
    icon: CalendarClock,
    image: "/device/schedule.webp",
    description: "Bills and paychecks post themselves.",
  },
  {
    id: "reports",
    label: "Reports",
    icon: ChartNoAxesColumn,
    image: "/device/reports.webp",
    description: "Watch where it actually goes.",
  },
];

const AUTO_PLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 64;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => setStep((prev) => prev + 1), []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="mx-auto w-full max-w-7xl md:p-8">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[2.5rem] border border-line lg:aspect-video lg:min-h-0 lg:flex-row lg:rounded-[3rem]">
        {/* Rail */}
        <div className="relative z-30 flex min-h-[340px] w-full flex-col items-start justify-center overflow-hidden bg-teal px-8 md:min-h-[420px] md:px-16 lg:h-full lg:w-[40%] lg:pl-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-14 bg-gradient-to-b from-teal via-teal/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-14 bg-gradient-to-t from-teal via-teal/80 to-transparent" />

          <div
            className="relative z-20 flex size-full items-center justify-center lg:justify-start"
            role="tablist"
            aria-label="App features"
          >
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                index - currentIndex,
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{ height: ITEM_HEIGHT, width: "fit-content" }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.24,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-3.5 rounded-full border px-6 py-3.5 text-left transition-all duration-700 md:px-8 md:py-4",
                      isActive
                        ? "z-10 border-sun bg-sun text-teal"
                        : "border-band-line bg-transparent text-band-ink/60 hover:border-sun/40 hover:text-band-ink",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[18px] shrink-0 transition-colors duration-500",
                        isActive ? "text-teal" : "text-band-ink/45",
                      )}
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium tracking-tight whitespace-nowrap uppercase md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stage */}
        <div className="relative flex min-h-[680px] flex-1 items-center justify-center overflow-hidden border-t border-line bg-paper px-6 py-12 md:px-12 lg:h-full lg:min-h-0 lg:border-t-0 lg:border-l lg:px-10 lg:py-12">
          <div className="relative flex aspect-[660/1434] w-full max-w-[260px] items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -110 : isNext ? 110 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.35 : 0,
                    rotate: isPrev ? -4 : isNext ? 4 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="screen-radius absolute inset-0 origin-center shadow-[0_30px_70px_-25px_rgba(4,32,30,0.55)]"
                  aria-hidden={!isActive}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt={feature.description}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "size-full object-cover object-top transition-all duration-700",
                      isActive ? "blur-0 grayscale-0" : "blur-[2px] grayscale",
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-deep/95 via-deep/50 to-transparent p-7 pt-28"
                      >
                        <div className="mb-3 w-fit rounded-full bg-sun px-3 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-teal uppercase">
                          {index + 1} · {feature.label}
                        </div>
                        <p className="font-serif text-2xl leading-tight tracking-tight text-sun">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;

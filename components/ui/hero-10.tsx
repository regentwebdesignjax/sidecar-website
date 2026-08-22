"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import * as React from "react";

import { Cta, type CtaProps } from "@/components/ui/hero-10-utils/cta";
import { cn } from "@/lib/utils";

export interface Hero10Props {
  title: string;
  titleLine2Prefix?: string;
  titleHighlight?: string;
  description: string;
  socialProof?: string;
  images: string[];
  imageAlts?: string[];
  animation?: "none" | "subtle";
  primaryCTA?: CtaProps;
  secondaryCTA?: CtaProps;
  variant?: "standard" | "compact";
  /** Sit on a teal contrast band instead of paper. */
  tone?: "paper" | "band";
}

const variantStyles = {
  standard: {
    section: "pt-36 pb-20 sm:pt-44 sm:pb-28",
    title: "text-[clamp(2.5rem,7vw,4.5rem)]",
    description: "max-w-xl text-base sm:text-lg",
    header: "gap-6",
    content: "gap-10 sm:gap-12",
    fan: "max-w-3xl",
    fanCard: "aspect-[660/1434]",
  },
  compact: {
    section: "pt-32 pb-14 sm:pt-40 sm:pb-20",
    title: "text-[clamp(2.25rem,5.5vw,3.5rem)]",
    description: "max-w-lg text-base",
    header: "gap-5",
    content: "gap-8 sm:gap-10",
    fan: "max-w-2xl",
    fanCard: "aspect-[660/1434]",
  },
} as const;

const fanSlots = [
  { width: "w-[30%]", layout: "-mr-6 sm:-mr-10 z-10", rotate: -7, x: 48, ty: 26 },
  { width: "w-[34%]", layout: "z-20", rotate: 0, x: 0, ty: -10 },
  { width: "w-[30%]", layout: "-ml-6 sm:-ml-10 z-10", rotate: 7, x: -48, ty: 26 },
];

const fanContainer: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const fanCard: Variants = {
  hidden: (slot: (typeof fanSlots)[number]) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot: (typeof fanSlots)[number]) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Reveal({
  active,
  variants,
  className,
  children,
}: Readonly<{
  active: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}>) {
  if (!active) return <div className={className}>{children}</div>;

  return (
    <motion.div variants={variants ?? item} className={className}>
      {children}
    </motion.div>
  );
}

function ImageFan({
  images,
  imageAlts,
  cardAspect,
  animate,
}: Readonly<{
  images: string[];
  imageAlts?: string[];
  cardAspect: string;
  animate: boolean;
}>) {
  return (
    <motion.div
      className="relative flex w-full items-end justify-center"
      variants={fanContainer}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      animate={animate ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
    >
      {images.slice(0, 3).map((src, i) => {
        const slot = fanSlots[i] ?? fanSlots[1];
        return (
          <motion.div
            key={src}
            custom={slot}
            variants={fanCard}
            className={cn(
              "screen-radius relative shrink-0 shadow-[0_24px_60px_-20px_rgba(4,32,30,0.45)]",
              cardAspect,
              slot.width,
              slot.layout,
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={imageAlts?.[i] ?? ""}
              loading="lazy"
              decoding="async"
              className="size-full object-cover object-top"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/**
 * Page-header hero, adapted from the supplied 21st.dev block: retyped in
 * Instrument Serif, repainted in Sidecar's palette, and given a `tone` so it can
 * sit on a teal band as well as on paper.
 */
export function Hero10({
  title,
  titleLine2Prefix,
  titleHighlight,
  description,
  socialProof,
  images,
  imageAlts,
  animation = "subtle",
  primaryCTA,
  secondaryCTA,
  variant = "standard",
  tone = "paper",
}: Readonly<Hero10Props>) {
  const reduce = useReducedMotion();
  const animate = animation === "subtle" && !reduce;
  const vs = variantStyles[variant];
  const onBand = tone === "band";

  // Line balancing is done with CSS `text-wrap: balance` (carried by the
  // `display` utility and `text-balance` below) rather than a JS balancer.
  // The JS approach injects an inline <script> into the component tree, which
  // React 19 warns about and which never executes on a client render anyway.
  const titleElement = title && (
    <h1 className={cn("display", onBand ? "text-band-ink" : "text-ink", vs.title)}>
      {title}
      {(titleLine2Prefix || titleHighlight) && (
        <>
          <br />
          {titleLine2Prefix && <span>{titleLine2Prefix} </span>}
          {titleHighlight && (
            <span className={cn("italic", onBand ? "text-sun" : "text-accent")}>
              {titleHighlight}
            </span>
          )}
        </>
      )}
    </h1>
  );

  const descriptionElement = description && (
    <p
      className={cn(
        onBand ? "text-band-dim" : "text-dim",
        vs.description,
        "leading-relaxed text-balance",
      )}
    >
      {description}
    </p>
  );

  const ctasElement = (primaryCTA?.ctaEnabled || secondaryCTA?.ctaEnabled) && (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
      {primaryCTA?.ctaEnabled && (
        <Cta
          cta={{
            ...primaryCTA,
            variant: primaryCTA.variant ?? (onBand ? "onBand" : "default"),
          }}
        />
      )}
      {secondaryCTA?.ctaEnabled && (
        <Cta
          cta={{
            ...secondaryCTA,
            variant:
              secondaryCTA.variant ?? (onBand ? "onBandOutline" : "outline"),
          }}
        />
      )}
    </div>
  );

  const socialProofElement = socialProof && (
    <p
      className={cn(
        "eyebrow",
        onBand ? "text-band-dim" : "text-faint",
      )}
    >
      {socialProof}
    </p>
  );

  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden",
        onBand ? "bg-teal" : "bg-paper",
      )}
    >
      <motion.div
        className={cn(
          "relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center",
          vs.section,
          vs.content,
        )}
        variants={animate ? container : undefined}
        initial={animate ? "hidden" : false}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true, margin: "-80px" }}
      >
        <Reveal
          active={animate}
          className={cn("flex w-full max-w-3xl flex-col items-center", vs.header)}
        >
          {titleElement}
          {descriptionElement}
        </Reveal>

        {(ctasElement || socialProofElement) && (
          <Reveal active={animate} className="flex flex-col items-center gap-4">
            {ctasElement}
            {socialProofElement}
          </Reveal>
        )}

        {images?.length ? (
          <div className={cn("mx-auto w-full", vs.fan)}>
            <ImageFan
              images={images}
              imageAlts={imageAlts}
              cardAspect={vs.fanCard}
              animate={animate}
            />
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}

export default Hero10;

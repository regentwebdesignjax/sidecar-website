/* eslint-disable @next/next/no-img-element -- static export: no image optimizer, assets are pre-sized */
"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";

import { gsap } from "@/components/motion/gsap";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { AppStoreBadge } from "@/components/site/app-store-badge";

import { handGlass } from "./story-data";

/**
 * Scene 1. A layered photographic hero on GSAP ScrollTrigger: as the section
 * scrolls away, each plane lags behind the page by its own amount (the plate
 * most, the hand least), so the depth is in the differential movement rather
 * than in any plane moving on its own. The headline sits between the planes.
 *
 * `data-layer` is the yPercent a plane travels across the section's exit;
 * bigger means further back.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const hand = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const layers = ref.current.querySelectorAll<HTMLElement>("[data-layer]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0,
          invalidateOnRefresh: true,
        },
      });
      layers.forEach((el) => {
        tl.to(el, { yPercent: parseFloat(el.dataset.layer || "0"), ease: "none" }, 0);
      });
      // The copy also dissolves as it leaves, so it never reads as a caption
      // stuck to the next scene's edge.
      const copy = ref.current.querySelector(".hero-copy");
      if (copy) tl.to(copy, { opacity: 0, ease: "none" }, 0.35);
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: ref, dependencies: [reduced] },
  );

  // The screen is laid out in the cutout's own pixels and scaled to the
  // rendered hand, so the measured quad lands on the glass at every size.
  useEffect(() => {
    const el = hand.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--hand-k", String(el.clientWidth / handGlass.ref.w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={ref} data-ground="light" className="scene--paper hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-plane hero-plate" data-layer="60">
          <picture>
            <source media="(max-width: 860px)" srcSet="/story/hero-plate-p.webp" />
            <img src="/story/hero-plate.webp" alt="" width={2000} height={1111} fetchPriority="high" />
          </picture>
        </div>
        <div className="hero-plane hero-light" data-layer="60" aria-hidden="true" />
        <div className="hero-plane hero-wash" aria-hidden="true" />

        <div className="hero-plane hero-card hero-card--rent" data-layer="46">
          <div className="hero-card-tilt">
            <img src="/story/card-rent.webp" alt="The Rent envelope: nothing spent yet of $1,450.00" width={640} height={515} />
          </div>
        </div>

        {/* Two more envelopes in the middle distance, between the copy and the hand. */}
        <div className="hero-plane hero-card hero-card--total" data-layer="52">
          <div className="hero-card-tilt">
            <img src="/story/card-total.webp" alt="Total on hand: $2,735.66" width={640} height={333} />
          </div>
        </div>
        <div className="hero-plane hero-card hero-card--eating" data-layer="36">
          <div className="hero-card-tilt">
            <img src="/story/card-eating.webp" alt="The Eating Out envelope: $12.00 left of $150.00" width={640} height={508} />
          </div>
        </div>

        <div className="hero-copy" data-layer="40">
          <h1 id="hero-title" className="sc-display">Every dollar gets a job.</h1>
          <p className="lede">Envelope budgeting for the two of you. No bank connection, no ads, nothing to untangle.</p>
          <div className="cta"><AppStoreBadge /></div>
        </div>

        <div className="hero-plane hero-card hero-card--groceries" data-layer="30">
          <div className="hero-card-tilt">
            <img src="/story/card-groceries.webp" alt="The Groceries envelope: $218.00 left of $600.00" width={640} height={508} />
          </div>
        </div>

        <div ref={hand} className="hero-plane hero-hand" data-layer="12">
          {/* The hand's own alpha masks this wrapper, so nothing can show
              outside the phone's silhouette whatever the size. */}
          <div className="hero-phone">
            <img src="/story/hero-hand.webp" alt="A hand holding a phone running Sidecar" width={1003} height={1895} fetchPriority="high" />
            <div className="hero-fit" style={{ width: handGlass.ref.w, height: handGlass.ref.h }}>
              <div
                className="hero-screen"
                style={{
                  left: handGlass.box.x,
                  top: handGlass.box.y,
                  width: handGlass.box.w,
                  height: handGlass.box.h,
                  transform: handGlass.matrix3d,
                }}
              >
                <img src="/device/home.webp" alt="" width={660} height={1434} />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-floor" aria-hidden="true" />
      </div>
    </section>
  );
}

/* eslint-disable @next/next/no-img-element -- static export: no image optimizer, assets are pre-sized */
"use client";

import { useEffect, useRef } from "react";

import { IconScreens } from "./icons";
import { screens } from "./story-data";

const N = screens.length;

/** Focus falls off fast, so only the item at the meeting point reads at full strength. */
function focusOf(strength: number, start: number, power: number) {
  const n = Math.min(1, Math.max(0, (strength - start) / (1 - start)));
  return Math.pow(n, power);
}
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wrap = (v: number) => ((v % 1) + 1) % 1;

/**
 * Scene 4, the peak. Two wheels turn under the scroll: the seven screen names
 * on the left, the seven real screens on the right. They meet in the middle,
 * where the current pair sits at full size while the rest recede around the
 * rim. The wheel position is read from the engine's `--sc-p` on the pinned
 * act, so the engine stays untouched and the harness sees a normal pin.
 *
 * Below 1025px the wheels give way to one phone that flips screen by screen,
 * with the name and caption above it: the same idea, sized for a hand.
 */
export function ScreenRoll() {
  const act = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = act.current;
    const st = stage.current;
    if (!el || !st) return;

    const titles = Array.from(st.querySelectorAll<HTMLElement>(".roll-title"));
    const phones = Array.from(st.querySelectorAll<HTMLElement>(".roll-phone"));
    const flips = Array.from(st.querySelectorAll<HTMLElement>(".flip-screen"));
    const flipCaps = Array.from(st.querySelectorAll<HTMLElement>(".flip-caption"));
    const wide = window.matchMedia("(min-width: 1025px)");
    const copy = st.querySelector<HTMLElement>(".peak-copy");
    const titleWheel = st.querySelector<HTMLElement>(".roll-titles");
    const phoneWheel = st.querySelector<HTMLElement>(".roll-phones");

    // Anything on a wheel that would pass behind the heading fades out first,
    // so the heading always sits on clear ground whatever the viewport.
    const clearOf = (cx: number, cy: number, halfW: number, halfH: number, box: DOMRect | null) => {
      if (!box) return 1;
      if (cx + halfW < box.left - 24 || cx - halfW > box.right + 24) return 1;
      const bottom = box.bottom + 24;
      if (cy - halfH > bottom) return 1;
      return Math.min(1, Math.max(0, (cy - bottom) / Math.max(1, halfH)));
    };

    let raf = 0;
    let live = false;
    let lastIndex = -1;

    const render = () => {
      raf = 0;
      const p = parseFloat(getComputedStyle(el).getPropertyValue("--sc-p")) || 0;
      // Reserve the entry and exit slides; the wheels turn across the pinned middle.
      const t = Math.min(1, Math.max(0, (p - 0.06) / 0.86));
      const s = t * ((N - 1) / N);
      const index = Math.min(N - 1, Math.round(s * N));

      if (wide.matches) {
        const vh = innerHeight;
        // Wider wheels, and only the previous, current and next item are ever
        // shown: the rest are parked out of sight so the frame stays quiet.
        const R1 = Math.min(330, Math.max(170, vh * 0.34));
        const R2 = Math.min(420, Math.max(230, vh * 0.44));
        const SLOTS = 6; // neighbours sit 60 degrees apart on the wheel
        const box = copy?.getBoundingClientRect() ?? null;
        const tw = titleWheel?.getBoundingClientRect();
        const pw = phoneWheel?.getBoundingClientRect();
        const phoneW = phones[0]?.offsetWidth || 220;
        const phoneH = phoneW * (1434 / 660);
        const titleH = titles[0]?.offsetHeight || 80;
        const titleW = titles[0]?.offsetWidth || 300;
        for (let i = 0; i < N; i++) {
          const local = wrap(i / N - s);
          const d = (local > 0.5 ? local - 1 : local) * N; // distance in items, signed
          const away = Math.abs(d);
          const angle = Math.PI / 2 - d * (Math.PI * 2 / SLOTS);
          const sin = Math.sin(angle), cos = Math.cos(angle);
          const strength = (sin + 1) / 2;
          // Fully visible up to one item away, gone by one and a half.
          const shown = away <= 1 ? 1 : away >= 1.5 ? 0 : 1 - (away - 1) / 0.5;

          const tf = focusOf(strength, 0.42, 2.6);
          const tx = (sin - 1) * R1, ty = cos * R1;
          const title = titles[i];
          const ts = lerp(0.62, 1, tf);
          title.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) translateY(-50%) scale(${ts.toFixed(3)})`;
          const tClear = tw ? clearOf(tw.right + tx - (titleW * ts) / 2, tw.top + ty, (titleW * ts) / 2, (titleH * ts) / 2, box) : 1;
          title.style.opacity = (lerp(0.34, 1, tf) * tClear * shown).toFixed(3);
          title.style.zIndex = String(Math.round(lerp(1, 30, tf)));
          (title.firstElementChild?.nextElementSibling as HTMLElement | null)?.style.setProperty("opacity", tf.toFixed(3));

          const pf = focusOf(strength, 0.45, 3.2);
          const px = (1 - sin) * R2, py = cos * R2;
          const phone = phones[i];
          const ps = lerp(0.6, 1, pf);
          phone.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translateY(-50%) scale(${ps.toFixed(3)})`;
          const pClear = pw ? clearOf(pw.left + px + (phoneW * ps) / 2, pw.top + py, (phoneW * ps) / 2, (phoneH * ps) / 2, box) : 1;
          phone.style.opacity = (lerp(0.3, 1, pf) * pClear * shown).toFixed(3);
          phone.style.zIndex = String(Math.round(lerp(1, 40, pf)));
        }
      }

      if (index !== lastIndex) {
        flips.forEach((f, k) => { f.classList.toggle("is-on", k === index); f.classList.toggle("is-off", k < index); });
        flipCaps.forEach((c, k) => c.classList.toggle("is-on", k === index));
        st.setAttribute("data-sc-verify-state", `screen:${index}`);
        lastIndex = index;
      }
      if (live) raf = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver((entries) => {
      live = entries.some((e) => e.isIntersecting);
      if (live && !raf) raf = requestAnimationFrame(render);
    }, { rootMargin: "20% 0px 20% 0px" });
    io.observe(el);
    const onResize = () => { if (!raf) raf = requestAnimationFrame(render); };
    addEventListener("resize", onResize, { passive: true });
    render();

    return () => {
      live = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={act} data-sc-act="pin" data-sc-span="5" data-ground="dark" className="scene--deep peak" aria-labelledby="peak-title">
      <div ref={stage} data-sc-stage className="peak-stage" data-sc-verify-state="screen:0">
        <div className="peak-plate" aria-hidden="true">
          <picture>
            <source media="(max-width: 860px)" srcSet="/story/peak-plate-p.webp" />
            <img src="/story/peak-plate.webp" alt="" width={2000} height={1111} loading="lazy" />
          </picture>
        </div>
        <div className="peak-scrim" aria-hidden="true" />

        <div className="peak-copy">
          <span className="icon-tile icon-tile--dark"><IconScreens size={26} /></span>
          <h2 id="peak-title" className="sc-display">This is the whole app.</h2>
          <p className="lede">Seven screens. Keep scrolling and you&apos;ll have seen all of them.</p>
        </div>

        {/* Wide: the two wheels. */}
        <div className="roll" aria-hidden="true">
          <div className="roll-titles">
            {screens.map((s) => (
              <div key={s.id} className="roll-title">
                <span className="roll-name">{s.tab}</span>
                <span className="roll-caption">{s.caption}</span>
              </div>
            ))}
          </div>
          <div className="roll-phones">
            {screens.map((s, i) => (
              <div key={s.id} className="roll-phone">
                <div className="device">
                  <img src={s.src} alt="" width={660} height={1434} loading={i === 0 ? "eager" : "lazy"} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrow: one phone that flips. Also the accessible reading order. */}
        <div className="flip">
          <div className="flip-captions" aria-live="polite">
            {screens.map((s, i) => (
              <p key={s.id} className={`flip-caption${i === 0 ? " is-on" : ""}`}>
                <span className="tab">{s.tab}</span>
                <span className="line">{s.caption}</span>
              </p>
            ))}
          </div>
          <div className="flip-phone">
            <div className="device">
              {screens.map((s, i) => (
                <div key={s.id} className={`flip-screen${i === 0 ? " is-on" : ""}`}>
                  <img src={s.src} alt={`${s.tab}: ${s.caption}`} width={660} height={1434} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

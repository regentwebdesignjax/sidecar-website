/* eslint-disable @next/next/no-img-element -- static export: no image optimizer, assets are pre-sized */
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { AppStoreBadge } from "@/components/site/app-store-badge";
import { siteConfig } from "@/lib/site.config";

import { Hero } from "./hero";
import {
  IconAdOff,
  IconBankOff,
  IconCartCheck,
  IconEnvelopeDollar,
  IconExport,
  IconEyeOff,
  IconListChecks,
  IconPaycheck,
  IconReceipts,
  IconShield,
  IconTwoPhones,
} from "./icons";
import { ScreenRoll } from "./screen-roll";

import "@/app/scrollcraft-engine.css";
import "@/app/story.css";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element | string, opts?: object) => unknown };
  }
}

const ENGINE_SRC = "/scrollcraft/scrollcraft.js";

/**
 * The homepage story: seven scenes on alternating grounds. The hero runs on
 * GSAP (components/story/hero.tsx); scenes 2 to 7 are driven by the
 * scroll-craft engine (public/scrollcraft/scrollcraft.js, untouched), and the
 * peak's wheels read the engine's progress variable (screen-roll.tsx).
 *
 * This component holds no state on purpose. The engine mutates the DOM (it
 * splits headlines into line spans), and a React re-render of this subtree
 * would put the original text back.
 */
export function Story() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    document.documentElement.setAttribute("data-story", "");

    let cancelled = false;
    const mountEngine = () => {
      if (cancelled || !window.ScrollCraft) return;
      window.ScrollCraft.mount(el);
    };
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${ENGINE_SRC}"]`);
    if (window.ScrollCraft) {
      mountEngine();
    } else if (existing) {
      existing.addEventListener("load", mountEngine, { once: true });
    } else {
      const s = document.createElement("script");
      s.src = ENGINE_SRC;
      s.async = true;
      s.addEventListener("load", mountEngine, { once: true });
      document.body.appendChild(s);
    }

    return () => {
      cancelled = true;
      document.documentElement.removeAttribute("data-story");
    };
  }, []);

  return (
    <div ref={root} className="story">
      {/* 1 · Calm ------------------------------------------------------------ */}
      <Hero />

      {/* 2 · Recognition: the mess, named ---------------------------------- */}
      <section data-sc-act="pin" data-sc-span="1.9" data-ground="dark" className="scene--deep" aria-label="The problem">
        <div data-sc-stage className="tension-stage">
          <div className="tension-plate"><img src="/story/tension-plate.webp" alt="" width={2000} height={1111} loading="lazy" /></div>
          <div className="tension-scrim" aria-hidden="true" />
          <div className="tension-copy">
            <span className="icon-tile icon-tile--dark" data-sc-cue="0 1 0 0.1"><IconReceipts size={26} /></span>
            <div className="tension-lines">
              <p data-sc-cue="0 0.3 0" data-sc-kinetic="lines">Sunday night. The account says one number.</p>
              <p data-sc-cue="0.24 0.54">The spreadsheet nobody updated says another.</p>
              <p data-sc-cue="0.48 0.78">And rent, groceries and the car payment are all due.</p>
              <p data-sc-cue="0.7 1 0.25 0.1">You don&apos;t need a bigger, better app. You just need to know what every dollar does and where it goes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · Relief: how it works, kept plain ------------------------------ */}
      <section data-sc-act="flow" data-ground="light" className="scene--paper how" aria-labelledby="how-title">
        <div className="how-grid">
          <div data-sc-in data-sc-stagger="70">
            <span className="icon-tile"><IconListChecks size={26} /></span>
            <h2 id="how-title" className="sc-display">Three things your budget app should help you do.</h2>
            <ol>
              <li>
                <span className="step-icon"><IconPaycheck size={22} /></span>
                <div><h3>Track when money comes in</h3><p>Tell Sidecar about your paycheck once. Fixed amounts for the bills that don&apos;t move, percentages for everything else. It posts on the day and divides itself.</p></div>
              </li>
              <li>
                <span className="step-icon"><IconEnvelopeDollar size={22} /></span>
                <div><h3>Give every dollar a job</h3><p>Rent, groceries, petrol, the school run. Each envelope holds a real number, and that number is what you have.</p></div>
              </li>
              <li>
                <span className="step-icon"><IconCartCheck size={22} /></span>
                <div><h3>Help you spend without guessing</h3><p>Standing in a shop, you open the envelope and the answer is already there.</p></div>
              </li>
            </ol>
          </div>
          <figure className="how-phone device" data-sc-in>
            <img src="/device/split-income.webp" alt="Dividing a paycheck across envelopes: fixed amounts first, then percentages" width={660} height={1434} loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 4 · The peak: the wheels ------------------------------------------ */}
      <ScreenRoll />

      {/* 5 · Trust: four refusals, smallest type on the page --------------- */}
      <section data-sc-act="flow" data-ground="light" className="scene--paper trust" aria-labelledby="trust-title">
        <div className="trust-inner" data-sc-in data-sc-stagger="60">
          <div>
            <span className="icon-tile"><IconShield size={26} /></span>
            <h2 id="trust-title" className="sc-display">We value your privacy.</h2>
          </div>
          <div>
            {/* Each refusal draws its own strike as the list arrives. */}
            <ul>
              <li><span className="row-icon"><IconBankOff size={22} /></span><b>No bank connection</b><span>Nothing imported. No credentials, ever.</span></li>
              <li><span className="row-icon"><IconAdOff size={22} /></span><b>No ads</b><span>Nothing in the app is selling you something else.</span></li>
              <li><span className="row-icon"><IconEyeOff size={22} /></span><b>No analytics, no trackers</b><span>No SDKs. No advertising identifier.</span></li>
              <li><span className="row-icon"><IconExport size={22} /></span><b>Yours to take with you</b><span>Export to CSV. Delete everything from Settings.</span></li>
            </ul>
            <p className="foot">Every figure in Sidecar is one you typed. A few seconds a day, and your financial life isn&apos;t in one more company&apos;s database. <Link href="/privacy">Read the whole policy.</Link></p>
          </div>
        </div>
      </section>

      {/* 6 · Warmth: one budget, two phones -------------------------------- */}
      <section data-sc-act="pin" data-sc-span="1.5" data-ground="dark" className="scene--teal" aria-labelledby="two-title">
        <div data-sc-stage className="two-stage">
          <div className="two-inner">
            <div className="two-copy">
              <span className="icon-tile icon-tile--dark" data-sc-cue="0 0.92 0"><IconTwoPhones size={26} /></span>
              <h2 id="two-title" className="sc-display" data-sc-cue="0 0.92 0">One budget. Two phones.</h2>
              <p data-sc-cue="0.12 0.92">Log the shop on the way home. It&apos;s on their phone before you are.</p>
              <p className="small" data-sc-cue="0.5 0.92">Owners invite and remove. Remove someone and their access ends that instant.</p>
            </div>
            <div className="two-phones">
              <figure>
                <figcaption>Yours</figcaption>
                <div className="device"><img src="/device/activity.webp" alt="The Activity screen on one phone, with a Shell purchase logged just now" width={660} height={1434} loading="lazy" /></div>
              </figure>
              <figure>
                <figcaption>Theirs</figcaption>
                <div className="device">
                  <img src="/device/activity.webp" alt="The same Activity screen on a partner's phone, the new purchase arriving" width={660} height={1434} loading="lazy" />
                  <div className="two-cover" aria-hidden="true" />
                  <div className="two-ring" aria-hidden="true"><span>Just now</span></div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Resolve: everything stops ------------------------------------- */}
      <section id="download" data-sc-act="flow" data-ground="sun" className="scene--sun close" data-sc-spotlight aria-labelledby="close-title">
        <div className="close-light" aria-hidden="true" />
        <div className="close-inner">
          <img className="close-mark" src="/story/sidecar-mark.svg" alt="" width={80} height={54} data-sc-cue="0.02" />
          <h2 id="close-title" className="sc-display" data-sc-cue="0.05" data-sc-kinetic="lines">&ldquo;Honey, I think we should try this one.&rdquo;</h2>
          <p className="lede" data-sc-cue="0.12">Free today. Sidecar Plus is coming, and what you use now stays free.</p>
          <div className="cta" data-sc-cue="0.18" data-sc-rise="0" data-sc-magnet="0.24"><AppStoreBadge /></div>
        </div>
        <footer className="close-foot">
          <nav aria-label="Footer">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <Link href="/support">Support</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={`mailto:${siteConfig.legal.email}`}>{siteConfig.legal.email}</a>
          </nav>
          <p>&copy; {new Date().getFullYear()} {siteConfig.legal.entity}. Not connected to any bank. Not financial advice.</p>
        </footer>
      </section>
    </div>
  );
}

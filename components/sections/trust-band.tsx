import { Landmark, EyeOff, Megaphone, Trash2 } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

const POINTS = [
  {
    icon: Landmark,
    title: "Freedom from bank connections",
    body: "No need to hand over your banking credentials or sync sensitive data with third-party integrations.",
  },
  {
    icon: EyeOff,
    title: "Safe from lurking trackers",
    body: "Budget in peace, without worrying about hidden analytics or sneaky advertising trackers following your every move.",
  },
  {
    icon: Megaphone,
    title: "You'll never see an ad",
    body: "Focus entirely on your money goals because we will never try to sell you anything inside the app–of course, except your subscription.",
  },
  {
    icon: Trash2,
    title: "You can leave anytime",
    body: "You're always in control. Export your data to a CSV and delete your account with one tap–it's gone instantly.",
  },
];

/**
 * The trust band. Sidecar's sharpest differentiator is what it refuses to do,
 * so it gets a full-width teal statement rather than a row of feature cards.
 */
export function TrustBand() {
  return (
    <section className="bg-teal px-6 py-28 text-band-ink sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="eyebrow text-band-dim">The part nobody else advertises</p>
          <SplitHeadline className="display mt-4 text-[clamp(2.25rem,5.5vw,4rem)] text-band-ink">
            Your financial life
            <br />
            <span className="text-sun italic">stays private.</span>
          </SplitHeadline>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-band-dim">
            Your data belongs to you. With Sidcar, you never have to worry about handing over your bank logins to third parties or being stalked by advertisers.
          </p>
        </div>

        <Reveal
          stagger
          className="mt-16 grid gap-px overflow-hidden rounded-card border border-band-line bg-band-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {POINTS.map((point) => (
            <div key={point.title} className="bg-teal p-7">
              <point.icon className="size-6 text-sun" strokeWidth={1.5} />
              <h3 className="mt-5 font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-band-dim">
                {point.body}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

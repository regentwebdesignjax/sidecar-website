import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";

const BEATS = [
  "You both see the big picture: Share a single budget across two phones, with numbers that update live for both of you.",
  "You're always in sync: When you a grocery run on the way home, your spouse sees it instantly. Now you can conquer your financial goals together.",
  "You manage the access: As the owner, you can easily invite your spouse to join your budget, keeping you perfectly aligned.",
  "Why stop at one?: Create additional budgets to keep track of special home projects, that family vacation or larger savings goals.",
];

export function BuiltForTwo() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/couple-working-on-budget.webp"
              alt="Two people going over a budget together at a kitchen table"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-teal/25 mix-blend-multiply"
            />
          </div>
        </Reveal>

        <div>
          <p className="eyebrow text-accent">Built for the two of you</p>
          <SplitHeadline className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)]">
            One household budget.
            <br />
            <span className="text-accent italic">Two phones.</span>
          </SplitHeadline>
          <p className="mt-7 text-lg leading-relaxed text-dim">
            Managing household finances is a team sport! Most budgets faily because the burden falls on just one person. With Sidecar, you and your spouse can finally stay on the exact same page without the usual money stress.
          </p>

          <Reveal stagger className="mt-9 space-y-4">
            {BEATS.map((beat) => (
              <div key={beat} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <p className="leading-relaxed text-ink/85">{beat}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

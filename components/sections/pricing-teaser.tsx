import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { Button } from "@/components/ui/button";

export function PricingTeaser() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-accent">Pricing</p>
        <SplitHeadline className="display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
          Start Achieving Your Goals for Free!
        </SplitHeadline>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-dim">
          You can start using every amazing feature you see here today, completely for free. 
          No credit card required, and no hidden trial periods! While we plan to add an optional
          paid tier down the road, the core features you and your partner rely on will always remain free.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/pricing">See what&apos;s planned</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/features">Browse the features</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}

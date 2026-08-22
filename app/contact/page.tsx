import type { Metadata } from "next";
import Link from "next/link";

import { SplitHeadline } from "@/components/motion/split-headline";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Questions, bugs, or feature requests — reach Sidecar at ${siteConfig.legal.email}.`,
};

export default function ContactPage() {
  return (
    <section className="px-6 pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Contact</p>
          <SplitHeadline
            as="h1"
            immediate
            className="display mt-5 text-[clamp(2.75rem,7vw,4.5rem)]"
          >
            Talk to the people who built it.
          </SplitHeadline>
          <p className="mt-7 text-lg leading-relaxed text-dim">
            Sidecar is made by a very small team, so your message goes to us
            rather than a queue. We read everything.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <ContactForm />

          <div className="space-y-10">
            <div>
              <h2 className="eyebrow text-faint">Email</h2>
              <a
                href={`mailto:${siteConfig.legal.email}`}
                className="mt-3 block font-serif text-2xl break-words text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.legal.email}
              </a>
            </div>

            <div>
              <h2 className="eyebrow text-faint">Already using Sidecar?</h2>
              <p className="mt-3 leading-relaxed text-dim">
                Most answers are on the{" "}
                <Link href="/support" className="text-accent underline underline-offset-4">
                  support page
                </Link>
                {" "}— exporting your data, deleting your account, and how shared
                budgets work.
              </p>
            </div>

            <div>
              <h2 className="eyebrow text-faint">Privacy requests</h2>
              <p className="mt-3 leading-relaxed text-dim">
                Access, correction, export, and deletion requests reach us at
                the same address, and we respond within 30 days. Most of it you
                can do yourself in Settings — see the{" "}
                <Link href="/privacy" className="text-accent underline underline-offset-4">
                  privacy policy
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="eyebrow text-faint">Who we are</h2>
              <p className="mt-3 leading-relaxed text-dim">
                {siteConfig.legal.entity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

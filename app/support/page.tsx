import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeadline } from "@/components/motion/split-headline";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help with Sidecar — exporting your data, deleting your account, shared budgets, scheduled items, and how paycheck splitting works.",
};

/** Answers describe what the app actually does; keep them in step with it. */
const GROUPS = [
  {
    title: "Getting started",
    items: [
      {
        q: "Does Sidecar connect to my bank?",
        a: "No, and it never will. Sidecar has no link to any financial institution. It does not import transactions, move money, or hold account numbers. Every figure in the app is one you typed in.",
      },
      {
        q: "How do envelopes work?",
        a: "You create an envelope for each thing you spend on — rent, groceries, petrol — and fund it. Spending against an envelope reduces what's left in it. Anything not yet assigned to an envelope shows as unallocated.",
      },
      {
        q: "Can I move money between envelopes?",
        a: "Yes. On the Envelopes screen, use Move funds to transfer between envelopes or from unallocated.",
      },
    ],
  },
  {
    title: "Paychecks and bills",
    items: [
      {
        q: "How does automatic paycheck splitting work?",
        a: "Tell Sidecar the amount, how often it arrives, and where it should go. Fixed shares come out first; percentages then split what's left. A bigger or smaller payday still divides sensibly without you re-editing anything.",
      },
      {
        q: "What does 'post' mean on a scheduled item?",
        a: "Scheduled income and bills appear in Coming up before their due date. Posting one records it as a real transaction and applies it to your balance and envelopes.",
      },
    ],
  },
  {
    title: "Sharing a budget",
    items: [
      {
        q: "How do I share a budget with my partner?",
        a: "Settings → Shared budget, then invite them by email. They'll see the same envelopes, transactions, balances and scheduled items, updating live, and can add and edit entries.",
      },
      {
        q: "What happens if I remove someone?",
        a: "Their access ends immediately. Anything they entered while they were a member stays with the budget. If you delete a budget you own, it goes for everyone in it.",
      },
    ],
  },
  {
    title: "Your data",
    items: [
      {
        q: "How do I export my transactions?",
        a: "Settings → Export data produces a CSV of every transaction in your budget, yours to keep or move elsewhere.",
      },
      {
        q: "How do I delete my account?",
        a: "Settings → Delete account. This removes your account, your profile, and every budget you solely own, along with everything in them. It happens immediately and cannot be undone. If you own a budget other people are members of, transfer ownership first or it is deleted for everyone.",
      },
      {
        q: "Where is my data stored?",
        a: `On infrastructure located in ${siteConfig.legal.dataRegion}, protected by row-level security so a request can only ever reach budgets you belong to.`,
      },
    ],
  },
  {
    title: "Accounts and sign-in",
    items: [
      {
        q: "What are the password requirements?",
        a: "At least 10 characters, with an uppercase letter, a lowercase letter, a digit and a symbol. You can also use Sign in with Apple or Google sign-in.",
      },
      {
        q: "Do I need to be a certain age?",
        a: "You must be at least 13 years old to use Sidecar.",
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="px-6 pt-36 pb-16 sm:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow text-accent">Support</p>
          <SplitHeadline
            as="h1"
            immediate
            className="display mt-5 text-[clamp(2.75rem,7vw,4.5rem)]"
          >
            How can we help?
          </SplitHeadline>
          <p className="mt-7 text-lg leading-relaxed text-dim">
            The common questions are below. Anything else, email{" "}
            <a
              href={`mailto:${siteConfig.legal.email}`}
              className="text-accent underline underline-offset-4"
            >
              {siteConfig.legal.email}
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="text-accent underline underline-offset-4">
              contact form
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl space-y-16">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="font-serif text-3xl">{group.title}</h2>
              <Reveal
                stagger
                className="mt-6 divide-y divide-line border-y border-line"
              >
                {group.items.map((item) => (
                  // A shared `name` makes every question on the page one
                  // exclusive accordion: opening any answer closes the one
                  // already open. Native behaviour, no JavaScript involved.
                  <details key={item.q} name="support-faq" className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
                      {item.q}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-2xl text-faint transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-dim">{item.a}</p>
                  </details>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

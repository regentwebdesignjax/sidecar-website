export type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: { monthly: string; annual: string } | null;
  annualNote?: string;
  badge?: string;
  features: string[];
  cta: string;
  available: boolean;
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Sidecar",
    tagline: "Everything the app does today. Not a trial.",
    price: { monthly: "$0", annual: "$0" },
    features: [
      "Unlimited envelopes",
      "Scheduled bills and paychecks",
      "Automatic paycheck splitting",
      "Split one purchase across envelopes",
      "Full activity ledger with running balances",
      "Reports by week, month and quarter",
      "Shared budgets with a partner",
      "CSV export of every transaction",
      "No ads, no analytics, no trackers",
    ],
    cta: "Get Sidecar",
    available: true,
  },
  {
    id: "plus",
    name: "Sidecar Plus",
    tagline: "Not built yet. Here's what it will cost when it is.",
    price: { monthly: "$3.99", annual: "$29.99" },
    annualNote: "Two months free on annual",
    badge: "Coming soon",
    features: [
      "Everything in Sidecar",
      "Shared budgets with a partner",
      "CSV export of every transaction",
      "Unlimited envelopes",
      "Advanced reports and full history",
    ],
    cta: "Not yet available",
    available: false,
  },
];

/**
 * Sidecar's Terms promise that existing functionality will not move behind a
 * paywall without notice — and the four Plus features all ship free today.
 * This line is that notice, and the commitment that goes with it.
 */
export const grandfatherNote =
  "Already using these? They stay free on your account. Sidecar Plus will only ever gate these features for accounts created after it launches — our Terms promise that existing functionality you rely on won't move behind a paywall, and we intend to keep it.";

export const comparison = {
  columns: ["Sidecar", "Bank-linked budgeting apps"],
  rows: [
    {
      label: "Connects to your bank",
      sidecar: "Never",
      others: "Required to work",
      sidecarGood: true,
    },
    {
      label: "Asks for banking credentials",
      sidecar: "No",
      others: "Yes, usually via a third party",
      sidecarGood: true,
    },
    {
      label: "Third-party analytics and trackers",
      sidecar: "None",
      others: "Common",
      sidecarGood: true,
    },
    {
      label: "Advertising",
      sidecar: "None",
      others: "Often, or an upsell tier",
      sidecarGood: true,
    },
    {
      label: "Sells or shares your data",
      sidecar: "No — we don't collect anything to sell",
      others: "Check the policy carefully",
      sidecarGood: true,
    },
    {
      label: "Entering transactions",
      sidecar: "By hand, a few seconds a day",
      others: "Imported automatically",
      sidecarGood: false,
    },
    {
      label: "Export your data",
      sidecar: "CSV, any time",
      others: "Varies",
      sidecarGood: true,
    },
    {
      label: "Delete everything",
      sidecar: "From Settings, immediately",
      others: "Varies",
      sidecarGood: true,
    },
  ],
};

export const faqs = [
  {
    q: "Is Sidecar really free?",
    a: "Yes. Every feature described on this site works today at no cost, with no trial period and no card required. Sidecar Plus is a plan we intend to build, not something you're being upsold into.",
  },
  {
    q: "Why doesn't Sidecar connect to my bank?",
    a: "Because connecting means handing your banking credentials to a third-party aggregator and letting your entire financial history sit in one more company's database. Typing in what you spend takes a few seconds a day, and in exchange none of that happens.",
  },
  {
    q: "What happens to my free account when Plus launches?",
    a: "Nothing changes. Features you're already using stay free on your account. Our Terms commit to not moving existing functionality behind a paywall without notice, and this page is part of keeping that promise.",
  },
  {
    q: "Can two people share one budget?",
    a: "Yes. Invite your partner and you both see the same numbers, updating live. Owners can invite and remove members; removing someone ends their access immediately.",
  },
  {
    q: "Can I get my data out?",
    a: "Settings → Export data produces a CSV of every transaction in your budget. Settings → Delete account removes your account, your profile, and every budget you solely own.",
  },
];

import {
  BanknoteArrowUp,
  CalendarClock,
  ChartNoAxesColumn,
  Download,
  EyeOff,
  Landmark,
  Mail,
  ReceiptText,
  Split,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
};

/**
 * Every entry here is a capability the app actually ships, per the App Store
 * description in store/app-store-metadata.md. Do not add aspirational ones.
 */
export const features: Feature[] = [
  {
    id: "envelopes",
    title: "Give every dollar a job",
    blurb:
      "Rent, groceries, petrol, the school run — each gets an envelope. Standing in a shop wondering whether you can afford something, the answer is a number rather than a guess.",
    icon: Mail,
  },
  {
    id: "split-income",
    title: "Pay that sorts itself",
    blurb:
      "Tell Sidecar about your paycheck once. Fixed amounts for the bills that don't move, percentages for everything else. A raise or a short week redistributes sensibly without you re-editing anything.",
    icon: BanknoteArrowUp,
  },
  {
    id: "schedule",
    title: "Bills that post themselves",
    blurb:
      "Scheduled income and bills land on their due date and divide the same way every time. See the next thirty days — money in and money out — before it happens.",
    icon: CalendarClock,
  },
  {
    id: "split-expense",
    title: "Split one shop properly",
    blurb:
      "One trip to a big shop is rarely one category. Split it across as many envelopes as it deserves, with a real amount for each, and it stays legible in your history afterwards.",
    icon: Split,
  },
  {
    id: "activity",
    title: "A ledger you can read",
    blurb:
      "Every entry grouped by day with a running balance, filterable to money in or money out. Split purchases expand to show exactly where each piece landed.",
    icon: ReceiptText,
  },
  {
    id: "reports",
    title: "Watch where it actually goes",
    blurb:
      "Spending by envelope over a week, a month, or a quarter, with money in and money out side by side, and this period measured against the last.",
    icon: ChartNoAxesColumn,
  },
  {
    id: "shared",
    title: "Built for two",
    blurb:
      "Share a budget and you both see the same numbers, updating live. Log a shop on the way home and it's on their phone before you are. Remove someone and their access ends immediately.",
    icon: Users,
  },
  {
    id: "export",
    title: "Your data leaves when you do",
    blurb:
      "Export every transaction to CSV whenever you want it. Delete your account from Settings and your budgets go with it.",
    icon: Download,
  },
  {
    id: "no-bank",
    title: "No bank connection",
    blurb:
      "Nothing is imported, nothing is synced from your accounts, and we never ask for banking credentials. You enter what you spend — a few seconds a day.",
    icon: Landmark,
  },
  {
    id: "no-tracking",
    title: "No ads, no tracking",
    blurb:
      "No advertising, no analytics, no third-party trackers. We don't sell your information, because we don't collect anything to sell.",
    icon: EyeOff,
  },
];

/** The seven App Store screenshots with their real captions. */
export const screenshots = [
  {
    id: "home",
    src: "/device/home.webp",
    label: "Home",
    caption: "Every dollar gets a job",
  },
  {
    id: "envelopes",
    src: "/device/envelopes.webp",
    label: "Envelopes",
    caption: "See what's left before you spend",
  },
  {
    id: "split-expense",
    src: "/device/split-expense.webp",
    label: "Split a shop",
    caption: "Split one shop across several envelopes",
  },
  {
    id: "activity",
    src: "/device/activity.webp",
    label: "Activity",
    caption: "And see exactly where it landed",
  },
  {
    id: "split-income",
    src: "/device/split-income.webp",
    label: "Paychecks",
    caption: "Divide your pay automatically",
  },
  {
    id: "schedule",
    src: "/device/schedule.webp",
    label: "Scheduled",
    caption: "Bills and paychecks post themselves",
  },
  {
    id: "reports",
    src: "/device/reports.webp",
    label: "Reports",
    caption: "Watch where it actually goes",
  },
] as const;

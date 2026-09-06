/**
 * Content for the homepage story. Every screen and caption here is a real App
 * Store asset or its real caption from store/app-store-metadata.md; nothing is
 * invented, and there are no figures, so there are no counters.
 */
export const screens = [
  {
    id: "home",
    src: "/device/home.webp",
    tab: "Home",
    caption: "Every dollar gets a job.",
    callout: "Total on hand, before anything is spent.",
  },
  {
    id: "envelopes",
    src: "/device/envelopes.webp",
    tab: "Envelopes",
    caption: "See what's left before you spend.",
    callout: "What's left, not what went out.",
  },
  {
    id: "split-income",
    src: "/device/split-income.webp",
    tab: "Paycheck",
    caption: "Divide your pay automatically.",
    callout: "Fixed amounts first, percentages after.",
  },
  {
    id: "schedule",
    src: "/device/schedule.webp",
    tab: "Scheduled",
    caption: "Bills and paychecks post themselves.",
    callout: "Posts on the due date, divided the same way every time.",
  },
  {
    id: "split-expense",
    src: "/device/split-expense.webp",
    tab: "Add",
    caption: "Split one shop across several envelopes.",
    callout: "A real amount for each envelope.",
  },
  {
    id: "activity",
    src: "/device/activity.webp",
    tab: "Activity",
    caption: "And see exactly where it landed.",
    callout: "Every entry, with a running balance.",
  },
  {
    id: "reports",
    src: "/device/reports.webp",
    tab: "Reports",
    caption: "Watch where it actually goes.",
    callout: "Spending by envelope, this period against the last.",
  },
] as const;

/** Measured from the keyed hand cutout: where the phone's glass sits, in % of the image box. */
/**
 * The phone glass in the hand cutout (public/story/hero-hand.webp, 1003x1895px).
 * The photographed phone is very slightly sheared, so the screen is a quad,
 * not a rectangle: `box` is its bounding box in cutout pixels and `matrix3d`
 * maps that box onto the measured corners. hero.tsx scales the whole thing by
 * the rendered hand width over 1003.
 */
export const handGlass = {
  ref: { w: 1003, h: 1895 },
  box: { x: 309.2, y: 18, w: 510.7, h: 1114 },
  matrix3d: "matrix3d(0.957861, 0.0, 0, 0.0, -0.018053, 0.957861, 0, -3.8e-05, 0, 0, 1, 0, 20.110726, 0.0, 0, 1)",
} as const;

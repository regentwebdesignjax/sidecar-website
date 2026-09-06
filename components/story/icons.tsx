/**
 * Story icons, drawn in the Sidecar icon idiom: a 24px grid, 2px stroke, round
 * caps and joins, never filled, one colour (currentColor). Each one is bespoke
 * to the scene it opens, so the set reads as Sidecar's own rather than a stock
 * Lucide pick, while sitting next to Lucide without a seam.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Scene 2: a stack of receipts and a ledger that no longer agree. */
export function IconReceipts(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 3h10a1 1 0 0 1 1 1v16l-2.5-1.5L13 20l-2.5-1.5L8 20l-2-1.5V4a1 1 0 0 1 1-1z" />
      <path d="M9.5 8h5" />
      <path d="M9.5 11.5h5" />
      <path d="M9.5 15h2.5" />
    </Svg>
  );
}

/** Scene 3 header: three things in order, ticked. */
export function IconListChecks(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 6 1.5 1.5L7 5" />
      <path d="m3 12 1.5 1.5L7 11" />
      <path d="m3 18 1.5 1.5L7 17" />
      <path d="M11 6h10" />
      <path d="M11 12h10" />
      <path d="M11 18h10" />
    </Svg>
  );
}

/** Step 1: money arriving. */
export function IconPaycheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v10" />
      <path d="m8.5 9.5 3.5 3.5 3.5-3.5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </Svg>
  );
}

/** Step 2: an envelope with a dollar inside. */
export function IconEnvelopeDollar(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 8.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5" />
      <path d="m3 8.5 9-5.5 9 5.5" />
      <path d="M14.2 12.2c0-.9-.9-1.5-2.2-1.5s-2.2.6-2.2 1.4c0 2 4.4.8 4.4 2.9 0 .9-1 1.5-2.2 1.5s-2.2-.6-2.2-1.4" />
      <path d="M12 9.6v1.1M12 16.5v1.1" />
    </Svg>
  );
}

/** Step 3: a basket, and the answer already in it. */
export function IconCartCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M2 3h2.5l2.4 11.2a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.5L21 8H6" />
      <path d="m10.5 11 1.8 1.8L15.5 9.5" />
    </Svg>
  );
}

/** Scene 4: seven screens, fanned. */
export function IconScreens(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
      <path d="M4 6v12" />
      <path d="M20 6v12" />
    </Svg>
  );
}

/** Scene 5: a bank, struck through. */
export function IconBankOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 9 9-5 9 5" />
      <path d="M4 9h16" />
      <path d="M6 12v5" />
      <path d="M10 12v2.5" />
      <path d="M18 12v5" />
      <path d="M3 20h18" />
      <path d="m4 4 16 16" className="strike" />
    </Svg>
  );
}

/** Scene 6: two phones, one budget passing between them. */
export function IconTwoPhones(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2" y="4" width="7.5" height="16" rx="2" />
      <rect x="14.5" y="4" width="7.5" height="16" rx="2" />
      <path d="M9.5 10h5" />
      <path d="m12.5 8 2 2-2 2" />
      <path d="M14.5 15h-5" />
      <path d="m11.5 13-2 2 2 2" />
    </Svg>
  );
}

/** Scene 5 header: a shield, plain. */
export function IconShield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4.5 6v5c0 4.6 3.2 7.9 7.5 10 4.3-2.1 7.5-5.4 7.5-10V6L12 3z" />
      <path d="m9 12 2 2 4-4" className="draw" />
    </Svg>
  );
}

/** No ads: a megaphone, struck through. */
export function IconAdOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l4 4V5L7 9H5a1 1 0 0 0-1 1z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M18 7a7 7 0 0 1 0 10" />
      <path d="m4 4 16 16" className="strike" />
    </Svg>
  );
}

/** No trackers: an eye, struck through. */
export function IconEyeOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
      <path d="m4 4 16 16" className="strike" />
    </Svg>
  );
}

/** Yours to take with you: a file leaving a tray. */
export function IconExport(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
      <path d="M12 15V4" className="lift" />
      <path d="m8 8 4-4 4 4" className="lift" />
    </Svg>
  );
}

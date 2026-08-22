import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * The call-to-action shape Hero10 expects. The 21st.dev snippet imports this
 * module but never shipped it, so it is implemented here against our Button.
 */
export interface CtaProps {
  ctaEnabled?: boolean;
  text: string;
  link: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
}

export function Cta({ cta }: Readonly<{ cta: CtaProps }>) {
  const { text, link, variant = "default", size = "default" } = cta;

  // An empty link means "no destination yet" — render a disabled button rather
  // than an anchor that goes nowhere.
  if (!link) {
    return (
      <Button variant={variant} size={size} disabled>
        {text}
      </Button>
    );
  }

  const external = link.startsWith("http");

  return (
    <Button variant={variant} size={size} asChild>
      {external ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <Link href={link}>{text}</Link>
      )}
    </Button>
  );
}

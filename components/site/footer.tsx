import Link from "next/link";

import { AppStoreBadge } from "@/components/site/app-store-badge";
import { Wordmark } from "@/components/site/logo";
import { footerLinks, siteConfig } from "@/lib/site.config";

export function Footer() {
  return (
    <footer className="border-t border-band-line bg-teal text-band-ink">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-md">
            <Wordmark className="text-3xl text-sun" />
            <p className="mt-5 text-lg text-band-dim">
              Envelope budgeting for people who want to know what they can
              actually spend.
            </p>
            <div className="mt-8">
              <AppStoreBadge tone="onBand" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h2 className="eyebrow text-band-dim">{group}</h2>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-band-ink/85 transition-colors hover:text-sun"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-band-line pt-8 text-sm text-band-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legal.entity}
          </p>
          <p>
            Sidecar is not connected to any bank and is not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { siteConfig } from "@/lib/site.config";

/**
 * Shared chrome for /terms and /privacy. The prose styles live here so the
 * legal copy itself stays plain JSX — these documents are quoted verbatim and
 * should be easy to diff against their source.
 */
export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <article className="px-6 pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="display text-[clamp(2.5rem,6vw,4rem)]">{title}</h1>
        <p className="mt-6 text-sm text-faint">
          Last updated: {siteConfig.legal.lastUpdated}
        </p>
        {intro && (
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/85">
            {intro}
          </div>
        )}

        <hr className="my-12 border-line" />

        <div
          className="space-y-5 leading-relaxed text-ink/85 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:text-ink [&_h2:first-child]:mt-0 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6"
        >
          {children}
        </div>

      </div>
    </article>
  );
}

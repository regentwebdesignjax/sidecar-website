"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site.config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page and allow Escape to dismiss while the sheet is open.
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-out-expo)]",
        // The bar has to be opaque whenever the sheet is open, otherwise the
        // hero (and the 3D envelopes behind it) show through the top strip.
        open || scrolled
          ? "border-b border-line bg-paper/90 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="relative z-10 mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <Link href="/" aria-label="Sidecar home" className="shrink-0">
          <Logo className="h-7" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-ink"
                      : "text-dim hover:bg-teal/6 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link href="/pricing">Get Sidecar</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid size-11 place-items-center rounded-full text-ink"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      </header>

      {/*
        A full-height overlay, and deliberately a *sibling* of the header
        rather than a child of it.

        The header carries `backdrop-blur`, and backdrop-filter makes an element
        a containing block for fixed-position descendants — so inside the header
        this panel's `top: 72px; bottom: 0` resolved against the 73px-tall bar
        and collapsed to nothing. Out here it resolves against the viewport, as
        intended.

        Kept mounted so it can transition, and made `inert` when closed so its
        links stay out of the tab order.
      */}
      <div
        id="mobile-nav"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper px-6 pt-2 pb-10 transition-all duration-300 ease-[var(--ease-out-expo)] md:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0",
        )}
      >
        <ul className="flex flex-col">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-5 font-serif text-3xl"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="block border-b border-line py-5 font-serif text-3xl"
            >
              Support
            </Link>
          </li>
        </ul>

        <Button className="mt-8 w-full" size="lg" asChild>
          <Link href="/pricing" onClick={() => setOpen(false)}>
            Get Sidecar
          </Link>
        </Button>
      </div>
    </>
  );
}

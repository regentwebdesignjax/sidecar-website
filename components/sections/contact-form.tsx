"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site.config";

const TOPICS = [
  { value: "support", label: "Support" },
  { value: "bug", label: "Bug report" },
  { value: "feature", label: "Feature request" },
  { value: "privacy", label: "Privacy or data" },
  { value: "other", label: "Something else" },
];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-line bg-card px-4 py-3 text-ink placeholder:text-faint focus:border-accent focus:outline-none";

/**
 * Netlify Forms. The static export has no server, so this posts urlencoded
 * data to /__forms.html — the static file Netlify's crawler registered at
 * deploy time — and renders its own success state rather than navigating.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    data.set("form-name", "contact");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-teal/25 bg-card p-10 text-center">
        <p className="font-serif text-3xl">Thank you — that reached us.</p>
        <p className="mt-4 leading-relaxed text-dim">
          We read everything that comes in and reply from{" "}
          {siteConfig.legal.email}. If it&apos;s urgent, email us directly and
          it lands in the same place.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-card/50 p-7 sm:p-10"
    >
      {/* Honeypot: a real person never fills this in. */}
      <p className="hidden">
        <label>
          Leave this empty if you are human: <input name="bot-field" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={`mt-2 ${field}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${field}`}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className="text-sm font-medium">
          What&apos;s this about?
        </label>
        <select id="topic" name="topic" className={`mt-2 ${field}`}>
          {TOPICS.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`mt-2 ${field} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 text-sm text-neg">
          That didn&apos;t send. Email {siteConfig.legal.email} directly and
          we&apos;ll pick it up there.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-7 w-full sm:w-auto"
        disabled={status === "sending"}
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

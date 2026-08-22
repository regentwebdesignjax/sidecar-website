import type { Metadata } from "next";
import Link from "next/link";

import { LegalLayout } from "@/components/site/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms covering your use of the Sidecar app.",
};

/**
 * Verbatim from the copy supplied by Regent Media Group. Markdown has been
 * converted to JSX and nothing else — do not reword, reorder, or summarise.
 */
export default function TermsPage() {
  return (
    <LegalLayout
      title="Sidecar Terms of Service"
      intro={
        <>
          <p>
            These terms cover your use of the Sidecar app. Sidecar is provided
            by Regent Media Group, LLC, (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By
            creating an account you agree to them. If you don&apos;t, don&apos;t
            use the app.
          </p>
        </>
      }
    >
      <h2>What Sidecar is</h2>
      <p>
        Sidecar is an envelope budgeting app. You enter your own income and
        spending, sort it into envelopes, and Sidecar keeps the arithmetic
        straight and shares it with anyone you invite.
      </p>
      <p>
        <strong>Sidecar is not connected to any bank.</strong> It does not
        import transactions, move money, or have any access to a financial
        account. Every figure in the app is one someone typed in.
      </p>
      <p>
        <strong>Sidecar is not financial advice.</strong> It&apos;s a
        record-keeping tool. Nothing in it is a recommendation about what to
        spend, save, borrow or invest. If you need advice about your finances,
        speak to someone qualified to give it.
      </p>

      <h2>Your account</h2>
      <p>
        You need an account to use Sidecar. You&apos;re responsible for keeping
        your password and your device secure, and for what happens under your
        account.
      </p>
      <p>You must be at least 13 years old.</p>
      <p>
        Give us accurate information — particularly your email address, since
        it&apos;s how you recover your account and how invitations reach you.
      </p>

      <h2>Shared budgets</h2>
      <p>
        If you invite someone to a budget, they can see everything in it and add
        and edit entries. Owners can invite and remove members.{" "}
        <strong>Invite carefully</strong>: this is the main way your financial
        information reaches another person, and we can&apos;t undo someone
        having seen it.
      </p>
      <p>
        If you&apos;re removed from a budget, you lose access immediately.
        Anything you entered while you were a member stays with the budget.
      </p>
      <p>If you delete a budget you own, it goes for everyone in it.</p>

      <h2>Your data is yours</h2>
      <p>
        You keep ownership of everything you put into Sidecar. You can export
        your transactions to CSV at any time from Settings, and delete your
        account from Settings, which removes your profile and every budget you
        solely own.
      </p>
      <p>
        We handle your information as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>What we ask of you</h2>
      <p>
        Don&apos;t use Sidecar to break the law, don&apos;t try to reach data
        belonging to accounts that aren&apos;t yours, don&apos;t attack or
        overload the service, and don&apos;t attempt to reverse engineer it
        beyond what the law permits.
      </p>
      <p>We may suspend or close an account that does these things.</p>

      <h2>What we don&apos;t promise</h2>
      <p>
        Sidecar is provided <strong>as is</strong>. We work to keep it accurate
        and available, but we don&apos;t warrant that it will be uninterrupted,
        error-free, or that it will suit any particular purpose.
      </p>
      <p>
        <strong>Keep your own records.</strong> Sidecar is not a system of
        record for tax, legal or accounting purposes, and shouldn&apos;t be the
        only place your financial history exists. Export your data periodically
        if it matters to you.
      </p>

      <h2>Limits on liability</h2>
      <p>
        To the maximum extent the law allows, we are not liable for indirect,
        incidental, or consequential losses, or for lost profits, lost data, or
        financial decisions made using the app.
      </p>
      <p>
        Where liability can&apos;t be excluded, it is limited to the greater of
        the amount you paid us in the twelve months before the claim, or $50.
      </p>
      <p>
        Nothing here limits liability that cannot legally be limited — including
        for fraud or for death or personal injury caused by negligence. Some
        jurisdictions don&apos;t allow certain exclusions, so parts of this
        section may not apply to you.
      </p>

      <h2>Price and changes</h2>
      <p>
        Sidecar is currently free to use. If we introduce paid features
        we&apos;ll say so clearly before you&apos;re charged, and existing
        functionality that you rely on won&apos;t be moved behind a paywall
        without notice.
      </p>
      <p>
        We may change these terms. For anything significant we&apos;ll tell you
        in the app or by email before it takes effect. Continuing to use Sidecar
        after that means you accept the change.
      </p>

      <h2>Ending it</h2>
      <p>
        You can stop using Sidecar and delete your account at any time from
        Settings.
      </p>
      <p>
        We may end your access if you materially breach these terms, or if we
        discontinue the service — in which case we&apos;ll give you reasonable
        notice and time to export your data.
      </p>

      <h2>Apple</h2>
      <p>
        Sidecar is distributed through the App Store. These terms are between
        you and us, not Apple. Apple has no obligation to provide support for
        Sidecar and is not responsible for it. Apple is a third-party
        beneficiary of these terms and may enforce them against you.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Florida, United
        States, without regard to conflict-of-law rules.
      </p>

      <h2>Contact</h2>
      <p>
        Regent Media Group
        <br />
        <a href="mailto:sidecar@regentmediagroup.com">
          sidecar@regentmediagroup.com
        </a>
      </p>
    </LegalLayout>
  );
}

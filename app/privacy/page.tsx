import type { Metadata } from "next";

import { LegalLayout } from "@/components/site/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Sidecar collects, why, who can see it, and how to get rid of it. No bank connection, no analytics, no trackers.",
};

const PROVIDERS = [
  {
    provider: "Supabase",
    does: "Database, authentication and sync",
    handles: "Account details and all budget content",
  },
  {
    provider: "Resend",
    does: "Sends transactional email",
    handles: "Recipient email address and message content",
  },
  {
    provider: "Apple",
    does: "Sign in with Apple",
    handles: "Your Apple-provided identifier, name and email",
  },
  {
    provider: "Google",
    does: "Google Sign-In",
    handles: "Your Google-provided identifier, name, email and profile picture link",
  },
];

/**
 * Verbatim from the copy supplied by Regent Media Group. Markdown has been
 * converted to JSX and nothing else — do not reword, reorder, or summarise.
 */
export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Sidecar Privacy Policy"
      intro={
        <>
          <p>
            Sidecar is an envelope budgeting app. This policy explains what we
            collect, why, who can see it, and how to get rid of it.
          </p>
          <p>
            Sidecar is provided by Regent Media Group, LLC. If you have a
            question about this policy or your data, email us at{" "}
            <a
              href="mailto:sidecar@regentmediagroup.com"
              className="text-accent underline underline-offset-4"
            >
              sidecar@regentmediagroup.com
            </a>
            .
          </p>
        </>
      }
    >
      <h2>The short version</h2>
      <p>
        Sidecar does not connect to your bank. Every figure in the app is one
        you typed in yourself. We don&apos;t run analytics, we don&apos;t show
        ads, we don&apos;t track you across other apps or websites, and we
        don&apos;t sell or rent your information to anyone.
      </p>
      <p>
        The people you invite to a shared budget can see everything in that
        budget. That is the point of the feature, and it is the main way your
        information reaches another person.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Account information.</strong> Your email address, and your first
        and last name. If you sign in with Google or Apple, we receive your
        email address and name from that service, and — if your account has one
        — a link to your profile picture. We never receive your Google or Apple
        password.
      </p>
      <p>
        <strong>Your budget content.</strong> The envelopes you create, the
        transactions you log, scheduled income and bills, your starting balance,
        and how you&apos;ve chosen to split income across envelopes. This is the
        substance of the app, and it&apos;s stored so it can sync between your
        devices and the people you share a budget with.
      </p>
      <p>
        <strong>Sharing information.</strong> Who belongs to each budget, what
        role they have, the email addresses you send invitations to, and whether
        an invitation has been accepted.
      </p>
      <p>
        <strong>Support correspondence.</strong> If you email us, we keep that
        email.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>
          <strong>No bank or card connections.</strong> Sidecar has no link to
          any financial institution. There are no account numbers, routing
          numbers, card numbers or balances imported from anywhere.
        </li>
        <li>
          <strong>No analytics or tracking.</strong> The app contains no
          analytics SDK, no advertising SDK, and no third-party trackers. We do
          not use the Advertising Identifier and we do not track you across
          other companies&apos; apps or websites.
        </li>
        <li>
          <strong>No location data.</strong> The app never requests or receives
          your location.
        </li>
        <li>
          <strong>No contacts access.</strong> Invitations are sent to an email
          address you type. The app never reads your address book.
        </li>
        <li>
          <strong>No photos or camera access.</strong>
        </li>
      </ul>

      <h2>How we use what we collect</h2>
      <p>We use it to run the app, and for nothing else:</p>
      <ul>
        <li>to sign you in and keep you signed in;</li>
        <li>to store your budget and sync it across your devices;</li>
        <li>to share a budget with the people you have invited;</li>
        <li>
          to send transactional email — a sign-in code, or an invitation to a
          budget;
        </li>
        <li>to post your scheduled income and bills on their due dates;</li>
        <li>to answer you when you contact us.</li>
      </ul>
      <p>
        We do not use your budget content to build advertising profiles, and we
        do not sell, rent, or trade your information.
      </p>

      <h2>Who can see your information</h2>
      <p>
        <strong>People you share a budget with.</strong> Anyone you invite to a
        budget can see that budget&apos;s envelopes, transactions, balances and
        scheduled items, and can add and edit them. Owners can also invite and
        remove other members. If you remove someone, they lose access
        immediately, but anything they entered while they were a member stays in
        the budget.
      </p>
      <p>
        <strong>Someone you invite by email.</strong> When you send an
        invitation, the recipient&apos;s email address is stored against that
        budget so the invitation can be redeemed, and they receive an email
        telling them who invited them.
      </p>
      <p>
        <strong>Our service providers.</strong> We use a small number of
        companies to operate Sidecar. They process data on our instructions and
        are not permitted to use it for their own purposes:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-3 pr-6 font-semibold text-ink">
                Provider
              </th>
              <th scope="col" className="py-3 pr-6 font-semibold text-ink">
                What it does
              </th>
              <th scope="col" className="py-3 font-semibold text-ink">
                What it handles
              </th>
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map((row) => (
              <tr key={row.provider} className="border-b border-line/60">
                <th scope="row" className="py-4 pr-6 align-top font-medium text-ink">
                  {row.provider}
                </th>
                <td className="py-4 pr-6 align-top">{row.does}</td>
                <td className="py-4 align-top">{row.handles}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Data is stored on infrastructure located in Virginia, United States.
      </p>
      <p>
        <strong>Legal requests.</strong> We may disclose information if we are
        required to by law, and to protect our rights or someone&apos;s safety.
        We have no interest in doing this otherwise.
      </p>

      <h2>Security</h2>
      <p>
        Access to your data is enforced at the database level with row-level
        security, so a request can only reach budgets you are actually a member
        of — the check doesn&apos;t depend on the app behaving correctly. Data
        is encrypted in transit. Passwords are hashed and salted; we never see
        them in readable form.
      </p>
      <p>No system is perfectly secure, and we can&apos;t promise otherwise.</p>

      <h2>Keeping, exporting and deleting your data</h2>
      <p>
        <strong>We keep your data as long as your account exists.</strong> We
        don&apos;t have a use for old data beyond running the app for you.
      </p>
      <p>
        <strong>Export.</strong> Settings → Export data produces a CSV of every
        transaction in your budget, which is yours to keep or move elsewhere.
      </p>
      <p>
        <strong>Deleting individual things.</strong> You can delete any
        transaction, envelope, scheduled item or budget from within the app.
      </p>
      <p>
        <strong>Leaving a shared budget.</strong> Settings → Budgets lets you
        leave a budget you were invited to. The budget itself and anything you
        entered in it remain with the remaining members.
      </p>
      <p>
        <strong>Deleting your account.</strong> Settings → Delete account
        removes your account, your profile, and every budget you solely own,
        along with the envelopes, transactions and scheduled items in them. This
        happens immediately and cannot be undone. If you own a budget that other
        people are members of, transfer ownership or the budget is deleted for
        everyone in it.
      </p>
      <p>
        Backups are retained by our database provider for a limited period, so
        deleted content may persist in encrypted backups for a short time after
        removal before being overwritten.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        export, or delete your personal information, to object to or restrict
        certain processing, and to complain to a data protection authority.
      </p>
      <p>
        Most of these you can exercise yourself in the app — Export data, the
        in-app edit and delete controls, and Delete account. For anything else,
        email{" "}
        <a href="mailto:sidecar@regentmediagroup.com">
          sidecar@regentmediagroup.com
        </a>{" "}
        and we&apos;ll respond within 30 days.
      </p>
      <p>
        If you are in the EEA or UK: our legal basis for processing your account
        and budget content is performance of our contract with you — we
        can&apos;t provide a budgeting app without storing your budget. For
        transactional email our basis is also contractual necessity. We do not
        process your data for marketing.
      </p>
      <p>
        If you are in California: we do not sell or share personal information
        as those terms are defined by the CCPA, and we have not done so in the
        preceding twelve months.
      </p>

      <h2>Children</h2>
      <p>
        Sidecar is not directed to children under 13, and we do not knowingly
        collect personal information from them. If you believe a child has given
        us their information, email{" "}
        <a href="mailto:sidecar@regentmediagroup.com">
          sidecar@regentmediagroup.com
        </a>{" "}
        and we will delete it.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy we will update the date at the top and, for
        anything significant, tell you in the app before it takes effect.
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

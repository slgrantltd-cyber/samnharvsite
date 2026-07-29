"use client";

import { useState, type FormEvent } from "react";

/**
 * Investor deal-list capture, wired for Mailchimp via its embedded-form
 * endpoint. Set NEXT_PUBLIC_MAILCHIMP_ACTION to the audience's embedded
 * form action URL (Audience → Signup forms → Embedded forms → the form's
 * action="..."), e.g. https://xxx.usX.list-manage.com/subscribe/post?u=...&id=...
 * Field tags used: EMAIL, FNAME, MMERGE7 ("What you are looking for" merge
 * field in the audience). Without the env var, the form
 * falls back to a pre-filled email to the office.
 */
const MAILCHIMP_ACTION = process.env.NEXT_PUBLIC_MAILCHIMP_ACTION;

export default function DealListForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (MAILCHIMP_ACTION) {
      // native POST to Mailchimp in a new tab; just record the send locally
      setSent(true);
      return;
    }
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("FNAME") ?? "").trim();
    const email = String(data.get("EMAIL") ?? "").trim();
    const brief = String(data.get("MMERGE7") ?? "").trim();
    const body = [
      "Hi Samuel and Harvey,",
      "",
      "Please add me to the deal list.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `What I'm looking for: ${brief}`,
      "",
    ].join("\n");
    window.location.href = `mailto:contact@samnharv.com?subject=${encodeURIComponent(
      "Add me to the deal list",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={submit}
      action={MAILCHIMP_ACTION || undefined}
      method={MAILCHIMP_ACTION ? "post" : undefined}
      target={MAILCHIMP_ACTION ? "_blank" : undefined}
      className="mt-10 max-w-xl"
    >
      <div className="flex flex-col gap-6">
        <div>
          <label htmlFor="dl-name" className="annot text-bronze-bright">
            Name
          </label>
          <input
            id="dl-name"
            name="FNAME"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 text-base placeholder:text-[rgba(242,239,232,0.45)] focus:border-bronze-bright"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="dl-email" className="annot text-bronze-bright">
            Email
          </label>
          <input
            id="dl-email"
            name="EMAIL"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 text-base placeholder:text-[rgba(242,239,232,0.45)] focus:border-bronze-bright"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="dl-brief" className="annot text-bronze-bright">
            What you&rsquo;re looking for
          </label>
          <textarea
            id="dl-brief"
            name="MMERGE7"
            rows={3}
            className="mt-2 w-full border hairline bg-transparent px-4 py-3 text-base placeholder:text-[rgba(242,239,232,0.45)] focus:border-bronze-bright"
            placeholder="Strategy, budget, areas — a sentence is plenty"
          />
        </div>
      </div>

      {MAILCHIMP_ACTION && (
        <div aria-hidden="true" className="absolute -left-[5000px]">
          {/* Mailchimp bot honeypot — must match the audience's u/id */}
          <input
            type="text"
            name="b_5af07a2fff6ab53fdec5be5bd_9edde5e93f"
            tabIndex={-1}
            defaultValue=""
          />
        </div>
      )}

      <button type="submit" className="btn btn-ghost mt-8">
        Join the deal list
      </button>

      {sent ? (
        <p className="annot mt-4 text-bronze-bright" role="status">
          {MAILCHIMP_ACTION
            ? "You're on the list — check the confirmation tab that just opened."
            : "Your email app should have opened with everything filled in — just press send. Nothing arrived? Email contact@samnharv.com directly."}
        </p>
      ) : (
        <p className="annot muted mt-4">
          {MAILCHIMP_ACTION
            ? "Joins the deal list — you can leave it with one click, any time."
            : "Sends as an email to contact@samnharv.com — answered personally."}
        </p>
      )}
    </form>
  );
}

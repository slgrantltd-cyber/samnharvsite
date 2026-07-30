"use client";

import { useState } from "react";

export default function JoinForm({ source = "website", kind = "investor" }: { source?: string; kind?: "investor" | "landlord" }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        email: f.get("email"),
        phone: f.get("phone"),
        interest: f.get("interest"),
        company: f.get("company"),
        source,
        kind,
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="m-paper border p-8 hairline md:p-10">
        <p className="display text-3xl">
          You&rsquo;re on the list — <span className="display-it">welcome.</span>
        </p>
        <p className="mt-4 leading-relaxed muted">
          {kind === "landlord"
            ? "An email from contact@samnharv.com is on its way (check spam the first time). Reply to it with your property address and we\u2019ll come back with straight answers — usually the same day."
            : "A welcome email from contact@samnharv.com is on its way (check spam the first time). When a deal fits what you told us, you\u2019ll hear from us directly."}
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-transparent border-b hairline py-2 text-base focus:outline-none focus:border-[var(--bronze)] transition-colors";

  return (
    <form onSubmit={submit} className="m-paper border p-8 hairline md:p-10">
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        <label className="block">
          <span className="annot muted">Your name</span>
          <input name="name" required className={input} autoComplete="name" />
        </label>
        <label className="block">
          <span className="annot muted">Email</span>
          <input name="email" type="email" required className={input} autoComplete="email" />
        </label>
        <label className="block">
          <span className="annot muted">Phone — optional</span>
          <input name="phone" type="tel" className={input} autoComplete="tel" />
        </label>
        <label className="block md:col-span-2">
          <span className="annot muted">
            {kind === "landlord" ? "Your property — area, beds, current situation" : "What are you looking for? Strategy, areas, budget — optional"}
          </span>
          <input name="interest" className={input} placeholder={kind === "landlord" ? "e.g. 3-bed in Weston, currently empty" : "e.g. BRRR or BTL around Bristol, up to £250k"} />
        </label>
        {/* honeypot */}
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending"
            ? "Sending…"
            : kind === "landlord"
              ? "Get your guaranteed rent answer"
              : "Join the deal list"}
        </button>
        {state === "error" && (
          <p className="annot v-poor">Something failed — try again, or WhatsApp us instead.</p>
        )}
      </div>
      <p className="annot mt-6 muted">
        No spam, no courses — just deals and the occasional honest insight.
        Unsubscribe any time by replying.
      </p>
    </form>
  );
}

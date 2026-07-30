"use client";

import { useState } from "react";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        email: f.get("email"),
        message: f.get("message"),
        company: f.get("company"),
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="m-paper border p-8 hairline md:p-10">
        <p className="display text-3xl">
          Got it — <span className="display-it">speak soon.</span>
        </p>
        <p className="mt-4 leading-relaxed muted">
          Your message is on our desk. One of us will reply directly — usually
          the same day.
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
        <label className="block md:col-span-2">
          <span className="annot muted">Your message</span>
          <textarea name="message" required rows={4} className={input} placeholder="A deal, a property, a question — whatever it is, just say it plainly." />
        </label>
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending" ? "Sending…" : "Send it to the desk"}
        </button>
        {state === "error" && (
          <p className="annot v-poor">Something failed — try again, or WhatsApp us below.</p>
        )}
      </div>
      <p className="annot mt-6 muted">
        Goes straight to Samuel &amp; Harvey — no ticket systems, no holding
        patterns.
      </p>
    </form>
  );
}

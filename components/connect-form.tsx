"use client";

import { useState } from "react";

/** Event lead capture: minimal friction, lands in the Deal Book tagged networking. */

export default function ConnectForm() {
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
        email: f.get("email") || undefined,
        phone: f.get("phone"),
        message: `Networking lead — interest: ${f.get("interest")}. Phone: ${f.get("phone")}`,
        subject: `NETWORKING — ${f.get("name")}`,
        tag: "networking",
        company: f.get("company"),
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="m-paper border p-6 hairline text-center">
        <p className="display text-2xl">
          Got you — <span className="display-it">speak soon.</span>
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-transparent border-b hairline py-2 text-base focus:outline-none focus:border-[var(--bronze)] transition-colors";

  return (
    <form onSubmit={submit} className="m-paper border p-6 hairline md:p-8">
      <div className="grid gap-5">
        <label className="block">
          <span className="annot muted">Your name</span>
          <input name="name" required className={input} autoComplete="name" />
        </label>
        <label className="block">
          <span className="annot muted">Phone</span>
          <input name="phone" type="tel" required className={input} autoComplete="tel" />
        </label>
        <label className="block">
          <span className="annot muted">Email — optional</span>
          <input name="email" type="email" className={input} autoComplete="email" />
        </label>
        <label className="block">
          <span className="annot muted">What are you into?</span>
          <select name="interest" className={input} defaultValue="Investing">
            <option>Investing</option>
            <option>I&apos;m a landlord</option>
            <option>Selling a property</option>
            <option>Business / other</option>
          </select>
        </label>
        <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      <button type="submit" disabled={state === "sending"} className="btn btn-ink mt-6 w-full">
        {state === "sending" ? "Sending…" : "Stay in touch"}
      </button>
      {state === "error" && (
        <p className="annot v-poor mt-3">Didn&apos;t send — just call us instead.</p>
      )}
    </form>
  );
}

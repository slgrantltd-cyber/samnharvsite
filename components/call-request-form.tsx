"use client";

import { useState } from "react";

/** Request a 15-minute intro call — used on /call when no live booking calendar is set. */
export default function CallRequestForm() {
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
        subject: `INTRO CALL — ${f.get("name")}`,
        message: `15-MINUTE INTRO CALL REQUEST\nI am: ${f.get("who")}\nBest time: ${f.get("when")}\nPhone: ${f.get("phone")}\n\n${f.get("note") || ""}`,
        tag: "intro-call",
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="border hairline p-8 text-center">
        <p className="annot text-bronze">Received</p>
        <p className="display mt-3 text-2xl">We&rsquo;ll ring to fix the time.</p>
        <p className="muted mt-3 text-sm leading-relaxed">Usually within one working day. Fifteen minutes, no pitch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="block">
        <span className="annot muted">Name</span>
        <input name="name" required className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block">
        <span className="annot muted">Phone</span>
        <input name="phone" required className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block">
        <span className="annot muted">Email</span>
        <input name="email" type="email" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block">
        <span className="annot muted">I am</span>
        <select name="who" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink">
          <option>An investor</option>
          <option>A property owner / landlord</option>
          <option>A developer</option>
          <option>An agent</option>
          <option>A council / institution</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block md:col-span-2">
        <span className="annot muted">Best time to call</span>
        <input name="when" placeholder="e.g. weekday mornings, or Thursday after 4" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block md:col-span-2">
        <span className="annot muted">One line on what you&rsquo;d like to talk about</span>
        <textarea name="note" rows={2} className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-6">
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending" ? "Sending…" : "Request the call"}
        </button>
        {state === "error" && <p className="annot text-bronze">Something went wrong — WhatsApp 07444 551241</p>}
      </div>
    </form>
  );
}

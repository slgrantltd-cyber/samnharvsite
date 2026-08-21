"use client";

import { useState } from "react";

/**
 * Request access — the paper gate as product. Posts to /api/contact with
 * tag "opportunities"; nothing identifying is ever sent back automatically.
 */
export default function AccessForm({ mandate = "" }: { mandate?: string }) {
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
        phone: f.get("phone"),
        message: `OPPORTUNITIES — ACCESS REQUEST\nMandate of interest: ${f.get("mandate") || mandate || "General"}\nCapital range: ${f.get("capital")}\nBuying as: ${f.get("entity")}\n\n${f.get("note") || ""}`,
        tag: "opportunities",
      }),
    })
      .then((r) => (r.ok ? setState("done") : setState("error")))
      .catch(() => setState("error"));
  };

  if (state === "done") {
    return (
      <div className="border hairline p-8">
        <p className="annot text-bronze">Received</p>
        <p className="display mt-3 text-2xl">We&rsquo;ll be in touch personally.</p>
        <p className="muted mt-3 max-w-md leading-relaxed">
          One of us will call within one working day. Access to particulars
          follows a short conversation, identity and proof of funds — the same
          discretion we&rsquo;d ask for ourselves.
        </p>
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
        <span className="annot muted">Email</span>
        <input name="email" type="email" required className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block">
        <span className="annot muted">Phone</span>
        <input name="phone" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <label className="block">
        <span className="annot muted">Mandate of interest</span>
        <select name="mandate" defaultValue={mandate} className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink">
          <option value="">General</option>
          <option>Resort · Thailand</option>
          <option>Dubai residences</option>
          <option>UK — cash-flow portfolio</option>
          <option>UK — conversion &amp; development</option>
        </select>
      </label>
      <label className="block">
        <span className="annot muted">Capital range</span>
        <select name="capital" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink">
          <option>£100k – £250k</option>
          <option>£250k – £500k</option>
          <option>£500k – £1m</option>
          <option>£1m – £3m</option>
          <option>£3m – £10m</option>
          <option>£10m+</option>
        </select>
      </label>
      <label className="block">
        <span className="annot muted">Buying as</span>
        <select name="entity" className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink">
          <option>Individual</option>
          <option>Company</option>
          <option>Family office / fund</option>
        </select>
      </label>
      <label className="block md:col-span-2">
        <span className="annot muted">Anything we should know</span>
        <textarea name="note" rows={3} className="mt-2 w-full border-b hairline bg-transparent py-2 outline-none focus:border-ink" />
      </label>
      <div className="md:col-span-2 flex flex-wrap items-center gap-6">
        <button type="submit" disabled={state === "sending"} className="btn btn-ink">
          {state === "sending" ? "Sending…" : "Request access"}
        </button>
        <p className="annot muted">Identity &amp; proof of funds before particulars. Always.</p>
        {state === "error" && <p className="annot text-bronze">Something went wrong — email contact@samnharv.com</p>}
      </div>
    </form>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * The Deal Book — a private CRM for the desk. Contacts and deals live in
 * this browser's localStorage (no server, no account); Export writes a
 * JSON file for backup or for sharing state with the other brother.
 */

type ContactType = "Investor" | "Landlord" | "Vendor" | "Agent" | "Other";
const CONTACT_TYPES: ContactType[] = ["Investor", "Landlord", "Vendor", "Agent", "Other"];

const STAGES = ["Sourced", "Analysing", "Offered", "Agreed", "Completed", "Dead"] as const;
type Stage = (typeof STAGES)[number];

const LEAD_STATUS = ["New", "Contacted", "Qualified", "Hot", "Cold"] as const;
type LeadStatus = (typeof LEAD_STATUS)[number];
/* colour-coding via the site's mineral verdict palette */
const STATUS_CLASS: Record<LeadStatus, string> = {
  New: "muted",
  Contacted: "text-bronze",
  Qualified: "v-good",
  Hot: "v-excellent",
  Cold: "v-poor",
};

interface Contact {
  id: string;
  name: string;
  type: ContactType;
  status: LeadStatus;
  tags: string;
  phone: string;
  email: string;
  notes: string;
  followUp: string; // ISO date or ""
  welcomed?: string;
}

interface Deal {
  id: string;
  address: string;
  strategy: string;
  stage: Stage;
  figures: string;
  contact: string;
  notes: string;
  updated: string;
}

interface Book {
  contacts: Contact[];
  deals: Deal[];
}

const KEY = "samnharv-deal-book-v1";
const SYNC_KEY = "samnharv-book-passphrase";
const uid = () => Math.random().toString(36).slice(2, 10);
const today = () => new Date().toISOString().slice(0, 10);

const load = (): Book => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Book;
  } catch {}
  return { contacts: [], deals: [] };
};

export default function DealBook() {
  const [book, setBook] = useState<Book>({ contacts: [], deals: [] });
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"deals" | "contacts">("deals");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [passphrase, setPassphrase] = useState<string | null>(null);
  const [syncState, setSyncState] = useState<"off" | "on" | "error">("off");

  useEffect(() => {
    setBook(load());
    const key = localStorage.getItem(SYNC_KEY);
    if (key) {
      setPassphrase(key);
      fetch("/api/book", { headers: { "x-book-key": key } })
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((remote: Book) => {
          setSyncState("on");
          if (remote.contacts.length || remote.deals.length) setBook(remote);
        })
        .catch(() => setSyncState("error"));
    }
    setReady(true);
  }, []);

  /* push changes to the shared book, debounced */
  useEffect(() => {
    if (!ready || !passphrase || syncState !== "on") return;
    const t = setTimeout(() => {
      fetch("/api/book", {
        method: "PUT",
        headers: { "x-book-key": passphrase, "Content-Type": "application/json" },
        body: JSON.stringify(book),
      }).catch(() => setSyncState("error"));
    }, 800);
    return () => clearTimeout(t);
  }, [book, ready, passphrase, syncState]);

  const enableSync = () => {
    const key = prompt("Enter the shared Book passphrase (same one Harv uses):");
    if (!key) return;
    localStorage.setItem(SYNC_KEY, key);
    setPassphrase(key);
    fetch("/api/book", { headers: { "x-book-key": key } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((remote: Book) => {
        setSyncState("on");
        if ((remote.contacts.length || remote.deals.length) && !book.contacts.length && !book.deals.length) {
          setBook(remote);
        }
      })
      .catch((s) => {
        setSyncState("error");
        alert(s === 401 ? "Wrong passphrase." : "Sync isn't configured on the server yet.");
      });
  };

  const sendWelcome = (c: Contact) => {
    if (!passphrase) return alert("Enable sync first — the passphrase also authorises sending.");
    if (!c.email) return alert("This contact has no email address.");
    fetch("/api/welcome", {
      method: "POST",
      headers: { "x-book-key": passphrase, "Content-Type": "application/json" },
      body: JSON.stringify({ name: c.name, email: c.email }),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(() => setContact(c.id, { welcomed: today(), status: c.status === "New" ? "Contacted" : c.status }))
      .catch((s) => alert(s === 503 ? "Email sending isn't configured on the server yet." : "Couldn't send — try again."));
  };

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(book));
  }, [book, ready]);

  const q = query.trim().toLowerCase();
  const deals = useMemo(
    () =>
      book.deals
        .filter((d) => !q || `${d.address} ${d.strategy} ${d.contact} ${d.notes}`.toLowerCase().includes(q))
        .sort((a, b) => STAGES.indexOf(a.stage) - STAGES.indexOf(b.stage)),
    [book.deals, q],
  );
  const contacts = useMemo(
    () =>
      book.contacts
        .filter((c) => !q || `${c.name} ${c.type} ${c.email} ${c.notes} ${c.tags} ${c.status}`.toLowerCase().includes(q))
        .sort((a, b) => (a.followUp || "9999") < (b.followUp || "9999") ? -1 : 1),
    [book.contacts, q],
  );

  const dueCount = book.contacts.filter((c) => c.followUp && c.followUp <= today()).length;

  const addDeal = () => {
    const d: Deal = { id: uid(), address: "", strategy: "BTL", stage: "Sourced", figures: "", contact: "", notes: "", updated: today() };
    setBook((b) => ({ ...b, deals: [d, ...b.deals] }));
    setTab("deals");
    setEditing(d.id);
  };
  const addContact = () => {
    const c: Contact = { id: uid(), name: "", type: "Investor", status: "New", tags: "", phone: "", email: "", notes: "", followUp: "" };
    setBook((b) => ({ ...b, contacts: [c, ...b.contacts] }));
    setTab("contacts");
    setEditing(c.id);
  };
  const setDeal = (id: string, patch: Partial<Deal>) =>
    setBook((b) => ({ ...b, deals: b.deals.map((d) => (d.id === id ? { ...d, ...patch, updated: today() } : d)) }));
  const setContact = (id: string, patch: Partial<Contact>) =>
    setBook((b) => ({ ...b, contacts: b.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  const removeDeal = (id: string) => setBook((b) => ({ ...b, deals: b.deals.filter((d) => d.id !== id) }));
  const removeContact = (id: string) => setBook((b) => ({ ...b, contacts: b.contacts.filter((c) => c.id !== id) }));

  const exportBook = () => {
    const blob = new Blob([JSON.stringify(book, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `samnharv-deal-book-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importBook = (file: File) => {
    file.text().then((t) => {
      try {
        const parsed = JSON.parse(t) as Book;
        if (Array.isArray(parsed.contacts) && Array.isArray(parsed.deals)) setBook(parsed);
        else alert("That file doesn't look like a Deal Book export.");
      } catch {
        alert("Couldn't read that file.");
      }
    });
  };

  const input =
    "w-full bg-transparent border-b hairline py-1 text-[0.9375rem] focus:outline-none focus:border-[var(--bronze)] transition-colors";

  if (!ready) return <p className="annot muted">Opening the book…</p>;

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b pb-5 hairline">
        <div className="flex">
          {(["deals", "contacts"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`annot px-4 py-2.5 transition-colors ${tab === t ? "bg-[var(--concrete)] text-[var(--plaster)]" : "border hairline hover:bg-[var(--limestone)]"}`}
            >
              {t === "deals" ? `Deals (${book.deals.length})` : `Contacts (${book.contacts.length})`}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the book…"
          className="min-w-40 flex-1 border px-3 py-2 text-[0.9375rem] hairline bg-transparent focus:outline-none focus:border-[var(--bronze)]"
          aria-label="Search"
        />
        <button onClick={tab === "deals" ? addDeal : addContact} className="btn btn-ink px-4 py-2.5 text-sm">
          Add {tab === "deals" ? "deal" : "contact"}
        </button>
        <button onClick={exportBook} className="btn btn-ghost px-4 py-2.5 text-sm">
          Export
        </button>
        <button onClick={enableSync} className={`btn btn-ghost px-4 py-2.5 text-sm ${syncState === "on" ? "text-bronze" : ""}`}>
          {syncState === "on" ? "Synced" : syncState === "error" ? "Sync error" : "Sync"}
        </button>
        <label className="btn btn-ghost cursor-pointer px-4 py-2.5 text-sm">
          Import
          <input
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && importBook(e.target.files[0])}
          />
        </label>
      </div>

      {dueCount > 0 && (
        <p className="annot mt-4 text-bronze">
          {dueCount} follow-up{dueCount > 1 ? "s" : ""} due — check the contacts tab
        </p>
      )}

      {/* deals */}
      {tab === "deals" && (
        <ul className="mt-6">
          {deals.length === 0 && (
            <li className="py-10 text-center muted">No deals yet. Add the first one — it takes ten seconds.</li>
          )}
          {deals.map((d) => (
            <li key={d.id} className="border-b py-4 hairline">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <button onClick={() => setEditing(editing === d.id ? null : d.id)} className="display text-left text-xl hover:text-[var(--bronze)]">
                  {d.address || "Untitled deal"}
                </button>
                <span className="annot muted">{d.strategy}</span>
                <select
                  value={d.stage}
                  onChange={(e) => setDeal(d.id, { stage: e.target.value as Stage })}
                  className={`annot border bg-transparent px-2 py-1 hairline ${d.stage === "Dead" ? "v-poor" : d.stage === "Completed" ? "v-excellent" : "text-bronze"}`}
                >
                  {STAGES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {d.figures && <span className="font-mono text-sm tabular-nums muted">{d.figures}</span>}
                <span className="annot ml-auto muted">{d.updated}</span>
              </div>
              {editing === d.id && (
                <div className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  <label className="block">
                    <span className="annot muted">Address</span>
                    <input className={input} value={d.address} onChange={(e) => setDeal(d.id, { address: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Strategy</span>
                    <input className={input} value={d.strategy} onChange={(e) => setDeal(d.id, { strategy: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Key figures</span>
                    <input className={input} placeholder="e.g. £165k / £38k works / GDV £245k" value={d.figures} onChange={(e) => setDeal(d.id, { figures: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Linked contact</span>
                    <input className={input} value={d.contact} onChange={(e) => setDeal(d.id, { contact: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="annot muted">Notes</span>
                    <textarea rows={3} className={input} value={d.notes} onChange={(e) => setDeal(d.id, { notes: e.target.value })} />
                  </label>
                  <div className="md:col-span-2">
                    <button onClick={() => { if (confirm("Remove this deal from the book?")) removeDeal(d.id); }} className="annot v-poor">
                      Remove deal
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* contacts */}
      {tab === "contacts" && (
        <ul className="mt-6">
          {contacts.length === 0 && (
            <li className="py-10 text-center muted">No contacts yet — start with your best investor.</li>
          )}
          {contacts.map((c) => (
            <li key={c.id} className="border-b py-4 hairline">
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <button onClick={() => setEditing(editing === c.id ? null : c.id)} className="display text-left text-xl hover:text-[var(--bronze)]">
                  {c.name || "Unnamed contact"}
                </button>
                <span className="annot muted">{c.type}</span>
                <select
                  value={c.status ?? "New"}
                  onChange={(e) => setContact(c.id, { status: e.target.value as LeadStatus })}
                  className={`annot border bg-transparent px-2 py-1 hairline ${STATUS_CLASS[c.status ?? "New"]}`}
                >
                  {LEAD_STATUS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {(c.tags ?? "").split(",").filter((t) => t.trim()).map((t) => (
                  <span key={t} className="annot bg-[var(--limestone)] px-2 py-0.5">{t.trim()}</span>
                ))}
                {c.phone && (
                  <a href={`tel:${c.phone}`} className="font-mono text-sm muted hover:text-ink">
                    {c.phone}
                  </a>
                )}
                {c.followUp && (
                  <span className={`annot ml-auto ${c.followUp <= today() ? "text-bronze" : "muted"}`}>
                    follow up {c.followUp}
                  </span>
                )}
              </div>
              {editing === c.id && (
                <div className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
                  <label className="block">
                    <span className="annot muted">Name</span>
                    <input className={input} value={c.name} onChange={(e) => setContact(c.id, { name: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Type</span>
                    <select className={input} value={c.type} onChange={(e) => setContact(c.id, { type: e.target.value as ContactType })}>
                      {CONTACT_TYPES.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="annot muted">Phone</span>
                    <input className={input} value={c.phone} onChange={(e) => setContact(c.id, { phone: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Email</span>
                    <input className={input} value={c.email} onChange={(e) => setContact(c.id, { email: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Tags — comma separated</span>
                    <input className={input} placeholder="brrr, bristol, 200k, repeat" value={c.tags ?? ""} onChange={(e) => setContact(c.id, { tags: e.target.value })} />
                  </label>
                  <label className="block">
                    <span className="annot muted">Next follow-up</span>
                    <input type="date" className={input} value={c.followUp} onChange={(e) => setContact(c.id, { followUp: e.target.value })} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="annot muted">Notes — strategies, budget, what they want</span>
                    <textarea rows={3} className={input} value={c.notes} onChange={(e) => setContact(c.id, { notes: e.target.value })} />
                  </label>
                  <div className="flex flex-wrap items-center gap-5 md:col-span-2">
                    <button onClick={() => sendWelcome(c)} className="btn btn-ink px-4 py-2 text-sm" disabled={!c.email}>
                      {c.welcomed ? `Welcome sent ${c.welcomed} — send again` : "Send welcome email"}
                    </button>
                    <button onClick={() => { if (confirm("Remove this contact from the book?")) removeContact(c.id); }} className="annot v-poor">
                      Remove contact
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="annot mt-10 border-t pt-4 hairline muted">
        Stored privately in this browser only — Export regularly for backup, and to pass the book between you and Harv.
      </p>
    </div>
  );
}

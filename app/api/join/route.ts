import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { welcomeSubject, welcomeText, welcomeHtml, landlordSubject, landlordText, landlordHtml } from "@/lib/welcome-email";

/**
 * Public lead capture: adds a contact to the shared Deal Book (tagged by
 * source) and sends the welcome email. No passphrase — this route can only
 * append one contact; a honeypot field and size caps keep the bots out.
 */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KEY = "samnharv:deal-book";

interface Book {
  contacts: unknown[];
  deals: unknown[];
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (body.company) return NextResponse.json({ ok: true }); // honeypot
  const name = (body.name || "").trim().slice(0, 80);
  const email = (body.email || "").trim().slice(0, 120);
  const phone = (body.phone || "").trim().slice(0, 30);
  const interest = (body.interest || "").trim().slice(0, 300);
  const source = (body.source || "website").trim().slice(0, 30);
  const isLandlord = body.kind === "landlord";
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "bad-input" }, { status: 400 });
  }

  // append to the shared book
  if (KV_URL && KV_TOKEN) {
    const res = await fetch(`${KV_URL}/get/${KEY}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    const data = (await res.json()) as { result: string | null };
    const book: Book = data.result ? JSON.parse(data.result) : { contacts: [], deals: [] };
    if (book.contacts.length < 5000) {
      book.contacts.unshift({
        id: Math.random().toString(36).slice(2, 10),
        name,
        type: isLandlord ? "Landlord" : "Investor",
        status: "New",
        tags: source,
        phone,
        email,
        notes: interest,
        followUp: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
        welcomed: new Date().toISOString().slice(0, 10),
      });
      await fetch(`${KV_URL}/set/${KEY}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    }
  }

  // welcome email (best-effort)
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (user && pass) {
    const first = name.split(" ")[0];
    try {
      await nodemailer
        .createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user, pass } })
        .sendMail({
          from: `"Sam n Harv" <${user}>`,
          to: email,
          subject: isLandlord ? landlordSubject : welcomeSubject,
          text: isLandlord ? landlordText(first) : welcomeText(first),
          html: isLandlord ? landlordHtml(first) : welcomeHtml(first),
        });
    } catch {}
  }

  return NextResponse.json({ ok: true });
}

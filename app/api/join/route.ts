import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
        type: "Investor",
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
          subject: "Welcome — from Sam & Harv",
          text: `Hi ${first},\n\nGood to have you on the list. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK.\n\nWhile you're here:\n— Analyse any deal free: https://www.samnharv.com/toolkit\n— Take our working checklists: https://www.samnharv.com/resources\n— When a deal fits what you told us, you'll hear from us directly.\n\nJust reply to talk sooner — it comes straight to us.\n\nSamuel & Harvey Grant\nwww.samnharv.com\nOur names are on everything.`,
          html: `<div style="font-family:Georgia,serif;color:#1a1a1a;max-width:540px;margin:0 auto;padding:24px;background:#f5f2eb"><p style="font-size:13px;letter-spacing:2px;color:#8c7b65;text-transform:uppercase;border-bottom:1px solid rgba(26,26,26,0.3);padding-bottom:12px">SAM <i>n</i> HARV</p><p style="font-size:22px;margin:20px 0 8px">Hi ${first},</p><p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">Good to have you on the list. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK.</p><p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">While you're here:<br>— Analyse any deal with our free <a href="https://www.samnharv.com/toolkit" style="color:#8c7b65">investment toolkit</a><br>— Take our working <a href="https://www.samnharv.com/resources" style="color:#8c7b65">checklists and templates</a><br>— When a deal fits what you told us, you'll hear from us directly.</p><p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">Just reply to talk sooner — it comes straight to us.</p><p style="font-size:16px;margin-top:20px">Samuel &amp; Harvey Grant</p><p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;border-top:1px solid #8c7b65;padding-top:12px;margin-top:20px">Property Investment &amp; Deal Sourcing — <a href="https://www.samnharv.com" style="color:#8c7b65">samnharv.com</a></p></div>`,
        });
    } catch {}
  }

  return NextResponse.json({ ok: true });
}

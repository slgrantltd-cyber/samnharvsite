import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * General enquiry: emails the message straight to the desk (contact@)
 * and logs the sender in the Deal Book. No auto-reply — a human answers.
 */

const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KEY = "samnharv:deal-book";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  if (body.company) return NextResponse.json({ ok: true }); // honeypot
  const name = (body.name || "").trim().slice(0, 80);
  const email = (body.email || "").trim().slice(0, 120);
  const phone = (body.phone || "").trim().slice(0, 30);
  const message = (body.message || "").trim().slice(0, 2000);
  const tag = (body.tag || "enquiry").trim().slice(0, 30);
  const subject = (body.subject || `Enquiry from ${(body.name || "").trim().slice(0, 80)}`).trim().slice(0, 120);
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  // networking/event leads often give a phone only — accept either
  if (!name || !message || (!validEmail && !phone)) {
    return NextResponse.json({ error: "bad-input" }, { status: 400 });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (user && pass) {
    try {
      await nodemailer
        .createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user, pass } })
        .sendMail({
          from: `"Website enquiry" <${user}>`,
          to: user,
          ...(validEmail ? { replyTo: `"${name}" <${email}>` } : {}),
          subject,
          text: `From: ${name}${validEmail ? ` <${email}>` : ""}${phone ? ` · ${phone}` : ""}\n\n${message}`,
        });
    } catch {
      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }
  }

  // log in the Book (best-effort)
  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/${KEY}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: "no-store",
      });
      const data = (await res.json()) as { result: string | null };
      const book = data.result ? JSON.parse(data.result) : { contacts: [], deals: [] };
      if (Array.isArray(book.contacts) && book.contacts.length < 5000) {
        book.contacts.unshift({
          id: Math.random().toString(36).slice(2, 10),
          name,
          type: "Other",
          status: "New",
          tags: tag,
          phone,
          email,
          notes: message.slice(0, 300),
          followUp: new Date().toISOString().slice(0, 10),
        });
        await fetch(`${KV_URL}/set/${KEY}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
      }
    } catch {}
  }

  return NextResponse.json({ ok: true });
}

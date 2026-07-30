import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { welcomeSubject, welcomeText, welcomeHtml } from "@/lib/welcome-email";

/**
 * Sends the branded welcome email to a new lead, triggered from the Deal
 * Book. Uses the Titan/123-Reg SMTP relay with the contact@ mailbox:
 * env vars SMTP_USER (contact@samnharv.com) and SMTP_PASS, plus the same
 * BOOK_PASSPHRASE gate as the sync route.
 */

const PASS = process.env.BOOK_PASSPHRASE;

export async function POST(req: NextRequest) {
  if (!PASS || req.headers.get("x-book-key") !== PASS) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  const { name, email } = (await req.json()) as { name?: string; email?: string };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "bad-email" }, { status: 400 });
  }
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ error: "email-not-configured" }, { status: 503 });
  }

  const first = (name || "").trim().split(" ")[0] || "there";
  const transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Sam n Harv" <${user}>`,
    to: email,
    subject: welcomeSubject,
    text: welcomeText(first),
    html: welcomeHtml(first),
  });

  return NextResponse.json({ ok: true });
}

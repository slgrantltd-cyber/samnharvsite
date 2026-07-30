import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    subject: "Welcome — from Sam & Harv",
    text: `Hi ${first},\n\nGood to have you with us. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK, based in the South West.\n\nWhile you're here:\n— Analyse any deal with our free toolkit: https://www.samnharv.com/toolkit\n— Take our working checklists and templates: https://www.samnharv.com/resources\n— When a deal fits what you're after, you'll hear from us directly.\n\nIf you want to talk sooner, just reply — it comes straight to us.\n\nSamuel & Harvey Grant\nSam n Harv — Property Investment & Deal Sourcing\nwww.samnharv.com\n\nOur names are on everything.`,
    html: `<div style="font-family:Georgia,serif;color:#1a1a1a;max-width:540px;margin:0 auto;padding:24px;background:#f5f2eb">
<p style="font-size:13px;letter-spacing:2px;color:#8c7b65;text-transform:uppercase;border-bottom:1px solid rgba(26,26,26,0.3);padding-bottom:12px">SAM <i>n</i> HARV</p>
<p style="font-size:22px;margin:20px 0 8px">Hi ${first},</p>
<p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">Good to have you with us. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK, based in the South West.</p>
<p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">While you're here:<br>
— Analyse any deal with our free <a href="https://www.samnharv.com/toolkit" style="color:#8c7b65">investment toolkit</a><br>
— Take our working <a href="https://www.samnharv.com/resources" style="color:#8c7b65">checklists and templates</a><br>
— When a deal fits what you're after, you'll hear from us directly.</p>
<p style="font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7">If you want to talk sooner, just reply — it comes straight to us.</p>
<p style="font-size:16px;margin-top:20px">Samuel &amp; Harvey Grant</p>
<p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;border-top:1px solid #8c7b65;padding-top:12px;margin-top:20px">Property Investment &amp; Deal Sourcing — <a href="https://www.samnharv.com" style="color:#8c7b65">samnharv.com</a></p>
</div>`,
  });

  return NextResponse.json({ ok: true });
}

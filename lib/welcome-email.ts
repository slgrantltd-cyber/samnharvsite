/**
 * The branded welcome email, shared by /api/welcome and /api/join.
 * 600px wide with 16px body so it reads properly in desktop clients;
 * both brothers' script signatures; a clear next step into the toolkit.
 */

export const welcomeSubject = "Welcome — from Sam & Harv";

export const welcomeText = (first: string) =>
  `Hi ${first},

Good to have you with us. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK, based in the South West.

Start here: analyse any deal in about sixty seconds with our free Deal Intelligence toolkit — the same instruments we use at our own desk:
https://www.samnharv.com/toolkit

Also worth taking:
— Our working checklists and templates (free PDFs): https://www.samnharv.com/resources
— Plain-English guides and glossary: https://www.samnharv.com/learn

When a deal fits what you told us, you'll hear from us directly. Want to talk sooner? Just reply — it comes straight to us.

Samuel & Harvey Grant
Sam n Harv — Property Investment & Deal Sourcing
www.samnharv.com

Our names are on everything.`;

export const welcomeHtml = (first: string) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#e9e5db">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9e5db;padding:24px 0">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:94%;background:#f5f2eb;padding:36px 40px">
<tr><td style="font-family:Georgia,serif;font-size:15px;letter-spacing:3px;color:#8c7b65;text-transform:uppercase;border-bottom:1px solid rgba(26,26,26,0.35);padding-bottom:14px">SAM <i>n</i> HARV</td></tr>
<tr><td style="font-family:Georgia,serif;font-size:28px;color:#1a1a1a;padding:26px 0 6px">Hi ${first},</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.75;color:#1a1a1a;padding:6px 0">Good to have you with us. We're Samuel and Harvey — two brothers investing in property and sourcing deals across the UK, based in the South West.</td></tr>
<tr><td style="padding:20px 0">
  <a href="https://www.samnharv.com/toolkit" style="display:inline-block;background:#1f1e1c;color:#f2efe8;font-family:Helvetica,Arial,sans-serif;font-size:15px;letter-spacing:1px;text-decoration:none;padding:14px 26px">Analyse a deal in 60 seconds →</a>
  <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5c5952;padding-top:8px">Our free Deal Intelligence toolkit — the same instruments we use at our own desk.</div>
</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.75;color:#1a1a1a;padding:6px 0">Also worth taking:<br>
— Our working <a href="https://www.samnharv.com/resources" style="color:#8c7b65">checklists and templates</a> — free branded PDFs<br>
— Plain-English <a href="https://www.samnharv.com/learn" style="color:#8c7b65">guides and the glossary</a><br>
— When a deal fits what you told us, you'll hear from us directly.</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.75;color:#1a1a1a;padding:6px 0 18px">Want to talk sooner? Just reply — it comes straight to us.</td></tr>
<tr><td style="padding:8px 0 0">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:36px">
      <img src="https://www.samnharv.com/email/sam-sig.png" alt="Samuel Grant" width="170" style="display:block;width:170px">
      <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;padding-top:4px">Samuel Grant</div>
    </td>
    <td>
      <img src="https://www.samnharv.com/email/harv-sig.png" alt="Harvey Grant" width="170" style="display:block;width:170px">
      <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;padding-top:4px">Harvey Grant</div>
    </td>
  </tr></table>
</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;border-top:1px solid #8c7b65;padding-top:14px;margin-top:8px">Property Investment &amp; Deal Sourcing — <a href="https://www.samnharv.com" style="color:#8c7b65">samnharv.com</a><br><span style="color:#8c7b65">Our names are on everything.</span></td></tr>
</table>
</td></tr>
</table>
</body></html>`;

/* ---- landlord variant: guaranteed rent enquiry ---- */

export const landlordSubject = "Your property — from Sam & Harv";

export const landlordText = (first: string) =>
  `Hi ${first},

Thanks for getting in touch about your property. We're Samuel and Harvey — two brothers who take on properties from landlords and manage everything: guaranteed rent paid every month, tenants, maintenance, compliance, the lot.

How it works:
— We agree a fixed monthly rent with you, in writing, before anything moves
— You get paid whether the property is occupied or not
— We handle tenants, upkeep and compliance — you handle nothing
— We operate our own serviced properties, so we run yours the way we run ours: https://www.samnharv.com/stays

Next step: reply with the property address and a line about your situation, and we'll come back with straight answers — usually the same day.

Samuel & Harvey Grant
Sam n Harv — Property Investment & Deal Sourcing
www.samnharv.com

Our names are on everything.`;

export const landlordHtml = (first: string) => `<!doctype html>
<html><body style="margin:0;padding:0;background:#e9e5db">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e9e5db;padding:24px 0">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:94%;background:#f5f2eb;padding:36px 40px">
<tr><td style="font-family:Georgia,serif;font-size:15px;letter-spacing:3px;color:#8c7b65;text-transform:uppercase;border-bottom:1px solid rgba(26,26,26,0.35);padding-bottom:14px">SAM <i>n</i> HARV</td></tr>
<tr><td style="font-family:Georgia,serif;font-size:28px;color:#1a1a1a;padding:26px 0 6px">Hi ${first},</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.75;color:#1a1a1a;padding:6px 0">Thanks for getting in touch about your property. We're Samuel and Harvey — two brothers who take on properties from landlords and manage everything: <b>guaranteed rent paid every month</b>, tenants, maintenance, compliance, the lot.</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.75;color:#1a1a1a;padding:6px 0">How it works:<br>
— A fixed monthly rent agreed with you, <b>in writing</b>, before anything moves<br>
— You get paid whether the property is occupied or not<br>
— We handle tenants, upkeep and compliance — you handle nothing<br>
— We operate <a href="https://www.samnharv.com/stays" style="color:#8c7b65">our own serviced properties</a>, so we run yours the way we run ours.</td></tr>
<tr><td style="padding:20px 0">
  <a href="mailto:contact@samnharv.com?subject=My%20property" style="display:inline-block;background:#1f1e1c;color:#f2efe8;font-family:Helvetica,Arial,sans-serif;font-size:15px;letter-spacing:1px;text-decoration:none;padding:14px 26px">Reply with your property address →</a>
  <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#5c5952;padding-top:8px">Straight answers, usually the same day. No obligation, no hard sell.</div>
</td></tr>
<tr><td style="padding:8px 0 0">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:36px">
      <img src="https://www.samnharv.com/email/sam-sig.png" alt="Samuel Grant" width="170" style="display:block;width:170px">
      <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;padding-top:4px">Samuel Grant</div>
    </td>
    <td>
      <img src="https://www.samnharv.com/email/harv-sig.png" alt="Harvey Grant" width="170" style="display:block;width:170px">
      <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;padding-top:4px">Harvey Grant</div>
    </td>
  </tr></table>
</td></tr>
<tr><td style="font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:1.5px;color:#5c5952;text-transform:uppercase;border-top:1px solid #8c7b65;padding-top:14px">Property Investment &amp; Deal Sourcing — <a href="https://www.samnharv.com" style="color:#8c7b65">samnharv.com</a><br><span style="color:#8c7b65">Our names are on everything.</span></td></tr>
</table>
</td></tr>
</table>
</body></html>`;

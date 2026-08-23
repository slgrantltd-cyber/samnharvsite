const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,BorderStyle,TabStopType}=require('docx');
const gold="8A6A35", stone="5C5952", ink="1A1A1A";
const P=(t,o={})=>new Paragraph({spacing:{after:o.after??80},alignment:o.align,children:[new TextRun({text:t,font:o.font||"Calibri",size:o.size||20,color:o.color||ink,bold:o.bold,italics:o.it,allCaps:o.caps,characterSpacing:o.caps?40:0})]});
const H=(t)=>new Paragraph({spacing:{before:260,after:60},border:{bottom:{style:BorderStyle.SINGLE,size:4,color:"CFC6B5"}},children:[new TextRun({text:t.toUpperCase(),font:"Consolas",size:15,color:gold,characterSpacing:60})]});
const B=(t,boldLead)=>new Paragraph({numbering:{reference:"b",level:0},spacing:{after:50},children:boldLead?[new TextRun({text:boldLead+" ",bold:true,font:"Calibri",size:20}),new TextRun({text:t,font:"Calibri",size:20})]:[new TextRun({text:t,font:"Calibri",size:20})]});
const Role=(t,d,sub)=>[new Paragraph({spacing:{before:160,after:20},tabStops:[{type:TabStopType.RIGHT,position:9600}],children:[new TextRun({text:t,font:"Georgia",size:24}),new TextRun({text:"\t"+d,font:"Consolas",size:15,color:stone})]}), ...(sub?[P(sub,{color:stone,after:40})]:[])];
const FILL="[fill in]";
const doc=new Document({numbering:{config:[{reference:"b",levels:[{level:0,format:"bullet",text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:240}}}}]}]},
 styles:{default:{document:{run:{font:"Calibri",size:20}}}},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:1000,bottom:900,left:1080,right:1080}}},children:[
  P("CURRICULUM VITAE · REAL ESTATE BROKER, DUBAI",{font:"Consolas",size:15,color:gold,after:40}),
  new Paragraph({spacing:{after:40},children:[new TextRun({text:"Samuel Grant",font:"Georgia",size:56})]}),
  P("Founder & CEO, Sam n Harv Investment · UK investor desk with a developer-direct Dubai pipeline",{color:stone}),
  P("07444 551241 · contact@samnharv.com · samnharv.co.uk · London — relocating to Dubai",{font:"Consolas",size:16,color:stone,after:160}),
  P("I find and underwrite property for people who already have money — in the UK, Dubai and Thailand — and I sell it the way a private-dining host serves a table: quietly, precisely, and with the numbers already done. In the last year I have built an investor desk from nothing: a live developer-direct Dubai pipeline across Binghatti's branded residences, Damac, Sobha, Emaar, Danube, Ellington and Aldar; a published market analysis from Dubai Land Department data; a partner chain for finance, build, furnishing and management; and a client who credits our deals with six figures of revenue. Before property I spent "+FILL+" years running a private dining business for high-net-worth clients, which is where I learned the only sales skill that matters at the top of the market — being trusted. I want to do this full-time, on the ground, with a brokerage whose standards match.",{size:21,after:120}),
  H("Experience"),
  ...Role("Founder & CEO — Sam n Harv Investment (S L Grants Ltd)","2025 — present · UK / Dubai / Thailand","Private property sourcing and investment desk, co-founded with my brother Harvey (Thailand)."),
  B("Built a launch-allocation pipeline and unit-by-unit showcase across Binghatti (Bugatti Residences, Burj Binghatti Jacob & Co, Mercedes-Benz Places), Damac, Sobha, Emaar, Danube, Ellington and Aldar (Saadiyat, Yas) — prices, payment plans, handover dates and unit mixes maintained from developer sources; every enquiry routed to WhatsApp with the unit pre-filled.","Dubai, developer-direct."),
  B("Compiled sixteen years of Dubai Land Department transaction data (via DXB Interact) into published charts and four investor notes: off-plan at 73% of sales, the off-plan premium narrowing from 66% to 19%, area yields from 8.3% to 4.4%, and a developer resale-gain scorecard. I sell Dubai with the data, not the skyline.","Market analysis."),
  B("Built the firm's BRR model (cash purchase → 75% refinance, SDLT, legals, furnishing, holding) and a worst / likely / best case ROI discipline with a 50%-return-on-money-left-in bar; ran it across eleven live listings for a cash client and structured a 3-flat conversion (subject to planning).","Underwriting."),
  B("A serviced-accommodation operator credits our deals with “adding six figures in revenue” (Google review); over twelve months of local-authority supported-accommodation placements run inspection-ready; two serviced units operated day to day.","Client results."),
  B("Assembled a partner chain investors can use end to end — Lendhub (bridging), Watts Commercial Finance (whole-of-market), an architect and builder, Base Furnishings, Summit Property Group (hands-off management).","The complete package."),
  B("Designed and built samnharv.co.uk, the CRM, the investor brief and enquiry flows, the sales process (a 32-step investor playbook) and the content programme; networked into Mayfair lender, furnishing and management relationships.","Brand and pipeline."),
  ...Role("Founder — Samuel's Food, private dining",FILL+" — "+FILL+" · "+FILL,"Luxury private dining for high-net-worth clients in their homes and venues."),
  B("Built a client base of "+FILL+" private clients by referral; repeat bookings from "+FILL+"."),
  B("Ran the whole business — sales, pricing, service, suppliers, staff of "+FILL+" — to a standard where one mistake ends the relationship. The discipline I bring to a listing presentation."),
  B(FILL+" (one number: revenue / covers / events a year)"),
  ...Role(FILL+" (earlier role — title, employer)",FILL+" (years)"),
  B(FILL+" (what you sold or ran, and one result)"),
  H("What I bring to a Dubai desk"),
  B("Communities, developers and their delivery records, payment-plan structures, DLD fees and Oqood registration, Golden Visa thresholds, the UK-buyer tax picture — and the current cycle position, from the data.","The Dubai market, already learned."),
  B("Sterling buyers who want dollar-pegged growth, qualified the way I already qualify them: identity and proof of funds before particulars.","A UK investor network to bring with me."),
  B("Years of serving high-net-worth clients face to face. No pitch, no pressure, the numbers done first.","Selling to wealth."),
  B("I model the exit flat and say so. Clients stay because the second deal was as honest as the first.","Underwriting, not brochures."),
  B("Reels, carousels and data notes built to a brand standard; a WhatsApp-first enquiry flow; a booked-call funnel.","Content that converts."),
  H("Compliance & training"),
  B("Anti-money-laundering trained · GDPR (UK, advanced) trained · Enhanced DBS · Risk assessment, fire awareness, conflict resolution, EDI"),
  B("Professional indemnity and public liability insured (S L Grants Ltd, Companies House 16505504)"),
  B("RERA: ready to complete the DREI Certified Broker course and exam immediately on arrival; UAE residency via employer sponsorship"),
  H("Skills"),
  P("Investor qualification & KYC · Off-plan launches & payment plans · Comparable analysis & underwriting · Negotiation · CRM & pipeline management · WhatsApp-led sales · Listing presentation · Instagram content & short-form video · Brand and web (built samnharv.co.uk) · Data analysis (DLD / DXB Interact)",{color:stone}),
  H("Education"),
  B(FILL+" (qualification, institution, year)"),
  H("Personal"),
  B("British. Available to relocate to Dubai immediately; full clean UK driving licence "+FILL+"."),
  B("References: a serviced-accommodation company director and a landlord client, both on request; reviews public on Google."),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Samuel-Grant-CV-draft.docx',b);console.log('docx ok')});

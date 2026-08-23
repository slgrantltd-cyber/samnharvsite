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
  P("Founder, Sam n Harv Investment · built a property business from zero to £250k revenue in its first year",{color:stone}),
  P("07444 551241 · contact@samnharv.com · samnharv.co.uk · London — relocating to Dubai",{font:"Consolas",size:16,color:stone,after:160}),
  P("I built a property business from nothing to £250,000 of revenue in its first year — serviced accommodation, local-authority placements and deal sourcing for investors — and I still run it every day. Before that I cooked: private dining for high-profile clients in their homes, hired houses and venues across the country; high-end catering for EDF Energy's international guests; and, earlier, the kitchen at Belmond Le Manoir aux Quat'Saisons. In between I spent a year in supported care, which is why the council work comes naturally. The two careers taught the same thing — that at the top of the market people don't buy the pitch, they buy the person who did the unglamorous work properly and told them the truth. I have spent this year preparing a Dubai desk — the market data, the developers, the unit economics — and I want to learn the market on the ground with a brokerage whose standards I'd put my own name to. I have not sold Dubai property yet. I intend to be very good at it.",{size:21,after:120}),
  H("Experience"),
  ...Role("Founder — Sam n Harv Investment (S L Grants Ltd)","June 2025 — present · UK South West","Property business co-founded with my brother Harvey. Zero to £250,000 revenue in year one, and growing."),
  B("Two serviced-accommodation units furnished, listed and operated day to day; over twelve months of supported-accommodation placements for a local authority, run inspection-ready; deal sourcing for investors. One client's public review credits our deals with “adding six figures in revenue” to his business.","Built the revenue."),
  B("Built our BRR model (cash purchase → 75% refinance, stamp duty, legals, furnishing, holding) and a worst / likely / best case discipline; priced eleven live listings for a cash client and structured a three-flat conversion, subject to planning.","Learned to underwrite."),
  B("Compiled sixteen years of Dubai Land Department transaction data into published analysis — off-plan at 73% of sales, the off-plan premium narrowing from 66% to 19%, yields by community, a developer resale-gain scorecard — and built a unit-by-unit showcase across Binghatti, Damac, Sobha, Emaar, Danube, Ellington and Aldar from the developers' own price lists. Research and preparation, not transactions: that is what I am applying for.","Prepared a Dubai desk."),
  B("Designed the brand and website (samnharv.co.uk), the CRM and enquiry flows, a 32-step investor sales process and the content programme; assembled a partner chain — bridging and commercial finance, architect, builder, furnishing, management — through relationships made in London this year.","Built the machine."),
  B("Anti-money-laundering and GDPR trained, Enhanced DBS, professionally insured; identity and proof of funds before particulars, every time.","Standards."),
  ...Role("Private Chef — Samuel's Food","April 2025 — present · nationwide","Private dining for high-profile individuals in their homes, hired houses and venues across the country. Started alongside the TNS role; within three months it was doing well enough to leave."),
  B("Sold, priced, sourced, cooked and served every booking myself, for clients who can eat anywhere — repeat bookings by referral. "+FILL+" (one number: events a year, average ticket, or revenue)"),
  B("The skill that transfers: being trusted in someone's home with their family, their guests and their standards."),
  ...Role("Chef — TNS Catering, for EDF Energy","January 2025 — June 2025 · Bridgwater & Cannington","High-end private dining for EDF staff and visiting high-profile guests from around the world at the Hinkley Point operation."),
  B("Executive-level hospitality to a multinational client: discretion, consistency, and guests who notice everything."),
  ...Role("Chef de Partie / Sous Chef — agency placements","April 2021 — December 2024 · South West"),
  B("Consistent weekly placements across venues and menus as CDP, rising to sous chef; ran sections and services in kitchens I'd often never seen before that morning."),
  ...Role("Support Worker — The Brandon Trust","August 2020 — April 2021"),
  B("Supported adults with learning disabilities to live independently: care plans, risk assessments, finances, medication, community. Care Certificate and PBM trained. The grounding behind the supported-accommodation placements I now run for a local authority."),
  ...Role("Commis / Chef — Belmond Le Manoir aux Quat'Saisons","October 2019 — March 2020 · Oxfordshire"),
  B("Raymond Blanc's two-Michelin-star kitchen, a brigade of twenty. Where I learned what a standard actually is."),
  ...Role("Chef — CSI International (agency) · Merchandiser — B&Q","2019"),
  H("What I bring to a Dubai desk"),
  B("To £250k of revenue in a year, with my own money at risk. I know what it costs to find a client, keep one, and deliver after the sale.","I have built a business from zero."),
  B("Communities, developers and delivery records, payment plans, DLD fees and Oqood, Golden Visa thresholds, the UK-buyer tax picture, and where the cycle sits — from the data, before I've earned a dirham from it.","The market, studied properly."),
  B("Years in the homes of high-net-worth clients as their chef. No pitch, no pressure, every detail done first.","Selling to wealth, face to face."),
  B("I model the exit flat and say so. I put “character over commission” on my business cards and I mean to be held to it.","Honesty as the method."),
  H("Compliance & training"),
  B("Anti-money-laundering trained · GDPR (UK, advanced) trained · Enhanced DBS · Risk assessment, fire awareness, conflict resolution, EDI"),
  B("Professional indemnity and public liability insured (S L Grants Ltd, Companies House 16505504)"),
  B("RERA: ready to complete the DREI Certified Broker course and exam immediately on arrival; UAE residency via employer sponsorship"),
  H("Skills"),
  P("Client care at the top of the market · Investor qualification & KYC · Off-plan structures & payment plans (studied) · Comparable analysis & underwriting · Negotiation · WhatsApp-led sales · Listing presentation · Instagram content & short-form video · Brand and web (built samnharv.co.uk) · Data analysis (DLD / DXB Interact)",{color:stone}),
  H("Education"),
  B(FILL+" (school / college, qualifications, years) · Care Certificate · PBM (positive behaviour management) · Food hygiene "+FILL+" (level)"),
  H("Personal"),
  B("British, born 2000. Based between the South West and London; available to relocate to Dubai immediately. Full UK driving licence "+FILL+" (confirm clean)."),
  B("References: a serviced-accommodation company director and a landlord client, both on request; reviews public on Google. Chef references on request."),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Samuel-Grant-CV-draft.docx',b);console.log('docx ok')});

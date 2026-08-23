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
  P("I built a property business from nothing to £250,000 of revenue in its first year — serviced accommodation, local-authority placements and deal sourcing for investors — and I still run it every day. Before that I cooked: a private chef to high-net-worth clients in their own homes, and a sous chef in professional kitchens before that. The two careers taught the same thing — that at the top of the market people don't buy the pitch, they buy the person who did the unglamorous work properly and told them the truth. I have spent this year preparing a Dubai desk — the market data, the developers, the unit economics — and I want to learn the market on the ground with a brokerage whose standards I'd put my own name to. I have not sold Dubai property yet. I intend to be very good at it.",{size:21,after:120}),
  H("Experience"),
  ...Role("Founder — Sam n Harv Investment (S L Grants Ltd)","2025 — present · UK South West","Property business co-founded with my brother Harvey. Zero to £250,000 revenue in year one, and growing."),
  B("Two serviced-accommodation units furnished, listed and operated day to day; over twelve months of supported-accommodation placements for a local authority, run inspection-ready; deal sourcing for investors. One client's public review credits our deals with “adding six figures in revenue” to his business.","Built the revenue."),
  B("Built our BRR model (cash purchase → 75% refinance, stamp duty, legals, furnishing, holding) and a worst / likely / best case discipline; priced eleven live listings for a cash client and structured a three-flat conversion, subject to planning.","Learned to underwrite."),
  B("Compiled sixteen years of Dubai Land Department transaction data into published analysis — off-plan at 73% of sales, the off-plan premium narrowing from 66% to 19%, yields by community, a developer resale-gain scorecard — and built a unit-by-unit showcase across Binghatti, Damac, Sobha, Emaar, Danube, Ellington and Aldar from the developers' own price lists. Research and preparation, not transactions: that is what I am applying for.","Prepared a Dubai desk."),
  B("Designed the brand and website (samnharv.co.uk), the CRM and enquiry flows, a 32-step investor sales process and the content programme; assembled a partner chain — bridging and commercial finance, architect, builder, furnishing, management — through relationships made in London this year.","Built the machine."),
  B("Anti-money-laundering and GDPR trained, Enhanced DBS, professionally insured; identity and proof of funds before particulars, every time.","Standards."),
  ...Role("Private Chef — Samuel's Food",FILL+" — 2025 · "+FILL,"Private dining for high-net-worth clients in their homes and at events, as a one-person business."),
  B("Won and kept clients by referral — "+FILL+" (roughly how many households / events a year, and the calibre)."),
  B("Sold, priced, sourced, cooked and served every booking myself, to a standard where one mistake ends the relationship. That is the discipline I bring to a listing and a viewing."),
  B(FILL+" (one number you're happy to state: bookings a year, average ticket, or revenue)"),
  ...Role("Sous Chef — "+FILL+" (restaurant / group)",FILL+" — "+FILL+" · "+FILL),
  B("Second in command of a professional kitchen: "+FILL+" (covers / brigade size / kind of kitchen). Ran service, ordering and a section team under pressure, daily."),
  H("What I bring to a Dubai desk"),
  B("To £250k of revenue in a year, with my own money at risk. I know what it costs to find a client, keep one, and deliver after the sale.","I have built a business from zero."),
  B("Communities, developers and delivery records, payment plans, DLD fees and Oqood, Golden Visa thresholds, the UK-buyer tax picture, and where the cycle sits — from the data, before I've earned a dirham from it.","The market, studied properly."),
  B("Years in the homes of high-net-worth clients as their chef. No pitch, no pressure, every detail done first.","Selling to wealth, face to face."),
  B("I model the exit flat and say so. I put “character over commission” on my business cards and I mean to be held to it.","Honesty as the method."),
  B("I make my own reels, carousels and data notes, run a WhatsApp-first enquiry flow and a booked-call funnel. I will bring leads, not wait for them.","Content and pipeline."),
  B("An investor list forming in the UK South West and London, and a brother on the ground in Asia. Early, real, and mine to grow for the brokerage.","A sterling investor base to build."),
  H("Compliance & training"),
  B("Anti-money-laundering trained · GDPR (UK, advanced) trained · Enhanced DBS · Risk assessment, fire awareness, conflict resolution, EDI"),
  B("Professional indemnity and public liability insured (S L Grants Ltd, Companies House 16505504)"),
  B("RERA: ready to complete the DREI Certified Broker course and exam immediately on arrival; UAE residency via employer sponsorship"),
  H("Skills"),
  P("Client care at the top of the market · Investor qualification & KYC · Off-plan structures & payment plans (studied) · Comparable analysis & underwriting · Negotiation · WhatsApp-led sales · Listing presentation · Instagram content & short-form video · Brand and web (built samnharv.co.uk) · Data analysis (DLD / DXB Interact)",{color:stone}),
  H("Education"),
  B(FILL+" (qualification, institution, year)"),
  H("Personal"),
  B("British. Available to relocate to Dubai immediately; full clean UK driving licence "+FILL+"."),
  B("References: a serviced-accommodation company director and a landlord client, both on request; reviews public on Google. Chef references on request."),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Samuel-Grant-CV-draft.docx',b);console.log('docx ok')});

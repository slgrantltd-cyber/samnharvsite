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
  P("CURRICULUM VITAE",{font:"Consolas",size:15,color:gold,after:40}),
  new Paragraph({spacing:{after:40},children:[new TextRun({text:"Samuel Grant",font:"Georgia",size:56})]}),
  P("Founder, Sam n Harv · built a property business from zero to £250k revenue in its first year",{color:stone}),
  P("07444 551241 · contact@samnharv.com · samnharv.co.uk · South West England",{font:"Consolas",size:16,color:stone,after:160}),
  B("I built a property business from nothing to £250,000 revenue in its first year, at roughly a 75% margin — and I still run it every day."),
  B("Almost all of that came through relationships: a council that kept extending placements, landlords who handed me more houses, a client who sent me his mates. I don't advertise much. I keep my word and people come back."),
  B("Before property I was a chef — private dining for high-profile clients in their own homes, EDF Energy's international guests, and a stint in Raymond Blanc's kitchen at Le Manoir. That's where I learned standards, and how to be trusted in someone's house."),
  B("This year I've built a Dubai desk — the data, the developers, the numbers — but I haven't sold there yet. I want to learn it on the ground, with a brokerage whose name I'd be proud to put next to mine."),
  H("Experience"),
  ...Role("Founder — Sam n Harv (S L Grants Ltd)","June 2025 — present · UK South West","My business. £250k revenue in year one at roughly 75% margin — built on relationships, not ad spend. My brother Harvey and I now work together and are expanding it as a pair."),
  B("Started with one placement. Ran it so well — inspection-ready, every week — that the local authority has kept placing with us for over a year.","Council."),
  B("Guaranteed-rent agreements on houses I operate myself. Pay on time and look after the house, and the same landlord hands you the next one — one of ours has two houses with us and says so on Google.","Landlords."),
  B("Sourced deals for a serviced-accommodation operator who says, publicly, that our deals “added six figures in revenue” to his business. Two paid deposits on sourcing agreements this year.","Investors."),
  B("I built our underwriting model — cash purchase, 75% refinance, every cost in — and I model the worst case before I show anyone the best case. If it only works in the best case, I don't bring it.","The numbers first."),
  B("Sixteen years of Land Department data turned into published analysis; a unit-by-unit showcase across Binghatti, Damac, Sobha, Emaar, Danube, Ellington and Aldar from their own price lists. Research, not sales — yet.","Dubai, in preparation."),
  B("Built the brand and website myself, a 32-step sales process, the content, and a partner chain for finance, build, furnishing and management — all through people I've met face to face this year.","The rest."),
  B("Long days and longer hours. Hundreds of cold outreaches and follow-ups that went nowhere before the ones that didn't. Mistakes that cost money, and the discipline to own them, write down what I learned, and not repeat them.","What it actually took."),
  ...Role("Private Chef — Samuel's Food","April 2025 — present · nationwide","Private dining for high-profile individuals in their homes, hired houses and venues across the country. Started alongside the TNS role; within three months it was doing well enough to leave."),
  B("Every booking sold, priced, sourced, cooked and served by me, for clients who could eat anywhere. Repeat bookings by referral. The standard is on the site: samuelsfood.co.uk."),
  B("What transfers: being trusted in someone's home with their family, their guests and their standards — and being invited back."),
  ...Role("Chef — TNS Catering, for EDF Energy","January 2025 — June 2025 · Bridgwater & Cannington","High-end private dining for EDF staff and visiting high-profile guests from around the world at the Hinkley Point operation."),
  B("Executive-level hospitality to a multinational client: discretion, consistency, and guests who notice everything."),
  ...Role("Chef de Partie / Sous Chef — agency placements","April 2021 — December 2024 · South West"),
  B("Consistent weekly placements across venues and menus as CDP, rising to sous chef; ran sections and services in kitchens I'd often never seen before that morning."),
  ...Role("Support Worker — The Brandon Trust","August 2020 — April 2021"),
  B("Supported adults with learning disabilities to live independently: care plans, risk assessments, finances, medication, community. Care Certificate and PBM trained. The grounding behind the supported-accommodation placements I now run for a local authority."),
  ...Role("Commis / Chef — Belmond Le Manoir aux Quat'Saisons","October 2019 — March 2020 · Oxfordshire"),
  B("Raymond Blanc's two-Michelin-star kitchen, a brigade of twenty. Where I learned what a standard actually is."),
  ...Role("Chef — CSI International (agency) · Merchandiser — B&Q","2019"),
  H("How I work"),
  B("I put “character over commission” on my business cards and I mean it: I'd rather lose the fee than the client, and I tell people not to buy when the numbers say so.","Integrity first."),
  B("Nearly every pound I've earned has come from someone who already trusted me — a council officer, a landlord, a client's friend. I build slowly and keep people for years.","Relationships are the business."),
  B("I know what it costs to win a client, keep one, and deliver after the sale — because I've done all three on a shoestring.","Built from zero, with my own money."),
  B("Years in the homes of high-net-worth clients as their chef. No pitch, no pressure, every detail done first.","Comfortable with wealth."),
  B("I make my own content, run a WhatsApp-first enquiry flow, and I'm in London often, building the investor list.","I'll bring leads, not wait for them."),
  B("Building from zero means most of what you try doesn't work. I follow up until it does, and I'm honest about the mistakes — with clients and with myself.","I've failed and kept going."),
  H("Qualifications, training & compliance"),
  B("Anti-Money Laundering (AML) · GDPR UK — Advanced · Risk Assessment · Fire Awareness · Conflict Resolution · Equality, Diversity & Inclusion","Professional training — completed."),
  B("Care Certificate · PBM (positive behaviour management) · Enhanced DBS (available for inspection) · Safeguarding and inspection cooperation with a local authority","Care & safeguarding."),
  B("Public Liability and Professional Indemnity insurance in force · S L Grants Ltd, Companies House 16505504 · Professional standards published at samnharv.co.uk/standards","Insurance & company."),
  B("Propertymark Level 3 · Property Redress Scheme membership · Right to Rent · Consumer Protection · Legionella Awareness · RERA: ready to complete the DREI Certified Broker course and exam on arrival","Working towards."),
  H("Education"),
  B(FILL+" (school / college, qualifications, years) · Care Certificate · PBM (positive behaviour management) · Food hygiene "+FILL+" (level)"),
  H("Personal"),
  B("British, born 2000. South West England; in London often. Full UK driving licence "+FILL+" (confirm clean)."),
  B("References: a serviced-accommodation company director and a landlord client, both on request; reviews public on Google. Chef references on request."),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Samuel-Grant-CV-draft.docx',b);console.log('docx ok')});

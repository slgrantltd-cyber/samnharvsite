const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,TabStopType}=require('docx');
const gold="8A6A35", stone="5C5952", ink="1A1A1A";
const P=(t,o={})=>new Paragraph({spacing:{after:o.after??80},children:[new TextRun({text:t,font:o.font||"Calibri",size:o.size||19,color:o.color||ink,bold:o.bold})]});
const H=(t)=>new Paragraph({spacing:{before:220,after:60},border:{bottom:{style:BorderStyle.SINGLE,size:4,color:"CFC6B5"}},children:[new TextRun({text:t.toUpperCase(),font:"Consolas",size:15,color:gold,characterSpacing:60})]});
const B=(t,lead)=>new Paragraph({numbering:{reference:"b",level:0},spacing:{after:40},children:lead?[new TextRun({text:lead+" ",bold:true,size:19}),new TextRun({text:t,size:19})]:[new TextRun({text:t,size:19})]});
const Role=(t,d,sub)=>[new Paragraph({spacing:{before:140,after:20},tabStops:[{type:TabStopType.RIGHT,position:9600}],children:[new TextRun({text:t,font:"Georgia",size:23}),new TextRun({text:"\t"+d,font:"Consolas",size:14,color:stone})]}), ...(sub?[P(sub,{color:stone,after:40})]:[])];
const doc=new Document({numbering:{config:[{reference:"b",levels:[{level:0,format:"bullet",text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:240}}}}]}]},
 styles:{default:{document:{run:{font:"Calibri",size:19}}}},
 sections:[{properties:{page:{size:{width:11906,height:16838},margin:{top:900,bottom:800,left:1000,right:1000}}},children:[
  P("CURRICULUM VITAE",{font:"Consolas",size:15,color:gold,after:30}),
  new Paragraph({spacing:{after:30},children:[new TextRun({text:"Danielle Grant",font:"Georgia",size:52})]}),
  P("Administrator · NHS community services & a growing property business",{color:stone}),
  P("07387 563672 · deetudor04@hotmail.com · Weston-super-Mare, UK · Available to relocate to Dubai",{font:"Consolas",size:15,color:stone,after:140}),
  B("Administrator across healthcare and business — currently supporting NHS community services at Sirona Care & Health, trusted daily with confidential patient records, clinician diaries and shared inboxes."),
  B("First point of contact by phone and email for patients, clinicians, guests and councils — calm, clear and organised under a heavy workload."),
  B("Alongside the NHS role, built and runs the administration of a property business through its first year of trading — bookings, invoicing, guest communications and local-authority billing, largely remotely, supporting the business to roughly £250,000 first-year revenue."),
  B("Works well without close supervision: deadline-reliable, quick on new systems, and the person colleagues come to for day-to-day IT."),
  H("Core skills"),
  P("Diary & scheduling · Shared inbox management · Referral processing · Confidential records & GDPR · Invoicing & bookkeeping support · Written & telephone communication · Data entry & preparing figures · Microsoft Office · First-line IT support · Prioritising high workloads",{color:stone}),
  H("Experience"),
  ...Role("Administrative Assistant — Sirona Care & Health (NHS community services)","Sep 2024 — present"),
  B("Manage inbound referrals, clinician diaries, patient discharges and therapist visit scheduling for a busy community health service."),
  B("Maintain accurate, confidential patient records to NHS information-governance standards."),
  B("Run shared team inboxes; first point of contact for patients and clinicians by phone and email."),
  B("Prepare figures and information for service meetings; support the organisation of the admin team."),
  B("Provide first-line IT support to colleagues, resolving day-to-day technical issues."),
  ...Role("Business Administrator — S L Grants Ltd (property & serviced accommodation)","Feb 2026 — present · part-time, largely remote"),
  B("Set up and run the administrative systems for a fast-growing property business — bookings, invoicing, guest communications and record-keeping — alongside the NHS role."),
  B("Built repeatable processes for local-authority invoicing and booking administration, supporting the business to approximately £250,000 revenue in its first year of trading."),
  B("Coordinate with suppliers, guests and council teams by email and phone, keeping accurate records across multiple properties."),
  ...Role("Retail — TK Maxx · Next","Nov 2022 — Aug 2024"),
  B("Customer service, tills, deliveries and stock in high-volume stores; first employed at Next for the Christmas season and invited back."),
  ...Role("Administrator — Tudor Catering Trailers","Mar 2022 — Apr 2023"),
  B("Ran day-to-day business administration: invoices, delivery notes, payments and record-keeping; handled enquiries and liaised with customers and suppliers by phone and email."),
  H("Volunteering"),
  B("Planned and helped deliver weekly activities and resources for young people.","Volunteer Youth Leader — Waterloo Christian Fellowship (Sep 2023 – Dec 2024)."),
  B("Supported children's activities and community events.","Volunteer Junior Leader — Holy Trinity Church (May 2018 – Apr 2022)."),
  H("Education"),
  B("Weston College, 2021–2023.","Level 3 BTEC Extended Diploma in Business —"),
  B("Priory Community School, 2016–2021: English Language (5), Mathematics (4), Combined Science (5/4), Religious Studies (7), Spanish (5).","GCSEs —"),
  H("Additional"),
  B("National Citizen Service programme (2021) · Raised funds for Weston Hospicecare through a self-run enterprise project (2022)."),
  B("British. Available to relocate to Dubai; used to remote working and UK-hours flexibility. References from the NHS and business roles on request."),
 ]}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync('Danielle-Grant-CV.docx',b);console.log('docx ok')});

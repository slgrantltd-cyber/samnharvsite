const {
  Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType,
  BorderStyle, Header, Footer, TabStopType, TabStopPosition,
} = require("docx");
const fs = require("fs");

const INK = "1A1A1A";
const STONE = "5C5952";
const BRONZE = "8C7B65";
const SERIF = "Georgia";
const SANS = "Helvetica Neue";

const annot = (text, opts = {}) =>
  new TextRun({ text, font: SANS, size: 15, color: STONE, allCaps: true, characterSpacing: 24, ...opts });

const makeDoc = (who, sigFile, role) => new Document({
  styles: {
    default: {
      document: { run: { font: SANS, size: 21, color: INK }, paragraph: { spacing: { line: 320 } } },
    },
  },
  sections: [{
    properties: {
      page: { margin: { top: 1100, right: 1300, bottom: 1000, left: 1300 } },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new ImageRun({ type: "png", data: fs.readFileSync("benchmark-mark.png"), transformation: { width: 26, height: 26 } }),
              new TextRun({ text: "  SAM ", font: SERIF, size: 30, color: INK }),
              new TextRun({ text: "n", font: SERIF, size: 30, italics: true, color: BRONZE }),
              new TextRun({ text: " HARV", font: SERIF, size: 30, color: INK }),
              new TextRun({ text: "\t" }),
              annot("Property Investment & Deal Sourcing"),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: INK, space: 8 } },
            spacing: { after: 120 },
          }),
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              annot("UK South West — working the whole map"),
              new TextRun({ text: "\t" }),
              annot("samnharv.com   ·   contact@samnharv.com"),
            ],
            spacing: { after: 480 },
          }),
        ],
      }),
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              annot("© S L Grants Ltd, trading as Sam n Harv"),
              new TextRun({ text: "\t" }),
              annot("Our names are on everything."),
            ],
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: BRONZE, space: 8 } },
          }),
        ],
      }),
    },
    children: [
      new Paragraph({ children: [new TextRun({ text: "[Date]", color: STONE })], spacing: { after: 360 } }),
      new Paragraph({ children: [new TextRun({ text: "[Recipient name]", color: STONE })] }),
      new Paragraph({ children: [new TextRun({ text: "[Address line 1]", color: STONE })] }),
      new Paragraph({ children: [new TextRun({ text: "[Address line 2]", color: STONE })] }),
      new Paragraph({ children: [new TextRun({ text: "[Town, Postcode]", color: STONE })], spacing: { after: 480 } }),
      new Paragraph({ children: [new TextRun({ text: "Dear [Name]," })], spacing: { after: 300 } }),
      new Paragraph({
        children: [new TextRun({ text: "[Open with why you are writing — one sentence, straight to it.]", color: STONE })],
        spacing: { after: 300 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "[The substance: what you are proposing, the key figures or dates, and anything the reader needs to decide. Keep paragraphs short — three or four sentences.]", color: STONE })],
        spacing: { after: 300 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "[Close with the next step: what happens now, and how to reach you directly.]", color: STONE })],
        spacing: { after: 480 },
      }),
      new Paragraph({ children: [new TextRun({ text: "Yours sincerely," })], spacing: { after: 60 } }),
      new Paragraph({
        children: [new ImageRun({ type: "png", data: fs.readFileSync(sigFile), transformation: { width: 210, height: 70 } })],
        spacing: { after: 40 },
      }),
      new Paragraph({ children: [new TextRun({ text: who, font: SERIF, size: 24 })] }),
      new Paragraph({ children: [annot(role)] }),
    ],
  }],
});

(async () => {
  fs.writeFileSync("samnharv-letter-samuel.docx", await Packer.toBuffer(makeDoc("Samuel Grant", "samuel-signature.png", "Co-founder, Sam n Harv")));
  fs.writeFileSync("samnharv-letter-harvey.docx", await Packer.toBuffer(makeDoc("Harvey Grant", "harvey-signature.png", "Co-founder, Sam n Harv")));
  console.log("letterheads written");
})();

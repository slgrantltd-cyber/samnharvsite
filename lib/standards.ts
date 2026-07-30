export type StandardStatus = "in-force" | "completed" | "working";

export type StandardIcon =
  | "shield"
  | "umbrella"
  | "document"
  | "cap"
  | "scales"
  | "flame"
  | "people"
  | "lock"
  | "risk"
  | "droplet"
  | "building"
  | "key";

export interface StandardItem {
  name: string;
  detail: string;
  icon: StandardIcon;
  status: StandardStatus;
  /** e.g. "Jan 2026" — shown when set */
  issued?: string;
  /** e.g. "Jan 2027" — shown when set */
  renews?: string;
  /** Path to the certificate (PDF or image) once uploaded, e.g. "/certificates/aml.pdf" */
  certUrl?: string;
}

export interface StandardGroup {
  key: string;
  label: string;
  title: string;
  note: string;
  items: StandardItem[];
}

export const STATUS_LABEL: Record<StandardStatus, string> = {
  "in-force": "In force",
  completed: "Completed",
  working: "Working towards",
};

export const STANDARD_GROUPS: StandardGroup[] = [
  {
    key: "insurance",
    label: "01 — Insurance",
    title: "Insured, properly.",
    note: "Cover held and maintained so that every landlord, investor and client we work with is protected — not just reassured.",
    items: [
      {
        name: "Public Liability Insurance",
        detail: "Cover for third-party injury and property damage across our operations.",
        icon: "umbrella",
        status: "in-force",
      },
      {
        name: "Professional Indemnity Insurance",
        detail: "Cover for the professional advice and services we provide.",
        icon: "shield",
        status: "in-force",
      },
    ],
  },
  {
    key: "training",
    label: "02 — Professional training",
    title: "Trained, and kept current.",
    note: "Completed professional training we refresh on an ongoing basis — because standards only count if they're maintained.",
    items: [
      {
        name: "Anti-Money Laundering (AML)",
        detail: "Identifying and reporting financial crime risk in property transactions.",
        icon: "scales",
        status: "completed",
      },
      {
        name: "GDPR UK — Advanced",
        detail: "Handling client and tenant data lawfully, securely and transparently.",
        icon: "lock",
        status: "completed",
      },
      {
        name: "Risk Assessment",
        detail: "Structured identification and control of risk across our properties.",
        icon: "risk",
        status: "completed",
      },
      {
        name: "Fire Awareness",
        detail: "Fire prevention, detection and evacuation standards in residential settings.",
        icon: "flame",
        status: "completed",
      },
      {
        name: "Conflict Resolution",
        detail: "De-escalation and fair resolution in tenancy and guest situations.",
        icon: "people",
        status: "completed",
      },
      {
        name: "Equality, Diversity & Inclusion",
        detail: "Fair, lawful and respectful treatment of every tenant, guest and client.",
        icon: "people",
        status: "completed",
      },
    ],
  },
  {
    key: "working",
    label: "03 — Working towards",
    title: "The bar we're raising next.",
    note: "Standards and memberships we are actively pursuing. Listed honestly: these are in progress, not yet held — and this page will say so until the day they are.",
    items: [
      {
        name: "Propertymark Level 3 Qualification",
        detail: "The recognised industry qualification for residential property professionals.",
        icon: "cap",
        status: "working",
      },
      {
        name: "Property Redress Scheme Membership",
        detail: "Independent redress for clients — a formal route beyond our own front door.",
        icon: "building",
        status: "working",
      },
      {
        name: "Right to Rent Training",
        detail: "Compliant checks under the Immigration Act for every tenancy.",
        icon: "key",
        status: "working",
      },
      {
        name: "Consumer Protection Training",
        detail: "Fair marketing, accurate descriptions and honest dealing, formalised.",
        icon: "document",
        status: "working",
      },
      {
        name: "Legionella Awareness",
        detail: "Water-system risk assessment and control in managed properties.",
        icon: "droplet",
        status: "working",
      },
      {
        name: "Asbestos Awareness",
        detail: "Recognising and managing asbestos risk in older housing stock.",
        icon: "risk",
        status: "working",
      },
    ],
  },
];

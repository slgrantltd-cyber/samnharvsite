/**
 * One map of the site, used by the header menu and the footer so nothing
 * good gets lost. Four groups, in the order a visitor thinks.
 */
export interface NavItem { href: string; label: string; note?: string; external?: boolean }
export interface NavGroup { label: string; items: NavItem[] }

export const SITE_MAP: NavGroup[] = [
  {
    label: "Invest",
    items: [
      { href: "/opportunities", label: "Opportunities", note: "Current opportunities, by introduction" },
      { href: "/dubai", label: "Dubai", note: "Developer-direct — Binghatti, Danube, Sobha, Emaar" },
      { href: "/power-team", label: "The complete package", note: "Finance, build, furnish, manage — one roof" },
      { href: "/deal-intelligence", label: "Deal analyzer", note: "Run the numbers on any deal" },
      { href: "/join", label: "Investor list", note: "Hear first, quietly" },
      { href: "/call", label: "Book an intro call", note: "Fifteen minutes, no pitch" },
    ],
  },
  {
    label: "Work with us",
    items: [
      { href: "/services", label: "What we do" },
      { href: "/landlords", label: "Owners & landlords", note: "Guaranteed rent, fully managed" },
      { href: "/councils", label: "Institutions & councils", note: "Placements, run properly" },
      { href: "/agents", label: "Agents", note: "Your best tenant" },
      { href: "/developers", label: "Developers", note: "Income on finished stock" },
      { href: "/stays", label: "Stays", note: "Serviced accommodation" },
    ],
  },
  {
    label: "Know-how",
    items: [
      { href: "/learn", label: "Learning Centre" },
      { href: "/insights", label: "Insights" },
      { href: "/resources", label: "Resources", note: "Templates, checklists, guides" },
      { href: "/toolkit", label: "Toolkit", note: "Calculators" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/about", label: "The brothers" },
      { href: "/trust", label: "Our word", note: "How we underwrite, disclose and behave" },
      { href: "/standards", label: "Standards & compliance" },
      { href: "/contact", label: "Contact" },
      { href: "https://share.google/lsd2TlaWo3OpRFqhO", label: "Google reviews", external: true },
    ],
  },
];

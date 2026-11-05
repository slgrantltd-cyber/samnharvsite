"use client";

import { usePathname } from "next/navigation";

/** Hides site chrome (header, footer, floating WhatsApp) on funnel pages where the only action should be the page's own button. */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/chat") return null;
  return <>{children}</>;
}

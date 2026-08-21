"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

/** Preview only: ?theme=sandstone | dark | hybrid sets data-theme on <html>. */
export default function ThemePreview() {
  const sp = useSearchParams();
  useEffect(() => {
    const t = sp.get("theme");
    if (t) document.documentElement.dataset.theme = t; else delete document.documentElement.dataset.theme;
  }, [sp]);
  return null;
}

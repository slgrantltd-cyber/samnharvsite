"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Masked line rise: children (each a .reveal-line > span) slide up from
 * behind a clipped edge when the block enters the viewport.
 */
export function Rise({
  children,
  as: Tag = "div",
  className,
  delay = 0,
}: {
  children: ReactNode;
  as?: "div" | "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced() || !ref.current) return;
    const spans = ref.current.querySelectorAll(".reveal-line > span");
    if (!spans.length) return;
    const tween = gsap.fromTo(
      spans,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.09,
        delay,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function Line({ children }: { children: ReactNode }) {
  return (
    <span className="reveal-line">
      <span>{children}</span>
    </span>
  );
}

/** Fade-and-lift for whole blocks (cards, figures). */
export function Lift({
  children,
  className,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced() || !ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Manifesto scrub: splits text into words that brighten one by one
 * as the passage scrolls through the viewport (Fort Vega grammar).
 */
export function ScrubWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduced() || !ref.current) return;
    const words = ref.current.querySelectorAll(".w");
    // faint start state set at runtime, so no-JS clients read full-strength text
    const tween = gsap.fromTo(
      words,
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
          end: "bottom 45%",
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <p ref={ref} className={`scrub-words ${className ?? ""}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

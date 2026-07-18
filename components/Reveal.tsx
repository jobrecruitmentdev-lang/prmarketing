"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/* Progressive fade-up: server HTML is fully visible (no-JS/crawler safe).
   After mount, only elements still below the viewport are hidden and then
   revealed on intersection. Opacity/transform only — no layout shift.
   `as` lets callers pick the wrapper tag (e.g. "li" inside a <ul>/<ol>) so
   Reveal never breaks parent/child semantics like list structure. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return; // already on screen

    el.classList.add("reveal-out");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-out");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal
      className={className || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

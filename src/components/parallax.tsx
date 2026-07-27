"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Subtle scroll parallax for DECORATIVE layers only (never body copy).
 * Follows ui-ux-pro-max "Parallax Scroll — Subtle": small yPercent delta,
 * scrub-linked, transform-only, disabled under reduced-motion.
 */
export function Parallax({
  children,
  amount = 12,
  className = "",
}: {
  children: ReactNode;
  /** total vertical travel across the scroll, in % of its own height */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [amount] }
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

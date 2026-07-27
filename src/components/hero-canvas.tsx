"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MEDIUMS } from "@/lib/artworks";

/**
 * The framed "canvas" cycles one piece per medium, crossfading every few
 * seconds — a living sample of the four disciplines. Pauses when the tab is
 * hidden and respects reduced-motion (holds on the first piece).
 */
export function HeroCanvas() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let timer: ReturnType<typeof setInterval>;
    const start = () => {
      timer = setInterval(() => {
        setIndex((i) => (i + 1) % MEDIUMS.length);
      }, 3800);
    };
    const stop = () => clearInterval(timer);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const current = MEDIUMS[index];

  return (
    <div className="relative border border-matte bg-stone p-3 shadow-[0_30px_60px_-30px_rgba(43,38,35,0.35)] md:p-5">
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-matte/70">
        {MEDIUMS.map((medium, i) => (
          <Image
            key={medium.id}
            src={`${medium.image}?q=85&w=1000&auto=format&fit=crop`}
            alt={medium.name}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />

        {/* Live caption */}
        <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-charcoal/75 px-4 py-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
          <span className="font-sans text-[0.62rem] uppercase tracking-editorial text-linen">
            {current.name}
          </span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {MEDIUMS.map((medium, i) => (
          <button
            key={medium.id}
            type="button"
            aria-label={`Show ${medium.name}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-6 bg-bronze" : "w-1.5 bg-matte hover:bg-sage"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const MARQUEE_WORDS = [
  "Traditional Miniatures",
  "Gold Leaf",
  "Oil & Acrylic",
  "Watercolour",
  "Hand-Painted Tiles",
  "Made to Order",
];

/**
 * Infinite editorial ribbon. Two identical tracks scroll left as one loop;
 * CSS-only, GPU transform, halts under reduced-motion (see globals.css).
 */
export function Marquee() {
  return (
    <div
      aria-hidden
      className="marquee-mask relative flex overflow-hidden border-y border-matte bg-stone/60 py-5 select-none"
    >
      {[0, 1].map((track) => (
        <div key={track} className="marquee-track flex shrink-0 items-center">
          {MARQUEE_WORDS.map((word, i) => (
            <span key={`${track}-${i}`} className="flex items-center">
              <span className="px-8 font-heading text-2xl italic text-charcoal/80 sm:text-3xl">
                {word}
              </span>
              <span className="text-bronze">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

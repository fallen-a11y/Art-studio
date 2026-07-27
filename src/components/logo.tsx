import { cn } from "@/lib/utils";

/**
 * MV Colours mark — a 2×2 chip of the studio palette (charcoal, bronze,
 * sage, terracotta): the "colours" made literal, one swatch per medium.
 * On hover the swatches fan/rotate and the wordmark warms to bronze.
 */
export function Logo({
  className,
  tone = "charcoal",
}: {
  className?: string;
  tone?: "charcoal" | "linen" | "cypress";
}) {
  const onCypress = tone === "cypress";
  const onDark = tone !== "charcoal";
  const word = onDark ? "text-linen" : "text-charcoal";
  const hover = onCypress
    ? "group-hover:text-brass"
    : onDark
      ? "group-hover:text-sage"
      : "group-hover:text-moss-deep";
  // First swatch reads as the "ink" — flip it to linen on dark surfaces.
  const inkSwatch = onDark
    ? `bg-linen ${onCypress ? "group-hover:bg-brass" : "group-hover:bg-sage"}`
    : "bg-charcoal group-hover:bg-moss-deep";
  // Against cypress the base accents sit at 1.1–1.9:1 and read as mud, so the
  // chip swaps to the raised-value tints of the same three hues.
  const accents = onCypress
    ? { warm: "bg-brass", green: "bg-sage-pale", earth: "bg-clay", earthHover: "group-hover:bg-brass" }
    : { warm: "bg-bronze", green: "bg-sage", earth: "bg-rust", earthHover: "group-hover:bg-bronze" };

  return (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="grid h-7 w-7 shrink-0 grid-cols-2 grid-rows-2 gap-[2px] rotate-0 transition-transform duration-500 ease-out group-hover:rotate-[8deg]"
      >
        <span className={cn("transition-colors duration-500", inkSwatch)} />
        <span className={cn(accents.warm, "transition-transform duration-500 ease-out group-hover:-translate-y-[1px]")} />
        <span className={cn(accents.green, "transition-transform duration-500 ease-out group-hover:translate-y-[1px]")} />
        <span className={cn(accents.earth, "transition-colors duration-500", accents.earthHover)} />
      </span>
      <span
        className={cn(
          "font-heading text-[1.5rem] italic leading-none tracking-tight transition-colors duration-300",
          word,
          hover
        )}
      >
        MV Colours
      </span>
    </span>
  );
}

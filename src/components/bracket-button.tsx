import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Recurring CTA motif across the site. The label is followed by a hairline
 * leader rule that draws in on hover — a catalog-entry cue that shares its
 * gesture with the header nav underline, so the whole site hovers alike.
 *
 * (Named for the "[ Label ]" brackets it used to carry; those were dropped,
 * the component kept its name to avoid churning 16 call sites.)
 */
const base =
  // Ring + offset read from --focus-ring/--surface so the button stays visible
  // on dark sections; both fall back to the light-surface defaults.
  "group inline-flex items-center gap-2 whitespace-nowrap font-sans text-[0.72rem] uppercase tracking-editorial transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface,var(--background))]";

const variants = {
  solid:
    "border border-charcoal bg-charcoal px-6 py-3 text-linen hover:bg-bronze-deep hover:border-bronze-deep",
  outline:
    "border border-charcoal/70 px-6 py-3 text-charcoal hover:border-bronze hover:text-bronze-deep",
  ghost:
    "px-1 py-1 text-charcoal hover:text-bronze-deep",
  // For dark surfaces (the cypress header): a linen placard that inverts to a
  // hairline outline on hover. Bronze is unreadable against cypress, so the
  // hover state trades fill for outline rather than shifting hue.
  invert:
    "border border-linen bg-linen px-6 py-3 text-charcoal hover:bg-transparent hover:text-linen",
} as const;

type Variant = keyof typeof variants;

/**
 * Fixed-width so it reserves its own space — the rule scales rather than
 * animating width, keeping the transition off the layout path (no shift).
 */
function LeaderRule() {
  return (
    <span
      aria-hidden
      className="h-px w-4 origin-left scale-x-0 bg-current opacity-70 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
    />
  );
}

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function BracketButton(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = "solid", className = "", children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
        <LeaderRule />
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      <LeaderRule />
    </button>
  );
}

import type { SVGProps } from "react";

/**
 * Hand-drawn to match the site's hairline (1px) frame aesthetic —
 * lucide-react no longer ships brand marks.
 */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 18c.6-2.4 1.4-5.6 1.9-7.7a2.4 2.4 0 0 1 4.7.9c0 2-1.1 4.1-3.1 4.1-.8 0-1.4-.4-1.6-1" />
      <path d="M11.4 10.3c-.3-1.6.8-2.7 2.1-2.7" />
    </svg>
  );
}

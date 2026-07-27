"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BracketButton } from "@/components/bracket-button";
import { InstagramIcon, PinterestIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

const INSTAGRAM_URL = "https://www.instagram.com/mv_colours";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Gallery", href: "#mediums-section" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`group/header sticky top-0 z-50 w-full [--focus-ring:var(--linen)] [--surface:var(--cypress)] transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 hover:border-linen/25 hover:bg-cypress/[0.97] hover:backdrop-blur-xl ${
        isScrolled
          ? "border-b border-linen/15 bg-cypress/92 shadow-[0_10px_30px_-18px_rgba(20,26,17,0.7)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-linen/10 bg-cypress/80 backdrop-blur-md"
      }`}
    >
      {/* The bar wakes as you reach it: a light rule draws out from the centre. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-linen/70 to-transparent transition-transform duration-700 ease-out group-hover/header:scale-x-100 motion-reduce:transition-none"
      />
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-6 transition-[height] duration-500 md:px-10 lg:px-16 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="#top" aria-label="MV Colours — home">
          <Logo tone="cypress" />
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group/link relative font-sans text-[0.78rem] font-medium uppercase tracking-editorial text-linen transition-colors duration-300"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-out group-hover/link:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-4 md:flex">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="MV Colours on Instagram"
              className="text-linen/75 transition-colors duration-300 hover:text-linen"
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="MV Colours on Pinterest"
              className="text-linen/75 transition-colors duration-300 hover:text-linen"
            >
              <PinterestIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          <BracketButton href="#commission" variant="invert" className="hidden sm:inline-flex">
            Custom Commission
          </BracketButton>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  aria-label="Open menu"
                  className="flex h-9 w-9 items-center justify-center text-linen lg:hidden"
                />
              }
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-matte bg-background [--focus-ring:var(--bronze)] [--surface:var(--background)] sm:max-w-sm"
            >
              <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-matte px-6 py-5">
                <SheetTitle>
                  <Logo />
                </SheetTitle>
                <SheetClose className="text-charcoal">
                  <X className="h-5 w-5" strokeWidth={1.25} />
                </SheetClose>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-6 py-8">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-matte py-4 font-heading text-2xl italic text-charcoal transition-colors duration-300 hover:text-bronze-deep"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-6 px-6 pb-8">
                <BracketButton
                  href="#commission"
                  variant="solid"
                  className="w-fit"
                  onClick={() => setMobileOpen(false)}
                >
                  Custom Commission
                </BracketButton>
                <div className="flex items-center gap-5">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="MV Colours on Instagram"
                    className="text-charcoal/70 transition-colors hover:text-moss-deep"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="MV Colours on Pinterest"
                    className="text-charcoal/70 transition-colors hover:text-moss-deep"
                  >
                    <PinterestIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

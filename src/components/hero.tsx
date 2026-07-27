"use client";

import { BracketButton } from "@/components/bracket-button";
import { HeroCanvas } from "@/components/hero-canvas";

export function Hero() {
  const smoothTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .querySelector(selector)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Soft sage wash anchoring the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 8% 0%, rgba(124,138,109,0.16), transparent 60%), radial-gradient(60% 50% at 100% 100%, rgba(140,98,57,0.10), transparent 55%)",
        }}
      />

      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 py-20 md:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-28">
        {/* Left column — thesis */}
        <div className="max-w-xl">
          <p
            className="hero-rise mb-6 font-sans text-xs uppercase tracking-editorial text-moss-deep"
            style={{ animationDelay: "0ms" }}
          >
            Est. Atelier — Fine Art &amp; Commission Studio
          </p>

          <h1
            className="hero-rise font-heading text-[2.5rem] leading-[1.12] text-charcoal sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]"
            style={{ animationDelay: "90ms" }}
          >
            Where Heritage Craftsmanship Meets{" "}
            <em className="italic text-moss-deep">Modern Expression.</em>
          </h1>

          <p
            className="hero-rise mt-7 max-w-md font-sans text-base leading-relaxed text-charcoal/70 lg:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Custom Miniatures, Canvas Paintings &amp; Fine Art Tilework
            tailored to your space.
          </p>

          <div
            className="hero-rise mt-10 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "270ms" }}
          >
            <BracketButton
              href="#mediums-section"
              variant="solid"
              onClick={smoothTo("#mediums-section")}
            >
              Browse Collection
            </BracketButton>

            <BracketButton href="#about" variant="outline" onClick={smoothTo("#about")}>
              About the Studio
            </BracketButton>
          </div>

          <dl
            className="hero-rise mt-16 grid grid-cols-3 gap-6 border-t border-matte pt-8"
            style={{ animationDelay: "360ms" }}
          >
            <div>
              <dt className="font-heading text-2xl italic text-moss-deep">50%</dt>
              <dd className="mt-1 font-sans text-[0.7rem] uppercase tracking-editorial text-charcoal/60">
                Upfront Deposit
              </dd>
            </div>
            <div>
              <dt className="font-heading text-2xl italic text-moss-deep">1–2</dt>
              <dd className="mt-1 font-sans text-[0.7rem] uppercase tracking-editorial text-charcoal/60">
                Revision Rounds
              </dd>
            </div>
            <div>
              <dt className="font-heading text-2xl italic text-moss-deep">4</dt>
              <dd className="mt-1 font-sans text-[0.7rem] uppercase tracking-editorial text-charcoal/60">
                Fine Art Mediums
              </dd>
            </div>
          </dl>
        </div>

        {/* Right column — living canvas cycling each medium */}
        <div className="frame-settle relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}

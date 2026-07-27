import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, PinterestIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Parallax } from "@/components/parallax";
import { Marquee } from "@/components/marquee";

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Commission & Deposit",
    body: "Share your brief and references. A 50% deposit reserves your place in the studio calendar.",
  },
  {
    n: "02",
    title: "Studio & Revision",
    body: "The piece is made by hand. You review progress across 1–2 revision rounds based on scale.",
  },
  {
    n: "03",
    title: "Finish & Delivery",
    body: "On approval, the remaining balance is settled and the finished work is framed and shipped.",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-linen">
      {/* Scrolling ribbon — bridges the light collection into the dark studio */}
      <Marquee />

      {/* Process */}
      <section
        id="process"
        className="scroll-mt-20 border-b border-linen/10 px-6 py-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-editorial text-bronze">
              The Process
            </p>
            <h2 className="mt-3 max-w-2xl font-heading text-3xl italic text-linen sm:text-4xl">
              Three steps, start to hung.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 90}>
                <div className="border-t border-linen/20 pt-6">
                  <span className="font-heading text-2xl italic text-bronze">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-heading text-xl italic text-linen">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-linen/60">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Artist */}
      <section
        id="about"
        className="relative scroll-mt-20 overflow-x-clip border-b border-linen/10 px-6 py-24 md:px-10 lg:px-16 lg:py-32"
      >
        {/* Oversized watermark numeral — pizzazz */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-0 select-none font-heading text-[9rem] italic leading-none text-linen/[0.04] sm:text-[14rem] lg:text-[20rem]"
        >
          35
        </span>

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* Portrait frame with parallax */}
          <Reveal variant="left">
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative border border-linen/15 bg-linen/[0.03] p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-linen/10">
                  <Parallax amount={16} className="absolute inset-[-8%]">
                    <div className="relative h-full w-full">
                      <Image
                        src="https://images.unsplash.com/photo-1510832842230-87253f48d74f?q=80&w=800&h=1000&fit=crop"
                        alt="Nidhi at work in the MV Colours studio"
                        fill
                        sizes="(min-width: 1024px) 34vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </Parallax>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating years plaque */}
              <div className="absolute -bottom-6 -right-4 flex items-baseline gap-2 border border-linen/15 bg-charcoal px-5 py-4 shadow-xl sm:-right-8">
                <span className="font-heading text-4xl italic text-sage">35</span>
                <span className="font-sans text-[0.62rem] uppercase leading-tight tracking-editorial text-linen/60">
                  Years of
                  <br />
                  Practice
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal variant="right" delay={120}>
            <p className="font-sans text-xs uppercase tracking-editorial text-sage">
              The Artist
            </p>
            <h2 className="mt-4 font-heading text-4xl italic leading-[1.05] text-linen sm:text-5xl lg:text-6xl">
              Meet{" "}
              <span className="relative inline-block text-sage">
                Nidhi
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-sage via-bronze to-transparent"
                />
              </span>
              .
            </h2>

            <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-linen/70">
              For over{" "}
              <span className="text-linen">three and a half decades</span>, Nidhi
              has practiced fine art as a full-time professional — a disciplined
              hand shaped across traditional miniatures and gold leaf, oil and
              acrylic canvases, watercolours, and hand-painted tilework.
            </p>
            <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-linen/55">
              MV Colours is her working atelier, not a gallery. Every piece is
              made to order, by hand, for a specific space — 35 years of craft
              distilled into a single commission.
            </p>

            {/* Stat strip */}
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-linen/15 pt-8">
              <div>
                <dt className="font-heading text-3xl italic text-sage">35</dt>
                <dd className="mt-1 font-sans text-[0.62rem] uppercase tracking-editorial text-linen/45">
                  Years Professional
                </dd>
              </div>
              <div>
                <dt className="font-heading text-3xl italic text-sage">4</dt>
                <dd className="mt-1 font-sans text-[0.62rem] uppercase tracking-editorial text-linen/45">
                  Mediums Mastered
                </dd>
              </div>
              <div>
                <dt className="font-heading text-3xl italic text-sage">1/1</dt>
                <dd className="mt-1 font-sans text-[0.62rem] uppercase tracking-editorial text-linen/45">
                  Every Commission
                </dd>
              </div>
            </dl>

            {/* Signature */}
            <p className="mt-8 font-heading text-3xl italic text-linen/80">
              — Nidhi
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <Reveal variant="up">
            <div id="contact" className="scroll-mt-20">
              <p className="font-sans text-xs uppercase tracking-editorial text-sage">
                Contact
              </p>

              <h2 className="mt-3 font-heading text-3xl italic text-linen sm:text-4xl">
                Start a conversation.
              </h2>
              <dl className="mt-6 space-y-4 font-sans text-sm">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-editorial text-linen/40">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:studio@mvcolours.art"
                      className="text-linen transition-colors hover:text-sage"
                    >
                      studio@mvcolours.art
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-editorial text-linen/40">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href="tel:+919995557915"
                      className="text-linen transition-colors hover:text-sage"
                    >
                      +91 99955 57915
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-editorial text-linen/40">
                    Working Hours
                  </dt>
                  <dd className="mt-1 text-linen/70">
                    Monday to Saturday — 9:00 AM to 5:00 PM IST
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex items-center gap-5">
                <a
                  href="https://www.instagram.com/mv_colours"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="MV Colours on Instagram"
                  className="text-linen/70 transition-colors hover:text-sage"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="MV Colours on Pinterest"
                  className="text-linen/70 transition-colors hover:text-sage"
                >
                  <PinterestIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Baseline */}
      <div className="border-t border-linen/10 px-6 py-8 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Logo tone="linen" />
          <p className="font-sans text-[0.68rem] uppercase tracking-editorial text-linen/40">
            © {new Date().getFullYear()} MV Colours — Heritage Fine Art Studio
          </p>
        </div>
      </div>
    </footer>
  );
}

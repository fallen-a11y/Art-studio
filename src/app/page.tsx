import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Mediums } from "@/components/mediums";
import { GalleryGrid } from "@/components/gallery-grid";
import { CommissionIntake } from "@/components/commission-intake";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <section
          id="mediums-section"
          className="scroll-mt-20 border-t border-matte px-6 py-24 md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-editorial text-bronze-deep">
                The Collection
              </p>
              <h2 className="mt-3 max-w-2xl font-heading text-3xl italic font-normal text-charcoal sm:text-4xl">
                Four mediums, one atelier standard.
              </h2>
            </Reveal>

            <div className="mt-12">
              <Mediums />
            </div>

            <div id="gallery-grid" className="mt-20 scroll-mt-20">
              <GalleryGrid />
            </div>
          </div>
        </section>
        <section
          id="commission"
          className="scroll-mt-20 border-t border-matte bg-linen px-6 py-24 md:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <p className="font-sans text-xs uppercase tracking-editorial text-bronze-deep">
                  Custom Commission
                </p>
                <h2 className="mt-3 font-heading text-3xl italic font-normal text-charcoal sm:text-4xl">
                  Commission a one-of-a-kind piece.
                </h2>
                <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-charcoal/60">
                  Four steps to begin — choose a medium, share references,
                  describe your vision, and we&apos;ll take it from there.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <CommissionIntake />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

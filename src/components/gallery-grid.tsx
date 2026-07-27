"use client";

import { useState } from "react";
import Image from "next/image";
import { ARTWORKS, type Artwork } from "@/lib/artworks";
import { ProductModal } from "@/components/product-modal";
import { Reveal } from "@/components/reveal";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function GalleryGrid() {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 lg:gap-12">
        {ARTWORKS.map((artwork, index) => (
          <Reveal
            key={artwork.id}
            delay={(index % 3) * 80}
            className="mb-8 block break-inside-avoid lg:mb-12"
          >
            <button
              type="button"
              onClick={() => {
                setSelected(artwork);
                setOpen(true);
              }}
              className="group block w-full text-left"
            >
              <div className="relative overflow-hidden border border-matte bg-stone transition-shadow duration-500 group-hover:shadow-[0_24px_48px_-24px_rgba(43,38,35,0.4)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={`${artwork.image}?q=80&w=900&auto=format&fit=crop`}
                    alt={artwork.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 opacity-0 transition-all duration-500 group-hover:bg-charcoal/30 group-hover:opacity-100">
                    <span className="translate-y-1 border border-linen/70 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-editorial text-linen transition-transform duration-500 group-hover:translate-y-0">
                      Click to Preview &amp; Configure
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 px-1">
                <p className="font-heading text-lg italic text-charcoal transition-colors duration-300 group-hover:text-bronze-deep">
                  {artwork.title}
                </p>
                <p className="mt-1 font-sans text-xs uppercase tracking-editorial text-charcoal/50">
                  {artwork.mediumLabel} — Starts at{" "}
                  {currency.format(artwork.basePrice)}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ProductModal artwork={selected} open={open} onOpenChange={setOpen} />
    </>
  );
}

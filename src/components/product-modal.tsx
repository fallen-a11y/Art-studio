"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BracketButton } from "@/components/bracket-button";
import {
  FRAME_OPTIONS,
  SIZE_OPTIONS,
  priceForSelection,
  type Artwork,
} from "@/lib/artworks";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProductModal({
  artwork,
  open,
  onOpenChange,
}: {
  artwork: Artwork | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [sizeId, setSizeId] = useState(SIZE_OPTIONS[0].id);
  const [frameId, setFrameId] = useState(FRAME_OPTIONS[0].id);
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    if (artwork) {
      setSizeId(SIZE_OPTIONS[0].id);
      setFrameId(FRAME_OPTIONS[0].id);
      setReserved(false);
    }
  }, [artwork]);

  if (!artwork) return null;

  const { total, deposit } = priceForSelection(
    artwork.basePrice,
    sizeId,
    frameId
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
      }}
    >
      <DialogContent className="flex max-h-[90vh] w-full max-w-[calc(100%-2rem)] flex-col gap-0 overflow-y-auto rounded-none border border-matte bg-background p-0 sm:max-w-3xl lg:grid lg:max-w-5xl lg:grid-cols-2 lg:overflow-hidden">
        {/* Left column — framed preview */}
        <div className="relative aspect-[4/5] max-h-[42vh] w-full shrink-0 overflow-hidden bg-stone lg:aspect-auto lg:h-full lg:max-h-none">
          <Image
            src={`${artwork.image}?q=85&w=1200&auto=format&fit=crop`}
            alt={artwork.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 border border-linen/20" />
          <div className="absolute bottom-0 left-0 bg-charcoal/75 px-4 py-2 font-sans text-[0.65rem] uppercase tracking-editorial text-linen">
            {artwork.mediumLabel}
          </div>
        </div>

        {/* Right column — configuration */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div>
            <DialogTitle className="font-heading text-3xl italic font-normal leading-tight text-charcoal">
              {artwork.title}
            </DialogTitle>
            <p className="mt-1 font-sans text-xs uppercase tracking-editorial text-bronze-deep">
              {artwork.mediumLabel}
            </p>
            <DialogDescription className="mt-3 font-sans text-sm leading-relaxed text-charcoal/70">
              {artwork.description}
            </DialogDescription>
          </div>

          {/* Size selection */}
          <div>
            <p className="font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
              Size
            </p>
            <div
              role="radiogroup"
              aria-label="Size"
              className="mt-3 flex flex-wrap gap-2"
            >
              {SIZE_OPTIONS.map((size) => {
                const selected = size.id === sizeId;
                return (
                  <button
                    key={size.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setSizeId(size.id)}
                    className={`border px-4 py-2.5 text-left font-sans text-xs transition-colors duration-200 ${
                      selected
                        ? "border-charcoal bg-charcoal text-linen"
                        : "border-matte text-charcoal hover:border-bronze"
                    }`}
                  >
                    <span className="block tracking-wide">{size.label}</span>
                    <span
                      className={`mt-0.5 block text-[0.65rem] uppercase tracking-editorial ${
                        selected ? "text-linen/70" : "text-charcoal/50"
                      }`}
                    >
                      {size.tierLabel} —{" "}
                      {currency.format(artwork.basePrice + size.priceDelta)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame selection */}
          <div>
            <p className="font-sans text-[0.68rem] uppercase tracking-editorial text-charcoal/50">
              Framing
            </p>
            <div
              role="radiogroup"
              aria-label="Framing"
              className="mt-3 flex flex-wrap gap-2"
            >
              {FRAME_OPTIONS.map((frame) => {
                const selected = frame.id === frameId;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFrameId(frame.id)}
                    className={`border px-4 py-2.5 text-left font-sans text-xs transition-colors duration-200 ${
                      selected
                        ? "border-charcoal bg-charcoal text-linen"
                        : "border-matte text-charcoal hover:border-bronze"
                    }`}
                  >
                    <span className="block tracking-wide">{frame.label}</span>
                    <span
                      className={`mt-0.5 block text-[0.65rem] uppercase tracking-editorial ${
                        selected ? "text-linen/70" : "text-charcoal/50"
                      }`}
                    >
                      {frame.priceDelta === 0
                        ? "Included"
                        : `+${currency.format(frame.priceDelta)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live price engine */}
          <div className="mt-auto space-y-4 border-t border-matte pt-6">
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-xs uppercase tracking-editorial text-charcoal/60">
                Total Price
              </span>
              <span className="font-heading text-2xl italic text-charcoal">
                {currency.format(total)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-sans text-xs uppercase tracking-editorial text-charcoal/60">
                50% Upfront Deposit
              </span>
              <span className="font-heading text-xl italic text-bronze-deep">
                {currency.format(deposit)}
              </span>
            </div>
            <p className="font-sans text-[0.7rem] leading-relaxed text-charcoal/50">
              Remaining {currency.format(total - deposit)} due upon
              completion. Includes 1–2 revision rounds based on order scale.
            </p>

            {reserved ? (
              <p className="border border-bronze/40 bg-stone px-4 py-3 font-sans text-sm text-charcoal">
                Reservation received — a specialist will reach out to confirm
                your deposit for <em className="italic">{artwork.title}</em>.
              </p>
            ) : (
              <BracketButton
                variant="solid"
                className="w-full justify-center"
                onClick={() => setReserved(true)}
              >
                {`Reserve Piece — Pay 50% Deposit (${currency.format(deposit)})`}
              </BracketButton>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

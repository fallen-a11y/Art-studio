import Image from "next/image";
import { MEDIUMS } from "@/lib/artworks";
import { Reveal } from "@/components/reveal";

export function Mediums() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-6">
      {MEDIUMS.map((medium, index) => (
        <Reveal
          key={medium.id}
          delay={index * 90}
          variant="scale"
          className={index % 2 === 1 ? "lg:mt-10" : ""}
        >
          <a
            href="#gallery-grid"
            className="group relative block overflow-hidden border border-matte"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={`${medium.image}?q=80&w=800&auto=format&fit=crop`}
                alt={medium.name}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-500 ease-out group-hover:-translate-y-1 sm:p-5">
              <p className="font-heading text-lg italic leading-tight text-linen sm:text-xl">
                {medium.name}
              </p>
              <p className="mt-1 font-sans text-[0.68rem] uppercase tracking-editorial text-linen/70">
                {medium.tagline}
              </p>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

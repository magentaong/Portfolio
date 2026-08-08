"use client";

import { useState } from "react";
import Image from "next/image";
import { homeContent } from "@/data/home";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

export default function About() {
  const [catHops, setCatHops] = useState(0);

  return (
    <section
      id="about"
      className="bg-[var(--folio-paper)] py-24 text-[var(--folio-ink)] md:py-36"
    >
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 md:grid-cols-12 md:items-center lg:px-12">
        <div className="md:col-span-5 md:col-start-2">
          <figure className="relative">
            <button
              type="button"
              aria-label={homeContent.introduction.photoCat.controlLabel}
              onClick={() => setCatHops((count) => count + 1)}
              className="group absolute -right-1 top-1 z-20 h-20 w-24 touch-manipulation focus-visible:outline-[var(--folio-focus)] sm:-right-3 md:h-24 md:w-28"
            >
              <DoodleSlot
                slot="home-about-photo"
                interactionCount={catHops}
                className="absolute inset-0 overflow-visible"
              />
              <span className="absolute right-1 top-full -mt-1 -rotate-3 border-b-2 border-[var(--folio-cobalt)] bg-[var(--folio-doodle-paper)] px-1.5 py-0.5 text-[10px] font-semibold italic text-[var(--folio-cobalt)] transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5 motion-reduce:transition-none">
                {homeContent.introduction.photoCat.visibleLabel}
              </span>
            </button>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--folio-panel)]">
              <Image
                src={homeContent.introduction.image}
                alt={homeContent.introduction.imageAlt}
                fill
                sizes="(min-width: 768px) 38vw, 90vw"
                className="object-cover"
                style={{
                  objectPosition: homeContent.introduction.imagePosition,
                }}
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-[11px] text-[var(--folio-muted)]">
              <span>{homeContent.introduction.imageCaption[0]}</span>
              <span>{homeContent.introduction.imageCaption[1]}</span>
            </figcaption>
          </figure>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--folio-muted)]">
            {homeContent.introduction.eyebrow}
          </p>
          <h2 className="text-balance text-[clamp(2.25rem,4.8vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            {homeContent.introduction.headline}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--folio-muted)] md:text-lg">
            {homeContent.introduction.body}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-[var(--folio-rule)] pt-6 text-sm">
            {homeContent.introduction.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-[var(--folio-muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

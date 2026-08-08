import type { ArchivePageConfig } from "@/types/archive";
import { siteData } from "@/data/site";
import ArchiveBackLink from "@/components/archive/ArchiveBackLink";

export default function ArchiveMasthead({
  page,
}: {
  page: ArchivePageConfig;
}) {
  return (
    <section className="overflow-hidden bg-[#0b0b0e] pb-20 pt-32 text-[#f3efe7] md:pb-28 md:pt-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-5">
          <ArchiveBackLink link={page.backLink} />
        </div>
        <div className="border-t border-white/20 pt-5 text-[10px] uppercase tracking-[0.18em] text-white/55">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[var(--folio-accent)]">
              {siteData.archiveIdentity.label}
            </span>
            <span aria-hidden="true" className="text-white/25">→</span>
            <span>{page.eyebrow}</span>
          </p>
        </div>

        <h1 className="mt-16 text-[clamp(3.25rem,17vw,13rem)] font-semibold uppercase leading-[0.76] tracking-[-0.075em] [overflow-wrap:anywhere] md:mt-20">
          {page.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-16 grid gap-6 border-t border-white/20 pt-6 md:mt-24 md:grid-cols-12">
          <p className="max-w-2xl text-lg leading-relaxed text-white/[.68] md:col-span-6 md:col-start-7 md:text-xl">
            {page.introduction}
          </p>
        </div>
      </div>
    </section>
  );
}

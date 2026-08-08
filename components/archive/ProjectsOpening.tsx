import type { ProjectsPageConfig } from "@/types/project";
import { siteData } from "@/data/site";
import ArchiveBackLink from "@/components/archive/ArchiveBackLink";

export default function ProjectsOpening({ page }: { page: ProjectsPageConfig }) {
  return (
    <section className="bg-[#0b0b0e] pb-10 pt-28 text-[#f3efe7] md:pb-14 md:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-5">
          <ArchiveBackLink link={page.backLink} />
        </div>
        <div className="grid gap-7 border-y border-white/20 py-6 md:grid-cols-12 md:items-end md:gap-6 md:py-8">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-white/55 md:col-span-12">
            <span className="text-[var(--folio-accent)]">
              {siteData.archiveIdentity.label}
            </span>
            <span aria-hidden="true" className="text-white/25">→</span>
            <span>{page.eyebrow}</span>
          </p>
          <h1 className="min-w-0 text-[clamp(2.75rem,6vw,5.75rem)] font-semibold leading-[0.88] tracking-[-0.065em] md:col-span-4">
            {page.titleLines.join(" ")}
          </h1>
          <p className="max-w-3xl border-l border-[var(--folio-accent)] pl-4 text-lg font-medium leading-snug text-white/75 md:col-span-7 md:col-start-6 md:text-[clamp(1.25rem,2vw,1.8rem)]">
            {page.introduction}
          </p>
        </div>
      </div>
    </section>
  );
}

import type { DevLogPageConfig } from "@/types/devlog";
import DoodleSlot from "@/components/shared/AuthoredDoodle";
import ArchiveBackLink from "@/components/archive/ArchiveBackLink";

export default function DevlogOpening({ page }: { page: DevLogPageConfig }) {
  return (
    <section className="relative overflow-hidden bg-[var(--folio-cobalt-deep)] pb-16 pt-32 text-[#f4f0e8] md:pb-20 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="md:ml-auto md:w-10/12 lg:w-9/12">
          <div className="mb-4">
            <ArchiveBackLink link={page.backLink} />
          </div>
          <div className="grid grid-cols-[0.75rem_minmax(0,1fr)] bg-[#f3efe7] text-[#101014]">
            <span aria-hidden="true" className="bg-[var(--folio-accent)]" />

            <div className="min-w-0 px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--folio-cobalt-on-paper)]">
                <p>{page.eyebrow}</p>
                <p>{page.pathname}</p>
              </div>

              <h1 className="mt-10 text-[clamp(3.65rem,9vw,8.75rem)] font-semibold uppercase leading-[0.78] tracking-[-0.075em] text-[var(--folio-cobalt-deep)] sm:mt-12">
                {page.titleLines.join(" ")}
              </h1>

              <DoodleSlot
                slot="devlog-opening-mark"
                className="mt-4 h-9 items-start overflow-visible sm:h-14"
              />

              <div className="mt-10 grid gap-5 border-t border-[var(--folio-cobalt-on-paper-rule)] pt-5 md:grid-cols-2 md:gap-8">
                <p className="text-base leading-relaxed text-[#27272b] md:text-lg">
                  {page.introduction}
                </p>
                <p className="font-mono text-xs leading-relaxed text-[var(--folio-cobalt-on-paper)] md:justify-self-end md:text-right">
                  {page.metadata.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/home";
import { siteData } from "@/data/site";
import { skillData } from "@/data/skills";
import { timelineData, TimelineEntry } from "@/data/timeline";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

const featuredTimeline = homeContent.featuredExperienceIds
  .map((id) => timelineData.find((entry) => entry.id === id))
  .filter((entry): entry is TimelineEntry => Boolean(entry));

const skillRows = [
  {
    id: "languages",
    title: homeContent.experience.skillLabels.languages,
    values: skillData.languages,
  },
  {
    id: "frontend",
    title: homeContent.experience.skillLabels.frontend,
    values: skillData.frontend,
  },
  {
    id: "backend",
    title: homeContent.experience.skillLabels.backend,
    values: skillData.backend,
  },
  {
    id: "tools",
    title: homeContent.experience.skillLabels.tools,
    values: skillData.tools,
  },
];

export default function Skills() {
  return (
    <section
      id="experience"
      className="bg-[var(--folio-panel)] py-24 text-[var(--folio-ink)] md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 border-t border-[var(--folio-rule)] pt-7 md:mb-24">
          <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--folio-muted)]">
            {homeContent.experience.eyebrow}
          </p>
          <h2 className="mt-2 text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
            {homeContent.experience.title}
          </h2>
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-8">
          <figure className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--folio-paper)]">
              <Image
                src={homeContent.experienceImage}
                alt={homeContent.experience.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 text-[10px] text-[var(--folio-muted)]">
              <span>{homeContent.experience.imageCaption[0]}</span>
              <span>{homeContent.experience.imageCaption[1]}</span>
            </figcaption>
          </figure>

          <div className="lg:col-span-6 lg:col-start-7">
            <details open className="group border-t border-[var(--folio-rule)]">
              <summary className="flex list-none items-center justify-between gap-6 py-5 text-2xl font-semibold tracking-[-0.035em]">
                {homeContent.experience.experienceLabel}
                <span className="text-base font-normal text-[var(--folio-muted)] group-open:hidden">+</span>
                <span className="hidden text-base font-normal text-[var(--folio-muted)] group-open:block">−</span>
              </summary>
              <div className="space-y-7 pb-8">
                {featuredTimeline.map((entry) => (
                  <div
                    key={`${entry.date}-${entry.title}`}
                    className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-5"
                  >
                    <p className="text-[11px] text-[var(--folio-muted)]">{entry.date}</p>
                    <div>
                      <h3 className="text-sm font-semibold">{entry.title}</h3>
                      <p className="mt-0.5 text-xs text-[var(--folio-muted)]">{entry.company}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--folio-muted)]">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                ))}
                <Link
                  href={siteData.links.resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--folio-accent)]"
                >
                  {homeContent.experience.timelineLabel}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </details>

            {skillRows.map((row) => (
              <SkillRow key={row.id} {...row} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillRow({
  id,
  title,
  values,
}: {
  id: string;
  title: string;
  values: string[];
}) {
  return (
    <details className="doodle-trigger doodle-trigger--scoped group relative border-t border-[var(--folio-rule)] last:border-b">
      <DoodleSlot
        slot="home-experience-skill"
        anchorId={id}
        className="absolute right-8 top-0 h-[72px] w-[116px] justify-end overflow-visible sm:right-12 md:h-[84px] md:w-[150px]"
      />
      <summary className="doodle-primary-trigger relative z-10 flex min-h-11 list-none items-center justify-between gap-6 py-5 text-2xl font-semibold tracking-[-0.035em]">
        {title}
        <span className="text-base font-normal text-[var(--folio-muted)] group-open:hidden">+</span>
        <span className="hidden text-base font-normal text-[var(--folio-muted)] group-open:block">−</span>
      </summary>
      <p className="max-w-xl pb-7 text-sm leading-7 text-[var(--folio-muted)]">
        {values.join(" · ")}
      </p>
    </details>
  );
}

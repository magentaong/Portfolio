"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type {
  Project,
  ProjectHomeDisplay,
  ProjectHomeFeature,
  ProjectHomeLayout,
} from "@/types/project";
import { homeContent } from "@/data/home";
import { projectsPage } from "@/data/projects";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

type CuratedProject = {
  project: Project;
  feature: ProjectHomeFeature;
};

const placement: Record<ProjectHomeLayout, string> = {
  "wide-right": "md:col-start-5 md:col-span-8",
  "narrow-left": "md:col-start-1 md:col-span-5",
  "medium-right": "md:col-start-7 md:col-span-6",
  "wide-center": "md:col-start-3 md:col-span-8",
};

export default function Projects({
  featuredProjects,
}: {
  featuredProjects: CuratedProject[];
}) {
  return (
    <section
      id="work"
      className="overflow-hidden bg-[var(--folio-paper)] pb-28 text-[var(--folio-ink)] md:pb-44"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative border-t border-[var(--folio-rule)] pt-8">
          <DoodleSlot
            slot="home-work-heading"
            className="absolute right-1 top-0 -translate-y-1/2 sm:right-[16rem]"
          />
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h2 className="text-[clamp(4rem,12vw,9.5rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
              {homeContent.work.title}
            </h2>
            <div className="doodle-trigger doodle-trigger--scoped relative isolate flex max-w-[18rem] flex-col items-start sm:mb-1 sm:items-end sm:text-right">
              <DoodleSlot
                slot="home-work-archive"
                className="absolute -right-12 bottom-0 h-14 w-14 overflow-visible sm:-left-20 sm:right-auto md:h-16 md:w-16"
              />
              <p className="relative z-10 text-xs leading-relaxed text-[var(--folio-muted)]">
                {homeContent.work.introduction}
              </p>
              <Link
                href={projectsPage.pathname}
                className="doodle-primary-trigger group relative z-10 mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--folio-accent)]"
              >
                {homeContent.work.archiveLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-y-28 md:mt-36 md:grid-cols-12 md:gap-x-6 md:gap-y-40">
          {featuredProjects.map(({ project, feature }) => {
            const { display, layout, mediaLabel, note } = feature;

            return (
              <article
                key={project.slug}
                className={layout ? placement[layout] : "md:col-span-6"}
              >
                <ProjectMedia
                  project={project}
                  display={display}
                  mediaLabel={mediaLabel}
                />

                <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-[var(--folio-muted)]">
                      {project.date}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold leading-none tracking-[-0.04em] md:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--folio-muted)]">
                      {note}
                    </p>
                    <p className="mt-4 text-[11px] text-[var(--folio-muted)]">
                      {(project.tags ?? project.technologies.slice(0, 4)).join(" · ")}
                    </p>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--folio-accent)]"
                  >
                    {homeContent.work.detailsLabel}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectMedia({
  project,
  display,
  mediaLabel,
}: {
  project: Project;
  display: ProjectHomeDisplay;
  mediaLabel?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const image = project.media.cover;
  const secondaryImage = project.media.gallery?.[0];
  const video = project.media.videos?.[0];

  const play = () => {
    if (!prefersReducedMotion) void videoRef.current?.play();
  };
  const pause = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  if (display === "product-and-photo") {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block aspect-[16/10] overflow-hidden bg-[var(--folio-panel)]"
        aria-label={`${homeContent.work.viewProjectLabel}: ${project.title}`}
      >
        <div className="absolute inset-x-[7%] top-[10%] h-[68%] overflow-hidden bg-white shadow-xl shadow-black/10">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 60vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </div>
        {secondaryImage && (
          <div className="absolute bottom-[6%] left-[4%] h-[35%] w-[38%] overflow-hidden border-4 border-[var(--folio-paper)] bg-[var(--folio-panel)] shadow-lg shadow-black/15">
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              sizes="(min-width: 768px) 25vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
        {mediaLabel && (
          <span className="absolute bottom-[7%] right-[5%] text-[10px] uppercase tracking-[0.15em] text-[var(--folio-ink)]">
            {mediaLabel}
          </span>
        )}
      </Link>
    );
  }

  if ((display === "video" || display === "game") && video) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block aspect-video overflow-hidden bg-[#101014]"
        onMouseEnter={play}
        onMouseLeave={pause}
        onFocus={play}
        onBlur={pause}
        aria-label={`${homeContent.work.viewProjectLabel}: ${project.title}`}
      >
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster ?? image.src}
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          aria-hidden="true"
        />
        {mediaLabel && (
          <span className="absolute bottom-4 right-4 bg-[#101014]/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {mediaLabel}
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[var(--folio-panel)] p-[8%]"
      aria-label={`${homeContent.work.viewProjectLabel}: ${project.title}`}
    >
      <div className="relative h-full w-full shadow-2xl shadow-black/10">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  );
}

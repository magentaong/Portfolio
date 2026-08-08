"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shuffle } from "lucide-react";
import DoodleSlot from "@/components/shared/AuthoredDoodle";
import type {
  MiniProject,
  MiniProjectLink,
  MiniProjectsPageConfig,
} from "@/types/miniprojects";

const ALL_PROJECTS = "";

function shuffled<T>(items: T[]) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

export default function MiniProjectsArchive({
  page,
  projects,
}: {
  page: MiniProjectsPageConfig;
  projects: MiniProject[];
}) {
  const [activeTag, setActiveTag] = useState(ALL_PROJECTS);
  const [orderedProjects, setOrderedProjects] = useState(() => [...projects]);
  const [canPreviewVideo, setCanPreviewVideo] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))),
    [projects],
  );
  const archiveNumbers = useMemo(
    () =>
      new Map(
        projects.map((project, index) => [
          project.slug,
          String(index + 1).padStart(2, "0"),
        ]),
      ),
    [projects],
  );

  const visibleProjects = activeTag
    ? orderedProjects.filter((project) => project.tags.includes(activeTag))
    : orderedProjects;

  const resultMessage = (count: number) =>
    `${String(count).padStart(2, "0")} ${
      count === 1 ? page.resultSingular : page.resultPlural
    }`;

  const selectTag = (tag: string) => {
    const count = tag
      ? projects.filter((project) => project.tags.includes(tag)).length
      : projects.length;
    setActiveTag(tag);
    setStatusMessage(resultMessage(count));
  };

  const shuffleProjects = () => {
    setOrderedProjects((current) => shuffled(current));
    setStatusMessage(page.shuffledStatus);
  };

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreviewPreference = () => {
      setCanPreviewVideo(finePointer.matches && !reducedMotion.matches);
    };

    updatePreviewPreference();
    finePointer.addEventListener("change", updatePreviewPreference);
    reducedMotion.addEventListener("change", updatePreviewPreference);

    return () => {
      finePointer.removeEventListener("change", updatePreviewPreference);
      reducedMotion.removeEventListener("change", updatePreviewPreference);
    };
  }, []);

  return (
    <section
      aria-labelledby="mini-project-index-title"
      className="bg-[var(--folio-paper)] pb-28 pt-16 text-[var(--folio-ink)] md:pb-40 md:pt-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-t border-[var(--folio-rule)] pt-6 md:grid-cols-12 md:items-start">
          <h2
            id="mini-project-index-title"
            className="text-xs font-semibold uppercase tracking-[0.16em] md:col-span-3"
          >
            {page.indexLabel}
          </h2>

          <div
            role="group"
            aria-label={page.filterLabel}
            className="md:col-span-7"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--folio-muted)]">
              {page.filterLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <FilterButton
                active={activeTag === ALL_PROJECTS}
                label={page.allFilterLabel}
                onClick={() => selectTag(ALL_PROJECTS)}
              />
              {tags.map((tag) => (
                <FilterButton
                  key={tag}
                  active={activeTag === tag}
                  label={tag}
                  onClick={() => selectTag(tag)}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={shuffleProjects}
            className="group inline-flex min-h-11 w-fit items-center gap-2 border-b border-[var(--folio-rule)] text-left text-xs font-semibold transition-colors hover:border-[var(--folio-accent)] hover:text-[var(--folio-accent)] md:col-span-2 md:justify-self-end"
          >
            <Shuffle
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform group-active:rotate-180"
            />
            {page.shuffleLabel}
          </button>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>

        <div id="mini-project-index" className="mt-20 md:mt-28">
          {visibleProjects.map((project) => (
            <MiniProjectEntry
              key={project.slug}
              project={project}
              page={page}
              number={archiveNumbers.get(project.slug) ?? "—"}
              mediaOnRight={project.presentation?.mediaSide === "right"}
              canPreviewVideo={canPreviewVideo}
            />
          ))}
        </div>

        {visibleProjects.length === 0 && (
          <p
            role="status"
            className="border-t border-[var(--folio-rule)] py-20 text-sm text-[var(--folio-muted)]"
          >
            {page.emptyState}
          </p>
        )}
      </div>
    </section>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center border-b transition-colors ${
        active
          ? "border-[var(--folio-ink)] text-[var(--folio-ink)]"
          : "border-transparent text-[var(--folio-muted)] hover:border-[var(--folio-rule)] hover:text-[var(--folio-ink)]"
      }`}
    >
      {label}
    </button>
  );
}

function MiniProjectEntry({
  project,
  page,
  number,
  mediaOnRight,
  canPreviewVideo,
}: {
  project: MiniProject;
  page: MiniProjectsPageConfig;
  number: string;
  mediaOnRight: boolean;
  canPreviewVideo: boolean;
}) {
  return (
    <article
      id={project.slug}
      className="doodle-trigger doodle-trigger--scoped grid grid-cols-1 gap-7 border-t border-[var(--folio-rule)] py-14 md:grid-cols-12 md:gap-x-6 md:py-24"
    >
      <div
        className={`self-start md:row-start-1 md:col-span-4 ${
          mediaOnRight ? "md:col-start-1" : "md:col-start-9"
        }`}
      >
        <p className="text-[10px] uppercase tracking-[0.17em] text-[var(--folio-muted)]">
          {number} · {project.date} · {page.statusLabels[project.status]}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-5 text-sm leading-7 text-[var(--folio-muted)]">
          {project.description}
        </p>
        <p className="mt-6 text-[11px] leading-relaxed text-[var(--folio-muted)]">
          {project.tags.join(" · ")}
        </p>

        {project.learned && project.learned.length > 0 && (
          <details className="group mt-7 border-y border-[var(--folio-rule)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs font-semibold [&::-webkit-details-marker]:hidden">
              {page.learnedLabel}
              <span aria-hidden="true" className="text-base group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden text-base group-open:inline">
                −
              </span>
            </summary>
            <ul className="space-y-3 pb-5 text-xs leading-relaxed text-[var(--folio-muted)]">
              {project.learned.map((item) => (
                <li key={item} className="grid grid-cols-[1rem_1fr] gap-2">
                  <span aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {(project.links ?? []).map((link) => (
            <ProjectLink key={link.id} link={link} />
          ))}
        </div>
      </div>

      <div
        className={`md:row-start-1 md:col-span-7 ${
          mediaOnRight ? "md:col-start-6" : "md:col-start-1"
        }`}
      >
        <ProjectMedia project={project} canPreviewVideo={canPreviewVideo} />
      </div>
    </article>
  );
}

function ProjectMedia({
  project,
  canPreviewVideo,
}: {
  project: MiniProject;
  canPreviewVideo: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (canPreviewVideo || !videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.load();
  }, [canPreviewVideo]);

  const playPreview = () => {
    if (!canPreviewVideo || !videoRef.current) return;
    void videoRef.current.play().catch(() => undefined);
  };

  const resetPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.load();
  };

  const media = project.video ? (
    <video
      ref={videoRef}
      src={project.video}
      poster={project.image}
      preload="none"
      loop
      muted
      playsInline
      aria-hidden="true"
      className={`h-full w-full ${
        project.mediaFit === "contain" ? "object-contain p-[5%]" : "object-cover"
      }`}
    />
  ) : (
    <Image
      src={project.image}
      alt={project.imageAlt}
      fill
      sizes="(min-width: 768px) 58vw, 100vw"
      className={project.mediaFit === "contain" ? "object-contain p-[5%]" : "object-cover"}
    />
  );

  const className =
    "relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-[#101014]";

  return (
    <div
      className={className}
      onMouseEnter={playPreview}
      onMouseLeave={resetPreview}
    >
      {media}
      <DoodleSlot
        slot="mini-project-media"
        anchorId={project.slug}
        className="absolute inset-0"
      />
    </div>
  );
}

function ProjectLink({ link }: { link: MiniProjectLink }) {
  return (
    <Link
      href={link.href}
      target={link.target === "blank" ? "_blank" : undefined}
      rel={link.target === "blank" ? "noopener noreferrer" : undefined}
      className="doodle-primary-trigger group inline-flex min-h-11 items-center gap-1.5 border-b border-[var(--folio-rule)] pb-1 transition-colors hover:border-[var(--folio-accent)] hover:text-[var(--folio-accent)]"
    >
      {link.label}
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

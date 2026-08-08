"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectsPage } from "@/data/projects";
import type { Project } from "@/types/project";

type PreviewVisual = {
  src: string;
  fit?: "cover" | "contain";
  position?: string;
};

type ArchiveEvidence = {
  chapterTitle: string;
  caption: string;
  visual: PreviewVisual;
};

export default function ProjectsCatalogue({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const activeProject =
    projects.find((project) => project.slug === activeSlug) ?? projects[0];

  return (
    <section
      aria-labelledby="project-catalogue-heading"
      className="bg-[var(--folio-paper)] py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="border-t border-[var(--folio-rule)] pt-5">
          <h2
            id="project-catalogue-heading"
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
          >
            {projectsPage.labels.index}
          </h2>
        </div>

        {activeProject ? (
          <div className="project-catalogue-layout mt-10 grid items-start gap-12 md:mt-14">
            <aside aria-hidden="true" className="project-catalogue-stage">
              <div
                className="grid aspect-[16/10] grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-[var(--folio-panel)]"
                style={{
                  backgroundColor: activeProject.archive?.preview?.background,
                }}
              >
                <div className="relative min-h-0 overflow-hidden">
                  <ProjectPreview
                    key={activeProject.slug}
                    project={activeProject}
                    priority={activeProject.slug === projects[0]?.slug}
                  />
                </div>
                <ProjectPreviewContext
                  key={`${activeProject.slug}-context`}
                  project={activeProject}
                />
              </div>
            </aside>

            <ol className="project-catalogue-list border-t border-[var(--folio-rule)]">
              {projects.map((project) => {
                const active = project.slug === activeProject.slug;
                const previewImage = archivePreviewImage(project);
                const evidence = archiveEvidence(project);
                const tags = project.tags?.length
                  ? project.tags
                  : project.technologies.slice(0, 4);
                const rowDetail = evidence?.chapterTitle ?? tags.join(" · ");

                return (
                  <li key={project.slug} className="border-b border-[var(--folio-rule)]">
                    <Link
                      href={`/projects/${project.slug}`}
                      onMouseEnter={() => setActiveSlug(project.slug)}
                      onFocus={() => setActiveSlug(project.slug)}
                      className="project-catalogue-row group relative grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] gap-4 py-4 pl-3 outline-none transition-colors duration-200 hover:bg-[var(--folio-panel)] focus-visible:bg-[var(--folio-panel)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--folio-focus)] motion-reduce:transition-none sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:gap-5"
                    >
                      <span
                        aria-hidden="true"
                        data-active={active}
                        className="project-row-active-rail absolute inset-y-0 left-0 w-0.5 origin-top bg-[var(--folio-accent-ink)] transition-transform duration-300 motion-reduce:transition-none"
                      />

                      <span
                        aria-hidden="true"
                        className="project-row-thumbnail relative aspect-[4/3] self-start overflow-hidden bg-[var(--folio-panel)]"
                      >
                        <Image
                          src={previewImage.src}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 88px, 76px"
                          style={{
                            objectPosition:
                              project.archive?.preview?.position ??
                              previewImage.position,
                            backgroundColor:
                              project.archive?.preview?.background,
                          }}
                          className={projectPreviewImageClass(project)}
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="flex min-w-0 items-start justify-between gap-4">
                          <span
                            data-active={active}
                            className="project-row-title min-w-0 text-[1.15rem] font-semibold leading-[1.05] tracking-[-0.035em] transition-colors duration-200 [overflow-wrap:anywhere] group-hover:text-[var(--folio-accent-ink)] group-focus-visible:text-[var(--folio-accent-ink)] motion-reduce:transition-none sm:text-xl"
                          >
                            {project.title}
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                          />
                        </span>

                        <span className="mt-1.5 block text-xs font-medium leading-snug text-[var(--folio-ink)]">
                          {project.subtitle}
                        </span>

                        <span className="mt-3 flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] leading-relaxed text-[var(--folio-muted)]">
                          <span className="font-mono">{project.date}</span>
                          <span aria-hidden="true">/</span>
                          <span
                            className={
                              evidence
                                ? "font-medium text-[var(--folio-accent-ink)]"
                                : undefined
                            }
                          >
                            {evidence && <span aria-hidden="true">↳ </span>}
                            {rowDetail}
                          </span>
                        </span>

                        {evidence && (
                          <>
                            <span className="sr-only">{evidence.caption}</span>
                            <span
                              aria-hidden="true"
                              className="project-row-evidence-caption mt-2 block max-w-[52ch] text-[11px] leading-relaxed text-[var(--folio-muted)]"
                            >
                              {evidence.caption}
                            </span>
                          </>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectPreview({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const preview = project.archive?.preview;
  const evidence = archiveEvidence(project);
  const image = evidence?.visual ?? archivePreviewImage(project);

  return (
    <div
      key={project.slug}
      className="project-preview-reveal absolute inset-0"
      data-preview-kind={evidence ? "evidence" : "standard"}
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1440px) 540px, 38vw"
        style={{ objectPosition: preview?.position ?? image.position }}
        className={projectPreviewImageClass(project, image)}
      />
    </div>
  );
}

function ProjectPreviewContext({ project }: { project: Project }) {
  const evidence = archiveEvidence(project);

  return (
    <div
      className="project-preview-context min-h-[7.75rem] border-y border-[var(--folio-rule)] bg-[var(--folio-paper)] px-4 py-3"
      data-preview-kind={evidence ? "evidence" : "standard"}
    >
      <p className="text-[10px] font-semibold tracking-[0.08em] text-[var(--folio-accent-ink)]">
        {project.title}
      </p>
      {evidence ? (
        <>
          <p className="mt-2 max-w-[24ch] text-xl font-semibold leading-[1.05] tracking-[-0.03em]">
            {evidence.chapterTitle}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--folio-muted)]">
            {evidence.caption}
          </p>
        </>
      ) : (
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[var(--folio-muted)]">
          {project.summary}
        </p>
      )}
    </div>
  );
}

function projectPreviewImageClass(
  project: Project,
  image: PreviewVisual = archivePreviewImage(project),
) {
  const preview = project.archive?.preview;
  const fit = preview?.fit ?? image.fit ?? "cover";
  const padding = preview?.padding ?? (fit === "contain" ? "roomy" : "none");
  const paddingClass = {
    none: "",
    tight: "p-[3%]",
    roomy: "p-[7%]",
  }[padding];

  return `${fit === "contain" ? "object-contain" : "object-cover"} ${paddingClass}`;
}

function archiveEvidence(project: Project): ArchiveEvidence | null {
  const mediaId = project.archive?.evidenceMediaId;
  if (!mediaId) return null;

  const image = [project.media.cover, ...(project.media.gallery ?? [])].find(
    (candidate) => candidate.id === mediaId,
  );
  const video = project.media.videos?.find(
    (candidate) => candidate.id === mediaId,
  );
  const chapter = project.chapters?.find((candidate) =>
    candidate.artifactIds?.includes(mediaId),
  );
  const caption = image?.caption?.trim() ?? video?.caption?.trim();
  const src = image?.src ?? video?.poster;

  if (!chapter || !caption || !src) return null;

  return {
    chapterTitle: chapter.title,
    caption,
    visual: {
      src,
      fit: image?.fit ?? video?.fit ?? "contain",
      position: image?.position,
    },
  };
}

function archivePreviewImage(project: Project) {
  const imageId = project.archive?.preview?.imageId;
  if (!imageId || imageId === project.media.cover.id) return project.media.cover;
  return (
    project.media.gallery?.find((image) => image.id === imageId) ??
    project.media.cover
  );
}

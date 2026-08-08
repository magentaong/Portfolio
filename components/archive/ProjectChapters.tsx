"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ProjectDocumentReader from "@/components/archive/ProjectDocumentReader";
import type {
  Project,
  ProjectChapter,
  ProjectDocumentImage,
  ProjectImage,
  ProjectVideo,
} from "@/types/project";

type ChapterArtifact =
  | { kind: "image"; value: ProjectImage }
  | { kind: "video"; value: ProjectVideo };

type DocumentArtifact = { kind: "image"; value: ProjectDocumentImage };

type ProjectChapterLabels = {
  navigation: string;
  annotation: string;
  transcription: string;
  videoFallback: string;
  openDocument: string;
  documentReader: string;
  documentScale: string;
  fitDocument: string;
  fullSizeDocument: string;
  closeDocument: string;
};

export default function ProjectChapters({
  slug,
  chapters,
  media,
  labels,
  fallbackPoster,
}: {
  slug: string;
  chapters: ProjectChapter[];
  media: Project["media"];
  labels: ProjectChapterLabels;
  fallbackPoster: string;
}) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [motionReady, setMotionReady] = useState(false);
  const [activeDocument, setActiveDocument] =
    useState<ProjectDocumentImage | null>(null);
  const documentTriggerRef = useRef<HTMLButtonElement | null>(null);
  const artifacts = useMemo(() => artifactMap(media), [media]);

  const openDocument = useCallback(
    (image: ProjectDocumentImage, trigger: HTMLButtonElement) => {
      documentTriggerRef.current = trigger;
      setActiveDocument(image);
    },
    [],
  );

  const closeDocument = useCallback(() => {
    setActiveDocument(null);
    window.requestAnimationFrame(() => documentTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    setActiveId(chapters[0]?.id ?? "");
    setVisibleIds(new Set());
    setMotionReady(false);

    const motionFrame = window.requestAnimationFrame(() => setMotionReady(true));
    const sections = chapters
      .map((chapter) => document.getElementById(chapterDomId(slug, chapter.id)))
      .filter((section): section is HTMLElement => Boolean(section));

    const activateHashTarget = () => {
      const hashId = decodeURIComponent(window.location.hash.slice(1));
      const target = sections.find((section) => section.id === hashId);
      if (!target) return;

      const chapterId = target.getAttribute("data-chapter-id");
      if (!chapterId) return;
      setActiveId(chapterId);
      setVisibleIds((current) => {
        if (current.has(chapterId)) return current;
        const next = new Set(current);
        next.add(chapterId);
        return next;
      });
    };

    activateHashTarget();
    window.addEventListener("hashchange", activateHashTarget);

    if (!("IntersectionObserver" in window)) {
      setVisibleIds(new Set(chapters.map((chapter) => chapter.id)));
      return () => {
        window.cancelAnimationFrame(motionFrame);
        window.removeEventListener("hashchange", activateHashTarget);
      };
    }

    const currentEntries = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          currentEntries.set(entry.target.id, entry);
        }

        const probe = window.innerHeight * 0.28;
        const intersecting = Array.from(currentEntries.values())
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - probe) -
              Math.abs(second.boundingClientRect.top - probe),
          );

        if (intersecting[0]) {
          setActiveId(intersecting[0].target.getAttribute("data-chapter-id") ?? "");
        }

        setVisibleIds((current) => {
          const next = new Set(current);
          let changed = false;
          for (const entry of intersecting) {
            const id = entry.target.getAttribute("data-chapter-id");
            if (id && !next.has(id)) {
              next.add(id);
              changed = true;
            }
          }
          return changed ? next : current;
        });
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.05, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      window.cancelAnimationFrame(motionFrame);
      window.removeEventListener("hashchange", activateHashTarget);
      observer.disconnect();
    };
  }, [chapters, slug]);

  return (
    <section
      className="project-chapters bg-[var(--folio-paper)] pb-24 md:pb-32"
      data-motion-ready={motionReady ? "true" : "false"}
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <aside className="lg:col-span-3">
          <nav
            aria-label={labels.navigation}
            className="border-t border-[var(--folio-rule)] lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto"
          >
            <ol className="border-b border-[var(--folio-rule)]">
              {chapters.map((chapter) => {
                const active = chapter.id === activeId;
                return (
                  <li key={chapter.id} className="border-b border-[var(--folio-rule)] last:border-b-0">
                    <a
                      href={`#${chapterDomId(slug, chapter.id)}`}
                      aria-current={active ? "location" : undefined}
                      onClick={() => {
                        window.requestAnimationFrame(() => {
                          document
                            .getElementById(chapterDomId(slug, chapter.id))
                            ?.focus({ preventScroll: true });
                        });
                      }}
                      className={`group grid min-h-11 grid-cols-[0.5rem_minmax(0,1fr)] items-center gap-3 py-2.5 text-sm transition-colors hover:text-[var(--folio-accent-ink)] motion-reduce:transition-none ${
                        active
                          ? "font-semibold text-[var(--folio-accent-ink)]"
                          : "text-[var(--folio-muted)]"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 border border-current transition-colors motion-reduce:transition-none ${
                          active ? "bg-current" : "group-hover:bg-current"
                        }`}
                      />
                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        {chapter.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {chapters.map((chapter) => {
            const chapterArtifacts = (chapter.artifactIds ?? [])
              .map((id) => artifacts.get(id))
              .filter((artifact): artifact is ChapterArtifact => Boolean(artifact));
            const hasArtifacts = chapterArtifacts.length > 0;
            const hasDocumentArtifacts = chapterArtifacts.some(isDocumentArtifact);
            const usesArtifactSequence =
              hasArtifacts && chapter.layout === "artifact-sequence";
            const usesEvidenceStack =
              hasDocumentArtifacts &&
              chapter.layout !== "text-only" &&
              !usesArtifactSequence;
            const usesSplitLayout =
              hasArtifacts &&
              chapter.layout !== "text-only" &&
              !usesArtifactSequence &&
              !usesEvidenceStack;
            const visible = visibleIds.has(chapter.id);
            const headingId = `${chapterDomId(slug, chapter.id)}-heading`;

            return (
              <article
                key={chapter.id}
                id={chapterDomId(slug, chapter.id)}
                data-chapter-id={chapter.id}
                tabIndex={-1}
                aria-labelledby={headingId}
                className="scroll-mt-8 border-t border-[var(--folio-rule)] py-12 first:pt-8 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--folio-focus)] md:py-16"
              >
                <div
                  className={
                    usesSplitLayout
                      ? "grid gap-9 xl:grid-cols-12 xl:items-start"
                      : ""
                  }
                >
                  <div
                    className={
                      usesSplitLayout
                        ? chapter.layout === "artifact-first"
                          ? "min-w-0 xl:col-span-5 xl:col-start-8"
                          : "min-w-0 xl:col-span-5"
                        : "min-w-0 max-w-[68ch]"
                    }
                  >
                    <h2
                      id={headingId}
                      className="max-w-[16ch] text-[clamp(2.1rem,3.2vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.05em] [overflow-wrap:anywhere]"
                    >
                      {chapter.title}
                    </h2>
                    <div className="mt-6 space-y-5 text-base leading-7 text-[var(--folio-muted)]">
                      {chapter.body.map((paragraph, index) => (
                        <p key={`${chapter.id}-paragraph-${index}`}>{paragraph}</p>
                      ))}
                    </div>

                    {chapter.annotation && (
                      <aside
                        aria-label={labels.annotation}
                        className={`mt-8 max-w-[14rem] ${
                          chapter.annotation.placement === "right-margin"
                            ? "ml-auto"
                            : ""
                        }`}
                      >
                        <Image
                          src={chapter.annotation.src}
                          alt={chapter.annotation.alt}
                          width={chapter.annotation.width}
                          height={chapter.annotation.height}
                          aria-describedby={
                            chapter.annotation.transcription
                              ? `project-mark-${chapter.annotation.id}`
                              : undefined
                          }
                          className="h-auto w-full"
                        />
                        {chapter.annotation.transcription && (
                          <p
                            id={`project-mark-${chapter.annotation.id}`}
                            className="sr-only"
                          >
                            {labels.transcription}: {chapter.annotation.transcription}
                          </p>
                        )}
                        {chapter.annotation.caption && (
                          <p className="mt-2 text-xs leading-relaxed text-[var(--folio-muted)]">
                            {chapter.annotation.caption}
                          </p>
                        )}
                      </aside>
                    )}
                  </div>

                  {usesSplitLayout && (
                    <div
                      className={`min-w-0 space-y-8 ${
                        chapter.layout === "artifact-first"
                          ? "xl:col-span-6 xl:col-start-1 xl:row-start-1"
                          : "xl:col-span-6 xl:col-start-7"
                      }`}
                    >
                      {chapterArtifacts.map((artifact) => (
                        <ChapterArtifactFigure
                          key={artifact.value.id}
                          artifact={artifact}
                          visible={visible}
                          videoFallback={labels.videoFallback}
                          fallbackPoster={fallbackPoster}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {usesArtifactSequence && (
                  <div
                    role="group"
                    aria-labelledby={headingId}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.target !== event.currentTarget ||
                        (event.key !== "ArrowLeft" &&
                          event.key !== "ArrowRight")
                      ) {
                        return;
                      }

                      event.preventDefault();
                      event.currentTarget.scrollBy({
                        left:
                          event.currentTarget.clientWidth *
                          (event.key === "ArrowRight" ? 0.88 : -0.88),
                        behavior: "auto",
                      });
                    }}
                    className="project-artifact-sequence mt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--folio-focus)] md:mt-12"
                  >
                    {chapterArtifacts.map((artifact) => (
                      <div
                        key={artifact.value.id}
                        className="project-artifact-sequence-item min-w-0"
                        data-layout={artifact.value.layout ?? "column"}
                      >
                        {isDocumentArtifact(artifact) ? (
                          <DocumentArtifactFigure
                            image={artifact.value}
                            visible={visible}
                            openLabel={labels.openDocument}
                            onOpen={openDocument}
                          />
                        ) : (
                          <ChapterArtifactFigure
                            artifact={artifact}
                            visible={visible}
                            videoFallback={labels.videoFallback}
                            fallbackPoster={fallbackPoster}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {usesEvidenceStack && (
                  <div className="mt-10 min-w-0 space-y-10 md:mt-12 md:space-y-12">
                    {chapterArtifacts.map((artifact) =>
                      isDocumentArtifact(artifact) ? (
                        <DocumentArtifactFigure
                          key={artifact.value.id}
                          image={artifact.value}
                          visible={visible}
                          openLabel={labels.openDocument}
                          onOpen={openDocument}
                        />
                      ) : (
                        <ChapterArtifactFigure
                          key={artifact.value.id}
                          artifact={artifact}
                          visible={visible}
                          videoFallback={labels.videoFallback}
                          fallbackPoster={fallbackPoster}
                        />
                      ),
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {activeDocument && (
        <ProjectDocumentReader
          image={activeDocument}
          labels={{
            reader: labels.documentReader,
            scale: labels.documentScale,
            fit: labels.fitDocument,
            fullSize: labels.fullSizeDocument,
            close: labels.closeDocument,
          }}
          onClose={closeDocument}
        />
      )}
    </section>
  );
}

function DocumentArtifactFigure({
  image,
  visible,
  openLabel,
  onOpen,
}: {
  image: ProjectDocumentImage;
  visible: boolean;
  openLabel: string;
  onOpen: (image: ProjectDocumentImage, trigger: HTMLButtonElement) => void;
}) {
  return (
    <figure
      className="project-chapter-artifact"
      data-visible={visible ? "true" : "false"}
    >
      <button
        type="button"
        aria-label={`${openLabel}: ${image.alt}`}
        onClick={(event) => onOpen(image, event.currentTarget)}
        className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--folio-accent)]"
      >
        <span className="block overflow-hidden border border-[var(--folio-rule)] bg-[var(--folio-panel)]">
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 62vw, 92vw"
            className="h-auto w-full"
          />
        </span>
        <span className="flex min-h-11 items-center justify-between gap-4 border-b border-[var(--folio-rule)] py-2.5 text-sm font-semibold text-[var(--folio-accent-ink)]">
          <span>{openLabel}</span>
          <span aria-hidden="true" className="flex items-center gap-2">
            <span className="h-px w-8 bg-current transition-[width] duration-200 group-hover:w-14 group-focus-visible:w-14 motion-reduce:transition-none" />
            <Maximize2 className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>
      </button>
      <figcaption className="mt-2 max-w-[68ch] text-xs leading-relaxed text-[var(--folio-muted)]">
        {image.caption ?? image.alt}
      </figcaption>
    </figure>
  );
}

function ChapterArtifactFigure({
  artifact,
  visible,
  videoFallback,
  fallbackPoster,
}: {
  artifact: ChapterArtifact;
  visible: boolean;
  videoFallback: string;
  fallbackPoster: string;
}) {
  if (artifact.kind === "video") {
    return (
      <figure
        className="project-chapter-artifact"
        data-visible={visible ? "true" : "false"}
      >
        <div className="project-chapter-artifact-frame relative overflow-hidden bg-[#0b0b0e]">
          <video
            controls
            playsInline
            preload="none"
            poster={artifact.value.poster ?? fallbackPoster}
            aria-label={artifact.value.label}
            width={artifact.value.width}
            height={artifact.value.height}
            style={{
              aspectRatio: `${artifact.value.width} / ${artifact.value.height}`,
            }}
            className={`h-auto w-full ${
              artifact.value.fit === "cover" ? "object-cover" : "object-contain"
            }`}
          >
            <source src={artifact.value.src} />
            {(artifact.value.tracks ?? []).map((track) => (
              <track
                key={track.id}
                src={track.src}
                kind={track.kind}
                srcLang={track.srcLang}
                label={track.label}
                default={track.default}
              />
            ))}
            {videoFallback}
          </video>
        </div>
        {(artifact.value.caption || artifact.value.description) && (
          <figcaption className="mt-2 max-w-[68ch] space-y-1 text-xs leading-relaxed text-[var(--folio-muted)]">
            {artifact.value.caption && <p>{artifact.value.caption}</p>}
            {artifact.value.description && <p>{artifact.value.description}</p>}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure
      className="project-chapter-artifact"
      data-visible={visible ? "true" : "false"}
    >
      <div
        className={`project-chapter-artifact-frame relative overflow-hidden bg-[var(--folio-panel)] ${projectImageAspect(artifact.value.aspect)}`}
      >
        <Image
          src={artifact.value.src}
          alt={artifact.value.alt}
          fill
          sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 56vw, 92vw"
          style={{ objectPosition: artifact.value.position }}
          className={
            artifact.value.fit === "contain"
              ? "object-contain p-[5%]"
              : "object-cover"
          }
        />
      </div>
      {artifact.value.caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-[var(--folio-muted)]">
          {artifact.value.caption}
        </figcaption>
      )}
    </figure>
  );
}

function isDocumentArtifact(
  artifact: ChapterArtifact,
): artifact is DocumentArtifact {
  return artifact.kind === "image" && artifact.value.view === "document";
}

function artifactMap(media: Project["media"]) {
  const artifacts = new Map<string, ChapterArtifact>();
  artifacts.set(media.cover.id, { kind: "image", value: media.cover });
  for (const image of media.gallery ?? []) {
    artifacts.set(image.id, { kind: "image", value: image });
  }
  for (const video of media.videos ?? []) {
    artifacts.set(video.id, { kind: "video", value: video });
  }
  return artifacts;
}

function chapterDomId(slug: string, chapterId: string) {
  return `project-${slug}-${chapterId}`;
}

function projectImageAspect(aspect: ProjectImage["aspect"]) {
  if (aspect === "wide") return "aspect-video";
  if (aspect === "landscape") return "aspect-[3/2]";
  if (aspect === "portrait") return "aspect-[3/4]";
  if (aspect === "phone") return "aspect-[9/20]";
  if (aspect === "square") return "aspect-square";
  return "aspect-[4/3]";
}

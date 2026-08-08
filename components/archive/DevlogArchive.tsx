"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type {
  DevLogEntry,
  DevLogImageAsset,
  DevLogInk,
  DevLogMood,
  DevLogPageConfig,
} from "@/types/devlog";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

type DevlogArchiveProps = {
  entries: DevLogEntry[];
  labels: DevLogPageConfig["labels"];
  moodLabels: Record<DevLogMood, string>;
};

const ALL_PROJECTS = "__all-projects__";

const NOTEBOOK_BLUE = "text-[var(--folio-cobalt)]";
const NOTEBOOK_RULE = "border-[var(--folio-cobalt-rule)]";

const INK_STYLES: Record<DevLogInk, { rule: string; text: string }> = {
  blue: {
    rule: "border-[var(--folio-cobalt)]",
    text: "text-[var(--folio-cobalt)]",
  },
  orange: {
    rule: "border-[var(--folio-accent)]",
    text: "text-[var(--folio-accent-ink)]",
  },
  magenta: {
    rule: "border-[var(--folio-magenta)]",
    text: "text-[var(--folio-magenta-ink)]",
  },
};

function paragraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function entryProject(entry: DevLogEntry) {
  return entry.project?.trim() || null;
}

function NotebookImage({
  asset,
  sizes,
  transcriptionLabel,
  captionClassName,
}: {
  asset: DevLogImageAsset;
  sizes: string;
  transcriptionLabel: string;
  captionClassName: string;
}) {
  const transcriptionId = asset.transcription
    ? `devlog-asset-${asset.id}-transcription`
    : undefined;

  return (
    <figure>
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        aria-describedby={transcriptionId}
        className="h-auto w-full"
      />
      {asset.transcription && (
        <p id={transcriptionId} className="sr-only">
          {transcriptionLabel}: {asset.transcription}
        </p>
      )}
      {asset.caption && (
        <figcaption className={captionClassName}>{asset.caption}</figcaption>
      )}
    </figure>
  );
}

export default function DevlogArchive({
  entries,
  labels,
  moodLabels,
}: DevlogArchiveProps) {
  const [activeProject, setActiveProject] = useState(ALL_PROJECTS);
  const [filterInteractionCount, setFilterInteractionCount] = useState(0);

  const projects = useMemo(
    () =>
      Array.from(
        new Set(
          entries
            .map(entryProject)
            .filter((project): project is string => Boolean(project)),
        ),
      ),
    [entries],
  );

  const projectCounts = useMemo(
    () =>
      entries.reduce<Record<string, number>>((counts, entry) => {
        const project = entryProject(entry);
        if (project) {
          counts[project] = (counts[project] ?? 0) + 1;
        }
        return counts;
      }, {}),
    [entries],
  );

  const filteredEntries = useMemo(
    () =>
      activeProject === ALL_PROJECTS
        ? entries
        : entries.filter((entry) => entryProject(entry) === activeProject),
    [activeProject, entries],
  );

  const filters = [
    { value: ALL_PROJECTS, label: labels.allProjects, count: entries.length },
    ...projects.map((project) => ({
      value: project,
      label: project,
      count: projectCounts[project] ?? 0,
    })),
  ];
  const activeFilterLabel =
    filters.find((filter) => filter.value === activeProject)?.label ??
    labels.allProjects;

  function selectProject(nextProject: string) {
    if (nextProject === activeProject) return;

    setActiveProject(nextProject);
    setFilterInteractionCount((count) => count + 1);
  }

  return (
    <section
      className="pb-24 pt-12 md:pb-32 md:pt-16"
      aria-label={labels.archiveAriaLabel}
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <aside className="lg:col-span-3">
          <div className={`doodle-trigger border-t pt-4 lg:sticky lg:top-8 ${NOTEBOOK_RULE}`}>
            <h2
              id="devlog-filter-heading"
              className={`font-mono text-[10px] uppercase tracking-[0.16em] ${NOTEBOOK_BLUE}`}
            >
              {labels.filterHeading}
            </h2>

            <div
              role="group"
              aria-labelledby="devlog-filter-heading"
              className={`mt-6 border-b ${NOTEBOOK_RULE}`}
            >
              {filters.map((filter) => {
                const active = activeProject === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => selectProject(filter.value)}
                    className={`group flex min-h-11 w-full items-center justify-between gap-4 border-t py-2.5 text-left text-sm transition-colors hover:text-[var(--folio-cobalt)] focus-visible:outline-[var(--folio-cobalt)] motion-reduce:transition-none ${NOTEBOOK_RULE} ${
                      active
                        ? `font-semibold ${NOTEBOOK_BLUE}`
                        : "text-[var(--folio-muted)]"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 border transition-colors motion-reduce:transition-none ${
                          active
                            ? "border-[var(--folio-cobalt)] bg-[var(--folio-cobalt)]"
                            : "border-[var(--folio-rule)] group-hover:border-[var(--folio-cobalt)]"
                        }`}
                      />
                      <span className="truncate">{filter.label}</span>
                    </span>
                    <span className="font-mono text-[10px] tabular-nums opacity-70">
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              role="status"
              aria-live="polite"
              className="mt-4 font-mono text-[11px] text-[var(--folio-muted)]"
            >
              {filteredEntries.length}{" "}
              {filteredEntries.length === 1
                ? labels.resultSingular
                : labels.resultPlural}{" "}
              · {labels.resultScope}: {activeFilterLabel}
            </p>

            <DoodleSlot
              slot="devlog-filter-rail"
              interactionCount={filterInteractionCount}
              className="relative mt-6 h-28 w-full justify-end overflow-visible sm:h-32 lg:h-36"
            />
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-8 lg:col-start-5">
          {filteredEntries.length === 0 ? (
            <p
              className={`border-y py-10 text-base text-[var(--folio-muted)] ${NOTEBOOK_RULE}`}
            >
              {labels.emptyState}
            </p>
          ) : (
            <ol className={`border-y ${NOTEBOOK_RULE}`}>
              {filteredEntries.map((entry) => {
                const ink = entry.ink ? INK_STYLES[entry.ink] : undefined;
                const titleId = `note-${entry.id}-title`;

                return (
                  <li
                    key={entry.id}
                    className={`border-b last:border-b-0 ${NOTEBOOK_RULE}`}
                  >
                    <article
                      id={`note-${entry.id}`}
                      aria-labelledby={titleId}
                      className="doodle-trigger doodle-trigger--scoped relative scroll-mt-8 grid gap-5 py-7 sm:grid-cols-[6.25rem_minmax(0,1fr)] sm:gap-0 sm:py-9"
                    >
                      <header className="flex items-baseline justify-between gap-4 sm:block sm:pr-5">
                        <a
                          href={`#note-${entry.id}`}
                          aria-label={`${labels.note} ${entry.id}`}
                          className={`doodle-primary-trigger font-mono text-sm font-semibold tracking-[-0.02em] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current motion-reduce:transition-none ${NOTEBOOK_BLUE}`}
                        >
                          {labels.noteMarker}
                          {entry.id}
                        </a>
                        <time
                          dateTime={entry.publishedAt}
                          className="font-mono text-[10px] tabular-nums text-[var(--folio-muted)] sm:mt-3 sm:block sm:max-w-[5rem] sm:leading-4"
                        >
                          {entry.date}
                        </time>
                      </header>

                      <div
                        className={`min-w-0 border-l pl-4 sm:pl-7 ${
                          ink?.rule ?? NOTEBOOK_RULE
                        }`}
                      >
                        <dl className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--folio-muted)]">
                          <div className="flex gap-2">
                            <dt>{labels.project}</dt>
                            <dd className="text-[var(--folio-ink)]">
                              {entryProject(entry) || labels.unfiledProject}
                            </dd>
                          </div>
                          <div className="flex gap-2">
                            <dt>{labels.mood}</dt>
                            <dd className="text-[var(--folio-ink)]">
                              {moodLabels[entry.mood]}
                            </dd>
                          </div>
                        </dl>

                        <div
                          className={
                            entry.marginNote
                              ? "mt-4 grid min-w-0 gap-7 xl:grid-cols-[minmax(0,1fr)_9.5rem]"
                              : "mt-4 min-w-0"
                          }
                        >
                          <div className="min-w-0">
                            <h2
                              id={titleId}
                              className={`max-w-[26ch] text-[clamp(1.65rem,3vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] ${
                                ink?.text ?? "text-[var(--folio-ink)]"
                              }`}
                            >
                              {entry.title}
                            </h2>

                            <div className="mt-5 max-w-[68ch] space-y-4 text-[15px] leading-7 text-[var(--folio-muted)] md:text-base md:leading-7">
                              {paragraphs(entry.body).map(
                                (paragraph, index) => (
                                  <p
                                    key={`${entry.id}-paragraph-${index}`}
                                    className="whitespace-pre-line"
                                  >
                                    {paragraph}
                                  </p>
                                ),
                              )}
                            </div>

                            {entry.artifact && (
                              <div
                                className={`mt-7 border-y py-3 ${NOTEBOOK_RULE}`}
                              >
                                <NotebookImage
                                  asset={entry.artifact}
                                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 50vw, 100vw"
                                  transcriptionLabel={labels.transcription}
                                  captionClassName="mt-2 font-mono text-[10px] leading-4 text-[var(--folio-muted)]"
                                />
                              </div>
                            )}

                            {entry.code && (
                              <figure
                                className={`mt-7 border-y py-4 ${NOTEBOOK_RULE}`}
                              >
                                <figcaption
                                  className={`font-mono text-[10px] uppercase tracking-[0.12em] ${NOTEBOOK_BLUE}`}
                                >
                                  {entry.code.label}
                                  {entry.code.language && (
                                    <span className="text-[var(--folio-muted)]">
                                      {" "}
                                      / {entry.code.language}
                                    </span>
                                  )}
                                </figcaption>
                                <pre
                                  tabIndex={0}
                                  aria-label={entry.code.label}
                                  className="mt-3 overflow-x-auto bg-[var(--folio-panel)] p-4 font-mono text-xs leading-6 text-[var(--folio-ink)] focus-visible:outline-[var(--folio-cobalt)]"
                                >
                                  <code>{entry.code.content}</code>
                                </pre>
                              </figure>
                            )}

                            {entry.links && entry.links.length > 0 && (
                              <nav
                                aria-label={`${labels.links}: ${entry.title}`}
                                className={`mt-7 border-t pt-4 ${NOTEBOOK_RULE}`}
                              >
                                <p
                                  className={`font-mono text-[10px] uppercase tracking-[0.12em] ${NOTEBOOK_BLUE}`}
                                >
                                  {labels.links}
                                </p>
                                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                                  {entry.links.map((link) => (
                                    <li key={`${link.href}-${link.label}`}>
                                      <a
                                        href={link.href}
                                        target={
                                          link.target === "blank"
                                            ? "_blank"
                                            : undefined
                                        }
                                        rel={
                                          link.target === "blank"
                                            ? "noreferrer"
                                            : undefined
                                        }
                                        className={`underline decoration-[var(--folio-cobalt-rule)] underline-offset-4 transition-colors hover:decoration-current motion-reduce:transition-none ${NOTEBOOK_BLUE}`}
                                      >
                                        {link.label}
                                        {link.target === "blank" && (
                                          <span aria-hidden="true"> ↗</span>
                                        )}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </nav>
                            )}

                            {entry.tags && entry.tags.length > 0 && (
                              <div
                                className={`mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.1em] ${NOTEBOOK_RULE}`}
                              >
                                <p className="text-[var(--folio-muted)]">
                                  {labels.tags}
                                </p>
                                <ul
                                  aria-label={labels.tags}
                                  className="flex flex-wrap gap-x-2 text-[var(--folio-ink)]"
                                >
                                  {entry.tags.map((tag, index) => (
                                    <li key={tag}>
                                      {tag}
                                      {index < entry.tags!.length - 1 && (
                                        <span
                                          aria-hidden="true"
                                          className="ml-2 text-[var(--folio-muted)]"
                                        >
                                          /
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {entry.marginNote && (
                            <aside
                              aria-label={labels.marginNote}
                              className="self-start"
                            >
                              <p
                                className={`mb-2 font-mono text-[9px] uppercase tracking-[0.12em] ${NOTEBOOK_BLUE}`}
                              >
                                {labels.marginNote}
                              </p>
                              <NotebookImage
                                asset={entry.marginNote}
                                sizes="(min-width: 1280px) 152px, (min-width: 1024px) 62vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
                                transcriptionLabel={labels.transcription}
                                captionClassName="mt-2 font-mono text-[9px] leading-4 text-[var(--folio-muted)]"
                              />
                            </aside>
                          )}
                        </div>
                      </div>

                      <DoodleSlot
                        slot="devlog-entry-margin"
                        anchorId={entry.id}
                        className="mt-4 justify-end sm:absolute sm:bottom-8 sm:left-0 sm:mt-0 sm:w-[6.25rem] sm:justify-center"
                      />
                    </article>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

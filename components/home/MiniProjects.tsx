"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shuffle } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { MiniProject } from "@/types/miniprojects";
import { homeContent } from "@/data/home";
import { miniProjectsPage } from "@/data/miniprojects";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

function shuffled<T>(items: T[]) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }

  return next;
}

function selectionSignature(projects: MiniProject[]) {
  return projects
    .map((project) => project.slug)
    .sort()
    .join("|");
}

function randomSelection(
  projects: MiniProject[],
  currentProjects: MiniProject[],
) {
  const selectionSize = Math.min(3, projects.length);
  const candidate = shuffled(projects).slice(0, selectionSize);

  if (selectionSignature(candidate) !== selectionSignature(currentProjects)) {
    return candidate;
  }

  const currentSlugs = new Set(currentProjects.map((project) => project.slug));
  const replacement = projects.find(
    (project) => !currentSlugs.has(project.slug),
  );

  if (!replacement) return candidate;
  return shuffled([
    ...currentProjects.slice(0, Math.max(0, selectionSize - 1)),
    replacement,
  ]);
}

export default function MiniProjects({
  projects,
  initialSlugs,
}: {
  projects: MiniProject[];
  initialSlugs: string[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const [visibleProjects, setVisibleProjects] = useState(() =>
    initialSlugs
      .map((slug) => projects.find((project) => project.slug === slug))
      .filter((project): project is MiniProject => Boolean(project)),
  );
  const [shuffleCount, setShuffleCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [dealPhase, setDealPhase] = useState<"idle" | "out" | "in">(
    "idle",
  );
  const swapTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    },
    [],
  );

  const shuffleProjects = () => {
    if (dealPhase !== "idle") return;

    const nextProjects = randomSelection(projects, visibleProjects);
    if (
      selectionSignature(nextProjects) === selectionSignature(visibleProjects)
    ) {
      return;
    }

    const finishShuffle = () => {
      setVisibleProjects(nextProjects);
      setShuffleCount((count) => count + 1);
      setStatusMessage(
        `${homeContent.miniProjects.shuffledStatusLead}: ${nextProjects
          .map((project) => project.title)
          .join(", ")}.`,
      );
    };

    if (prefersReducedMotion) {
      finishShuffle();
      return;
    }

    setDealPhase("out");
    swapTimerRef.current = window.setTimeout(() => {
      finishShuffle();
      setDealPhase("in");
      swapTimerRef.current = null;
      settleTimerRef.current = window.setTimeout(() => {
        setDealPhase("idle");
        settleTimerRef.current = null;
      }, 300);
    }, 140);
  };

  return (
    <section
      id="small-projects"
      className="bg-[var(--folio-paper)] pb-28 text-[var(--folio-ink)] md:pb-40"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative flex flex-col items-start gap-4 border-t border-[var(--folio-rule)] pt-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--folio-muted)]">
              {homeContent.miniProjects.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              {homeContent.miniProjects.title}
            </h2>
          </div>
          <div className="doodle-trigger doodle-trigger--scoped relative isolate self-end">
            <DoodleSlot
              slot="home-miniprojects-shuffle"
              interactionCount={shuffleCount}
              className="absolute bottom-full right-0 mb-1 h-[68px] w-[76px] justify-end overflow-visible md:right-2 md:h-[88px] md:w-[96px]"
            />
            <button
              type="button"
              aria-controls="home-mini-project-grid"
              aria-disabled={dealPhase !== "idle"}
              onClick={shuffleProjects}
              className="doodle-primary-trigger group relative z-10 inline-flex min-h-11 min-w-11 touch-manipulation items-center gap-2 px-2 text-xs font-semibold transition-colors hover:text-[var(--folio-accent)]"
            >
              <Shuffle
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-active:rotate-180"
              />
              {homeContent.miniProjects.shuffleLabel}
            </button>
          </div>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {statusMessage}
        </p>

        <div
          id="home-mini-project-grid"
          aria-busy={dealPhase !== "idle"}
          data-deal-phase={dealPhase}
          className="mini-project-deal-grid mt-10 grid gap-3 md:grid-cols-3"
        >
          {visibleProjects.map((project) => (
            <div key={project.slug} className="mini-project-deal-slot min-w-0">
              <MiniProjectPanel project={project} />
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-end">
          <Link
            href={miniProjectsPage.pathname}
            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--folio-accent)]"
          >
            {homeContent.miniProjects.archiveLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MiniProjectPanel({ project }: { project: MiniProject }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const primaryLink = project.links?.[0];
  const href =
    primaryLink?.href ?? `${miniProjectsPage.pathname}#${project.slug}`;
  const opensNewTab = primaryLink?.target === "blank";

  const play = () => {
    if (!prefersReducedMotion) void videoRef.current?.play();
  };
  const pause = () => videoRef.current?.pause();

  return (
    <Link
      href={href}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      aria-label={primaryLink?.label ?? `Find ${project.title} in mini projects`}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      className="doodle-trigger doodle-trigger--scoped doodle-primary-trigger group relative block aspect-[4/3] overflow-hidden bg-[#111114] text-white"
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.image}
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      ) : (
        <Image
          src={project.image ?? "/images/portfolio-preview.png"}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 768px) 33vw, 90vw"
          className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
        />
      )}
      <DoodleSlot
        slot="mini-project-media"
        anchorId={project.slug}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <div>
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/55">
            {project.date} · {miniProjectsPage.statusLabels[project.status]}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.025em]">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/65 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
      </div>
    </Link>
  );
}

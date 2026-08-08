"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Project } from "@/types/project";
import type { MiniProject } from "@/types/miniprojects";
import type { DevLogEntry } from "@/types/devlog";
import { homeContent } from "@/data/home";
import { miniProjectsPage } from "@/data/miniprojects";
import { siteData } from "@/data/site";

const framePaddingClasses = {
  none: "",
  tight: "p-[3%]",
  roomy: "p-[7%]",
} as const;

function resolveCurrentBuildFrame(project: Project) {
  const currentBuild = project.presentation?.currentBuild;
  const projectHero = project.presentation?.hero;
  const archivePreview = project.archive?.preview;
  const fit =
    currentBuild?.fit ??
    projectHero?.fit ??
    archivePreview?.fit ??
    project.media.cover.fit ??
    "cover";
  const padding =
    currentBuild?.padding ??
    projectHero?.padding ??
    archivePreview?.padding ??
    (fit === "contain" ? "roomy" : "none");

  return {
    background:
      currentBuild?.background ??
      projectHero?.background ??
      archivePreview?.background ??
      "#222228",
    imageClassName: `${
      fit === "contain" ? "object-contain" : "object-cover"
    } ${framePaddingClasses[padding]}`,
    position:
      currentBuild?.position ??
      projectHero?.position ??
      archivePreview?.position ??
      project.media.cover.position ??
      "center",
  };
}

type HeroProps = {
  currentProject?: Project;
  currentMiniProject?: MiniProject;
  latestNote?: DevLogEntry;
};

export default function Hero({
  currentProject,
  currentMiniProject,
  latestNote,
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const objectX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 170,
    damping: 21,
    mass: 0.4,
  });
  const objectY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 170,
    damping: 21,
    mass: 0.4,
  });
  const objectRotate = useSpring(useTransform(pointerX, [-0.5, 0.5], [-1, 1]), {
    stiffness: 170,
    damping: 21,
    mass: 0.4,
  });
  const currentMiniProjectLink = currentMiniProject?.links?.[0];
  const currentMiniProjectHref =
    currentMiniProjectLink?.href ??
    (currentMiniProject
      ? `${miniProjectsPage.pathname}#${currentMiniProject.slug}`
      : miniProjectsPage.pathname);
  const currentMiniProjectOpensNewTab =
    currentMiniProjectLink?.target === "blank";
  const currentProjectFrame = currentProject
    ? resolveCurrentBuildFrame(currentProject)
    : null;

  useEffect(() => {
    if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const trackPointer = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", trackPointer, { passive: true });
    return () => window.removeEventListener("mousemove", trackPointer);
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <section className="relative min-h-[112svh] overflow-hidden bg-[#0b0b0e] pb-16 pt-28 text-[#f3efe7] md:pb-24 md:pt-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-7 max-w-max text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/55"
        >
          {homeContent.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[clamp(3.75rem,19vw,14rem)] font-semibold uppercase leading-[0.75] tracking-[-0.075em]"
        >
          <span className="block">
            <span className="hero-name-box">
              {homeContent.hero.name.boxed}
            </span>
            <span className="hero-name-remainder">
              {homeContent.hero.name.remainder}
            </span>
            <span className="sr-only"> </span>
          </span>
          <span className="block">{homeContent.hero.name.secondLine}</span>
        </motion.h1>

        <div className="mt-16 grid items-end gap-10 lg:mt-24 lg:grid-cols-[0.68fr_1.7fr_0.68fr]">
          <div className="order-2 max-w-xs lg:order-1 lg:pb-10">
            <p className="text-sm leading-relaxed text-white/62">
              {homeContent.hero.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
              <Link
                href={siteData.links.resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-white transition-colors hover:text-[var(--folio-accent)] focus-visible:outline-[#f3efe7]"
              >
                {siteData.links.resume.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={siteData.links.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-white/60 transition-colors hover:text-white focus-visible:outline-[#f3efe7]"
              >
                {siteData.links.github.label} ↗
              </Link>
              <Link
                href={siteData.links.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-white/60 transition-colors hover:text-white focus-visible:outline-[#f3efe7]"
              >
                {siteData.links.linkedin.label} ↗
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="order-1 mx-auto w-full max-w-3xl lg:order-2"
          >
            <motion.div
              className="relative h-[360px] w-full sm:h-[470px]"
              style={
                prefersReducedMotion
                  ? undefined
                  : { x: objectX, y: objectY, rotate: objectRotate }
              }
            >
              {currentProject && (
                <motion.div
                  className="absolute right-0 top-0 z-10 w-[78%]"
                >
                  <Link
                    href={`/projects/${currentProject.slug}`}
                    className="group block border border-white/15 bg-[#17171b] p-2 shadow-2xl shadow-black/40 focus-visible:outline-[#f3efe7] sm:p-3"
                    aria-label={`View ${currentProject.title}`}
                  >
                    <div
                      className="relative aspect-[16/10] overflow-hidden"
                      style={{
                        backgroundColor: currentProjectFrame?.background,
                      }}
                    >
                      <Image
                        src={currentProject.media.cover.src}
                        alt={currentProject.media.cover.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 600px, 75vw"
                        style={{ objectPosition: currentProjectFrame?.position }}
                        className={`${currentProjectFrame?.imageClassName ?? "object-cover"} transition-transform duration-700 group-hover:scale-[1.025] group-focus-visible:scale-[1.025] motion-reduce:transition-none`}
                      />
                    </div>
                    <div className="flex items-end justify-between gap-4 px-1 pb-1 pt-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                          {homeContent.hero.currentProjectLabel}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {currentProject.title}
                        </p>
                      </div>
                      {currentProject.home?.current?.note && (
                        <span className="text-xs text-white/60">
                          {currentProject.home.current.note} ↗
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              )}

              {currentMiniProject && (
                <motion.div
                  className="absolute bottom-0 left-0 z-20 w-[58%]"
                >
                  <Link
                    href={currentMiniProjectHref}
                    target={
                      currentMiniProjectOpensNewTab ? "_blank" : undefined
                    }
                    rel={
                      currentMiniProjectOpensNewTab
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group block border border-white/15 bg-[#f0ece4] p-2 text-[#111114] shadow-2xl shadow-black/50 focus-visible:outline-[#f3efe7] sm:p-3"
                    aria-label={
                      currentMiniProjectLink?.label ??
                      `Find ${currentMiniProject.title} in mini projects`
                    }
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#d8d3ca]">
                      {currentMiniProject.video ? (
                        <video
                          src={currentMiniProject.video}
                          poster={currentMiniProject.image}
                          autoPlay={!prefersReducedMotion}
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          aria-hidden="true"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                        />
                      ) : (
                        <Image
                          src={
                            currentMiniProject.image ??
                            "/images/portfolio-preview.png"
                          }
                          alt={`${currentMiniProject.title} preview`}
                          width={640}
                          height={480}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex items-end justify-between gap-3 px-1 pb-1 pt-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.18em] text-black/60">
                          {homeContent.hero.currentMiniProjectLabel}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {currentMiniProject.title}
                        </p>
                      </div>
                      <span className="text-xs text-black/60">
                        {homeContent.hero.currentMiniProjectNote} ↗
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

            </motion.div>
          </motion.div>

          <div className="order-3 lg:pb-10">
            {latestNote && (
              <Link
                href={`/devlog#note-${latestNote.id}`}
                className="group block border-t border-white/20 pt-4 focus-visible:outline-[#f3efe7]"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                  {homeContent.hero.latestNoteLabel} · {latestNote.date}
                </p>
                <p className="mt-3 text-sm font-medium leading-snug text-white/78 transition-colors group-hover:text-white">
                  {latestNote.title}
                </p>
                <span className="mt-4 inline-block text-xs text-[var(--folio-accent)]">
                  {homeContent.hero.readNoteLabel} ↗
                </span>
              </Link>
            )}
            <a
              href="#about"
              className="mt-10 inline-flex min-h-11 items-center gap-2 text-xs text-white/55 transition-colors hover:text-white focus-visible:outline-[#f3efe7]"
            >
              {homeContent.hero.keepScrollingLabel}
              <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

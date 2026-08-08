import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectChapters from "@/components/archive/ProjectChapters";
import { projectsPage } from "@/data/projects";
import type {
  Project,
  ProjectFramePresentation,
  ProjectImage,
} from "@/types/project";

function isSelfLink(url: string, slug: string) {
  return url === `/projects/${slug}` || url === `/projects?active=${slug}`;
}

export default function ProjectDetail({
  project,
  previousProject,
  nextProject,
}: {
  project: Project;
  previousProject?: Project;
  nextProject?: Project;
}) {
  const leadImage = project.media.cover;
  const leadFrame = project.presentation?.hero;
  const titleLines = project.presentation?.titleLines ?? [project.title];
  const usefulLinks = (project.links ?? []).filter(
    (link) => !isSelfLink(link.url, project.slug),
  );
  const chapterArtifactIds = new Set(
    (project.chapters ?? []).flatMap((chapter) =>
      chapter.layout === "text-only" ? [] : (chapter.artifactIds ?? []),
    ),
  );
  const additionalImages = (project.media.gallery ?? []).filter(
    (image) => !chapterArtifactIds.has(image.id),
  );
  const videos = (project.media.videos ?? []).filter(
    (video) => !chapterArtifactIds.has(video.id),
  );

  return (
    <div data-project-tier={project.presentation?.tier ?? "standard"}>
      <section className="bg-[#0b0b0e] pb-12 pt-28 text-[#f3efe7] md:pb-16 md:pt-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="border-t border-white/20 pt-5">
            <Link
              href={projectsPage.pathname}
              className="group inline-flex items-center gap-2 text-xs text-white/65 transition-colors hover:text-white motion-reduce:transition-none"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
              />
              {projectsPage.labels.backToIndex}
            </Link>
          </div>

          <div className="mt-10 grid min-w-0 gap-8 md:mt-12 md:grid-cols-12 md:items-end md:gap-6">
            <h1
              aria-label={project.title}
              className="min-w-0 text-[2.65rem] font-semibold leading-[0.86] tracking-[-0.065em] [overflow-wrap:anywhere] sm:text-[clamp(3.1rem,7.2vw,7.25rem)] md:col-span-7"
            >
              {titleLines.map((line, lineIndex) => (
                <span
                  key={`${project.slug}-title-line-${lineIndex}`}
                  aria-hidden="true"
                  className="block"
                >
                  {line}
                </span>
              ))}
            </h1>
            <div className="min-w-0 border-l border-[var(--folio-accent)] pl-4 md:col-span-4 md:col-start-9">
              <p className="text-lg font-medium leading-snug text-white/80 md:text-xl">
                {project.summary}
              </p>
              <p className="mt-5 font-mono text-[11px] text-white/55">
                {project.date}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--folio-paper)] py-8 md:py-14">
        <div className="mx-auto grid max-w-[1440px] gap-9 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
          <figure className="lg:col-span-9">
            <div
              className={`relative overflow-hidden bg-[var(--folio-panel)] ${projectHeroAspect(leadFrame?.aspect)}`}
              style={{ backgroundColor: leadFrame?.background }}
            >
              <Image
                src={leadImage.src}
                alt={leadImage.alt}
                fill
                priority
                sizes="(min-width: 1440px) 984px, (min-width: 1024px) 70vw, 94vw"
                style={{ objectPosition: leadFrame?.position ?? leadImage.position }}
                className={projectFrameImageClass(leadImage, leadFrame)}
              />
            </div>
            {leadImage.caption && (
              <figcaption className="mt-2 text-xs leading-relaxed text-[var(--folio-muted)]">
                {leadImage.caption}
              </figcaption>
            )}
          </figure>

          <aside className="lg:col-span-3">
            <dl className="border-t border-[var(--folio-rule)]">
              <div className="border-b border-[var(--folio-rule)] py-4">
                <dt className="text-xs font-semibold">{projectsPage.labels.builtWith}</dt>
                <dd className="mt-2 text-sm leading-6 text-[var(--folio-muted)]">
                  {project.technologies.join(" · ")}
                </dd>
              </div>

              {usefulLinks.length > 0 && (
                <div className="border-b border-[var(--folio-rule)] py-4">
                  <dt className="text-xs font-semibold">{projectsPage.labels.links}</dt>
                  <dd>
                    <ul className="mt-2 space-y-2">
                      {usefulLinks.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.url}
                            target={link.target === "blank" ? "_blank" : undefined}
                            rel={link.target === "blank" ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[var(--folio-accent-ink)] motion-reduce:transition-none"
                          >
                            {link.label}
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--folio-paper)] pb-20 pt-8 md:pb-28 md:pt-12">
        <div className="mx-auto grid max-w-[1440px] gap-7 border-t border-[var(--folio-rule)] px-5 pt-6 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
          <h2 className="text-2xl font-semibold tracking-[-0.035em] md:col-span-3 md:text-3xl">
            {projectsPage.labels.story}
          </h2>
          <div className="space-y-6 md:col-span-7 md:col-start-5">
            {project.description.map((paragraph, paragraphIndex) => (
              <p
                key={`${project.slug}-paragraph-${paragraphIndex}`}
                className={
                  paragraphIndex === 0
                    ? "max-w-3xl text-xl font-medium leading-relaxed tracking-[-0.02em] md:text-2xl"
                    : "max-w-[68ch] text-base leading-7 text-[var(--folio-muted)]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {project.chapters && project.chapters.length > 0 && (
        <ProjectChapters
          slug={project.slug}
          chapters={project.chapters}
          media={project.media}
          labels={{
            navigation: projectsPage.labels.chapterNavigation,
            annotation: projectsPage.labels.annotation,
            transcription: projectsPage.labels.transcription,
            openDocument: projectsPage.labels.openDocument,
            documentReader: projectsPage.labels.documentReader,
            documentScale: projectsPage.labels.documentScale,
            fitDocument: projectsPage.labels.fitDocument,
            fullSizeDocument: projectsPage.labels.fullSizeDocument,
            closeDocument: projectsPage.labels.closeDocument,
            videoFallback: projectsPage.labels.videoFallback,
          }}
          fallbackPoster={leadImage.src}
        />
      )}

      {project.challenges && project.challenges.length > 0 && (
        <section className="bg-[var(--folio-panel)] py-20 md:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-10 border-t border-[var(--folio-rule)] px-5 pt-6 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
            <h2 className="max-w-[12ch] text-[clamp(2.25rem,3.5vw,3.75rem)] font-semibold leading-[0.96] tracking-[-0.05em] md:col-span-4">
              {projectsPage.labels.challenges}
            </h2>
            <ul className="border-t border-[var(--folio-rule)] md:col-span-7 md:col-start-6">
              {project.challenges.map((challenge) => (
                <li
                  key={challenge}
                  className="grid grid-cols-[0.65rem_minmax(0,1fr)] gap-4 border-b border-[var(--folio-rule)] py-5"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] h-1.5 w-1.5 bg-[var(--folio-accent-ink)]"
                  />
                  <p className="max-w-3xl text-base font-medium leading-relaxed md:text-lg">
                    {challenge}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(additionalImages.length > 0 || videos.length > 0) && (
        <section className="bg-[var(--folio-paper)] py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <div className="border-t border-[var(--folio-rule)] pt-6">
              <h2 className="text-2xl font-semibold tracking-[-0.035em] md:text-4xl">
                {projectsPage.labels.media}
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-12">
              {additionalImages.map((image) => (
                <figure key={image.id} className={projectMediaLayout(image.layout)}>
                  <div
                    className={`relative overflow-hidden bg-[var(--folio-panel)] ${projectImageAspect(image.aspect)}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 70vw, 92vw"
                      style={{ objectPosition: image.position }}
                      className={
                        image.fit === "contain"
                          ? "object-contain p-[5%]"
                          : "object-cover"
                      }
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-2 text-xs leading-relaxed text-[var(--folio-muted)]">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}

              {videos.map((video) => (
                <figure key={video.id} className={projectMediaLayout(video.layout)}>
                  <div className="overflow-hidden bg-[#0b0b0e]">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      poster={video.poster ?? leadImage.src}
                      style={{ aspectRatio: `${video.width} / ${video.height}` }}
                      className={`h-auto w-full ${
                        video.fit === "cover" ? "object-cover" : "object-contain"
                      }`}
                      aria-label={video.label}
                    >
                      <source src={video.src} />
                      {(video.tracks ?? []).map((track) => (
                        <track
                          key={track.id}
                          src={track.src}
                          kind={track.kind}
                          srcLang={track.srcLang}
                          label={track.label}
                          default={track.default}
                        />
                      ))}
                      {projectsPage.labels.videoFallback}
                    </video>
                  </div>
                  {(video.caption || video.description) && (
                    <figcaption className="mt-2 max-w-[68ch] space-y-1 text-xs leading-relaxed text-[var(--folio-muted)]">
                      {video.caption && <p>{video.caption}</p>}
                      {video.description && <p>{video.description}</p>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <nav
        aria-label={projectsPage.labels.adjacentProjects}
        className="bg-[#0b0b0e] text-[#f3efe7]"
      >
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group border-b border-white/20 px-5 py-8 transition-colors hover:bg-white hover:text-[#0b0b0e] motion-reduce:transition-none sm:px-8 md:border-b-0 md:border-r lg:px-12"
            >
              <span className="text-xs opacity-60">
                {projectsPage.labels.previousProject}
              </span>
              <span className="mt-2 flex items-center gap-3 text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                <ArrowLeft
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group px-5 py-8 text-right transition-colors hover:bg-white hover:text-[#0b0b0e] motion-reduce:transition-none sm:px-8 lg:px-12"
            >
              <span className="text-xs opacity-60">
                {projectsPage.labels.nextProject}
              </span>
              <span className="mt-2 flex items-center justify-end gap-3 text-xl font-semibold tracking-[-0.03em] md:text-2xl">
                {nextProject.title}
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </span>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </nav>
    </div>
  );
}

function projectFrameImageClass(
  image: ProjectImage,
  frame?: ProjectFramePresentation,
) {
  const fit = frame?.fit ?? image.fit ?? "cover";
  const padding = frame?.padding ?? (fit === "contain" ? "roomy" : "none");
  const paddingClass = {
    none: "",
    tight: "p-[3%]",
    roomy: "p-[7%]",
  }[padding];

  return `${fit === "contain" ? "object-contain" : "object-cover"} ${paddingClass}`;
}

function projectHeroAspect(aspect: ProjectFramePresentation["aspect"]) {
  if (aspect === "cinematic") return "aspect-[4/3] md:aspect-[16/7]";
  if (aspect === "square") return "aspect-square md:aspect-[16/9]";
  if (aspect === "portrait") return "aspect-[3/4] md:aspect-[16/9]";
  return "aspect-[4/3] md:aspect-video";
}

function projectImageAspect(aspect: ProjectImage["aspect"]) {
  if (aspect === "wide") return "aspect-video";
  if (aspect === "landscape") return "aspect-[3/2]";
  if (aspect === "portrait") return "aspect-[3/4]";
  if (aspect === "phone") return "aspect-[9/20]";
  if (aspect === "square") return "aspect-square";
  return "aspect-[4/3]";
}

function projectMediaLayout(layout: ProjectImage["layout"]) {
  if (layout === "wide") return "md:col-span-8";
  if (layout === "column") return "md:col-span-6";
  if (layout === "inset") return "md:col-span-8 md:col-start-3";
  return "md:col-span-12";
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import ArchiveFooter from "@/components/archive/ArchiveFooter";
import ProjectDetail from "@/components/archive/ProjectDetail";
import { projects } from "@/data/projects";
import { siteData } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((candidate) => candidate.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${siteData.brand}`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((project) => project.slug === params.slug);
  if (index === -1) notFound();

  const project = projects[index];

  return (
    <div className="editorial-home min-h-screen bg-[var(--folio-paper)] text-[var(--folio-ink)]">
      <ArchiveHeader />
      <main id="main-content" tabIndex={-1}>
        <ProjectDetail
          project={project}
          previousProject={projects[index - 1]}
          nextProject={projects[index + 1]}
        />
      </main>
      <ArchiveFooter />
    </div>
  );
}

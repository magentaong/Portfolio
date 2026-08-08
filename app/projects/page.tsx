import type { Metadata } from "next";
import ArchiveScaffold from "@/components/archive/ArchiveScaffold";
import ProjectsOpening from "@/components/archive/ProjectsOpening";
import ProjectsCatalogue from "@/components/archive/ProjectsCatalogue";
import { projects, projectsPage } from "@/data/projects";

export const metadata: Metadata = projectsPage.metadata;

export default function ProjectsPage() {
  return (
    <ArchiveScaffold
      page={projectsPage}
      masthead={<ProjectsOpening page={projectsPage} />}
    >
      <ProjectsCatalogue projects={projects} />
    </ArchiveScaffold>
  );
}

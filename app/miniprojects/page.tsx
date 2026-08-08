import type { Metadata } from "next";
import ArchiveScaffold from "@/components/archive/ArchiveScaffold";
import MiniProjectsArchive from "@/components/archive/MiniProjectsArchive";
import { miniProjects, miniProjectsPage } from "@/data/miniprojects";

export const metadata: Metadata = miniProjectsPage.metadata;

export default function MiniProjectsPage() {
  return (
    <ArchiveScaffold page={miniProjectsPage}>
      <MiniProjectsArchive page={miniProjectsPage} projects={miniProjects} />
    </ArchiveScaffold>
  );
}

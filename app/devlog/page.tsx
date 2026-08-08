import type { Metadata } from "next";
import ArchiveScaffold from "@/components/archive/ArchiveScaffold";
import DevlogArchive from "@/components/archive/DevlogArchive";
import DevlogOpening from "@/components/archive/DevlogOpening";
import { devLogEntries, devlogPage } from "@/data/devlog";

export const metadata: Metadata = devlogPage.metadata;

export default function DevLogPage() {
  const publishedEntries = devLogEntries
    .filter((entry) => !entry.draft && entry.title.trim() && entry.body.trim())
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) ||
        b.id.localeCompare(a.id, undefined, { numeric: true }),
    );

  return (
    <ArchiveScaffold
      page={devlogPage}
      masthead={<DevlogOpening page={devlogPage} />}
    >
      <DevlogArchive
        entries={publishedEntries}
        labels={devlogPage.labels}
        moodLabels={devlogPage.moodLabels}
      />
    </ArchiveScaffold>
  );
}

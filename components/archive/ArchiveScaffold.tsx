import type { ReactNode } from "react";
import type { ArchivePageConfig } from "@/types/archive";
import ArchiveHeader from "@/components/archive/ArchiveHeader";
import ArchiveMasthead from "@/components/archive/ArchiveMasthead";
import ArchiveFooter from "@/components/archive/ArchiveFooter";

export default function ArchiveScaffold({
  page,
  masthead,
  children,
}: {
  page: ArchivePageConfig;
  masthead?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="editorial-home min-h-screen bg-[var(--folio-paper)] text-[var(--folio-ink)]">
      <ArchiveHeader />
      <main id="main-content" tabIndex={-1}>
        {masthead ?? <ArchiveMasthead page={page} />}
        {children}
      </main>
      <ArchiveFooter />
    </div>
  );
}

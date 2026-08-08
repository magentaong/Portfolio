import type { Metadata } from "next";
import ArchiveScaffold from "@/components/archive/ArchiveScaffold";
import PhotosArchive from "@/components/archive/PhotosArchive";
import { photoPage, photos } from "@/data/photo";

export const metadata: Metadata = photoPage.metadata;

export default function PhotosPage() {
  return (
    <ArchiveScaffold page={photoPage}>
      <PhotosArchive page={photoPage} photos={photos} />
    </ArchiveScaffold>
  );
}

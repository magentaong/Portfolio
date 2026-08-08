import type { ArchivePageConfig } from "@/types/archive";

export type MiniProjectStatus = "complete" | "in-progress" | "abandoned";

export type MiniProjectPresentation = {
  mediaSide?: "left" | "right";
};

export type MiniProjectLink = {
  id: string;
  label: string;
  href: string;
  target: "self" | "blank";
};

export type MiniProject = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  links?: MiniProjectLink[];
  date: string;
  video?: string;
  image: string;
  imageAlt: string;
  mediaFit?: "cover" | "contain";
  presentation?: MiniProjectPresentation;
  status: MiniProjectStatus;
  learned?: string[];
};

export type MiniProjectsPageConfig = ArchivePageConfig & {
  indexLabel: string;
  filterLabel: string;
  allFilterLabel: string;
  shuffleLabel: string;
  learnedLabel: string;
  emptyState: string;
  resultSingular: string;
  resultPlural: string;
  shuffledStatus: string;
  statusLabels: Record<MiniProjectStatus, string>;
};

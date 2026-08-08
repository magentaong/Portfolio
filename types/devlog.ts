import type { ArchivePageConfig } from "@/types/archive";
import type { AuthoredMark } from "@/types/authored-mark";

export type DevLogMood = "good" | "stuck" | "breakthrough" | "grind";
export type DevLogInk = "blue" | "orange" | "magenta";

export type DevLogImageAsset = AuthoredMark;

export type DevLogCodeFragment = {
  label: string;
  content: string;
  language?: string;
};

export type DevLogLink = {
  label: string;
  href: string;
  target: "self" | "blank";
};

export type DevLogEntry = {
  id: string;
  publishedAt: string;
  date: string;
  title: string;
  body: string;
  project?: string;
  tags?: string[];
  mood: DevLogMood;
  ink?: DevLogInk;
  marginNote?: DevLogImageAsset;
  artifact?: DevLogImageAsset;
  code?: DevLogCodeFragment;
  links?: DevLogLink[];
  draft?: boolean;
};

export type DevLogPageConfig = ArchivePageConfig & {
  labels: {
    archiveAriaLabel: string;
    filterHeading: string;
    allProjects: string;
    resultSingular: string;
    resultPlural: string;
    resultScope: string;
    emptyState: string;
    note: string;
    noteMarker: string;
    project: string;
    mood: string;
    tags: string;
    links: string;
    marginNote: string;
    transcription: string;
    unfiledProject: string;
  };
  moodLabels: Record<DevLogMood, string>;
};

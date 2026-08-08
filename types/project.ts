import type { ArchivePageConfig } from "@/types/archive";
import type { AuthoredMark } from "@/types/authored-mark";

export type ProjectLink = {
  id: string;
  label: string;
  url: string;
  target: "self" | "blank";
};

type ProjectImageBase = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  fit?: "cover" | "contain";
  position?: string;
  aspect?: "wide" | "landscape" | "portrait" | "phone" | "square";
  layout?: "full" | "wide" | "column" | "inset";
};

export type ProjectImage = ProjectImageBase &
  (
    | {
        view: "document";
        width: number;
        height: number;
      }
    | {
        view?: "media";
        width?: number;
        height?: number;
      }
  );

export type ProjectDocumentImage = Extract<
  ProjectImage,
  { view: "document" }
>;

export type ProjectFramePresentation = {
  fit?: ProjectImage["fit"];
  position?: string;
  background?: string;
  padding?: "none" | "tight" | "roomy";
  aspect?: "cinematic" | "landscape" | "square" | "portrait";
};

export type ProjectFrameStyle = Omit<ProjectFramePresentation, "aspect">;

export type ProjectArchivePreview = {
  imageId?: string;
} & ProjectFrameStyle;

export type ProjectArchiveConfig = {
  preview?: ProjectArchivePreview;
  evidenceMediaId?: string;
};

export type ProjectVideo = {
  id: string;
  src: string;
  label: string;
  width: number;
  height: number;
  caption?: string;
  description?: string;
  poster?: string;
  fit?: "cover" | "contain";
  layout?: ProjectImage["layout"];
  tracks?: ProjectVideoTrack[];
};

export type ProjectVideoTrack = {
  id: string;
  src: string;
  kind: "captions" | "subtitles";
  srcLang: string;
  label: string;
  default?: boolean;
};

export type ProjectPresentation = {
  tier: "flagship" | "standard";
  titleLines?: string[];
  hero?: ProjectFramePresentation;
  currentBuild?: ProjectFrameStyle;
};

export type ProjectHomeDisplay =
  | "product-and-photo"
  | "interface"
  | "video"
  | "game";

export type ProjectHomeLayout =
  | "wide-right"
  | "narrow-left"
  | "medium-right"
  | "wide-center";

type ProjectHomeFeatureBase = {
  order: number;
  note: string;
  layout?: ProjectHomeLayout;
};

export type ProjectHomeFeature = ProjectHomeFeatureBase &
  (
    | {
        display: "interface";
        mediaLabel?: never;
      }
    | {
        display: Exclude<ProjectHomeDisplay, "interface">;
        mediaLabel: string;
      }
  );

export type ProjectHomePresentation = {
  current?: {
    note: string;
  };
  feature?: ProjectHomeFeature;
};

export type ProjectChapter = {
  id: string;
  title: string;
  body: string[];
  artifactIds?: string[];
  layout?:
    | "text-first"
    | "artifact-first"
    | "text-only"
    | "artifact-sequence";
  annotation?: AuthoredMark & {
    placement?: "left-margin" | "right-margin";
  };
};

export type ProjectsPageConfig = ArchivePageConfig & {
  labels: {
    index: string;
    backToIndex: string;
    story: string;
    projectNotes: string;
    challenges: string;
    builtWith: string;
    links: string;
    media: string;
    previousProject: string;
    nextProject: string;
    videoFallback: string;
    adjacentProjects: string;
    chapterNavigation: string;
    annotation: string;
    transcription: string;
    openDocument: string;
    documentReader: string;
    documentScale: string;
    fitDocument: string;
    fullSizeDocument: string;
    closeDocument: string;
  };
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string[];
  date: string;
  technologies: string[];
  tags?: string[];
  media: {
    cover: ProjectImage;
    gallery?: ProjectImage[];
    videos?: ProjectVideo[];
  };
  challenges?: string[];
  links?: ProjectLink[];
  archive?: ProjectArchiveConfig;
  presentation?: ProjectPresentation;
  home?: ProjectHomePresentation;
  chapters?: ProjectChapter[];
};

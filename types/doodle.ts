import type { AuthoredMark } from "@/types/authored-mark";

export const doodleSlots = [
  "home-about-photo",
  "home-work-heading",
  "home-work-archive",
  "home-devlog-heading",
  "home-miniprojects-shuffle",
  "home-experience-skill",
  "home-contact-email",
  "home-photos-heading",
  "navigation-menu-corner",
  "mini-project-media",
  "devlog-opening-mark",
  "devlog-filter-rail",
  "devlog-entry-margin",
] as const;

export const doodleMotions = [
  "still",
  "peek-up",
  "peek-down",
  "fly-right",
  "bob-on-hover",
  "shiver-on-hover",
  "float-on-hover",
  "type-on-hover",
  "swing-on-hover",
  "sip-on-change",
  "spark-on-change",
  "hop-on-click",
  "camera-snap",
  "draw-in",
  "pop-in",
] as const;

export const doodleBackings = [
  "none",
  "paper",
  "paper-orange-tape",
  "paper-magenta-tape",
  "paper-yellow-tape",
] as const;

export const doodleInks = [
  "original",
  "ink",
  "orange",
  "cobalt",
  "magenta",
  "accent",
] as const;

export const doodleLayouts = [
  "flow",
  "overlay",
] as const;

export type DoodleSlotId = (typeof doodleSlots)[number];
export type DoodleMotion = (typeof doodleMotions)[number];
export type DoodleBacking = (typeof doodleBackings)[number];
export type DoodleInk = (typeof doodleInks)[number];
export type DoodleLayout = (typeof doodleLayouts)[number];

export type ResponsiveDoodleNumber = {
  base: number;
  md?: number;
};

export type DoodlePlacement = {
  id: string;
  assetId: string;
  slot: DoodleSlotId;
  anchorId?: string;
  displayWidth: ResponsiveDoodleNumber;
  rotation?: number;
  backing?: DoodleBacking;
  ink?: DoodleInk;
  motion: DoodleMotion;
  travelDistance?: ResponsiveDoodleNumber;
  layout?: DoodleLayout;
  align?: "start" | "end";
  edge?: "top" | "bottom";
  offset?: {
    x?: ResponsiveDoodleNumber;
    y?: ResponsiveDoodleNumber;
  };
  layer?: number;
  revealAfterInteractions?: number;
};

export type DoodleLibrary = {
  assets: AuthoredMark[];
  placements: DoodlePlacement[];
};

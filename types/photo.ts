import type { ArchivePageConfig } from "@/types/archive";

export const homePhotoSlotIds = ["lead", "portrait", "edge"] as const;

export type HomePhotoSlotId = (typeof homePhotoSlotIds)[number];
export type PhotoAspectRatio = "portrait" | "landscape" | "square";

export type HomePhotoSlotConfig = {
  id: HomePhotoSlotId;
  acceptedAspectRatios: PhotoAspectRatio[];
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  locationId: string;
  aspectRatio: PhotoAspectRatio;
  objectPosition?: string;
  homeSlot?: HomePhotoSlotId;
  layout:
    | "wide-left"
    | "small-right"
    | "small-left"
    | "medium-right"
    | "centered-wide";
};

export type PhotoPageConfig = ArchivePageConfig & {
  homeStrip: {
    eyebrow: string;
    title: string;
    archiveLabel: string;
    showAnotherLabel: string;
    controlHint: string;
    newPhotoStatusLead: string;
    slots: HomePhotoSlotConfig[];
  };
  locationIndexLabel: string;
  locationLabel: string;
  locations: {
    id: string;
    label: string;
  }[];
  photoLabel: {
    singular: string;
    plural: string;
  };
  lightbox: {
    open: string;
    dialog: string;
    close: string;
    previous: string;
    next: string;
  };
};

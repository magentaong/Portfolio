"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { photoPage, photos } from "@/data/photo";
import type { HomePhotoSlotConfig, HomePhotoSlotId } from "@/types/photo";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

type HomePhotoSelection = Record<HomePhotoSlotId, string>;
type PhotoStripPhase = "idle" | "snapping" | "revealing";

const slotPresentation: Record<
  HomePhotoSlotId,
  { figureClassName: string; frameClassName: string; sizes: string }
> = {
  lead: {
    figureClassName: "col-span-2 md:col-span-5 md:self-start",
    frameClassName: "aspect-[4/3]",
    sizes: "(min-width: 768px) 40vw, calc(100vw - 2.5rem)",
  },
  portrait: {
    figureClassName: "col-span-1 md:col-span-3 md:col-start-7 md:mt-24",
    frameClassName: "aspect-[3/4]",
    sizes: "(min-width: 768px) 24vw, calc(50vw - 1.75rem)",
  },
  edge: {
    figureClassName: "col-span-1 md:col-span-3 md:col-start-10 md:mt-2",
    frameClassName: "aspect-[4/3]",
    sizes: "(min-width: 768px) 24vw, calc(50vw - 1.75rem)",
  },
};

const locationLabels = new Map(
  photoPage.locations.map((location) => [location.id, location.label]),
);

function firstPhotoForSlot(slot: HomePhotoSlotConfig) {
  const acceptedAspectRatios = new Set(slot.acceptedAspectRatios);
  return (
    photos.find((photo) => photo.homeSlot === slot.id) ??
    photos.find((photo) => acceptedAspectRatios.has(photo.aspectRatio))
  );
}

function initialPhotoSelection() {
  return Object.fromEntries(
    photoPage.homeStrip.slots.flatMap((slot) => {
      const photo = firstPhotoForSlot(slot);
      return photo ? [[slot.id, photo.id]] : [];
    }),
  ) as HomePhotoSelection;
}

function nextPhotoForSlot(
  slot: HomePhotoSlotConfig,
  currentPhotoId: string,
  visiblePhotoIds: Set<string>,
) {
  const currentIndex = photos.findIndex((photo) => photo.id === currentPhotoId);
  const acceptedAspectRatios = new Set(slot.acceptedAspectRatios);

  for (let offset = 1; offset <= photos.length; offset += 1) {
    const candidate =
      photos[(currentIndex + offset + photos.length) % photos.length];
    if (
      acceptedAspectRatios.has(candidate.aspectRatio) &&
      !visiblePhotoIds.has(candidate.id)
    ) {
      return candidate;
    }
  }

  return null;
}

function replacementFrom(
  selection: HomePhotoSelection,
  startingSlotId: HomePhotoSlotId,
) {
  const slots = photoPage.homeStrip.slots;
  const startingIndex = Math.max(
    0,
    slots.findIndex((slot) => slot.id === startingSlotId),
  );
  const visiblePhotoIds = new Set(Object.values(selection));

  for (let offset = 0; offset < slots.length; offset += 1) {
    const slotIndex = (startingIndex + offset) % slots.length;
    const slot = slots[slotIndex];
    const nextPhoto = nextPhotoForSlot(
      slot,
      selection[slot.id],
      visiblePhotoIds,
    );

    if (nextPhoto) {
      return {
        nextPhoto,
        nextSlotId: slots[(slotIndex + 1) % slots.length].id,
        slot,
      };
    }
  }

  return null;
}

export default function PhotoStrip() {
  const prefersReducedMotion = useReducedMotion();
  const [selection, setSelection] = useState<HomePhotoSelection>(
    initialPhotoSelection,
  );
  const nextSlotIdRef = useRef<HomePhotoSlotId>(
    photoPage.homeStrip.slots[0]?.id ?? "lead",
  );
  const [phase, setPhase] = useState<PhotoStripPhase>("idle");
  const [revealedSlotId, setRevealedSlotId] = useState<HomePhotoSlotId | null>(
    null,
  );
  const [statusMessage, setStatusMessage] = useState("");
  const swapTimerRef = useRef<number | null>(null);
  const settleTimerRef = useRef<number | null>(null);

  const visiblePhotos = useMemo(
    () =>
      photoPage.homeStrip.slots.flatMap((slot) => {
        const photo = photos.find(
          (candidate) => candidate.id === selection[slot.id],
        );
        return photo ? [{ photo, slot }] : [];
      }),
    [selection],
  );

  useEffect(
    () => () => {
      if (swapTimerRef.current !== null) {
        window.clearTimeout(swapTimerRef.current);
      }
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    },
    [],
  );

  const showAnotherPhoto = () => {
    if (phase !== "idle") return;

    const replacement = replacementFrom(selection, nextSlotIdRef.current);
    if (!replacement) return;

    const { nextPhoto, nextSlotId: followingSlotId, slot } = replacement;
    const location =
      locationLabels.get(nextPhoto.locationId) ?? nextPhoto.locationId;
    const commitReplacement = (reveal: boolean) => {
      setSelection((current) => ({ ...current, [slot.id]: nextPhoto.id }));
      nextSlotIdRef.current = followingSlotId;
      setRevealedSlotId(reveal ? slot.id : null);
      setStatusMessage(
        `${photoPage.homeStrip.newPhotoStatusLead}: ${
          nextPhoto.caption ?? nextPhoto.alt
        }, ${location}.`,
      );
    };
    const canAnimate =
      !prefersReducedMotion && window.matchMedia("(hover: hover)").matches;

    if (!canAnimate) {
      commitReplacement(false);
      return;
    }

    setPhase("snapping");
    swapTimerRef.current = window.setTimeout(() => {
      commitReplacement(true);
      setPhase("revealing");
      swapTimerRef.current = null;
      settleTimerRef.current = window.setTimeout(() => {
        setPhase("idle");
        setRevealedSlotId(null);
        settleTimerRef.current = null;
      }, 460);
    }, 100);
  };

  return (
    <section
      id="photos"
      className="bg-[var(--folio-paper)] py-24 text-[var(--folio-ink)] md:py-36"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="relative isolate flex items-end justify-between gap-8 border-t border-[var(--folio-rule)] pt-7">
          <button
            type="button"
            onClick={showAnotherPhoto}
            aria-controls="home-photo-strip"
            aria-disabled={phase !== "idle"}
            aria-label={photoPage.homeStrip.showAnotherLabel}
            title={photoPage.homeStrip.showAnotherLabel}
            className="group absolute right-0 top-0 z-20 grid h-[76px] w-[76px] -translate-y-[58%] touch-manipulation place-items-center focus-visible:outline-[var(--folio-focus)] sm:right-24 md:h-[104px] md:w-[104px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[72%] top-[58%] z-30 w-max -rotate-6 border-b-2 border-[var(--folio-cobalt)] bg-[var(--folio-doodle-paper)] px-2 py-1 text-[10px] font-semibold italic leading-none text-[var(--folio-cobalt)] shadow-[2px_2px_0_rgba(16,16,20,0.12)] transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 group-active:rotate-0 motion-reduce:transform-none motion-reduce:transition-none md:text-[11px]"
            >
              {photoPage.homeStrip.controlHint}
            </span>
            <DoodleSlot
              slot="home-photos-heading"
              interactionCount={phase === "idle" ? 0 : 1}
              className="h-full w-full justify-center overflow-visible"
            />
          </button>
          <div className="relative z-10 pr-16 sm:pr-24">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--folio-muted)]">
              {photoPage.homeStrip.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              {photoPage.homeStrip.title}
            </h2>
          </div>
          <Link
            href={photoPage.pathname}
            className="group relative z-10 hidden min-h-11 items-center gap-2 text-xs font-semibold transition-colors hover:text-[var(--folio-accent)] sm:inline-flex"
          >
            {photoPage.homeStrip.archiveLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {statusMessage}
        </p>

        <div
          id="home-photo-strip"
          aria-busy={phase !== "idle"}
          className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:items-start"
        >
          {visiblePhotos.map(({ photo, slot }) => {
            const presentation = slotPresentation[slot.id];

            return (
              <figure key={slot.id} className={presentation.figureClassName}>
                <div
                  data-photo-reveal={revealedSlotId === slot.id}
                  className={`photo-strip-frame relative overflow-hidden bg-[var(--folio-panel)] ${presentation.frameClassName}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={presentation.sizes}
                    style={{ objectPosition: photo.objectPosition }}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 flex flex-col gap-0.5 text-[10px] text-[var(--folio-muted)] sm:flex-row sm:justify-between sm:gap-4">
                  <span>{photo.caption ?? photo.alt}</span>
                  <span>
                    {locationLabels.get(photo.locationId) ?? photo.locationId}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <Link
          href={photoPage.pathname}
          className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold sm:hidden"
        >
          {photoPage.homeStrip.archiveLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

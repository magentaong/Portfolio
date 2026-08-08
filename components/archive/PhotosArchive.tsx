"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo, PhotoPageConfig } from "@/types/photo";

type LocationGroup = {
  id: string;
  label: string;
  photos: Photo[];
};

const desktopPlacements: Record<Photo["layout"], string> = {
  "wide-left": "md:col-span-7",
  "small-right": "md:col-span-4 md:col-start-9 md:mt-24",
  "small-left": "md:col-span-4 md:col-start-2 md:mt-12",
  "medium-right": "md:col-span-6 md:col-start-7",
  "centered-wide": "md:col-span-8 md:col-start-3 md:mt-16",
};

function locationId(id: string) {
  return `location-${id}`;
}

function photoFrame(aspectRatio: Photo["aspectRatio"]) {
  if (aspectRatio === "portrait") return "aspect-[3/4]";
  if (aspectRatio === "square") return "aspect-square";
  return "aspect-[4/3]";
}

function photoCount(page: PhotoPageConfig, count: number) {
  return `${String(count).padStart(2, "0")} ${
    count === 1 ? page.photoLabel.singular : page.photoLabel.plural
  }`;
}

export default function PhotosArchive({
  page,
  photos,
}: {
  page: PhotoPageConfig;
  photos: Photo[];
}) {
  const groups = useMemo<LocationGroup[]>(() => {
    const photosByLocation = new Map<string, Photo[]>();
    for (const photo of photos) {
      const locationPhotos = photosByLocation.get(photo.locationId) ?? [];
      locationPhotos.push(photo);
      photosByLocation.set(photo.locationId, locationPhotos);
    }

    const populatedGroups: LocationGroup[] = [];
    for (const location of page.locations) {
      const locationPhotos = photosByLocation.get(location.id) ?? [];
      if (locationPhotos.length === 0) continue;
      populatedGroups.push({
        id: location.id,
        label: location.label,
        photos: locationPhotos,
      });
    }
    return populatedGroups;
  }, [page.locations, photos]);
  const locationLabels = useMemo(
    () => new Map(page.locations.map((location) => [location.id, location.label])),
    [page.locations],
  );
  const orderedPhotos = useMemo(
    () => groups.flatMap((group) => group.photos),
    [groups],
  );

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const activePhoto =
    activePhotoIndex === null ? null : orderedPhotos[activePhotoIndex] ?? null;
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openPhoto = useCallback(
    (photo: Photo, trigger: HTMLButtonElement) => {
      const index = orderedPhotos.findIndex(
        (candidate) => candidate.id === photo.id,
      );
      if (index === -1) return;
      triggerRef.current = trigger;
      setActivePhotoIndex(index);
    },
    [orderedPhotos],
  );

  const closePhoto = useCallback(() => {
    setActivePhotoIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const showPrevious = useCallback(() => {
    setActivePhotoIndex((current) => {
      if (current === null) return null;
      return (current - 1 + orderedPhotos.length) % orderedPhotos.length;
    });
  }, [orderedPhotos.length]);

  const showNext = useCallback(() => {
    setActivePhotoIndex((current) => {
      if (current === null) return null;
      return (current + 1) % orderedPhotos.length;
    });
  }, [orderedPhotos.length]);

  return (
    <section className="bg-[var(--folio-paper)] py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <nav
          aria-label={page.locationIndexLabel}
          className="grid gap-6 border-t border-[var(--folio-rule)] py-7 md:grid-cols-12"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--folio-muted)] md:col-span-3">
            {page.locationIndexLabel}
          </p>
          <ol className="grid gap-x-8 gap-y-4 sm:grid-cols-2 md:col-span-6 md:col-start-7">
            {groups.map((group, index) => (
              <li key={group.id}>
                <a
                  href={`#${locationId(group.id)}`}
                  onClick={() => {
                    window.requestAnimationFrame(() => {
                      document.getElementById(locationId(group.id))?.focus({
                        preventScroll: true,
                      });
                    });
                  }}
                  className="group flex items-baseline justify-between gap-4 border-b border-[var(--folio-rule)] pb-2 text-sm"
                >
                  <span className="font-semibold transition-colors group-hover:text-[var(--folio-accent)]">
                    {String(index + 1).padStart(2, "0")} / {group.label}
                  </span>
                  <span className="text-[10px] text-[var(--folio-muted)]">
                    {String(group.photos.length).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {groups.map((group, groupIndex) => (
            <section
              key={group.id}
              id={locationId(group.id)}
              tabIndex={-1}
              className="scroll-mt-8 border-t border-[var(--folio-rule)] pt-6"
            >
              <div className="grid items-end gap-4 md:grid-cols-12">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--folio-muted)] md:col-span-2">
                  {page.locationLabel} {String(groupIndex + 1).padStart(2, "0")}
                </p>
                <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl md:col-span-7 md:text-8xl">
                  {group.label}
                </h2>
                <p className="text-xs text-[var(--folio-muted)] md:col-span-3 md:text-right">
                  {photoCount(page, group.photos.length)}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 items-start gap-x-3 gap-y-10 sm:gap-x-5 md:mt-16 md:grid-cols-12 md:gap-x-5 md:gap-y-20">
                {group.photos.map((photo, index) => {
                  const mobileWide =
                    photo.layout === "wide-left" ||
                    photo.layout === "centered-wide";
                  const placement = desktopPlacements[photo.layout];

                  return (
                    <PhotoFigure
                      key={photo.id}
                      page={page}
                      photo={photo}
                      index={index}
                      mobileWide={mobileWide}
                      placement={placement}
                      onOpen={openPhoto}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {activePhoto && activePhotoIndex !== null
        ? <PhotoLightbox
            page={page}
            photo={activePhoto}
            location={locationLabels.get(activePhoto.locationId) ?? activePhoto.locationId}
            index={activePhotoIndex}
            count={orderedPhotos.length}
            onClose={closePhoto}
            onPrevious={showPrevious}
            onNext={showNext}
          />
        : null}
    </section>
  );
}

function PhotoFigure({
  page,
  photo,
  index,
  mobileWide,
  placement,
  onOpen,
}: {
  page: PhotoPageConfig;
  photo: Photo;
  index: number;
  mobileWide: boolean;
  placement: string;
  onOpen: (photo: Photo, trigger: HTMLButtonElement) => void;
}) {
  const desktopWide =
    placement.includes("md:col-span-7") ||
    placement.includes("md:col-span-8");
  const sizes = `${desktopWide ? "(min-width: 768px) 60vw" : "(min-width: 768px) 42vw"}, ${
    mobileWide ? "100vw" : "50vw"
  }`;

  return (
    <figure
      className={`${mobileWide ? "col-span-2" : "col-span-1"} ${placement}`}
    >
      <button
        type="button"
        onClick={(event) => onOpen(photo, event.currentTarget)}
        aria-label={`${page.lightbox.open}: ${photo.alt}`}
        className={`group relative block w-full overflow-hidden bg-[var(--folio-panel)] text-left ${photoFrame(
          photo.aspectRatio,
        )}`}
      >
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={sizes}
          style={{ objectPosition: photo.objectPosition }}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
        />
      </button>
      <figcaption className="mt-2 flex items-start justify-between gap-3 text-[10px] leading-relaxed text-[var(--folio-muted)]">
        <span>{photo.caption ?? photo.alt}</span>
        <span className="shrink-0 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  );
}

function PhotoLightbox({
  page,
  photo,
  location,
  index,
  count,
  onClose,
  onPrevious,
  onNext,
}: {
  page: PhotoPageConfig;
  photo: Photo;
  location: string;
  index: number;
  count: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousCallbackRef = useRef(onPrevious);
  const nextCallbackRef = useRef(onNext);

  useEffect(() => {
    previousCallbackRef.current = onPrevious;
    nextCallbackRef.current = onNext;
  }, [onNext, onPrevious]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousCallbackRef.current();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextCallbackRef.current();
        return;
      }

    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${page.lightbox.dialog}: ${photo.alt}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="photo-lightbox fixed inset-0 z-[120] m-0 h-[100dvh] max-h-none w-screen max-w-none grid-rows-[auto_minmax(0,1fr)_auto] border-0 bg-[#08080a] text-[#f3efe7] open:grid backdrop:bg-black/70"
    >
      <div className="flex items-center justify-between border-b border-white/20 pb-3 text-[10px] uppercase tracking-[0.16em] text-white/55">
        <p>{location}</p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 items-center gap-2 px-2 text-white/70 transition-colors hover:text-white"
          aria-label={page.lightbox.close}
        >
          <span>{page.lightbox.close}</span>
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative min-h-0 py-4 sm:px-14 sm:py-6">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
        <button
          type="button"
          onClick={onPrevious}
          aria-label={page.lightbox.previous}
          className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/40 text-white/70 transition-colors hover:border-white hover:text-white sm:-left-1"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={page.lightbox.next}
          className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/25 bg-black/40 text-white/70 transition-colors hover:border-white hover:text-white sm:-right-1"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-start justify-between gap-5 border-t border-white/20 pt-3 text-xs">
        <div aria-live="polite">
          <p className="text-white/75">{photo.caption ?? photo.alt}</p>
          <span className="sr-only">
            {String(index + 1)} / {String(count)}
          </span>
        </div>
        <p className="shrink-0 tabular-nums text-white/60">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
      </div>
    </dialog>
  );
}

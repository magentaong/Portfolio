import type { CSSProperties } from "react";
import Image from "next/image";
import { doodleLibrary } from "@/data/doodles";
import type {
  DoodleInk,
  DoodlePlacement,
  DoodleSlotId,
  ResponsiveDoodleNumber,
} from "@/types/doodle";

const inkColours: Record<Exclude<DoodleInk, "original">, string> = {
  ink: "var(--folio-ink)",
  orange: "var(--folio-orange)",
  cobalt: "var(--folio-cobalt)",
  magenta: "var(--folio-magenta)",
  accent: "var(--folio-accent)",
};

function responsiveValue(
  value: ResponsiveDoodleNumber | undefined,
  fallback: number,
) {
  return {
    base: value?.base ?? fallback,
    md: value?.md ?? value?.base ?? fallback,
  };
}

export default function DoodleSlot({
  slot,
  anchorId,
  className = "",
  interactionCount = 0,
}: {
  slot: DoodleSlotId;
  anchorId?: string;
  className?: string;
  interactionCount?: number;
}) {
  const placements = doodleLibrary.placements.filter(
    (placement) =>
      placement.slot === slot &&
      (anchorId === undefined
        ? placement.anchorId === undefined
        : placement.anchorId === anchorId),
  );

  if (placements.length === 0) return null;

  return (
    <span className={`doodle-slot ${className}`} data-doodle-slot={slot}>
      {placements.map((placement) => (
        <PlacedDoodle
          key={placement.id}
          placement={placement}
          interactionCount={interactionCount}
        />
      ))}
    </span>
  );
}

function PlacedDoodle({
  placement,
  interactionCount,
}: {
  placement: DoodlePlacement;
  interactionCount: number;
}) {
  const asset = doodleLibrary.assets.find(
    (candidate) => candidate.id === placement.assetId,
  );

  if (!asset) return null;

  const backing = placement.backing ?? "none";
  const ink = placement.ink ?? "original";
  const width = responsiveValue(placement.displayWidth, 72);
  const travel = responsiveValue(placement.travelDistance, 112);
  const offsetX = responsiveValue(placement.offset?.x, 0);
  const offsetY = responsiveValue(placement.offset?.y, 0);
  const revealState = placement.revealAfterInteractions
    ? interactionCount >= placement.revealAfterInteractions
      ? "revealed"
      : "pending"
    : "ready";
  const style = {
    "--doodle-width-base": `${width.base}px`,
    "--doodle-width-md": `${width.md}px`,
    "--doodle-rotation": `${placement.rotation ?? 0}deg`,
    "--doodle-travel-base": `${travel.base}px`,
    "--doodle-travel-md": `${travel.md}px`,
    "--doodle-offset-x-base": `${offsetX.base}px`,
    "--doodle-offset-x-md": `${offsetX.md}px`,
    "--doodle-offset-y-base": `${offsetY.base}px`,
    "--doodle-offset-y-md": `${offsetY.md}px`,
    "--doodle-layer": placement.layer ?? 1,
  } as CSSProperties;

  const imageSizes = `(min-width: 768px) ${width.md}px, ${width.base}px`;
  const inkStyle =
    ink === "original"
      ? undefined
      : ({
          "--doodle-ink": inkColours[ink],
          "--doodle-mask": `url("${asset.src}")`,
          aspectRatio: `${asset.width} / ${asset.height}`,
        } as CSSProperties);

  return (
    <span
      className="authored-doodle-position"
      data-align={placement.align ?? "start"}
      data-doodle-id={placement.id}
      data-edge={placement.edge ?? "bottom"}
      data-layout={placement.layout ?? "flow"}
      data-motion={placement.motion}
      data-reveal-state={revealState}
      style={style}
    >
      <span
        className="authored-doodle"
        data-backing={backing}
        data-interaction-state={
          interactionCount === 0
            ? "idle"
            : interactionCount % 2 === 0
              ? "even"
              : "odd"
        }
        data-motion={placement.motion}
      >
        {ink === "original" ? (
          <Image
            src={asset.src}
            alt={asset.alt}
            width={asset.width}
            height={asset.height}
            sizes={imageSizes}
            aria-hidden={asset.decorative ? "true" : undefined}
            className="relative z-10 h-auto w-full select-none"
          />
        ) : (
          <span
            aria-hidden="true"
            className="authored-doodle-ink relative z-10 block w-full"
            style={inkStyle}
          />
        )}
      </span>
    </span>
  );
}

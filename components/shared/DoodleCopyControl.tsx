"use client";

import { useEffect, useRef, useState } from "react";
import DoodleSlot from "@/components/shared/AuthoredDoodle";
import type { DoodleSlotId } from "@/types/doodle";
import type { ClipboardControlCopy } from "@/types/site";

type CopyPhase = "idle" | "copying" | "success" | "failure";

export default function DoodleCopyControl({
  className = "",
  copy,
  slot,
  value,
}: {
  className?: string;
  copy: ClipboardControlCopy;
  slot: DoodleSlotId;
  value: string;
}) {
  const [phase, setPhase] = useState<CopyPhase>("idle");
  const [interactionCount, setInteractionCount] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const resetTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    },
    [],
  );

  const copyValue = async () => {
    if (phase === "copying") return;

    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    setPhase("copying");
    setAnnouncement("");

    let nextPhase: Extract<CopyPhase, "success" | "failure"> = "success";
    let nextAnnouncement = copy.successAnnouncement;

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(value);
    } catch {
      nextPhase = "failure";
      nextAnnouncement = copy.failureAnnouncement;
    }

    setInteractionCount((count) => count + 1);
    setPhase(nextPhase);
    setAnnouncement(nextAnnouncement);
    resetTimerRef.current = window.setTimeout(() => {
      setPhase("idle");
      resetTimerRef.current = null;
    }, 1800);
  };

  const feedbackVisible = phase === "success" || phase === "failure";
  const visibleLabel =
    phase === "success"
      ? copy.successLabel
      : phase === "failure"
        ? copy.failureLabel
        : copy.hintLabel;
  const accessibleLabel = `${copy.controlLabel}: ${value}`;

  return (
    <span className={`doodle-copy-control-root ${className}`}>
      <button
        type="button"
        onClick={copyValue}
        aria-busy={phase === "copying"}
        aria-disabled={phase === "copying"}
        aria-label={accessibleLabel}
        title={accessibleLabel}
        data-copy-feedback={feedbackVisible}
        className="doodle-copy-control group/copy relative h-full w-full cursor-copy touch-manipulation overflow-visible focus-visible:outline-[#f3efe7]"
      >
        <DoodleSlot
          slot={slot}
          interactionCount={interactionCount}
          className="h-full w-full justify-end overflow-visible"
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -top-5 right-0 whitespace-nowrap text-[9px] font-medium lowercase tracking-[0.08em] transition-colors motion-reduce:transition-none ${
            phase === "success"
              ? "text-[var(--folio-accent)]"
              : phase === "failure"
                ? "text-white/75"
                : "text-white/40 group-hover/copy:text-white/75 group-focus-visible/copy:text-white/75"
          }`}
        >
          {visibleLabel}
        </span>
      </button>

      <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </span>
    </span>
  );
}

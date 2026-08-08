"use client";

import Image from "next/image";
import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProjectDocumentImage } from "@/types/project";

type DocumentReaderLabels = {
  reader: string;
  scale: string;
  fit: string;
  fullSize: string;
  close: string;
};

export default function ProjectDocumentReader({
  image,
  labels,
  onClose,
}: {
  image: ProjectDocumentImage;
  labels: DocumentReaderLabels;
  onClose: () => void;
}) {
  const [scale, setScale] = useState<"fit" | "full-size">("fit");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${labels.reader}: ${image.alt}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
      className="document-reader fixed inset-0 z-[130] grid min-h-[100dvh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-[#08080a] text-[#f3efe7]"
    >
      <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/20 pb-3">
        <p className="mr-auto text-[10px] uppercase tracking-[0.16em] text-white/55">
          {labels.reader}
        </p>

        <div
          role="group"
          aria-label={labels.scale}
          className="flex border border-white/25"
        >
          <button
            type="button"
            onClick={() => setScale("fit")}
            aria-pressed={scale === "fit"}
            className={`inline-flex min-h-11 items-center gap-2 border-r border-white/25 px-3 text-xs transition-colors motion-reduce:transition-none ${
              scale === "fit"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
            <span>{labels.fit}</span>
          </button>
          <button
            type="button"
            onClick={() => setScale("full-size")}
            aria-pressed={scale === "full-size"}
            className={`inline-flex min-h-11 items-center gap-2 px-3 text-xs transition-colors motion-reduce:transition-none ${
              scale === "full-size"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
            <span>{labels.fullSize}</span>
          </button>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label={labels.close}
          className="inline-flex min-h-11 items-center gap-2 px-2 text-xs text-white/70 transition-colors hover:text-white motion-reduce:transition-none"
        >
          <span>{labels.close}</span>
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      {scale === "fit" ? (
        <div className="relative min-h-0 py-4 sm:py-6">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-contain"
          />
        </div>
      ) : (
        <div
          role="region"
          aria-label={`${labels.fullSize}: ${image.alt}`}
          tabIndex={0}
          className="min-h-0 overflow-auto bg-white/[0.04] py-4 sm:py-6"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes={`${image.width}px`}
            className="h-auto max-w-none"
          />
        </div>
      )}

      <footer className="border-t border-white/20 pt-3 text-xs leading-relaxed text-white/75">
        <p className="max-w-[80ch]">{image.caption ?? image.alt}</p>
      </footer>
    </div>
  );
}

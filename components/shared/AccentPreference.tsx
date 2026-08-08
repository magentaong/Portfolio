"use client";

import { useEffect, useId, useState } from "react";

type Accent = "orange" | "magenta";

type AccentPreferenceCopy = {
  readonly controlLabel: string;
  readonly defaultCompactLabel: string;
  readonly activeCompactLabel: string;
  readonly defaultNote: string;
  readonly activeNote: string;
  readonly storageKey: string;
};

type AccentPreferenceProps = {
  copy: AccentPreferenceCopy;
};

function isAccent(value: string | null): value is Accent {
  return value === "orange" || value === "magenta";
}

function applyAccent(accent: Accent) {
  document.documentElement.dataset.folioAccent = accent;
}

export default function AccentPreference({ copy }: AccentPreferenceProps) {
  const [accent, setAccent] = useState<Accent>("orange");
  const noteId = useId();
  const isMagenta = accent === "magenta";

  useEffect(() => {
    let storedAccent: string | null = null;

    try {
      storedAccent = window.localStorage.getItem(copy.storageKey);
      if (storedAccent !== null && !isAccent(storedAccent)) {
        window.localStorage.removeItem(copy.storageKey);
      }
    } catch {
      // The preference remains session-only when storage is unavailable.
    }

    const initialAccent = isAccent(storedAccent) ? storedAccent : "orange";
    applyAccent(initialAccent);
    setAccent(initialAccent);

    const syncAccent = (event: StorageEvent) => {
      if (event.key !== copy.storageKey) return;

      const nextAccent = isAccent(event.newValue) ? event.newValue : "orange";
      applyAccent(nextAccent);
      setAccent(nextAccent);
    };

    window.addEventListener("storage", syncAccent);
    return () => window.removeEventListener("storage", syncAccent);
  }, [copy.storageKey]);

  const toggleAccent = () => {
    const nextAccent: Accent = isMagenta ? "orange" : "magenta";
    applyAccent(nextAccent);
    setAccent(nextAccent);

    try {
      window.localStorage.setItem(copy.storageKey, nextAccent);
    } catch {
      // The document state still updates when storage is unavailable.
    }
  };

  return (
    <div className="group/accent relative shrink-0">
      <button
        type="button"
        aria-pressed={isMagenta}
        aria-describedby={noteId}
        aria-label={copy.controlLabel}
        onClick={toggleAccent}
        className="flex min-h-11 touch-manipulation items-center justify-center gap-2 border border-white/20 px-2 text-left text-[10px] font-semibold lowercase leading-tight text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3efe7] motion-reduce:transition-none sm:px-3"
      >
        <span>
          {isMagenta ? copy.activeCompactLabel : copy.defaultCompactLabel}
        </span>
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 border border-white/35 bg-[var(--folio-accent)]"
        />
      </button>
      <p
        id={noteId}
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none invisible fixed left-5 right-5 top-20 z-[80] w-auto border-l-2 border-[var(--folio-accent)] bg-[#0b0b0e] px-3 py-2.5 text-[11px] leading-relaxed text-white/60 opacity-0 shadow-xl shadow-black/25 transition-opacity group-hover/accent:visible group-hover/accent:opacity-100 group-focus-within/accent:visible group-focus-within/accent:opacity-100 motion-reduce:transition-none sm:absolute sm:left-auto sm:right-0 sm:top-[calc(100%+0.65rem)] sm:w-[17rem]"
      >
        {isMagenta ? copy.activeNote : copy.defaultNote}
      </p>
    </div>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PointerCompanionConfig } from "@/types/site";

type CompanionAvailability = "pending" | "available" | "unavailable";

type PointerCompanionContextValue = {
  active: boolean;
  availability: CompanionAvailability;
  config: PointerCompanionConfig;
  preferenceEnabled: boolean;
  toggle: () => void;
};

const PointerCompanionContext =
  createContext<PointerCompanionContextValue | null>(null);

const ENABLED_VALUE = "enabled";
const DISABLED_VALUE = "disabled";

export function PointerCompanionProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: PointerCompanionConfig;
}) {
  const [availability, setAvailability] =
    useState<CompanionAvailability>("pending");
  const [preferenceEnabled, setPreferenceEnabled] = useState(
    config.defaultEnabled,
  );
  const active = availability === "available" && preferenceEnabled;

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(any-hover: hover) and (any-pointer: fine)",
    );
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    try {
      const storedPreference = window.localStorage.getItem(config.storageKey);
      if (storedPreference === ENABLED_VALUE) setPreferenceEnabled(true);
      else if (storedPreference === DISABLED_VALUE) setPreferenceEnabled(false);
      else if (storedPreference !== null) {
        window.localStorage.removeItem(config.storageKey);
      }
    } catch {
      // The preference remains session-only when storage is unavailable.
    }

    const syncAvailability = () => {
      setAvailability(
        pointerQuery.matches && !reducedMotionQuery.matches
          ? "available"
          : "unavailable",
      );
    };

    const syncPreference = (event: StorageEvent) => {
      if (event.key !== config.storageKey) return;

      if (event.newValue === ENABLED_VALUE) setPreferenceEnabled(true);
      else if (event.newValue === DISABLED_VALUE) setPreferenceEnabled(false);
      else setPreferenceEnabled(config.defaultEnabled);
    };

    syncAvailability();
    pointerQuery.addEventListener("change", syncAvailability);
    reducedMotionQuery.addEventListener("change", syncAvailability);
    window.addEventListener("storage", syncPreference);

    return () => {
      pointerQuery.removeEventListener("change", syncAvailability);
      reducedMotionQuery.removeEventListener("change", syncAvailability);
      window.removeEventListener("storage", syncPreference);
    };
  }, [config.defaultEnabled, config.storageKey]);

  useEffect(() => {
    if (active) {
      document.documentElement.dataset.folioPointerCompanion = "active";
    } else {
      delete document.documentElement.dataset.folioPointerCompanion;
    }

    return () => {
      delete document.documentElement.dataset.folioPointerCompanion;
    };
  }, [active]);

  const toggle = useCallback(() => {
    if (availability !== "available") return;

    const next = !preferenceEnabled;
    setPreferenceEnabled(next);

    try {
      window.localStorage.setItem(
        config.storageKey,
        next ? ENABLED_VALUE : DISABLED_VALUE,
      );
    } catch {
      // The document state still updates when storage is unavailable.
    }
  }, [availability, config.storageKey, preferenceEnabled]);

  const value = useMemo(
    () => ({
      active,
      availability,
      config,
      preferenceEnabled,
      toggle,
    }),
    [active, availability, config, preferenceEnabled, toggle],
  );

  return (
    <PointerCompanionContext.Provider value={value}>
      {children}
    </PointerCompanionContext.Provider>
  );
}

export function usePointerCompanion() {
  const context = useContext(PointerCompanionContext);
  if (!context) {
    throw new Error(
      "usePointerCompanion must be used inside PointerCompanionProvider",
    );
  }
  return context;
}

export function PointerCompanionToggle() {
  const {
    availability,
    config,
    preferenceEnabled,
    toggle,
  } = usePointerCompanion();
  const hintId = useId();

  if (availability !== "available") return null;

  return (
    <div className="border-t border-white/15 pt-3">
      <button
        type="button"
        aria-describedby={hintId}
        aria-pressed={preferenceEnabled}
        onClick={toggle}
        className="group flex min-h-11 w-full touch-manipulation items-center justify-between gap-4 text-left text-xs text-white/70 transition-colors hover:text-white focus-visible:outline-[#f3efe7] motion-reduce:transition-none"
      >
        <span>{config.label}</span>
        <span className="text-[10px] font-semibold lowercase text-[var(--folio-accent)]">
          {preferenceEnabled ? config.hideLabel : config.showLabel}
        </span>
      </button>
      <p id={hintId} className="pb-1 text-[10px] leading-relaxed text-white/60">
        {config.hint}
      </p>
    </div>
  );
}

export function PointerCompanionHeaderControl() {
  const { active, availability, config, toggle } = usePointerCompanion();

  if (availability !== "available") return null;

  return (
    <button
      type="button"
      aria-label={active ? config.hideLabel : config.showLabel}
      aria-pressed={active}
      onClick={toggle}
      className={`flex h-11 min-w-11 touch-manipulation items-center justify-center border px-1.5 text-[10px] font-semibold lowercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3efe7] motion-reduce:transition-none ${
        active
          ? "border-[var(--folio-accent)] text-[var(--folio-accent)]"
          : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"
      }`}
    >
      {config.compactLabel}
    </button>
  );
}

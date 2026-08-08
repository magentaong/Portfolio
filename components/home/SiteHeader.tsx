"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { siteData } from "@/data/site";
import AccentPreference from "@/components/shared/AccentPreference";
import DoodleSlot from "@/components/shared/AuthoredDoodle";
import {
  PointerCompanionHeaderControl,
  PointerCompanionToggle,
} from "@/components/shared/PointerCompanion";

export default function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 bg-[var(--folio-accent)] px-4 py-2 text-sm font-semibold text-[#101014] transition-transform focus-visible:translate-y-0 "
      >
        {siteData.accessibility.skipToContent}
      </a>

      <header className="absolute inset-x-0 top-0 z-50 text-[#f3efe7] sticky">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 ">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-semibold tracking-tight focus-visible:outline-[#f3efe7]"
          >
            {siteData.brand}
            <span className="text-[var(--folio-accent)]">.</span>
          </Link>

          <div className="flex items-center gap-2">
            <AccentPreference copy={siteData.accentPreference} />
            <PointerCompanionHeaderControl />

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline-[#f3efe7]"
              aria-label={
                menuOpen
                  ? siteData.accessibility.closeNavigation
                  : siteData.accessibility.openNavigation
              }
              aria-expanded={menuOpen}
              aria-controls="site-navigation-menu"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="absolute inset-x-0 top-full mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <nav
              id="site-navigation-menu"
              aria-label={siteData.accessibility.primaryNavigation}
              className="relative ml-auto w-full border border-white/15 bg-[#0b0b0e]/95 shadow-2xl shadow-black/25 backdrop-blur sm:w-[22rem]"
            >
              <div className="flex max-h-[calc(100svh-5rem)] flex-col gap-4 overflow-y-auto overscroll-contain p-5">
                {siteData.homeNavigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center text-lg text-white/80 focus-visible:outline-[#f3efe7]"
                  >
                    {item.label}
                  </a>
                ))}
                <PointerCompanionToggle />
                <div className="mt-2 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                  <Link
                    href={siteData.links.projectArchive.href}
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex min-h-11 items-center text-[var(--folio-accent)] focus-visible:outline-[#f3efe7]"
                  >
                    {siteData.links.projectArchive.label} ↓
                  </Link>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex h-11 w-11 items-center justify-center border border-white/20 focus-visible:outline-[#f3efe7]"
                    aria-label={siteData.accessibility.toggleTheme}
                  >
                    {mounted && resolvedTheme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <DoodleSlot
                slot="navigation-menu-corner"
                className="absolute -bottom-7 right-5 overflow-visible"
              />
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

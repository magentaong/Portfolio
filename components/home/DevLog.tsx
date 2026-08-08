import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { devLogEntries } from "@/data/devlog";
import { homeContent } from "@/data/home";
import DoodleSlot from "@/components/shared/AuthoredDoodle";

const publishedEntries = devLogEntries.filter(
  (entry) => !entry.draft && entry.title.trim() && entry.body.trim(),
);
const featuredEntry = publishedEntries.find(
  (entry) => entry.id === homeContent.featuredDevlogId,
);
const recentEntries = [...publishedEntries]
  .filter((entry) => entry.id !== homeContent.featuredDevlogId)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

function excerpt(body: string, length = 520) {
  const firstThought = body.split(/\n\s*\n/)[0].trim();
  return firstThought.length > length
    ? `${firstThought.slice(0, length).trimEnd()}…`
    : firstThought;
}

export default function DevLog() {
  if (!featuredEntry) return null;

  return (
    <section id="notes" className="bg-[var(--folio-cobalt-deep)] py-24 text-[#f3efe7] md:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="doodle-trigger doodle-trigger--scoped relative isolate flex items-end justify-between gap-6 border-t border-white/18 pt-7">
          <DoodleSlot
            slot="home-devlog-heading"
            className="absolute right-0 top-0 h-24 w-36 -translate-y-[58%] overflow-visible [--folio-accent:var(--folio-accent-on-cobalt)] sm:right-32 sm:h-28 sm:w-44"
          />
          <div className="relative z-10 max-w-[calc(100%_-_4.5rem)] sm:max-w-none">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">
              {homeContent.devlog.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
              {homeContent.devlog.title}
            </h2>
          </div>
          <Link
            href="/devlog"
            className="doodle-primary-trigger group relative z-10 hidden items-center gap-2 text-xs text-white/55 transition-colors hover:text-white sm:inline-flex"
          >
            {homeContent.devlog.archiveLabel}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <article className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="text-[clamp(7rem,15vw,13rem)] font-medium leading-none tracking-[-0.08em]">
              {featuredEntry.id}
            </p>
            <p className="mt-3 text-xs text-white/55">{featuredEntry.date}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--folio-accent-on-cobalt)]">
              {featuredEntry.project}
            </p>
            <h3 className="mt-4 max-w-3xl text-[clamp(2.6rem,6vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              {featuredEntry.title}
            </h3>
            <p className="mt-9 max-w-2xl text-base leading-relaxed text-white/58 md:text-lg">
              {excerpt(featuredEntry.body)}
            </p>
            <Link
              href={`/devlog#note-${featuredEntry.id}`}
              className="group mt-9 inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-[var(--folio-accent-on-cobalt)]"
            >
              {homeContent.devlog.continueLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </article>

        <div className="mt-24 border-t border-white/18 md:mt-36">
          {recentEntries.map((entry) => (
            <Link
              key={entry.id}
              href={`/devlog#note-${entry.id}`}
              className="group grid gap-2 border-b border-white/18 py-5 transition-colors hover:text-[var(--folio-accent-on-cobalt)] sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="text-xs text-white/55">{entry.date}</span>
              <span className="text-base font-medium sm:text-lg">
                {entry.title}
              </span>
              <span className="hidden text-xs text-white/55 sm:block">
                {entry.project || homeContent.devlog.noteFallback} ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

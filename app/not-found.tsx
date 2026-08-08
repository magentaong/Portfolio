import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteData } from "@/data/site";

export default function NotFound() {
  return (
    <div className="editorial-home min-h-screen bg-[#0b0b0e] px-5 py-8 text-[#f3efe7] sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1440px] flex-col border-t border-white/20 pt-5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/55">
          <p>{siteData.notFound.eyebrow}</p>
          <p>{siteData.notFound.code}</p>
        </div>

        <main className="my-auto grid gap-12 py-20 md:grid-cols-12 md:items-end">
          <h1 className="text-[clamp(4rem,16vw,13rem)] font-semibold uppercase leading-[0.76] tracking-[-0.075em] md:col-span-9">
            {siteData.notFound.title}
          </h1>
          <div className="border-t border-white/20 pt-5 md:col-span-3">
            <p className="text-sm leading-relaxed text-white/60">
              {siteData.notFound.body}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 text-sm font-semibold">
              <Link
                href={siteData.links.home.href}
                className="group inline-flex items-center gap-2 hover:text-[var(--folio-accent)]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {siteData.notFound.homeLabel}
              </Link>
              <Link
                href={siteData.links.projectArchive.href}
                className="group inline-flex items-center gap-2 hover:text-[var(--folio-accent)]"
              >
                {siteData.notFound.archiveLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </main>

        <p className="border-t border-white/20 pt-5 text-xs text-white/45">
          {siteData.brand}
        </p>
      </div>
    </div>
  );
}

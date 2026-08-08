import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/home";
import { siteData } from "@/data/site";

export default function ArchiveBridge() {
  const content = homeContent.archiveBridge;

  return (
    <section
      id="more-of-what-i-made"
      aria-labelledby="archive-bridge-title"
      className="scroll-mt-4"
    >
      <div className="bg-[var(--folio-cobalt-deep)] text-[#f3efe7]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-12 md:items-end lg:px-12 lg:py-24">
          <div className="md:col-span-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--folio-yellow)]">
              {content.eyebrow}
            </p>
            <h2
              id="archive-bridge-title"
              className="mt-5 max-w-[12ch] text-balance text-[clamp(2.5rem,6.2vw,6rem)] font-semibold leading-[0.94] tracking-[-0.055em]"
            >
              {content.title}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-[#f3efe7]/75 md:col-span-4 md:col-start-9 md:text-lg">
            {content.body}
          </p>
        </div>
      </div>

      <div className="border-y border-[#101014] bg-[var(--folio-yellow)] text-[#101014]">
        <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[minmax(13rem,0.8fr)_minmax(0,3.2fr)] lg:px-12">
          <p className="flex min-h-16 items-center border-b border-[#101014] px-5 text-sm font-semibold sm:px-8 lg:min-h-20 lg:border-b-0 lg:pr-8">
            {content.linkLead}
          </p>

          <nav
            aria-label={siteData.accessibility.archiveNavigation}
            className="lg:border-l lg:border-[#101014]"
          >
            <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
              {siteData.archiveNavigation.map((item, index) => (
                <li
                  key={item.href}
                  className={`${
                    index > 0 ? "border-t border-[#101014] sm:border-t-0" : ""
                  } ${index % 2 === 1 ? "sm:border-l sm:border-[#101014]" : ""} ${
                    index > 1 ? "sm:border-t sm:border-[#101014] lg:border-t-0" : ""
                  } ${index > 0 ? "lg:border-l lg:border-[#101014]" : ""}`}
                >
                  <Link
                    href={item.href}
                    className="group flex min-h-16 items-center justify-between gap-4 px-5 text-base font-semibold transition-colors hover:bg-[var(--folio-accent)] focus-visible:bg-[var(--folio-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#101014] sm:min-h-20 sm:px-6"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

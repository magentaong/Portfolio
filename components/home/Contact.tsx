import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/data/home";
import { siteData } from "@/data/site";
import DoodleCopyControl from "@/components/shared/DoodleCopyControl";

export default function Contact() {
  return (
    <footer id="contact" className="bg-[#0b0b0e] pb-8 pt-24 text-[#f3efe7] md:pt-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">
          {homeContent.contact.eyebrow}
        </p>
        <h2 className="mt-8 text-[clamp(5.2rem,15vw,14rem)] font-semibold leading-[0.76] tracking-[-0.075em]">
          {homeContent.contact.title}
        </h2>

        <div className="doodle-trigger doodle-trigger--scoped relative mt-16 inline-block max-w-full pt-12 sm:pt-16">
          <a
            href={`mailto:${siteData.email}`}
            className="doodle-primary-trigger group relative z-10 inline-flex max-w-full items-center gap-3 border-b border-white/30 pb-2 text-xl font-medium transition-colors hover:border-[var(--folio-accent)] hover:text-[var(--folio-accent)] sm:text-3xl"
          >
            <span className="truncate">{siteData.email}</span>
            <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-7 sm:w-7" />
          </a>
          <DoodleCopyControl
            slot="home-contact-email"
            value={siteData.email}
            copy={siteData.emailCopy}
            className="absolute right-0 top-0 z-20 h-16 w-14 sm:h-20 sm:w-16"
          />
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-white/16 pt-6 text-xs text-white/55 sm:flex-row sm:items-end sm:justify-between md:mt-36">
          <div>
            <p>© {new Date().getFullYear()} {siteData.brand}</p>
            <p className="mt-1">{siteData.footer.note}</p>
          </div>

          <div className="flex gap-5">
            <Link
              href={siteData.links.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {siteData.links.github.label} ↗
            </Link>
            <Link
              href={siteData.links.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {siteData.links.linkedin.label} ↗
            </Link>
            <Link
              href={siteData.links.resume.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {siteData.links.resume.label} ↗
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

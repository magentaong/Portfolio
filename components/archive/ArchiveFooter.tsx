import Link from "next/link";
import { siteData } from "@/data/site";

export default function ArchiveFooter() {
  return (
    <footer className="bg-[#0b0b0e] py-10 text-[#f3efe7]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-t border-white/20 px-5 pt-6 text-xs text-white/55 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <p>© {new Date().getFullYear()} {siteData.brand}</p>
          <p className="mt-1">{siteData.footer.note}</p>
        </div>
        <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-white">
          {siteData.email}
        </a>
        <Link href={siteData.links.home.href} className="transition-colors hover:text-white">
          {siteData.links.home.label} ↗
        </Link>
      </div>
    </footer>
  );
}

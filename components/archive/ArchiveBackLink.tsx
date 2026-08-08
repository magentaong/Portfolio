import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ArchivePageConfig } from "@/types/archive";

export default function ArchiveBackLink({
  link,
}: {
  link: ArchivePageConfig["backLink"];
}) {
  return (
    <Link
      href={link.href}
      className="group inline-flex min-h-11 items-center gap-2 text-xs font-medium text-white/65 transition-colors hover:text-white focus-visible:outline-[#f3efe7] motion-reduce:transition-none"
    >
      <ArrowLeft
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1 group-focus-visible:-translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
      />
      {link.label}
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { devLogEntries } from "@/data/devlog";
import { DevLogEntry } from "@/types/devlog";
import { moodConfig } from "@/lib/content-config";

export default function DevLog() {
  const recent = [...devLogEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); //sort by the most recent dates

  return (
    <section className="py-20 relative z-10 bg-muted/30">
      <div className="container max-w-3xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
              Dev <span className="text-orange-500">Log</span>
            </h2>
            <p className="text-muted-foreground">
              What I&apos;m building and breaking, and yapping about
            </p>
          </div>
          <Link
            href="/devlog"
            className="text-sm text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 group shrink-0"
          >
            All entries
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="space-y-4 ">
          {recent.map((entry: DevLogEntry, index: number) => (
            <DevLogCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DevLogCard({ entry, index }: { entry: DevLogEntry; index: number }) {
  const mood = moodConfig[entry.mood];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group rounded-xl border border-orange-500/20 bg-background/60 backdrop-blur-sm p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/10"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">
            {entry.date}
          </span>
          {entry.project && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-orange-500 font-medium">
                {entry.project}
              </span>
            </>
          )}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 flex items-center gap-1.5 ${moodConfig[entry.mood].style}`}
        >
          {mood.icon}
          {mood.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors">
        {entry.title}
      </h3>

      {/* Body */}
      <p className="whitespace-pre-line text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {entry.body.replace(/\\n/g, "\n")}
      </p>

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full border border-orange-500/20 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

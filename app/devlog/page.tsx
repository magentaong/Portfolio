"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { devLogEntries } from "@/data/devlog"
import { DevLogEntry } from "@/types/devlog"
import FloatingBalls from "@/components/floating-balls"
import { CheckCircle, Skull, Zap, Cog } from "lucide-react"

const moodConfig = {
  good:{ icon: <CheckCircle className="h-3 w-3" />, label: "Good",style: "bg-green-500/10 text-green-500"},
  stuck:{ icon: <Skull className="h-3 w-3" />, label: "Stuck", style: "bg-red-500/10 text-red-500"},
  breakthrough: { icon: <Zap className="h-3 w-3" />, label: "Breakthrough", style: "bg-orange-500/10 text-orange-500"},
  grind:{ icon: <Cog className="h-3 w-3" />, label: "Grind", style: "bg-blue-500/10 text-blue-400"},
}

const allProjects = ["All", ...Array.from(new Set(devLogEntries.map((e) => e.project).filter(Boolean)))] as string[]

export default function DevLogPage() {
  const [activeProject, setActiveProject] = useState("All")

  const filtered = [...devLogEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter((e) => activeProject === "All" || e.project === activeProject)

  return (
    <div className="min-h-screen bg-background">
      <FloatingBalls count={15} />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-orange-500 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container py-12 md:py-20 max-w-3xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Dev <span className="text-orange-500">Log</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A running journal of what I&apos;m currently experimenting or updating
          </p>
        </motion.div>

        {/* Project filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {allProjects.map((project) => (
            <button
              key={project}
              onClick={() => setActiveProject(project)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeProject === project
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-500/30 text-muted-foreground hover:border-orange-500/60 hover:text-orange-500"
              }`}
            >
              {project}
            </button>
          ))}
        </motion.div>

        {/* Entries */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-orange-500/20" />

          <div className="space-y-6 pl-8">
            {filtered.map((entry: DevLogEntry, index: number) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="relative group"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.15rem] top-5 h-3 w-3 rounded-full border-2 border-orange-500 bg-background group-hover:bg-orange-500 transition-colors" />

                <div className="rounded-xl border border-orange-500/20 bg-background/60 backdrop-blur-sm p-6 hover:border-orange-500/50 transition-all duration-300 hover:shadow-md hover:shadow-orange-500/10">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-muted-foreground font-mono">{entry.date}</span>
                      {entry.project && (
                        <>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-xs text-orange-500 font-medium">{entry.project}</span>
                        </>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 flex items-center gap-1.5 ${moodConfig[entry.mood].style}`}>
                        {moodConfig[entry.mood].icon}
                        {moodConfig[entry.mood].label}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 group-hover:text-orange-500 transition-colors">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {entry.body}
                  </p>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-orange-500/20 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}
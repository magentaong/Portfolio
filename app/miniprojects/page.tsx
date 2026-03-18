"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Shuffle} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { miniProjects } from "@/data/miniprojects"
import { MiniProject } from "@/types/miniprojects"
import FloatingBalls from "@/components/floating-balls"

const statusStyles = {
  "complete": "bg-green-500/10 text-green-500",
  "in-progress": "bg-orange-500/10 text-orange-500",
  "abandoned": "bg-muted text-muted-foreground",
}

const statusLabel = {
  "complete": "Complete",
  "in-progress": "In Progress",
  "abandoned": "Abandoned",
}

const allTags = ["All", ...Array.from(new Set(miniProjects.flatMap((p) => p.tags)))]

export default function MiniProjectsPage() {
  const [activeTag, setActiveTag] = useState("All")
  const [items, setItems] = useState<MiniProject[]>(miniProjects)
  const [isShuffling, setIsShuffling] = useState(false)

  const handleShuffle = () => {
    setIsShuffling(true)
    setTimeout(() => {
      const arr = [...miniProjects]  // ← always from original, not items
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      setItems(arr)
      setIsShuffling(false)
    }, 300)
  }

  const filtered = activeTag === "All"
    ? items
    : items.filter((p) => p.tags.includes(activeTag))

  return (
    <div className="min-h-screen bg-background">
      <FloatingBalls count={15} />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 text-muted-foreground hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container py-12 md:py-20 max-w-5xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Mini <span className="text-orange-500">Projects</span>
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              className="border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5 gap-2 mt-1"
            >
              <motion.div
                animate={isShuffling ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Shuffle className="h-3.5 w-3.5 text-orange-500" />
              </motion.div>
              Randomise
            </Button>
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Small builds, experiments, and weekend mini projects, or things I don't think is a full fledged project. A lot of these are not perfect (or may even be just beginner stuffs) BUT you might find some hidden gems here, also some I might continue to work on some for fun. Most of these have a live demo too, linked to the github icon.
          </p>
        </motion.div>
        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-500/30 text-muted-foreground hover:border-orange-500/60 hover:text-orange-500"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project: MiniProject, index: number) => (
              <MiniProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-12"
          >
            No projects found
          </motion.p>
        )}

      </main>
    </div>
  )
}

function MiniProjectCard({ project, index }: { project: MiniProject; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex flex-col rounded-xl border border-orange-500/20 bg-background/60 backdrop-blur-sm overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1"
    >
      
      {/* Video */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted">
        <video
          src={project.video}   
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${statusStyles[project.status]}`}>
            {statusLabel[project.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h3 className="text-xl font-bold group-hover:text-orange-500 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{project.date}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 pt-1">
            {project.github && (
              <Link href={project.github} target="_blank" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110">
                <Github className="h-4 w-4" />
              </Link>
            )}
            {project.link && (
              <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110">
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>

        {/* What I learned */}
        {project.learned && project.learned.length > 0 && (
          <div className="mb-4 rounded-lg bg-orange-500/5 border border-orange-500/20 p-4">
            <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">
              What I Learned
            </p>
            <ul className="space-y-1.5">
              {project.learned.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-orange-500 mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
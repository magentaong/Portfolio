"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Shuffle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { miniProjects } from "@/data/miniprojects"
import { MiniProject } from "@/types/miniprojects"


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

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function MiniProjects() {
  const [items, setItems] = useState<MiniProject[]>(miniProjects)
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isShuffling, setIsShuffling] = useState(false)

  const current = items[index]

  const prev = () => { setDirection("left")
    setIndex((i) => (i - 1 + items.length) % items.length)
  }

  const next = () => { setDirection("right")
    setIndex((i) => (i + 1) % items.length)
  }

  const handleShuffle = () => { setIsShuffling(true)
    setTimeout(() => {
      setItems(shuffleArray(miniProjects))
      setIndex(0)
      setDirection("right")
      setIsShuffling(false)
    }, 300)
  }

  const variants = { enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <section className="py-12 md:py-20 relative z-10">
      <div className="container px-1">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-3">
            Mini <span className="text-orange-500">Projects</span>
          </h2>
          <p className="text-muted-foreground md:text-lg px-8">
            Small builds, experiments, and weekend stuffs
          </p>
        </motion.div>

        {/* Card + Arrows */}
        <div className="flex items-center justify-center gap-2 md:gap-8">
          {/* Left Arrow */}
          <button
            onClick={prev}
            className="flex items-center justify-center h-6 w-6 md:h-10 md:w-10 rounded-full border border-orange-500/30 bg-background/60 backdrop-blur-sm hover:border-orange-500/60 hover:text-orange-500 transition-all shrink-0 hover:scale-110 "
          >
            <ChevronLeft className="h-3 w-3 md:h-5 md:w-5" />
          </button>
          {/* Card */}
          <div className="relative w-full max-w-xl max-h overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${current.title}-${index}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="rounded-xl border border-orange-500/20 bg-background/60 backdrop-blur-sm overflow-hidden shadow-lg">
                {/* Video */}
                <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <video
                    src={current.video}   
                    autoPlay
                    loop
                    muted //..yea
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm ${statusStyles[current.status]}`}>
                    {statusLabel[current.status]}
                    </span>
                </div>
                </div>

                {/* Content */}
                <div className="p-4 md:px-8">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                    <h3 className="text-lg md:text-2xl font-bold">{current.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">{current.date}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 pt-1">
                    {current.github && (
                        <Link href={current.github} target="_blank" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110">
                            <Github className="h-4 w-4 md:h-5 md:w-5" />
                        </Link>
                    )}
                    {current.link && (
                        <Link href={current.link} target="_blank" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110">
                            <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                        </Link>
                    )}
                    </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4 md:line-clamp-none">{current.description}</p>

                {/* What I learned */}
                {current.learned && current.learned.length > 0 && (
                    <div className="mb-5 rounded-lg bg-orange-500/5 border border-orange-500/20 p-3 md:p-4">
                    <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-3">What I Learned</p>
                    <ul className="space-y-2">
                        {current.learned.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground"
                        >
                            <span className="text-orange-500 mt-0.5 shrink-0">→</span>
                            {item}
                        </motion.li>
                        ))}
                    </ul>
                    </div>
                )}

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {current.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                        {tag}
                    </Badge>
                    ))}
                </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="flex items-center justify-center h-6 w-6 md:h-10 md:w-10 rounded-full border border-orange-500/30 bg-background/60 backdrop-blur-sm hover:border-orange-500/60 hover:text-orange-500 transition-all shrink-0 hover:scale-110">
            <ChevronRight className="h-3 w-3 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Dots + Shuffle */}
        <div className="flex flex-col items-center gap-3 md:gap-4 mt-6 md:mt-8">

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? "right" : "left")
                  setIndex(i)
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 h-2 bg-orange-500"
                    : "w-2 h-2 bg-orange-500/30 hover:bg-orange-500/60"
                }`}
              />
            ))}
          </div>

          {/* Shuffle button */}
          <Button
            variant="outline"
            onClick={handleShuffle}
            className="border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5 gap-2">
            <motion.div
              animate={isShuffling ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}>
              <Shuffle className="h-4 w-4 text-orange-500" />
            </motion.div>
            Randomise
          </Button>
            {/* View All Button*/}
            <Link href="/miniprojects"
                className="text-sm text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 group">
                View all mini projects
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>

      </div>
    </section>
  )
}
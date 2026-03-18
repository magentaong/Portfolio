"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import { photos } from "@/data/photo"
import { Photo } from "@/types/photo"
import FloatingBalls from "@/components/floating-balls"

const locations = ["All", "Japan", "Taiwan", "Singapore", "Other"] as const

export default function PhotosPage() {
  const [activeLocation, setActiveLocation] = useState<string>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeLocation === "All"
    ? photos
    : photos.filter((p) => p.location === activeLocation)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const nextPhoto = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

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

      <main className="container py-12 md:py-20 max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Photos <span className="text-orange-500">.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Things and Places I&apos;ve taken photos of :)
          </p>
        </motion.div>

        {/* Location filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeLocation === loc
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-500/30 text-muted-foreground hover:border-orange-500/60 hover:text-orange-500"
              }`}
            >
              {loc}
            </button>
          ))}
        </motion.div>

        {/* grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((photo: Photo, index: number) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onClick={() => openLightbox(index)}
                className={`relative w-full break-inside-avoid cursor-pointer overflow-hidden rounded-lg group ${
                  photo.aspectRatio === "portrait"
                    ? "aspect-[3/4]"
                    : photo.aspectRatio === "square"
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium">{photo.alt}</p>
                    <p className="text-white/60 text-xs mt-0.5">{photo.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto() }}
              className="absolute left-4 text-white/60 hover:text-white transition-colors z-10 flex items-center justify-center h-10 w-10 rounded-full border border-white/20 hover:border-white/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 text-center pb-2">
                  <p className="text-white/80 text-sm">{filtered[lightboxIndex].alt}</p>
                  <p className="text-white/40 text-xs mt-0.5">{filtered[lightboxIndex].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto() }}
              className="absolute right-4 text-white/60 hover:text-white transition-colors z-10 flex items-center justify-center h-10 w-10 rounded-full border border-white/20 hover:border-white/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
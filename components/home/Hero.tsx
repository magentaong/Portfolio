"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Mail, Linkedin, Download, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTypewriter, Cursor } from "react-simple-typewriter"

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } },}
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 },}

type Props = { onViewWork: () => void
mousePosition: { x: number; y: number }
}

// hehe the mouse thing everyone does
export default function Hero({ onViewWork, mousePosition }: Props) {
  const [text] = useTypewriter({
    words: ["FullStack Software Engineer", "Software Engineer", "Bug Finder", "Thinker"],
    loop: true,
    delaySpeed: 200,
  })

  return (
    <section className="relative overflow-hidden py-20 md:py-32 flex items-center min-h-[90vh]">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
        >
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={item} className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Computer Science & Design Student
            </motion.div>
            <motion.h1 variants={item} className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Hi, I&apos;m <span className="text-orange-500">Magenta Ong</span>
            </motion.h1>
            <motion.p variants={item} className="max-w-[600px] text-xl text-muted-foreground h-8">
              <span>{text}</span>
              <Cursor cursorColor="#f97316" />
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="relative z-10 overflow-hidden group">
                <Link href="/Resume_Summer_2026" target="_blank" download>
                  <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 group-hover:w-full" />
                  <span className="relative flex items-center">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Resume
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={onViewWork} className="relative z-10 overflow-hidden group">
                <span className="absolute inset-0 w-0 h-full bg-orange-500 opacity-10 transition-all duration-300 group-hover:w-full" />
                <span className="relative flex items-center">
                  View My Work
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
            <motion.div variants={item} className="flex gap-4">
              <Link href="https://github.com/magentaong" target="_blank" className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110">
                <Github className="h-6 w-6" /><span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/magenta-ong-766378307" target="_blank" className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110">
                <Linkedin className="h-6 w-6" /><span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="mailto:ongmagenta@gmail.com" className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110">
                <Mail className="h-6 w-6" /><span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-full border-4 border-orange-500 bg-muted shadow-xl"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) rotate(${mousePosition.x * 5}deg)`,
              transition: "transform 0.1s ease-out",
            }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent opacity-60 mix-blend-overlay" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
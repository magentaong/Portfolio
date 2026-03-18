"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Github, Mail, Linkedin, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import FloatingBalls from "@/components/floating-balls"

import Hero from "@/components/home/Hero"
import About from "@/components/home/About"
import Projects from "@/components/home/Projects"
import Skills from "@/components/home/Skills"
import Contact from "@/components/home/Contact"
import MiniProjects from "@/components/home/MiniProjects"
import DevLog from "@/components/home/DevLog"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    if (window.location.hash === "#projects") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="flex flex-col bg-background relative overflow-hidden w-full min-h-[90vh]">
      <FloatingBalls count={15} />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500">Portfolio</span>
          </Link>
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              {[
                { label: "About", ref: aboutRef },
                { label: "My Work", ref: projectsRef },
                { label: "Skills", ref: skillsRef },
                { label: "Contact", ref: contactRef },
              ].map(({ label, ref }) => (
                <button
                  key={label}
                  onClick={() => scrollToSection(ref)}
                  className="transition-colors hover:text-orange-500 relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
                </button>
              ))}

              {/* Divider */}
              <span className="text-muted-foreground/30 select-none">|</span>

              {/* Page links */}
              <Link
                href="/miniprojects"
                className="transition-colors hover:text-orange-500 relative group"
              >
                Mini Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </Link>
              <Link href="/devlog" className="transition-colors hover:text-orange-500 relative group">
                Dev Logs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </Link>
              <Link href="/photos" className="transition-colors hover:text-orange-500 relative group">
                Photos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full" />
              </Link>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="h-9 w-9 z-20 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              {mounted && theme === "dark" ? <Sun className="h-4 w-4 transition-transform group-hover:rotate-45 duration-300" /> : <Moon className="h-4 w-4 transition-transform group-hover:rotate-45 duration-300" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero onViewWork={() => scrollToSection(projectsRef)} mousePosition={mousePosition} />
        <About />
        <Projects sectionRef={projectsRef} />
        <MiniProjects />
        <DevLog />
        <Skills sectionRef={skillsRef} />
        <Contact sectionRef={contactRef} />
      </main>
      <footer className="border-t py-8 relative z-10">
        <div className="container">
          <p className="text-center text-s text-muted-foreground/40 mb-6 italic">
            Thanks for dropping by! Have you tried dropping the cat?
          </p>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-center text-sm text-muted-foreground md:text-left">© {new Date().getFullYear()} Magenta Ong. All rights reserved.</p>
              <p className="text-center text-xs text-muted-foreground md:text-left mt-1">Computer Science and Design Student at SUTD</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://github.com/magentaong" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"><Github className="h-5 w-5" /><span className="sr-only">GitHub</span></Link>
              <Link href="mailto:ongmagenta@gmail.com" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"><Mail className="h-5 w-5" /><span className="sr-only">Email</span></Link>
              <Link href="https://www.linkedin.com/in/magenta-ong-766378307" className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"><Linkedin className="h-5 w-5" /><span className="sr-only">GitHub</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, ChevronRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import FloatingBalls from "@/components/floating-balls"
import { projects } from "@/data/projects"
import { Project } from "@/types/project"

function ProjectsPageContent() {
  const searchParams = useSearchParams()
  const initialProject = searchParams.get("active") || projects[0].slug
  const [activeProject, setActiveProject] = useState(initialProject)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const activeProjectData = projects.find((p) => p.slug === activeProject) ?? projects[0]

  return (
    <div className="min-h-screen bg-background">
      <FloatingBalls count={15} />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center">
          <Link
            href="/#projects"
            className="flex items-center space-x-2 text-muted-foreground hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-orange-500">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg">Detailed showcase of my work and technical projects</p>
        </motion.div>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 mt-12">
          {/* Sidebar */}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <motion.div variants={item}>
              <h2 className="text-xl font-bold mb-4">Projects</h2>
            </motion.div>
            {projects.map((p) => (
              <motion.div variants={item} key={p.slug}>
                <button
                  onClick={() => setActiveProject(p.slug)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeProject === p.slug
                      ? "bg-orange-500/10 border border-orange-500/50"
                      : "bg-background/60 border border-orange-500/20 hover:border-orange-500/30 hover:bg-orange-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-medium ${activeProject === p.slug ? "text-orange-500" : ""}`}>
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        activeProject === p.slug ? "rotate-90 text-orange-500" : ""
                      }`}
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Detail Panel */}
          <div className="bg-background/60 backdrop-blur-sm rounded-lg border border-orange-500/20 p-6">
            <ProjectDetail project={activeProjectData} mousePosition={mousePosition} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsPageContent />
    </Suspense>
  )
}

function ProjectDetail({
  project,
  mousePosition,
}: {
  project: Project
  mousePosition: { x: number; y: number }
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section))
  }

  const iconMap = {
    github: <Github className="h-4 w-4" />,
    external: <ExternalLink className="h-4 w-4" />,
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-orange-500">{project.title}</h2>
        <p className="text-xl text-muted-foreground">{project.subtitle}</p>
        <p className="text-sm mt-2">{project.date}</p>
      </div>

      {/* Images + Videos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.images?.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-orange-500/20 bg-muted"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            <Image
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              width={600}
              height={300}
              className="w-full h-auto max-h-[300px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
        {project.videos?.map((video, index) => (
          <div key={index} className="overflow-hidden rounded-lg border border-orange-500/20 bg-muted">
            <video controls className="w-full h-auto max-h-[300px] object-fit rounded-lg shadow-lg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Overview */}
        <div>
          <h3 className="text-xl font-bold mb-3">Overview</h3>
          <div className="text-muted-foreground space-y-3">
            {project.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div>
            <button
              onClick={() => toggleSection("challenges")}
              className="flex items-center justify-between w-full text-left text-xl font-bold mb-3 group"
            >
              <span>Challenges & Solutions</span>
              <ChevronDown
                className={`h-5 w-5 text-orange-500 transition-transform duration-300 ${
                  expandedSection === "challenges" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "challenges" && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="list-disc pl-6 space-y-2 text-muted-foreground mb-4"
              >
                {project.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {challenge}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Technologies */}
        <div>
          <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 px-3 py-1 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3">Project Links</h3>
            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => (
                <Button
                  key={index}
                  asChild
                  variant="outline"
                  className="border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5"
                >
                  <Link href={link.url} target="_blank" className="flex items-center gap-2">
                    {link.icon ? iconMap[link.icon] : <ExternalLink className="h-4 w-4" />}
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
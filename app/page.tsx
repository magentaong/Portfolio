"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Moon,
  Sun,
  Download,
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  ArrowRight,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import FloatingBalls from "@/components/floating-balls"
import { useTypewriter, Cursor } from "react-simple-typewriter"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const aboutRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (window.location.hash === '#projects') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [text] = useTypewriter({
    words: ["Aspiring Full Stack Developer", "UI/UX Designer", "Problem Solver", "Creative Thinker"],
    loop: true,
    delaySpeed: 200,
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="flex flex-col bg-background relative overflow-hidden w-full min-h-[90vh]">
      <FloatingBalls count={15} />

      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between md:6-xl ">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500">Portfolio</span>
          </Link>
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="transition-colors hover:text-orange-500 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(projectsRef)}
                className="transition-colors hover:text-orange-500 relative group"
              >
                My Work
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(skillsRef)}
                className="transition-colors hover:text-orange-500 relative group"
              >
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="transition-colors hover:text-orange-500 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 z-20 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></span>
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 transition-transform group-hover:rotate-45 duration-300" />
              ) : (
                <Moon className="h-4 w-4 transition-transform group-hover:rotate-45 duration-300" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
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
                    <Link href="/Magenta_Ong_Resume_1.pdf.pdf" target="_blank" download>
                      <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                      <span className="relative flex items-center">
                        <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                        Resume
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => scrollToSection(projectsRef)}
                    className="relative z-10 overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-0 h-full bg-orange-500 opacity-10 transition-all duration-300 group-hover:w-full"></span>
                    <span className="relative flex items-center">
                      View My Work
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
                <motion.div variants={item} className="flex gap-4">
                  <Link
                    href="https://github.com/magentaong"
                    target="_blank"
                    className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110"
                  >
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/magenta-ong-766378307"
                    target="_blank"
                    className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link
                    href="mailto:ongmagenta@gmail.com"
                    className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110"
                  >
                    <Mail className="h-6 w-6" />
                    <span className="sr-only">Email</span>
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
                }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Magenta Ong"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent opacity-60 mix-blend-overlay"></div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          ref={aboutRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-muted/30 relative z-10 gradient-bg"
        >
          <div className="container">
            <div className="mx-auto max-w-4xl text-center md:6-xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                About <span className="text-orange-500">Me</span>
              </h2>
              <p className="mb-8 text-muted-foreground md:text-xl">
                Computer Science and Design student at Singapore University of Technology and Design (SUTD)
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all interactive-hover">
                  <CardContent className="p-6 min-h-[180px]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold">Education</h3>
                    <p className="mt-2 text-muted-foreground">
                      B.Eng. in Computer Science and Design at Singapore University of Technology and Design (2023-2027)
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all interactive-hover">
                  <CardContent className="p-6 min-h-[180px]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                      <Briefcase className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold">Experience</h3>
                    <p className="mt-2 text-muted-foreground">
                      Freelance Designer and Developer, Design Mentor at Steamunity, Private Tutor for STEM subjects
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all interactive-hover md:col-span-2 lg:col-span-1">
                  <CardContent className="p-6 min-h-[180px]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                      <Award className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-xl font-bold">Leadership</h3>
                    <p className="mt-2 text-muted-foreground">
                      House Guardian Senator (EXCO) and Vice Chairperson in Junior College with a Class Service Award
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

      

        <motion.section
          id = "projects"
          ref={projectsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 relative z-10"
        >
          <div className="container md:6-xl px-0">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                My <span className="text-orange-500">Work</span>
              </h2>
              <p className="mb-8 text-muted-foreground md:text-xl">A showcase of my recent work and ongoing projects</p>
            </div>
            <div className="flex justify-center">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-fit">
                
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title="GenEd"
                      subtitle="AI-Powered Learning Platform"
                      description="Awarded SUTD BabyShark Grant by SUTD Venture Innovation and Entrepreneurship. Developing an AI-driven LMS enabling students to find or create courses tailored to learning preferences while assisting teachers in streamlining courses efficiently."
                      image="/images/GenEd.png"
                      link="/projects"
                      tags={["AI", "EdTech", "LMS"]}
                      date="Jan 2025 - Present"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title="TaskSnipe"
                      subtitle="Team Task Management Platform"
                      description="Built a Next.js web app for team task tracking with authentication via Clerk. Uses PostgreSQL for database management and Vercel for continuous deployment. Designed a real-time dashboard to visualize task progress."
                      image="/images/TaskSnipe.png"
                      link="/projects"
                      tags={["Next.js", "PostgreSQL", "Clerk", "Vercel"]}
                      date="Jan 2025 - Present"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title="Freelance Website Developer"
                      subtitle="Custom Portfolio Websites for Clients"
                      description="Designing and developing modern, responsive portfolio websites for clients. Built with Next.js, styled with Tailwind CSS, and deployed on Vercel for seamless performance."
                      image="/images/IMAGE 2025-03-13 06:48:43.jpg"
                      link= "https://aloykoh.vercel.app"
                      tags={["Next.js", "Tailwind CSS", "Figma", "Vercel"]}
                      date="Mar 2025 - present"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title="LepakLah!"
                      subtitle="AI Senior-Centric Mobile App"
                      description="3rd Place, Dell InnovateFest 2024. Built a Flutter-based app to help seniors access activity center slots, addressing inefficiencies in the current system. Developed a Buddy Matching Algorithm for personalized connections. Deployed on RedHat OpenShift, Docker, Kubernetes."
                      image="/images/LepakLah.png"
                      link="https://www.linkedin.com/in/magenta-ong/details/projects/"
                      tags={["Flutter", "AI", "Docker", "Kubernetes"]}
                      date="Jun 2024 - Sept 2024"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      title="Whiskers"
                      subtitle="Interactive Robo-Cat"
                      description="Engineered a chatbot using OpenAI GPT + Whisper for speech-to-text conversation. Integrated Raspberry Pi 4 for robotic sensory responses."
                      image="/images/Whiskers.png"
                      link="https://aliciang999.wixsite.com/my-site-3"
                      tags={["OpenAI", "Raspberry Pi", "Robotics"]}
                      date="Jan 2024 - Apr 2024"
                    />
                  </motion.div>
                </div>
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg" className="relative overflow-hidden group">
                <Link href="/projects">
                  <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    View More Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={skillsRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 bg-muted/30 relative z-10 gradient-bg"
        >
          <div className="container px-0">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Skills & <span className="text-orange-500">Technologies</span>
              </h2>
              <p className="mb-8 text-muted-foreground md:text-xl">My technical toolkit and areas of expertise</p>
            </div>

            <Tabs defaultValue="languages" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-4 h-full grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
              <TabsContent value="languages" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                  <SkillTag name="Python" />
                  <SkillTag name="JavaScript" />
                  <SkillTag name="TypeScript" />
                  <SkillTag name="HTML" />
                  <SkillTag name="CSS" />
                  <SkillTag name="Java" />
                  <SkillTag name="English" />
                  <SkillTag name="Chinese" />
                </div>
              </TabsContent>
              <TabsContent value="frameworks" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center ">
                  <SkillTag name="React" />
                  <SkillTag name="Next.js" />
                  <SkillTag name="Flask" />
                  <SkillTag name="Django" />
                  <SkillTag name="Clerk" />
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                <SkillTag name="PostgreSQL" />
                  <SkillTag name="MySQL" />
                  <SkillTag name="MongoDB" />
                  <SkillTag name="Firebase" />
                  <SkillTag name="Matplotlib" />
                  <SkillTag name="Pandas" />
                  <SkillTag name="NumPy" />
                  <SkillTag name="ScikitLearn" />
                </div>
              </TabsContent>
              <TabsContent value="design" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                  <SkillTag name="Figma" />
                  <SkillTag name="Illustrator" />
                  <SkillTag name="Photoshop" />
                  <SkillTag name="Premiere Pro" />
                  <SkillTag name="Canva" />
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Experience Timeline</h3>
              <div className="space-y-8">
              <TimelineItem
                  date="Mar 2025 - Present"
                  title="Freelance Designer and Developer"
                  company="Self-Employed"
                  description="Designing and developing custom portfolio websites for clients. Utilizing Next.js, Vercel, and Figma to create responsive and visually appealing web experiences."
                />

                <TimelineItem
                  date="Nov 2024 - Present"
                  title="Design Mentor"
                  company="Steamunity"
                  description="Mentored 4 secondary and 2 polytechnic students in design thinking, guiding prototyping and solution development."
                />
                <TimelineItem
                  date="Aug 2023 - Present"
                  title="Private Tutor"
                  company="Physics, Chemistry, Math, Programming"
                  description="Students achieved 100% A-grades in H2 Physics/Math, avg. 6.5-grade improvement in O-Level Physics. Simplified programming concepts through hands-on mini projects."
                />
                <TimelineItem
                  date="Dec 2022 - Feb 2023"
                  title="Staff"
                  company="L.E. Cafe Confectionery and Pastry"
                  description="Optimized logistics across 3 stores, reducing order processing time by 20%. Resolved 95% of inquiries efficiently."
                />
              </div>
            </div>
          </div>
        </motion.section>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-2xl font-bold mb-6 group-hover:text-orange-500 transition-colors">
                  Leadership Experience
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 mt-1">
                      <Award className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">House Guardian Senator (EXCO)</h4>
                      <p className="text-sm text-muted-foreground">2024 - Present</p>
                      <p className="mt-1">
                        Served on a 6-member executive committee responsible for leading and coordinating activities for
                        a 50-member organisation. Took care of the welfare of 1100+ residents in hostel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 mt-1">
                      <Award className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Vice Chairperson (Junior College)</h4>
                      <p className="text-sm text-muted-foreground">2021 - 2022</p>
                      <p className="mt-1">
                        Coordinated service-learning projects and enhanced classroom spirit. Awarded Class Service Award
                        for outstanding leadership contributions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-2xl font-bold mb-6 group-hover:text-orange-500 transition-colors">Education</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 mt-1">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Singapore University of Technology and Design</h4>
                      <p className="text-sm text-muted-foreground">2023 - 2027</p>
                      <p className="mt-1">B.Eng. in Computer Science and Design</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                          Computer Science
                        </Badge>
                        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">Design</Badge>
                        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">Engineering</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={contactRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 relative z-10 gradient-bg"
        >
          
            <div className="container max-w-5xl mx-auto px-0">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                  Get In <span className="text-orange-500">Touch</span>
                </h2>
                <p className="mb-8 text-muted-foreground md:text-xl">
                  I&apos;m always open to new opportunities and collaborations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4">

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  
                    <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 interactive-hover">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                              <Mail className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium">ongmagenta@gmail.com</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                              <Linkedin className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">LinkedIn</p>
                              <p className="font-medium">magenta-ong-766378307</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                              <Github className="h-5 w-5 text-orange-500" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">GitHub</p>
                              <p className="font-medium">magentaong</p>
                            </div>
                          </div>
                        </div>
                          <div className="mt-8">
                            <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                            <div className="flex gap-4">
                              <Button asChild variant="outline" size="lg" className="rounded-full group overflow-hidden">
                                <Link href="https://github.com/magentaong" target="_blank">
                                  <span className="absolute inset-0 w-0 h-full bg-orange-500/10 transition-all duration-300 group-hover:w-full"></span>
                                  <span className="relative flex items-center">
                                    <Github className="mr-2 h-5 w-5 group-hover:text-orange-500 transition-colors" />
                                    GitHub
                                  </span>
                                </Link>
                              </Button>
                              <Button asChild variant="outline" size="lg" className="rounded-full group overflow-hidden">
                                <Link href="https://www.linkedin.com/in/magenta-ong-766378307" target="_blank">
                                  <span className="absolute inset-0 w-0 h-full bg-orange-500/10 transition-all duration-300 group-hover:w-full"></span>
                                  <span className="relative flex items-center">
                                    <Linkedin className="mr-2 h-5 w-5 group-hover:text-orange-500 transition-colors" />
                                    LinkedIn
                                  </span>
                                </Link>
                              </Button>
                            </div>
                          </div>
                      </CardContent>
                    </Card>
                  
                </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                      
                      <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 m-2">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
                             <ContactForm /> 
                        </CardContent>
                      </Card>
                  </motion.div>
              </div>
            </div>
          
        </motion.section>
      </main>

      <footer className="border-t py-8 relative z-10">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-center text-sm text-muted-foreground md:text-left">
                © {new Date().getFullYear()} Magenta Ong. All rights reserved.
              </p>
              <p className="text-center text-xs text-muted-foreground md:text-left mt-1">
                Computer Science and Design Student at SUTD
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/magentaong"
                className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="mailto:ongmagenta@gmail.com"
                className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/magenta-ong-766378307"
                className="text-muted-foreground hover:text-orange-500 transition-colors hover:scale-110 transform"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
type TimelineItemProps = {
  date: string;
  title: string;
  company: string;
  description: string;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, company, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-orange-500/30 last:border-0 last:pb-0 group"
    >
      <div className="absolute left-0 top-0 flex items-center justify-center -translate-x-1/2 rounded-full bg-orange-500 p-1 group-hover:scale-125 transition-transform">
        <div className="h-2 w-2 rounded-full bg-background"></div>
      </div>
      <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-orange-500/20 group-hover:border-orange-500/50 transition-all group-hover:-translate-y-1 group-hover:shadow-md group-hover:shadow-orange-500/10">
        <time className="text-sm font-medium text-orange-500">{date}</time>
        <h3 className="text-lg font-bold mt-1 group-hover:text-orange-500 transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground">{company}</p>
        <p className="mt-2 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

type ProjectCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  date: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, subtitle, description, image, link, tags, date }) => {
  return (
    <Card className="group flex flex-col overflow-hidden bg-background/60 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 h-full">
      <div className="aspect-video overflow-hidden relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/80">{subtitle}</p>
        </div>
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium">
          {date}
        </div>
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="space-y-3 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-xl font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <p className="text-sm">{description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="pt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-orange-500/30 hover:border-orange-500/60 group-hover:bg-orange-500 group-hover:text-white transition-colors"
            >
              <Link href={link} target="_blank">
                View Project
                <ExternalLink className="ml-2 h-3 w-3" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-orange-500/30 hover:border-orange-500/60 transition-colors"
            >
              <Link href="/projects">
                Details
                <ChevronRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type SkillTagProps = {
  name: string;
};

const SkillTag: React.FC<SkillTagProps> = ({ name }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="group relative overflow-hidden rounded-lg border border-orange-500/20 bg-background/60 backdrop-blur-sm p-4 transition-all duration-300 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/10"
    >
      <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <h4 className="font-medium group-hover:text-orange-500 transition-colors">{name}</h4>
    </motion.div>
  )
}





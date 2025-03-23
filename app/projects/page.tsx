"use client"

import { useState, useEffect, SetStateAction, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, AwaitedReactNode} from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Github, ExternalLink, ChevronRight, ChevronDown } from "lucide-react"
import { motion, MotionValue } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import FloatingBalls from "@/components/floating-balls"
import { UrlObject } from "url"

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState("freelance")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

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
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            <motion.div variants={item}>
              <h2 className="text-xl font-bold mb-4">Projects</h2>
            </motion.div>

            <motion.div variants={item}>
              <ProjectSelector
                id="freelance"
                title="Freelance Designer & Developer"
                subtitle="Creating Custom Portfolio Websites"
                active={activeProject === "freelance"}
                onClick={() => setActiveProject("freelance")}
              />
            </motion.div>
            <motion.div variants={item}>
              <ProjectSelector
                id="gened"
                title="GenEd"
                subtitle="AI-Powered Learning Platform"
                active={activeProject === "gened"}
                onClick={() => setActiveProject("gened")}
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectSelector
                id="tasksnipe"
                title="TaskSnipe"
                subtitle="Team Task Management Platform"
                active={activeProject === "tasksnipe"}
                onClick={() => setActiveProject("tasksnipe")}
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectSelector
                id="lepaklah"
                title="LepakLah!"
                subtitle="AI Senior-Centric Mobile App"
                active={activeProject === "lepaklah"}
                onClick={() => setActiveProject("lepaklah")}
              />
            </motion.div>

            <motion.div variants={item}>
              <ProjectSelector
                id="whiskers"
                title="Whiskers"
                subtitle="Interactive Robo-Cat"
                active={activeProject === "whiskers"}
                onClick={() => setActiveProject("whiskers")}
              />
            </motion.div>
          </motion.div>

          <div className="bg-background/60 backdrop-blur-sm rounded-lg border border-orange-500/20 p-6">
            <Tabs value={activeProject} onValueChange={setActiveProject}>
            <TabsContent value="freelance" className="mt-0">
              <ProjectDetail
                title="Freelance Designer & Developer"
                subtitle="Custom Websites for anyone :D"
                date="March 2025 - Present"
                description={
                  <>
                    <p className="mb-4">
                      As a freelance designer and developer, I specialise in creating custom, responsive, and visually engaging 
                      portfolio websites tailored to clients wants and needs. Each portfolio is crafted to highlight 
                      personal branding and showcase work effectively.
                    </p>
                    <p className="mb-4">
                      My design process starts with understanding the client's vision and wants, followed by wireframing in Figma, and finally once the client is satisfied,
                      developing the site using Next.js, styled with Tailwind CSS. The websites are deployed on Vercel for seamless 
                      performance.
                    </p>
                    <p>
                      Whether you're a student looking to display your projects and standout, a small business looking to market your products and build a personal branding, I aim to 
                      deliver sleek, modern, and accessible websites to all.
                    </p>
                    <p className="mb-4">
                      More to come!! (i'm currently drowning in student work, haven't updated)
                    </p>
                  </>
                }
                challenges={[
                  "Ensuring seamless user experience across all screen sizes",
                  "Balancing aesthetic design with optimized performance",
                  "Implementing intuitive navigation and accessibility features",
                  "Making sure that the design fits the clients wants and need",
                ]}
                technologies={["Next.js", "React", "Tailwind CSS", "Figma", "Vercel"]}
                links={[
                  { label: "Latest Design", url: "https://aloykoh.vercel.app", icon: <ExternalLink className="h-4 w-4" /> },
                  { label: "GitHub Repository", url: "https://github.com/magentaong", icon: <Github className="h-4 w-4" /> },
                ]}
                images={["/images/IMAGE 2025-03-13 06:48:43.jpg","/images/Screenshot 2025-03-13 at 9.45.49 AM.png"]}
                videos={[]}
                mousePosition={mousePosition}
              />
            </TabsContent>
                

              <TabsContent value="gened" className="mt-0">
                <ProjectDetail
                  title="GenEd"
                  subtitle="AI-Powered Learning Platform"
                  date="January 2025 - Present"
                  description={
                    <>
                      <p className="mb-4">
                        GenEd is an innovative AI-driven Learning Management System (LMS) that was awarded the SUTD
                        BabyShark Grant by SUTD Venture Innovation and Entrepreneurship. The platform is designed to
                        revolutionize the way students find and engage with educational content.
                      </p>
                      <p className="mb-4">
                        The core innovation of GenEd is its ability to tailor courses to individual learning
                        preferences. Using GenAI, GenEd aims to make learning accessible to all, by providing tailored content to individual needs, and streamlining content generation to suit users. 
                      </p>
                      <p>
                        For educators, GenEd provides powerful tools to streamline course creation and management, with
                        AI assistance for content generation.
                      </p>
                    </>
                  }
                  challenges={[
                    "Ensuring reliability of content generated",
                    "Ensuring data privacy and security for educational data",
                    "Designing an intuitive interface for both students and educators",
                  ]}
                  technologies={["AI/ML", "EdTech", "LMS"]}
                  links={[
                    { label: "Project Website", url: "/projects/GenEd", icon: <ExternalLink className="h-4 w-4" /> },
                    { label: "GitHub Repository", url: "/projects/GenEd", icon: <Github className="h-4 w-4" /> },
                  ]}
                  images={["/images/GenEd.png"]}
                  videos={["/videos/GenEdPrototype.mp4"]}
                  mousePosition={mousePosition}
                />
              </TabsContent>

              <TabsContent value="tasksnipe" className="mt-0">
                <ProjectDetail
                  title="TaskSnipe"
                  subtitle="Team Task Management Platform"
                  date="January 2025 - Present"
                  description={
                    <>
                      <p className="mb-4">
                        TaskSnipe is a comprehensive task management web application built with Next.js, designed to
                        help teams track and manage projects efficiently. The platform features a clean, intuitive
                        interface that makes task organization simple and effective.
                      </p>
                      <p className="mb-4">
                        The application includes authentication via Clerk, ensuring secure access control. Data
                        is stored in a PostgreSQL database, providing reliable and scalable data management. The
                        platform is deployed on Vercel, enabling continuous deployment and excellent performance.
                      </p>
                      <p>
                        One of the standout features of TaskSnipe is its real-time dashboard that visualizes task
                        progress, helping teams identify bottlenecks and track productivity at a glance.
                      </p>
                    </>
                  }
                  challenges={[
                    "Implementing real-time updates across multiple users",
                    "Designing an intuitive task organization system",
                    "Creating effective data visualization for project progress",
                    "Ensuring seamless mobile responsiveness",
                  ]}
                  technologies={["Next.js", "PostgreSQL", "Clerk", "Vercel", "Tailwind CSS", "TypeScript"]}
                  links={[
                    { label: "Live Demo", url: "/Projects/TaskSnipe", icon: <ExternalLink className="h-4 w-4" /> },
                    { label: "GitHub Repository", url: "Projects/TaskSnipe", icon: <Github className="h-4 w-4" /> },
                  ]}
                  images={["/images/TaskSnipe.png", "/images/TaskFigma.png"]}
                  mousePosition={mousePosition}
                />
              </TabsContent>

              <TabsContent value="lepaklah" className="mt-0">
                <ProjectDetail
                  title="LepakLah!"
                  subtitle="AI Senior-Centric Mobile App"
                  date="June 2024 - September 2024"
                  description={
                    <>
                      <p className="mb-4">
                        LepakLah! is a Flutter-based mobile application designed to help seniors at LionBefrienders access activity center
                        slots more efficiently. The project won 3rd Place at Dell InnovateFest 2024, recognizing its
                        innovative approach to addressing the needs of elderly users.
                      </p>
                      <p className="mb-4">
                        The app features a senior-friendly interface with large, clear text and intuitive navigation. It
                        allows users to browse, book, and manage activity slots at community centers, addressing the
                        inefficiencies in the current manual booking systems by focusing on better user experience.
                      </p>
                      <p>
                        A key feature of LepakLah! is its Buddy Matching Algorithm, which uses AI to connect seniors
                        with similar interests, encouraging social interaction and community building among users.
                      </p>
                    
                      <p>
                        Alongside the Buddy Matching Algorithm, an Admin Dashboard was made to steamline operations 
                        in active ageing centers, by providing features like trend detection, as well as AI-integrated activity creation for the elderly.
                      </p>
                    </>
                  }
                  challenges={[
                    "Designing an interface accessible to elderly users",
                    "Developing an effective matching algorithm for buddy connections",
                    "Ensuring robust backend infrastructure with RedHat OpenShift",
                    "Implementing secure user authentication for a vulnerable user group",
                  ]}
                  technologies={["Flutter", "Python", "AI", "Docker", "Kubernetes", "RedHat OpenShift", "Figma"]}
                  links={[
                    { label: "Project Overview", url: "https://www.linkedin.com/in/magenta-ong/details/projects/", icon: <ExternalLink className="h-4 w-4" /> },
                    { label: "GitHub Repository", url: "https://github.com/magentaong/dell-innovatefest-2024", icon: <Github className="h-4 w-4" /> },
                  ]}
                  images={["/images/2025-03-11 13.59.40.jpg"]}
                  videos={["/videos/FigmaPrototype1.mp4"]}
                  mousePosition={mousePosition}
                />
              </TabsContent>

              <TabsContent value="whiskers" className="mt-0">
                <ProjectDetail
                  title="Whiskers"
                  subtitle="Interactive Robo-Cat"
                  date="January 2024 - April 2024"
                  description={
                    <>
                      <p className="mb-4">
                        Whiskers is an innovative interactive robotic cat that combines AI chatbot capabilities with
                        physical robotic responses. The project integrates OpenAI&apos;s GPT models with Whisper for
                        speech-to-text conversion, enabling natural conversation with the robot.
                      </p>
                      <p className="mb-4">
                        The hardware is built around a Raspberry Pi 4, which controls various sensors and actuators to
                        create lifelike movements and responses. The robot can respond to touch, voice, and visual
                        stimuli, creating an engaging and interactive experience. 
                      </p>
                      <p>
                        Whiskers demonstrates the potential of combining conversational AI with robotics to create
                        companions that can provide both entertainment and practical assistance.
                      </p>
                      <p className="mb-4"></p>
                      <p>
                        The aim of Whiskers is to promote interactivity in a site where there&apos;s low engagement but high traffic. We analysed the site and used Design Thinking approach in order to come up with this solution. 
                      </p>
                    </>
                  }
                  challenges={[
                    "Integrating speech recognition in noisy environments",
                    "Optimizing AI model performance on Raspberry Pi hardware",
                    "Designing responsive and natural robotic movements",
                    "Creating a power-efficient system for extended operation",
                  ]}
                  technologies={["OpenAI GPT", "Whisper", "Raspberry Pi", "Python", "Robotics", "Servo Motors"]}
                  links={[
                    {
                      label: "Project Website",
                      url: "https://aliciang999.wixsite.com/my-site-3",
                      icon: <ExternalLink className="h-4 w-4" />,
                    },
                  ]}
                  images={["/images/WhiskersProduct.png"]}
                  videos={["/videos/DTI Group 5_ Whiskers.mp4"]}
                  mousePosition={mousePosition}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

type ProjectSelectorProps = {
  id: string | number;
  title: string;
  subtitle: string;
  active: boolean;
  onClick: () => void;
};

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ id, title, subtitle, active, onClick }) => {
  return (
  

    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
        active
          ? "bg-orange-500/10 border border-orange-500/50"
          : "bg-background/60 border border-orange-500/20 hover:border-orange-500/30 hover:bg-orange-500/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${active ? "text-orange-500" : ""}`}>{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <ChevronRight className={`h-4 w-4 transition-transform ${active ? "rotate-90 text-orange-500" : ""}`} />
      </div>
    </button>
  )
}



type ProjectLink = {
  url: string;
  icon: React.ReactNode;
  label: string;
};

type MousePosition = {
  x: number;
  y: number;
};

type ProjectDetailProps = {
  title: string;
  subtitle: string;
  date: string;
  description: string | React.ReactNode;
  challenges: string[];
  technologies: string[];
  links: ProjectLink[];
  images?: string[];
  videos?: string[];
  mousePosition: MousePosition;
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  subtitle,
  date,
  description,
  challenges,
  technologies,
  links,
  images = [],
  videos = [],
  mousePosition,
}) => {

  
  const [expandedSection, setExpandedSection] = useState<string | null>(null);


  const toggleSection = (section: string) => {

    setExpandedSection(prev => (prev === section ? null : section));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-orange-500">{title}</h2>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
        <p className="text-sm mt-2">{date}</p>
      </div>

      {/* Display Images and Videos Together */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg border border-orange-500/20 bg-muted"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
              transition: "transform 0.2s ease-out",
            }}>
            <Image
              src={image}
              alt={`${title} screenshot ${index + 1}`}
              layout="intrinsic"
              width={600}
              height={300}
              className="w-full h-auto max-h-[400px] object- hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}

        {videos.map((video, index) => (
          <div key={index} className="overflow-hidden rounded-lg border border-orange-500/20 bg-muted">
            <video controls className="w-full h-auto max-h-[300px] object-fit rounded-lg shadow-lg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
        
      </div>
      
      {/* Other content like Challenges, Technologies, Links */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-3">Overview</h3>
          <div className="text-muted-foreground">{description}</div>
        </div>

        <div>
          <button onClick={() => toggleSection("challenges")}
            className="flex items-center justify-between w-full text-left text-xl font-bold mb-3 group">
            <span>Challenges & Solutions</span>
            <ChevronDown
              className={`h-5 w-5 text-orange-500 transition-transform duration-300 ${expandedSection === "challenges" ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSection === "challenges" && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
              {challenges.map((challenge: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | MotionValue<number> | MotionValue<string> | null | undefined, index: any| null | undefined) => (
                <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                  {challenge}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
              <Badge key={index} className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 px-3 py-1 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3">Project Links</h3>
          <div className="flex flex-wrap gap-3">
            {links.map((link: { url: string | UrlObject; icon: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; label: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined }, index: Key | null | undefined) => (
              <Button key={index} asChild variant="outline" className="border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/5">
                <Link href={link.url} target="_blank" className="flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


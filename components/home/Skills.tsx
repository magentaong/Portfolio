"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { skillData } from "@/data/skills"
import { timelineData, TimelineEntry } from "@/data/timeline"

type Props = {
  sectionRef: React.RefObject<HTMLElement>
}

export default function Skills({ sectionRef }: Props) {
  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 bg-muted/30 relative z-10 gradient-bg"
    >
      <div className="container px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Skills & <span className="text-orange-500">Technologies</span>
          </h2>
          <p className="mb-8 text-muted-foreground md:text-xl">My technical toolkit and areas of expertise</p>
        </div>

        <Tabs defaultValue="languages" className="mx-auto max-w-4xl">
          <TabsList className="grid w-full  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
          {(Object.entries(skillData) as [keyof typeof skillData, string[]][]).map(([key, skills]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                {skills.map((s) => <SkillTag key={s} name={s} />)}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Experience Timeline</h3>
          <div className="space-y-8">
            {timelineData.map((t: TimelineEntry) => <TimelineItem key={t.title} {...t} />)}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function TimelineItem({ date, title, company, description }: TimelineEntry) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-orange-500/30 last:border-0 last:pb-0 group px-"
    >
      <div className="absolute left-0 top-0 flex items-center justify-center -translate-x-1/2 rounded-full bg-orange-500 p-1 group-hover:scale-125 transition-transform">
        <div className="h-2 w-2 rounded-full bg-background" />
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

type SkillTagProps = { name: string }

function SkillTag({ name }: SkillTagProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="group relative overflow-hidden rounded-lg border border-orange-500/20 bg-background/60 backdrop-blur-sm p-4 transition-all duration-300 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/10"
    >
      <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h4 className="font-medium group-hover:text-orange-500 transition-colors">{name}</h4>
    </motion.div>
  )
}
"use client"

import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { aboutCards, leadershipData, educationData, AboutCard } from "@/data/about"

const iconMap = {
  education: <BookOpen className="h-5 w-5 text-orange-500" />,
  experience: <Briefcase className="h-5 w-5 text-orange-500" />,
  leadership: <Award className="h-5 w-5 text-orange-500" />,
}

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 bg-muted/30 relative z-10 gradient-bg"
    >
      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            About <span className="text-orange-500">Me</span>
          </h2>
          <p className="mb-8 text-muted-foreground md:text-xl">
            Computer Science and Design student at Singapore University of Technology and Design (SUTD)
          </p>
        </div>

        {/* Top cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card: AboutCard, i: number) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={card.extra}
            >
              <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 hover:border-orange-500/50 transition-all interactive-hover">
                <CardContent className="p-6 min-h-[180px]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">
                    {iconMap[card.icon]}
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="mt-2 text-muted-foreground">{card.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Leadership + Education */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all group"
          >
            <h3 className="text-2xl font-bold mb-6 group-hover:text-orange-500 transition-colors">Leadership Experience</h3>
            <div className="space-y-4">
              {leadershipData.map(({ title, date, description }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 mt-1">
                    <Award className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{title}</h4>
                    <p className="text-sm text-muted-foreground">{date}</p>
                    <p className="mt-1">{description}</p>
                  </div>
                </div>
              ))}
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
            {educationData.map(({ school, date, degree, badges }) => (
              <div key={school} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 mt-1">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{school}</h4>
                  <p className="text-sm text-muted-foreground">{date}</p>
                  <p className="mt-1">{degree}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {badges.map((b) => (
                      <Badge key={b} className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">{b}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

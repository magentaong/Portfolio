"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";

type Props = {
  sectionRef: React.RefObject<HTMLElement>;
};

export default function Projects({ sectionRef }: Props) {
  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-20 relative z-10"
    >
      <div className="container px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            My <span className="text-orange-500">Work</span>
          </h2>
          <p className="mb-8 text-muted-foreground md:text-xl">
            A showcase of my recent work and ongoing projects
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto w-fit">
            {projects.slice(0, 6).map((p: Project, index: number) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <ProjectCard
                  title={p.title}
                  subtitle={p.subtitle}
                  description={p.cardDescription ?? p.description[0]}
                  image={p.cardImage ?? p.images?.[0] ?? "/placeholder.svg"}
                  link={p.cardLink ?? "/projects"}
                  tags={p.cardTags ?? p.technologies}
                  date={p.date}
                  slug={p.slug}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="relative overflow-hidden group">
            <Link href="/projects">
              <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 group-hover:w-full" />
              <span className="relative flex items-center">
                View More Work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

type ProjectCardProps = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  date: string;
  slug: string;
};

function ProjectCard({
  title,
  subtitle,
  description,
  image,
  link,
  tags,
  date,
  slug,
}: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden bg-background/80 border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 h-full">
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
              <Badge
                key={tag}
                variant="secondary"
                className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
              >
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
              <Link href={`/projects?active=${slug}`}>
                Details
                <ChevronRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

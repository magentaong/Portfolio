"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Mail, Linkedin, Download, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTypewriter, Cursor } from "react-simple-typewriter";

type Props = {
  onViewWork: () => void;
  mousePosition: { x: number; y: number };
};

const springPop = {
  hidden: { opacity: 0, scale: 0.88, y: 32 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

const cardPop = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.82, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 20, delay },
  },
});

export default function Hero({ onViewWork, mousePosition }: Props) {
  const [text] = useTypewriter({
    words: [
      "Backend Software Engineer Intern",
      "Full-stack Builder",
      "Bug Finder",
      "Side Quest Enjoyer",
    ],
    loop: true,
    delaySpeed: 200,
  });

  return (
    <section className="relative overflow-hidden py-20 md:py-32 flex items-center min-h-[90vh]">
      <div className="container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left: text content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="inline-block rounded-lg bg-muted px-3 py-1 text-sm"
            >
              Computer Science & Design Student
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
            >
              Hi, I&apos;m <span className="text-orange-500">Magenta Ong</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-[600px] text-xl text-muted-foreground h-8"
            >
              <span>{text}</span>
              <Cursor cursorColor="#f97316" />
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="max-w-[560px] text-muted-foreground leading-relaxed"
            >
              I like creating things that makes my life and others just a tad
              bit easier.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.36 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="relative z-10 overflow-hidden group"
              >
                <Link href="/Resume_Summer_2026.pdf" target="_blank" download>
                  <span className="absolute inset-0 w-0 h-full bg-orange-600 transition-all duration-300 group-hover:w-full" />
                  <span className="relative flex items-center">
                    <Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Resume
                  </span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onViewWork}
                className="relative z-10 overflow-hidden group"
              >
                <span className="absolute inset-0 w-0 h-full bg-orange-500 opacity-10 transition-all duration-300 group-hover:w-full" />
                <span className="relative flex items-center">
                  View My Work
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.44 }}
              className="flex gap-4"
            >
              <Link
                href="https://github.com/magentaong"
                target="_blank"
                className="text-muted-foreground hover:text-orange-500 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/magenta-ong"
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
          </div>

          {/* Right: card with splash pop */}
          <motion.div
            variants={springPop}
            initial="hidden"
            animate="show"
            className="relative mx-auto w-full max-w-lg"
            style={{
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) rotate(${mousePosition.x * 2}deg)`,
              transition: "transform 0.12s ease-out",
            }}
          >
            <div className="relative rounded-3xl border border-orange-500/30 bg-background/90 p-4 shadow-xl shadow-orange-500/10 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Current builds
                  </p>
                  <h2 className="text-2xl font-bold">Obby & TaskSnipe</h2>
                </div>
                <span className="rounded-full border border-orange-500/30 px-3 py-1 text-xs text-orange-500">
                  in progress
                </span>
              </div>

              <div className="grid items-stretch gap-3 sm:grid-cols-2">
                {/* Obby card */}
                <motion.div
                  variants={cardPop(0.18)}
                  initial="hidden"
                  animate="show"
                  className="h-full"
                >
                  <Link
                    href="https://github.com/magentaong/obby"
                    target="_blank"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-500/20 bg-muted transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/60"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">
                      <video
                        src="/videos/miniprojects/Obby.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col bg-background/95 p-5">
                      <p className="mb-2 text-xs uppercase tracking-wide text-orange-500">
                        Obby
                      </p>
                      <h3 className="text-xl font-bold">
                        Markdown notes into TODOs
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        A Python CLI side quest for productivity in turning
                        TODOs across messy notes into tasks.
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-4">
                        {["Python", "CLI", "Local LLMs"].map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* TaskSnipe card */}
                <motion.div
                  variants={cardPop(0.28)}
                  initial="hidden"
                  animate="show"
                  className="h-full"
                >
                  <Link
                    href="/projects?active=tasksnipe"
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-orange-500/20 bg-muted transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/60"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">
                      <Image
                        src="/images/TaskSnipe.png"
                        alt="TaskSnipe project preview"
                        width={640}
                        height={480}
                        priority
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col bg-background/95 p-5">
                      <p className="mb-2 text-xs uppercase tracking-wide text-orange-500">
                        TaskSnipe
                      </p>
                      <h3 className="text-xl font-bold">Team task tracking</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Currently refactoring and migrating from Javascript to
                        Go backend.
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </div>

              <div className="mt-4 flex flex-col gap-1 border-t border-orange-500/20 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground">
                  Current:{" "}
                  <span className="font-medium text-foreground">
                    foodpanda backend intern
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Building next:{" "}
                  <span className="font-medium text-foreground">
                    Obby + TaskSnipe
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

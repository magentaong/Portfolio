"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Github, Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/ContactForm"

type Props = {
  sectionRef: React.RefObject<HTMLElement>
}

export default function Contact({ sectionRef }: Props) {
  return (
    <motion.section
      ref={sectionRef}
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
          <p className="mb-8 text-muted-foreground md:text-xl">I&apos;m always open to new opportunities and collaborations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <Card className="bg-background/60 backdrop-blur-sm border-orange-500/20 interactive-hover">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Mail className="h-5 w-5 text-orange-500" />, label: "Email", value: "ongmagenta@gmail.com" },
                    { icon: <Linkedin className="h-5 w-5 text-orange-500" />, label: "LinkedIn", value: "magenta-ong" },
                    { icon: <Github className="h-5 w-5 text-orange-500" />, label: "GitHub", value: "magentaong" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10">{icon}</div>
                      <div>
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="lg" className="rounded-full group overflow-hidden">
                      <Link href="https://github.com/magentaong" target="_blank">
                        <span className="absolute inset-0 w-0 h-full bg-orange-500/10 transition-all duration-300 group-hover:w-full" />
                        <span className="relative flex items-center"><Github className="mr-2 h-5 w-5 group-hover:text-orange-500 transition-colors" />GitHub</span>
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full group overflow-hidden">
                      <Link href="https://www.linkedin.com/in/magenta-ong" target="_blank">
                        <span className="absolute inset-0 w-0 h-full bg-orange-500/10 transition-all duration-300 group-hover:w-full" />
                        <span className="relative flex items-center"><Linkedin className="mr-2 h-5 w-5 group-hover:text-orange-500 transition-colors" />LinkedIn</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
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
  )
}
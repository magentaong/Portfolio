export type MiniProject = {
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
  date: string
  video: string
  status: "complete" | "in-progress" | "abandoned" 
  learned?: string[]
}
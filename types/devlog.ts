export type DevLogEntry = {
  id: string
  date: string
  title: string
  body: string
  project?: string
  tags?: string[]
  mood: "good" | "stuck" | "breakthrough" | "grind"
}
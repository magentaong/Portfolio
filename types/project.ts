export type ProjectLink = {
  label: string
  url: string
  icon?: "github" | "external"
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  description: string[]
  date: string
  technologies: string[]
  images?: string[]
  videos?: string[]
  challenges?: string[]
  links?: ProjectLink[]
  cardImage?: string
  cardDescription?: string
  cardTags?: string[]
  cardLink?: string
}
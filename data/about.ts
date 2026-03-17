export type LeadershipEntry = {
  title: string
  date: string
  description: string
}

export type EducationEntry = {
  school: string
  date: string
  degree: string
  badges: string[]
}

export type AboutCard = {
  icon: "education" | "experience" | "leadership"
  title: string
  text: string
  extra?: string
}

export const aboutCards: AboutCard[] = [
  {
    icon: "education",
    title: "Education",
    text: "B.Eng. in Computer Science and Design at Singapore University of Technology and Design (2023-2027)",
    extra: "",
  },
  {
    icon: "experience",
    title: "Experience",
    text: "Software Engineer People's Association,  GenEd, CPF Board",
    extra: "",
  },
  {
    icon: "leadership",
    title: "Leadership",
    text: "House Guardian Senator (EXCO) and Housing Representative (SAC)",
    extra: "md:col-span-2 lg:col-span-1",
  },
]

export const leadershipData: LeadershipEntry[] = [
  {
    title: "House Guardian Senator (EXCO) & Housing Representative (SAC)",
    date: "2024 - 2026",
    description: "Served on a 6-member executive committee responsible for leading and coordinating activities for a 50-member organisation. Took care of the welfare of 1100+ residents in hostel. Represented student body regarding housing issues.",
  },
  {
    title: "Vice Chairperson (Junior College)",
    date: "2021 - 2022",
    description: "Coordinated service-learning projects and enhanced classroom spirit. Awarded Class Service Award for outstanding leadership contributions.",
  },
]

export const educationData: EducationEntry[] = [
  {
    school: "Singapore University of Technology and Design",
    date: "2023 - 2027",
    degree: "B.Eng. in Computer Science and Design",
    badges: ["Computer Science", "Design", "Engineering"],
  },
]
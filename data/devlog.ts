import { DevLogEntry } from "@/types/devlog"

export const devLogEntries: DevLogEntry[] = [
  {
    id: "001",
    date: "March 17, 2026",
    title: "Added barcode scanning to isItVegetarian?",
    body: "Started out my afternoon by finishing up the weekend project, yes its Tuesday so its not really a weekend project anymore, but I managed to finish and deploy it so it works on mobile! Next weekend (hopefully) it'll be time to add feedback and adding of food items to OpenFoodFacts",
    project: "isItVegetarian",
    tags: ["React", "TypeScript"],
    mood: "good",
  },
  {
    id: "002",
    date: "March 17, 2026",
    title: "Refactored the entire portfolio",
    body: "Spent the day finally getting rid of my 1400++ line page.tsx by refactoring them into proper components. Also extracted all hardcoded data into data/ files so I never have to touch component files just to update content yayy!! This took forever, and should've been done wayy earlier, past me was insane for writing the code all in one page T^T. Also I added devlogs and mini projects yay!! FUTURE ME: ADD BLOG AND PHOTO(?) SECTIONN",
    project: "Portfolio",
    tags: ["Next.js", "TypeScript", "Refactor"],
    mood: "grind",
  },
]
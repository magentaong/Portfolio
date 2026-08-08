import type { MiniProject, MiniProjectsPageConfig } from "@/types/miniprojects";

export const miniProjectsPage = {
  pathname: "/miniprojects",
  backLink: { label: "Back to small things", href: "/#small-projects" },
  eyebrow: "Experiments / 2023—now",
  titleLines: ["Mini", "projects"],
  introduction:
    "Small builds, weekend experiments, and things I don’t think are full projects. Some are genuinely beginner stuff, some have hidden gems, and a few may get picked up again when I feel like it. Also forgive the cringe (if any).",
  metadata: {
    title: "Mini Projects | Magenta Ong",
    description:
      "Small builds, experiments, games, and learning projects I've done.",
  },
  indexLabel: "Project index",
  filterLabel: "Filter by tool",
  allFilterLabel: "Everything",
  shuffleLabel: "Shuffle order",
  learnedLabel: "What this taught me",
  emptyState: "Nothing in that filter yet.",
  resultSingular: "project shown",
  resultPlural: "projects shown",
  shuffledStatus: "Project order shuffled.",
  statusLabels: {
    complete: "Done",
    "in-progress": "Still working on it",
    abandoned: "Left alone",
  },
} satisfies MiniProjectsPageConfig;

export const miniProjects: MiniProject[] = [
  {
    slug: "movie-maybe",
    title: "Movie Maybe?",
    description:
      "A responsive movie search app with live trending data, debounce-optimised search, infinite loading, and Appwrite integration. I built this while following JavaScript Mastery on YouTube, then used it to understand how API-heavy React apps stay responsive.",
    tags: ["React", "Appwrite", "Vite", "TailwindCSS"],
    links: [
      {
        id: "movie-maybe-live",
        label: "Use Movie Maybe",
        href: "https://magentaong.github.io/MovieMaybe",
        target: "blank",
      },
    ],
    date: "Feb 2025",
    image: "/images/miniprojects/MovieMaybe.png",
    imageAlt: "Movie Maybe search results showing trending films",
    mediaFit: "contain",
    presentation: { mediaSide: "left" },
    video: "/videos/miniprojects/moviemaybe.mp4",
    status: "complete",
    learned: [
      "Debounce stopped being an abstract optimisation once every keystroke was hitting the movie API.",
      "Appwrite was enough backend for the small amount of data this app actually needed.",
      "Infinite loading made me think about empty, loading, and failed states instead of only the happy path.",
    ],
  },
  {
    slug: "is-it-vegetarian",
    title: "Is It Vegetarian?",
    description:
      "A small React app that uses the OpenFoodFacts API and barcode scanning to check whether a food product is vegan, vegetarian, sattvic vegetarian, or neither.",
    tags: ["React", "Vite", "TailwindCSS", "OpenFoodFacts API"],
    links: [
      {
        id: "is-it-vegetarian-live",
        label: "Try the scanner",
        href: "https://magentaong.github.io/isItVegetarian/",
        target: "blank",
      },
    ],
    date: "Mar 2026",
    image: "/images/miniprojects/isitvegetarian.png",
    imageAlt: "Is It Vegetarian result for a scanned food product",
    mediaFit: "contain",
    presentation: { mediaSide: "right" },
    video: "/videos/miniprojects/isitvegetarian.mp4",
    status: "complete",
    learned: [
      "OpenFoodFacts is useful, but the ingredient data can be incomplete or super inconsistent, if I want this to be useful I'll have to likely include the contributing to OpenFoodFacts API in the app itself..",
      "Camera permissions and barcode scanning behave differently enough on mobile to deserve real-device testing.",
      "A confident wrong answer is bad, we don't want that.",
      "OpenFoodFacts is not that useful for common Singapore products..to expand this I'll likely have to look into how apps like My Fitness Pal does it.",
    ],
  },
  {
    slug: "calculator",
    title: "Calculator",
    description:
      "A vanilla HTML, CSS, and JavaScript calculator from when I was just starting out. Tiny project, but it made DOM events feel less abstract.",
    tags: ["HTML", "CSS", "JS"],
    links: [
      {
        id: "calculator-live",
        label: "Visit the build",
        href: "https://magentaong.github.io",
        target: "blank",
      },
    ],
    date: "Apr 2024",
    image: "/images/miniprojects/calculator.jpg",
    imageAlt: "Browser calculator interface",
    presentation: { mediaSide: "left" },
    video: "/videos/miniprojects/Calculator.mp4",
    status: "complete",
    learned: [
      "The DOM stopped feeling theoretical once every calculator button had to update one shared display.",
    ],
  },
  {
    slug: "fragments-of-you",
    title: "Fragments Of You",
    description:
      "A simple point-and-click visual novel inspired by Yoko Ogawa's The Housekeeper and the Professor. It explores memory, identity, and what people leave behind.",
    tags: ["Godot"],
    links: [
      {
        id: "fragments-of-you-live",
        label: "Play on itch.io",
        href: "https://magentaong.itch.io/fragments",
        target: "blank",
      },
    ],
    date: "Oct 2025",
    image: "/images/miniprojects/fragments-of-you.jpg",
    imageAlt: "A room from the Fragments Of You visual novel",
    presentation: { mediaSide: "right" },
    video: "/videos/miniprojects/Frags.mp4",
    status: "complete",
    learned: [
      "Godot scenes clicked once I treated each room and day as a piece I could swap instead of one giant level.",
      "Area2D signals kept the point-and-click interactions much less tangled than checking everything manually.",
      "I somehow.. didn't manage to resize the Area2D properly to different screen sizes? Which I think fked up the game a bit..",
    ],
  },
  {
    slug: "custom-shell",
    title: "Customising my own shell",
    description:
      "Learnt enough shell scripting to add folder:branch formatting to my terminal prompt and a commitlog helper that shows the latest 5 git commits.",
    tags: ["Shell", "Bash", "Git"],
    links: [
      {
        id: "custom-shell-source",
        label: "Read the shell scripts",
        href: "https://github.com/magentaong/MyOwnShell",
        target: "blank",
      },
    ],
    date: "May 2025",
    image: "/images/miniprojects/custom-shell.jpg",
    imageAlt: "A terminal showing the custom prompt and commitlog helper",
    mediaFit: "contain",
    presentation: { mediaSide: "left" },
    video: "/videos/miniprojects/shell.mp4",
    status: "complete",
    learned: [
      "Customizing the shell prompt using PS1 to display directory and Git branch information",
      "Writing shell functions and aliases to automate git-related tasks",
      "Using basic Bash scripting techniques such as variables and command substitution",
    ],
  },
  {
    slug: "naruto-landing-page",
    title: "Naruto Landing Page",
    description:
      "Back when I had just learnt CSS and decided to make a landing page for Naruto. Looking back at it is humbling, but in a good way.",
    tags: ["CSS", "HTML"],
    links: [
      {
        id: "naruto-source",
        label: "See my early code",
        href: "https://github.com/magentaong/",
        target: "blank",
      },
    ],
    date: "Dec 2023",
    image: "/images/NarutoLandingPage.png",
    imageAlt:
      "The Naruto landing page with a character illustration and orange navigation",
    presentation: { mediaSide: "right" },
    video: "/videos/miniprojects/Naruto.mp4",
    status: "complete",
    learned: [
      "Responsive CSS, difference between class and ID selector",
      "3D transform styles and CSS gradients",
      "I learnt a lot of CSS here.",
    ],
  },
  {
    slug: "flip-it",
    title: "Flip It!",
    description:
      "Press the button to flip the bottle. That’s literally it. I made this to learn useState and useEffect; it was one of my first React and Tailwind projects.",
    tags: ["React", "Tailwind"],
    links: [
      {
        id: "flip-it-live",
        label: "Flip a bottle",
        href: "https://magentaong.github.io/flipit/",
        target: "blank",
      },
    ],
    date: "Apr 2024",
    image: "/images/miniprojects/flip-it.jpg",
    imageAlt: "A bottle mid-flip in the Flip It interface",
    presentation: { mediaSide: "left" },
    video: "/videos/miniprojects/flipit.mp4",
    status: "complete",
    learned: [
      "Understanding when to use inline styles vs Tailwind classes for animations",
      "Managing time-based animations using useEffect and intervals",
      "React state and event handling",
      "I'm realising that I might not enjoy CSS as much as I used to.. cause I tend to forget it quite often T^T",
    ],
  },
  {
    slug: "obby",
    title: "Obby",
    description:
      "A Python CLI that reads markdown notes and turns them into a TODO list. I started it while exploring MCP servers and local LLMs, then kept making it more deterministic because I did not want the LLM to be the first tool for every tiny task.",
    tags: ["Python", "CLI"],
    links: [
      {
        id: "obby-source",
        label: "Read the Obby source",
        href: "https://github.com/magentaong/obby",
        target: "blank",
      },
    ],
    date: "Jun 2026",
    image: "/images/miniprojects/obby.jpg",
    imageAlt: "Obby turning markdown notes into tasks in a terminal",
    mediaFit: "contain",
    presentation: { mediaSide: "right" },
    video: "/videos/miniprojects/Obby.mp4",
    status: "in-progress",
    learned: [
      "Python CLI tooling and file parsing",
      "Designing deterministic task extraction before using LLM fallback",
      "Exploring local LLMs and MCP server ideas",
    ],
  },
];

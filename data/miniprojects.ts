import { MiniProject } from "@/types/miniprojects";

export const miniProjects: MiniProject[] = [
  {
    title: "Movie Maybe?",
    description:
      "A responsive movie search app with live trending data, debounce-optimised search, infinite loading, and Appwrite integration. I built this while following JavaScript Mastery on YouTube, then used it to understand how API-heavy React apps stay responsive.",
    tags: ["React", "Appwrite", "Vite", "TailwindCSS"],
    github: "https://magentaong.github.io/MovieMaybe",
    date: "Feb 2025",
    video: "/videos/miniprojects/moviemaybe.mp4",
    status: "complete",
    learned: [
      "React Hooks, useState, useEffect for dynamic UI and lifecycle logic",
      "Appwrite integration as a simple backend to store and retrieve data",
      "Debounce optimisation from react-use to reduce API calls while typing",
      "API Handling, including pagination",
    ],
  },
  {
    title: "Is It Vegetarian?",
    description:
      "A small React app that uses the OpenFoodFacts API and barcode scanning to check whether a food product is vegan, vegetarian, sattvic vegetarian, or neither.",
    tags: ["React", "Vite", "TailwindCSS", "OpenFoodFacts API"],
    github: "https://magentaong.github.io/isItVegetarian/",
    date: "Mar 2026",
    video: "/videos/miniprojects/isitvegetarian.mov",
    status: "complete",
    learned: [
      "Working with third-party APIs (OpenFoodFacts)",
      "Implementing barcode scanning in a web app",
      "Handling incomplete or inconsistent API food data",
    ],
  },
  {
    title: "Calculator",
    description:
      "A vanilla HTML, CSS, and JavaScript calculator from when I was just starting out. Tiny project, but it made DOM events feel less abstract.",
    tags: ["HTML", "CSS", "JS"],
    github: "https://magentaong.github.io",
    date: "Apr 2024",
    video: "/videos/miniprojects/Calculator.mp4",
    status: "complete",
    learned: ["DOM manipulation, Event Handling, and CSS Styling."],
  },
  {
    title: "Fragments Of You",
    description:
      "A simple point-and-click visual novel inspired by Yoko Ogawa's The Housekeeper and the Professor. It explores memory, identity, and what people leave behind.",
    tags: ["Godot"],
    github: "https://magentaong.itch.io/fragments",
    date: "Oct 2025",
    video: "/videos/miniprojects/Frags.mp4",
    status: "complete",
    learned: [
      "Structuring scenes and nodes using Godot's scenes",
      "Implementing point-and-click interactions with Area2D and signals",
      "Handling scene transitions and state progression between each day",
    ],
  },
  {
    title: "Customising my own shell",
    description:
      "Learnt enough shell scripting to add folder:branch formatting to my terminal prompt and a commitlog helper that shows the latest 5 git commits.",
    tags: ["Shell", "Bash", "Git"],
    github: "https://github.com/magentaong/MyOwnShell",
    date: "May 2025",
    video: "/videos/miniprojects/shell.mov",
    status: "complete",
    learned: [
      "Customizing the shell prompt using PS1 to display directory and Git branch information",
      "Writing shell functions and aliases to automate git-related tasks",
      "Using basic Bash scripting techniques such as variables and command substitution",
    ],
  },
  {
    title: "Naruto Landing Page",
    description:
      "Back when I had just learnt CSS and decided to make a landing page for Naruto. Looking back at it is humbling, but in a good way.",
    tags: ["CSS", "HTML"],
    github: "https://github.com/magentaong/",
    date: "Dec 2023",
    video: "/videos/miniprojects/Naruto.mp4",
    status: "complete",
    learned: [
      "Responsive CSS, difference between class and ID selector",
      "3D transform styles and CSS gradients",
      "I learnt a lot of CSS here.",
    ],
  },
  {
    title: "Flip It!",
    description:
      "Press the button to flip the bottle.. that's literally it. Did this to learn useState and useEffect, one of the first few react and tailwind projects I've done. You can try it out in the github link, linked to the mini icon above^^.",
    tags: ["React", "Tailwind"],
    github: "https://magentaong.github.io/flipit/",
    date: "Apr 2024",
    video: "/videos/miniprojects/flipit.mp4",
    status: "complete",
    learned: [
      "Understanding when to use inline styles vs Tailwind classes for animations",
      "Managing time-based animations using useEffect and intervals",
      "React state and event handling",
    ],
  },
  {
    title: "Obby",
    description:
      "A Python CLI that reads markdown notes and turns them into a TODO list. I started it while exploring MCP servers and local LLMs, then kept making it more deterministic because I did not want the LLM to be the first tool for every tiny task.",
    tags: ["Python", "CLI"],
    github: "https://github.com/magentaong/obby",
    date: "June 2026",
    video: "/videos/miniprojects/Obby.mp4",
    status: "in-progress",
    learned: [
      "Python CLI tooling and file parsing",
      "Designing deterministic task extraction before using LLM fallback",
      "Exploring local LLMs and MCP server ideas",
    ],
  },
];

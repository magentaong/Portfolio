import { MiniProject } from "@/types/miniprojects"

export const miniProjects: MiniProject[] = [
  {
    title: "Movie Maybe?",
    description: "A responsive movie searching app with live trending data, debounce-optimised search, infinite loading, and Appwrite integration, built with React + Vite + TMDb + Appwrite. Movie Maybe? Built following JavaScriptMastery on Youtube.",
    tags: ["React", "Appwrite", "Vite", "TailwindCSS"],
    github: "magentaong.github.io/MovieMaybe",
    date: "Feb 2025",
    video: "/videos/miniprojects/moviemaybe.mov",
    status: "complete",
    learned: [
      "React Hooks, useState, useEffect for dynamic UI and lifecycle logic",
      "Appwrite integration as a simple backend to store and retrieve data",
      "Debounce optimisation from react-use to reduce API calls while typing",
      "API Handling, including pagination"
    ],
  },
  {
    title: "Is It Vegetarian?",
    description: "A simple react based app that uses OpenFoodFacts's free API which allows users to scan barcodes of a food product to find out if it is vegan, vegetarian, sattvic vegetarian or not ",
    tags: ["React", "Vite", "TailwindCSS", "OpenFoodFacts API"],
    github: "magentaong.github.io/isitvegetarian",
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
    description: "Vanilla HTML, CSS and JS when I was just starting out, made a simple calculator webapp.",
    tags: ["HTML", "CSS", "JS"],
    github: "magentaong.github.io",
    date: "Apr 2024",
    video: "/videos/miniprojects/calculator.mp4",
    status: "complete",
    learned: [
      "Working with third-party APIs (OpenFoodFacts)",
    "Implementing barcode scanning in a web app",
    "Handling incomplete or inconsistent API food data",   
    ],
  },
{
    title: "Fragments Of You",
    description: "Very very simple point and click game, inspired by the Classic Japanese Literature story: The Housekeeper and the Professor by Yoko Ogawa, Fragments of You is a visual novel, mystery solving game which explores the memory, identity, and what's left behind of others.  ",
    tags: ["Godot"],
    github: "https://magentaong.itch.io/fragments",
    date: "Oct 2025",
    video: "/videos/miniprojects/frags.mp4",
    status: "complete",
    learned: [
    "Structuring scenes and nodes using Godot's scenes",
    "Implementing point-and-click interactions with Area2D and signals",
    "Handling scene transitions and state progression between each day",
    ]
  },
  {
    title: "Customising my own shell",
    description: "Learnt a bit of shell scripting to implement folder:branch format in my terminal prompt, and commitlog to show latest 5 git commits",
    tags: ["Shell", "Bash", "Git"],
    github: "https://github.com/magentaong/MyOwnShell",
    date: "May 2025",
    video: "/videos/miniprojects/shell.mov",
    status: "complete",
    learned: [
    "Customizing the shell prompt using PS1 to display directory and Git branch information",
    "Writing shell functions and aliases to automate git related stuffs",
    "Using basic Bash scripting techniques such as variables and command substitution"
  ]
  },
  {
    title: "Naruto Landing Page",
    description: "Back when i just learnt CSS and decided to make a landing page for Naruto... holy",
    tags: ["CSS", "HTML"],
    github: "https://github.com/magentaong/",
    date: "Dec 2023",
    video: "/videos/miniprojects/naruto.mp4",
    status: "complete",
    learned: [
    "Responsive CSS, difference between class and ID selector", 
    "3D Tranformation style, and gradients for CSS",
    "I learnt a lot of CSS here."
  ]
  },
]
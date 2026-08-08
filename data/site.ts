import type {
  ClipboardControlCopy,
  PointerCompanionConfig,
} from "@/types/site";

export const siteData = {
  brand: "Magenta Ong",
  email: "ongmagenta@gmail.com",
  metadata: {
    title: "Magenta Ong | Portfolio",
    description:
      "Magenta Ong is a software engineer and Computer Science and Design student at SUTD.",
    keywords:
      "Software Engineer, Backend Software Engineer, Magenta Ong, Web Development, Next.js Portfolio",
    siteUrl: "https://magentaong.vercel.app",
    siteName: "Magenta Ong Portfolio",
  },
  homeNavigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Notes", href: "#notes" },
    { label: "Experience", href: "#experience" },
  ],
  archiveNavigation: [
    { label: "Projects", href: "/projects" },
    { label: "Small things", href: "/miniprojects" },
    { label: "Photos", href: "/photos" },
    { label: "Devlog", href: "/devlog" },
  ],
  links: {
    home: { label: "Home", href: "/" },
    projectArchive: {
      label: "More of what I made",
      href: "/#more-of-what-i-made",
    },
    resume: { label: "Resume", href: "/Resume_2027.pdf" },
    github: { label: "GitHub", href: "https://github.com/magentaong" },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/magenta-ong",
    },
  },
  accessibility: {
    skipToContent: "Skip to content",
    toggleTheme: "Toggle colour theme",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    archiveNavigation: "Archive navigation",
  },
  accentPreference: {
    controlLabel: "politically correct mode",
    defaultCompactLabel: "magenta?",
    activeCompactLabel: "orange?",
    defaultNote:
      "for the people that think it should be magenta.. i like orange so it’s orange.",
    activeNote: "tsk fine. it’s magenta now.",
    storageKey: "folio-accent-preference",
  },
  pointerCompanion: {
    label: "Cat + fish",
    showLabel: "wake them up",
    hideLabel: "let them nap",
    compactLabel: "cat?",
    hint: "Click the cat to make it sit. Click again and it follows the fish.",
    catControlLabel: "Toggle whether the cat follows the fish cursor",
    storageKey: "folio-pointer-companion",
    defaultEnabled: true,
    catSrc: "/images/ghost.png",
    fishSrc: "/images/FishCursor.PNG",
  } satisfies PointerCompanionConfig,
  emailCopy: {
    controlLabel: "Copy email address",
    hintLabel: "copy",
    successLabel: "copied :)",
    failureLabel: "couldn’t copy",
    successAnnouncement: "Email address copied.",
    failureAnnouncement: "Couldn’t copy the email address.",
  } satisfies ClipboardControlCopy,
  archiveIdentity: {
    label: "more of what I made",
    homeLabel: "Homepage summary",
  },
  footer: {
    note: "Computer Science and Design at SUTD",
  },
  notFound: {
    code: "404",
    eyebrow: "Wrong Site",
    title: "Nothing lives here.",
    body: "The link is either old or doesn't exist",
    homeLabel: "Back home",
    archiveLabel: "Browse the work",
  },
} as const;

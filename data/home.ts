export type HomeContent = {
  hero: {
    eyebrow: string;
    name: {
      boxed: string;
      remainder: string;
      secondLine: string;
    };
    summary: string;
    currentProjectLabel: string;
    currentMiniProjectLabel: string;
    currentMiniProjectNote: string;
    latestNoteLabel: string;
    readNoteLabel: string;
    keepScrollingLabel: string;
  };
  introduction: {
    eyebrow: string;
    headline: string;
    body: string;
    image: string;
    imageAlt: string;
    imagePosition: string;
    imageCaption: [string, string];
    photoCat: {
      controlLabel: string;
      visibleLabel: string;
    };
    facts: {
      label: string;
      value: string;
    }[];
  };
  archiveBridge: {
    eyebrow: string;
    title: string;
    body: string;
    linkLead: string;
  };
  currentBuilds: {
    miniProjectSlug: string;
  };
  work: {
    title: string;
    introduction: string;
    detailsLabel: string;
    archiveLabel: string;
    viewProjectLabel: string;
  };
  miniProjectSlugs: string[];
  miniProjects: {
    eyebrow: string;
    title: string;
    shuffleLabel: string;
    shuffledStatusLead: string;
    archiveLabel: string;
  };
  featuredDevlogId: string;
  devlog: {
    eyebrow: string;
    title: string;
    archiveLabel: string;
    continueLabel: string;
    noteFallback: string;
  };
  experienceImage: string;
  featuredExperienceIds: string[];
  experience: {
    eyebrow: string;
    title: string;
    imageAlt: string;
    imageCaption: [string, string];
    experienceLabel: string;
    timelineLabel: string;
    skillLabels: {
      languages: string;
      frontend: string;
      backend: string;
      tools: string;
    };
  };
  contact: {
    eyebrow: string;
    title: string;
  };
};

export const homeContent = {
  hero: {
    eyebrow: "Software engineer · Singapore",
    name: {
      boxed: "Mag",
      remainder: "enta",
      secondLine: "Ong",
    },
    summary:
      "Computer Science and Design student at SUTD. Currently working on backend systems at foodpanda.",
    currentProjectLabel: "Current build",
    currentMiniProjectLabel: "Small tool, ongoing",
    currentMiniProjectNote: "Python",
    latestNoteLabel: "Latest note",
    readNoteLabel: "Read note",
    keepScrollingLabel: "Keep scrolling",
  },
  introduction: {
    eyebrow: "Computer Science and Design student at SUTD",
    headline: "I like computers and design.",
    body: 'Computers more than design though. Right now I’m working on backend systems at foodpanda. Outside work, I build mini tools that makes my life a tad bit easier. I also enjoy reading a lot, currently reading "The Unicorn Project".',
    image: "/images/about-magenta.jpg",
    imageAlt: "I'm touching grass!",
    imagePosition: "center 48%",
    imageCaption: ["Wow I touched grass!", "or water!"],
    photoCat: {
      controlLabel: "Make the photo cat hop",
      visibleLabel: "click me!",
    },
    facts: [
      { label: "Based in", value: "Singapore" },
      { label: "Studying", value: "Computer Science + Design" },
      { label: "Currently rebuilding", value: "TaskSnipe in Go" },
      { label: "Latest small thing", value: "Obby, a terminal task planner" },
    ],
  },
  archiveBridge: {
    eyebrow: "The summarised version",
    title: "I picked a few things for this page.",
    body: "The archive contains more of what I've done, photos, devlog notes, projects, and more mini projects and things that I've spent my time doing.",
    linkLead: "More of what I made",
  },
  currentBuilds: {
    miniProjectSlug: "obby",
  },
  work: {
    title: "Work",
    introduction: "A few projects.",
    detailsLabel: "Details",
    archiveLabel: "See every project",
    viewProjectLabel: "View project",
  },
  miniProjectSlugs: ["obby", "is-it-vegetarian", "custom-shell"],
  miniProjects: {
    eyebrow: "Smaller projects",
    title: "Other things I made",
    shuffleLabel: "Shuffle",
    shuffledStatusLead: "Now showing",
    archiveLabel: "All the small projects",
  },
  featuredDevlogId: "011",
  devlog: {
    eyebrow: "Devlog",
    title: "From the devlog",
    archiveLabel: "All notes",
    continueLabel: "Continue reading",
    noteFallback: "Note",
  },
  experienceImage: "/images/2025-03-11 13.59.40.jpg",
  featuredExperienceIds: [
    "foodpanda-backend",
    "pa-citizen-developer",
    "cpf-software-developer",
  ],
  experience: {
    eyebrow: "Experience + tools",
    title: "What I've worked with",
    imageAlt:
      "Magenta and team receiving third place at Dell InnovateFest 2024",
    imageCaption: ["Dell InnovateFest", "3rd place, 2024"],
    experienceLabel: "Experience",
    timelineLabel: "Full timeline in my résumé",
    skillLabels: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    },
  },
  contact: {
    eyebrow: "Internships · project chats · freelance work · strange ideas",
    title: "Say hello",
  },
} satisfies HomeContent;

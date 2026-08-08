import type { Project, ProjectsPageConfig } from "@/types/project";

export const projectsPage = {
  pathname: "/projects",
  eyebrow: "Projects",
  titleLines: ["Projects"],
  introduction:
    "Community composting, backend rewrites, testing monkeys, and one FPGA game that was genuinely not fun to build.",
  metadata: {
    title: "Project Archive | Magenta Ong",
    description:
      "Software, hardware, coursework, and the projects that kept going after the deadline.",
  },
  labels: {
    index: "Project index",
    backToIndex: "All projects",
    story: "What happened",
    projectNotes: "Project notes",
    challenges: "Where it got tough",
    builtWith: "Built with",
    links: "Elsewhere",
    media: "More from the project",
    previousProject: "Previous project",
    nextProject: "Next project",
    videoFallback: "Your browser does not support this project video.",
    adjacentProjects: "Adjacent projects",
    chapterNavigation: "Project sections",
    annotation: "Handwritten note",
    transcription: "Transcription",
    openDocument: "Read full size",
    documentReader: "Artifact reader",
    documentScale: "Artifact scale",
    fitDocument: "Fit",
    fullSizeDocument: "Full size",
    closeDocument: "Close",
  },
} satisfies ProjectsPageConfig;

export const projects: Project[] = [
  {
    slug: "compostkaki",
    title: "CompostKaki",
    subtitle: "Digitalising community composting and collaboration",
    date: "Jun 2025 - Present",
    presentation: {
      tier: "flagship",
      hero: {
        fit: "contain",
        background: "#f7f5f0",
        padding: "tight",
        aspect: "cinematic",
      },
    },
    archive: {
      preview: {
        fit: "contain",
        background: "#f7f5f0",
        padding: "tight",
      },
    },
    home: {
      feature: {
        order: 1,
        display: "product-and-photo",
        layout: "wide-right",
        note: "A hackathon project that went well, and is continuing on with PA and Mountbatten gardeners.",
        mediaLabel: "Prototype + our Build For Good booth",
      },
    },
    summary:
      "Built QR bin tracking, compost cycle history, and volunteer-friendly logging after testing the workflow with Mountbatten community gardeners.",
    description: [
      "A one-stop application for each compost pile to have its logs, health, and help requests made. Community composting is usually a team effort thing, but the current solution is to chat on whatsapp and store the information needed in your brain. CompostKaki is built to help with that, by providing a platform where users and community gardeners can log the actions done to a compost pile, the status of the pile, and also request for help, through the app.",
    ],
    chapters: [
      {
        id: "build-for-good",
        title: "The hackathon was the start",
        body: [
          "CompostKaki began at Build For Good 2025. Our team's mission was to help community gardeners track compost bins and piles, and coordinate volunteers without relying on scattered whatsapp chat messages.",
        ],
        artifactIds: ["compostkaki-team"],
        layout: "artifact-first",
      },
      {
        id: "prototype-flows",
        title: "Join. Log. Ask for help.",
        body: [
          "The early web prototype focused on three jobs: join a bin from its QR code, log what changed, and ask the group for help. These are recordings from that build; the locations and activity shown are demo data.",
        ],
        artifactIds: [
          "compostkaki-join-bin",
          "compostkaki-log-activity",
          "compostkaki-post-task",
        ],
        layout: "artifact-sequence",
      },
      {
        id: "field-testing",
        title: "Making it less demo-ish",
        body: [
          "I built QR-based bin tracking, bin logs, user flows, and cycle history so volunteers could quickly check a bin, add updates, and see whether it needed attention. After testing with 15+ users from Mountbatten CITs, I worked with feedback from PA, Mountbatten CIT, and NParks to make the product less demo-ish and more useful for people who would actually maintain the bins.",
        ],
        layout: "text-only",
      },
      {
        id: "after-the-hackathon",
        title: "After the hackathon",
        body: [
          "The project is continuing under PA Sparks Division as a Citizen Developer effort. It has moved from a web prototype toward a mobile app on the Play Store and App Store, which taught me a lot about building for messy real-world production workflows. There were a lot of assumptions and decisions made during the hackathon to prioritise speed and delivering the product, which had to be challenged when moving away from the hackathon and into more real-world production scenarios.",
        ],
        layout: "text-only",
      },
    ],
    challenges: [
      "Turning composting habits and volunteer handoffs into a workflow that would not feel like admin work.",
      "Balancing hackathon speed with the extra care needed once real community partners were involved.",
      "Designing bin history in a way that helped gardeners spot patterns instead of just collecting logs.",
    ],
    technologies: ["Next.js", "CRUD", "Sustainability", "Supabase"],
    media: {
      cover: {
        id: "compostkaki-product-board",
        src: "/images/webbanner.jpg",
        alt: "CompostKaki web app banner",
      },
      gallery: [
        {
          id: "compostkaki-team",
          src: "/images/CompostKakiTeam.jpg",
          alt: "CompostKaki Team with their booth at Build for Good 2025",
          caption: "The CompostKaki team at our Build For Good 2025 booth.",
          aspect: "landscape",
          layout: "full",
        },
      ],
      videos: [
        {
          id: "compostkaki-join-bin",
          src: "/videos/compostkaki-join-bin.mp4",
          label: "Early CompostKaki prototype: joining a compost bin",
          width: 640,
          height: 1138,
          poster: "/images/projects/compostkaki-join-bin.webp",
          caption: "Join a bin from its link or QR code.",
          description: "Early web prototype with demo bin data.",
          fit: "contain",
          layout: "column",
        },
        {
          id: "compostkaki-log-activity",
          src: "/videos/compostkaki-log-activity.mp4",
          label: "Early CompostKaki prototype: logging compost activity",
          width: 640,
          height: 1138,
          poster: "/images/projects/compostkaki-log-activity.webp",
          caption: "Log materials, water, photos, and notes against the bin.",
          description: "Early web prototype with demo activity data.",
          fit: "contain",
          layout: "column",
        },
        {
          id: "compostkaki-post-task",
          src: "/videos/compostkaki-post-task.mp4",
          label: "Early CompostKaki prototype: asking the community for help",
          width: 640,
          height: 1138,
          poster: "/images/projects/compostkaki-post-task.webp",
          caption: "Post a task that everyone in the same bin can see.",
          description: "Early web prototype with demo task data.",
          fit: "contain",
          layout: "column",
        },
      ],
    },
    links: [
      {
        id: "compostkaki-live",
        label: "Latest Design",
        url: "https://compostkaki.vercel.app",
        target: "blank",
      },
      {
        id: "compostkaki-source",
        label: "GitHub Repository",
        url: "https://github.com/magentaong/compostkaki",
        target: "blank",
      },
    ],
    tags: ["Next.js", "Supabase", "Sustainability"],
  },
  {
    slug: "tasksnipe",
    title: "TaskSnipe",
    subtitle: "A task manager I use to practise product structure",
    date: "January 2025 - Present",
    archive: {
      preview: {
        background: "#ffffff",
        padding: "none",
      },
    },
    home: {
      current: {
        note: "Go rewrite",
      },
      feature: {
        order: 2,
        display: "interface",
        layout: "narrow-left",
        note: "Currently rebuilding the backend in Go.",
      },
    },
    summary:
      "An ongoing task-management build where I practise auth, PostgreSQL-backed data, and dashboard design. It is a huge WIP, but it is also the project that got me hooked on software engineering.",
    description: [
      "TaskSnipe is my ongoing attempt at building a cleaner team task tracker. I use it to practise the product basics: task states, project grouping, authentication, dashboard summaries, and how much information a team actually needs at a glance.",
      "I built the Next.js frontend, wired authentication with Clerk, and used PostgreSQL for task and project data.",
      "It is still rough in places, so I treat it more like a long-running learning project. Right now I'm migrating the backend from Javascript to Go, mainly because Javascript was a terrible idea, and I regret all decisions made to even learn Javascript, why did no one tel me JS was terrible, I don't like JS, ok I can tolerate it, but if given a choice I don't wanna work with JS, Typescript is much much better.",
    ],
    challenges: [
      "Deciding which task states are actually useful instead of copying every project-management app.",
      "Keeping the dashboard readable and balancing between tasks, users, and projects.",
      "Making auth and database work feel boring and reliable, which is honestly the goal.",
    ],
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Clerk",
      "Vercel",
      "Tailwind CSS",
      "TypeScript",
    ],
    media: {
      cover: {
        id: "tasksnipe-logo",
        src: "/images/TaskSnipe.png",
        alt: "TaskSnipe wordmark logo",
        fit: "contain",
      },
      gallery: [
        {
          id: "tasksnipe-figma",
          src: "/images/TaskFigma.png",
          alt: "TaskSnipe interface explorations in Figma",
          fit: "contain",
          aspect: "landscape",
          layout: "full",
        },
      ],
    },
    tags: ["Next.js", "PostgreSQL", "Clerk"],
  },
  {
    slug: "gened",
    title: "GenEd",
    subtitle: "An AI Powered LMS, built for tutors and students alike.",
    date: "Jan 2025 - Jan 2026",
    presentation: {
      tier: "flagship",
      hero: {
        fit: "contain",
        background: "#151515",
        padding: "none",
        aspect: "cinematic",
      },
    },
    archive: {
      preview: {
        fit: "contain",
        background: "#151515",
        padding: "none",
      },
    },
    home: {
      feature: {
        order: 4,
        display: "video",
        layout: "wide-center",
        note: "BabyShark Grant project exploring AI-assisted learning paths and course creation, with a focus on usefulness over AI-for-the-sake-of-AI.",
        mediaLabel: "Course builder prototype",
      },
    },
    summary:
      "An LLM-powered authoring platform that turns a topic brief and reference material into an editable course draft.",
    description: [
      "Most LMSes are built by people who teach with assumption that students have a basic understanding of (blank). We built GenEd for the slow bit before that, where an educator OR student who is interested in learning a topic, gives their learning objectives, and sometimes their own reference material to GenEd. GenEd then returns a course outline, modules, and quiz variants that they could review and rewrite.",
      "SUTD’s Venture, Innovation and Entrepreneurship office gave us the S$6,000 Baby Shark Grant. We got an MVP, and put it in front of beta users, and came kinda close to a live deployment.",
    ],
    chapters: [
      {
        id: "authoring-bottleneck",
        title: "LMSes for educators",
        body: [
          "A subject-matter expert may know exactly what to teach and still not have days or time to turn it into a structured online course. Delivery platforms didn't really fix that authoring work. GenEd was our attempt to make the first draft take minutes or even seconds while leaving the educator in charge of what was published. This worked rather well for me, as being a private tutor helped me to know what the painpoints of an educator is.",
        ],
        artifactIds: ["gened-course-prompt"],
        layout: "artifact-first",
      },
      {
        id: "student-personalisation",
        title: "LMSes for students",
        body: [
          "For students, the main struggle is that courses out there are not personalised and catered for the general public. A student might excel in mathematical reasoning, but fail at explaining the concept in words, vice versa. But a course is more likely to focus on the mathematical logic rather than explanation, when sometimes what a student needs is to know how to explain their thoughts. This is where GenEd comes in, it's meant to be personalised towards a student's learning style and habits as well as preferences, making microlearning (and learning) more accessible and fun.",
        ],
        artifactIds: ["gened-course-prompt"],
        layout: "artifact-first",
      },
      {
        id: "structured-generation",
        title: "One course was several smaller LLM calls",
        body: [
          "The generated course is done through several LLM calls, allowing for the module titles, quizzes, and content to be more predictable and let an educator or student regenerate one weak section without discarding everything else.",
        ],
        artifactIds: ["gened-course-editor", "gened-prototype"],
        layout: "artifact-sequence",
      },
      {
        id: "rag-grounding",
        title: "PDFs kept the source material close",
        body: [
          "When an educator uploaded PDFs or supplied URLs, we chunked and embedded the material, retrieved relevant passages, and added them to the generation context. It kept domain-specific courses closer to the educator’s sources, but sadly, this didn't manage to make hallucination disappear. As a result, we made it such that  every module would be passed through a human review step before publication.",
        ],
        layout: "text-only",
      },
      {
        id: "whatsapp-microlearning",
        title: "We also tried it inside WhatsApp, to encourage microlearning",
        body: [
          "We used Twilio APIs to test what GenEd could look like as a WhatsApp microlearning bot. These English, Chinese, and German runs returned useful links and small next steps without asking the learner to open another platform. It works in other languages too, and was pretty successful as a first pass. This caught the eye of a collaborator who was backed by the Malaysian Government, and allowed us to receive an initial Letter of Intent.",
        ],
        artifactIds: [
          "gened-whatsapp-bot",
          "gened-whatsapp-chinese",
          "gened-whatsapp-german",
        ],
        layout: "artifact-sequence",
      },
      {
        id: "deliberate-stop",
        title:
          "However, given that time was running out, we chose to take a step back.",
        body: [
          "It was a tough decision to make, but when SUTD’s VIE office closed the funding window, the three of us decided not to seek more capital. The product worked; but making it reliable enough for real courses was a much larger job. We took the experience with us instead of stretching the project past the point where the team wanted to keep going. The project continues to live through SUTD's undergraduate research project, where we explore more AI-driven PDF-to-course generation, since this was our main bottleneck during beta testing.",
        ],
        layout: "text-only",
      },
    ],
    challenges: [
      "An AI-written course can sound finished while being factually wrong. RAG and educator review reduced the risk but it's still not entirely reliable.",
      "The problem with AI powered products is that it depends on the AI, and at the point of development the AI we used wasn't exactly the best. We had to pivot the project into research to get an even more accurate and reliable product.",
      "A production-grade setup requires more time than what the funding window gave and is definitely a huge challenge for us.",
    ],
    technologies: [
      "OpenAI API",
      "RAG",
      "Next.js",
      "Prisma",
      "Mux",
      "Twilio API",
      "MongoDB",
    ],
    media: {
      cover: {
        id: "gened-identity",
        src: "/images/GenEd.png",
        alt: "GenEd identity slide for the SUTD BabyShark Fund project",
      },
      gallery: [
        {
          id: "gened-course-prompt",
          src: "/images/projects/gened-course-prompt.webp",
          alt: "GenEd prototype asking an educator for a course topic",
          caption:
            "The prototype asks for a course topic before generating a first draft. The Logoipsum mark stayed in the original recording.",
          aspect: "wide",
          layout: "full",
        },
        {
          id: "gened-course-editor",
          src: "/images/projects/gened-course-editor.webp",
          alt: "GenEd editor with editable course details and chapter drafts",
          caption:
            "Generated titles, descriptions, and chapters remained editable in the prototype.",
          aspect: "wide",
          layout: "column",
        },
        {
          id: "gened-whatsapp-chinese",
          src: "/images/projects/gened-whatsapp-chinese.jpeg",
          alt: "WhatsApp conversation with GenEd responding in Chinese with a beginner drawing course outline",
          caption:
            "Chinese-language test: a request to learn drawing returns a beginner course outline.",
          fit: "contain",
          aspect: "phone",
          layout: "column",
        },
        {
          id: "gened-whatsapp-german",
          src: "/images/projects/gened-whatsapp-german.jpeg",
          alt: "WhatsApp conversation with GenEd responding in German with cooking video resources",
          caption:
            "German-language test: a request to improve at cooking returns a set of video resources.",
          fit: "contain",
          aspect: "phone",
          layout: "column",
        },
      ],
      videos: [
        {
          id: "gened-prototype",
          src: "/videos/GenEdPrototype.web.mp4",
          label: "GenEd prototype walkthrough",
          width: 1600,
          height: 726,
          poster: "/images/projects/gened-course-editor.webp",
          caption: "Rough prototype capture—placeholder branding included.",
          description:
            "A 49-second recording moving from the course list to an AI course prompt, then into an editable draft with title, description, chapters, pricing, and resources.",
          layout: "column",
        },
        {
          id: "gened-whatsapp-bot",
          src: "/videos/gened_bot.mp4",
          label:
            "GenEd WhatsApp microlearning bot returning public-speaking resources",
          width: 574,
          height: 1280,
          poster: "/images/projects/gened-whatsapp-bot-poster.webp",
          caption:
            "English-language test: the bot returns public-speaking videos, articles, and practice tasks inside WhatsApp.",
          description: "A short screen recording of the Twilio-powered bot.",
          fit: "contain",
          layout: "column",
        },
      ],
    },
    tags: ["OpenAI API", "RAG", "Next.js", "MongoDB"],
  },
  {
    slug: "befrienderscircle",
    title: "BefriendersCircle",
    subtitle: "Full-stack coursework that taught me the importance of testing.",
    date: "May 2025 - Aug 2025",
    presentation: {
      tier: "flagship",
      titleLines: ["Befrienders", "Circle"],
      hero: {
        fit: "contain",
        background: "#d9e9e8",
        padding: "tight",
        aspect: "cinematic",
      },
    },
    archive: {
      preview: {
        fit: "contain",
        background: "#d9e9e8",
        padding: "tight",
      },
      evidenceMediaId: "befrienderscircle-e2e-tests",
    },
    home: {
      feature: {
        order: 3,
        display: "video",
        layout: "medium-right",
        note: "The project where I created monkeys, and also started developing an interest in backend systems. I also died a little tbh.",
        mediaLabel: "Cypress walkthrough",
      },
    },
    summary:
      "Architectured the project, built protected routes and API flows, and wrote most of the Jest, Supertest, and Cypress coverage for the caregiver-support platform. I also grew the most technically here.",
    description: [
      "BefriendersCircle was our full-stack project for SUTD's 50.003 Elements of Software Construction module. I worked across the frontend and backend, especially the authenticated routes, API integration, and the tests holding those flows together. I also singlehandedly managed to develop the entire backend, including deciding the data tables, APIs, and namings.",
    ],
    chapters: [
      {
        id: "full-stack-glue",
        title: "The bit between the route and the screen",
        body: [
          "I worked across protected routes, resource and forum flows, authentication, and the API endpoints behind them. A change rarely stayed on one side of the stack, so I was usually checking the route, endpoint, auth state, and test together.",
        ],
        artifactIds: ["befrienderscircle-prototype-walkthrough"],
        layout: "artifact-first",
      },
      {
        id: "integration-files",
        title: "Eleven integration files later",
        body: [
          "I wrote most, if not all of the unit and integration tests with Jest and Supertest. The eleven files covered auth, comments, boards, resources, external API calls, validation errors, and database cleanup. They were more useful than treating one coverage percentage as the finish line.",
        ],
        artifactIds: ["befrienderscircle-integration-tests"],
        layout: "artifact-first",
      },
      {
        id: "cypress-monkeys",
        title: "The Cypress scripts were my monkeys, and I love them.",
        body: [
          "Six Cypress files ran through login, signup, resources, forum posts, uploads, and cleanup. I called them my monkeys; the name made repeating the same end-to-end flows a little more fun.",
          "While the final product direction could have been stronger, I'm glad that I got to develop monkeys. Cypress tests managed to catch broken flows that manual clicking missed, and that was when backend systems started getting much more interesting to me.",
        ],
        artifactIds: [
          "befrienderscircle-e2e-tests",
          "befrienderscircle-testing-walkthrough",
        ],
        layout: "artifact-sequence",
      },
    ],
    challenges: [
      "Keeping protected routes, API behaviour, and frontend states aligned while the team built in parallel.",
      "Writing tests that modelled login, forum, resource, upload, and cleanup flows instead of chasing a number.",
      "Cleaning up users, posts, and uploaded files so the end-to-end runs could repeat without inheriting old state.",
    ],
    technologies: [
      "React",
      "TailwindCSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Jest",
      "Supertest",
      "Cypress",
    ],
    media: {
      cover: {
        id: "befrienderscircle-banner",
        src: "/images/BefriendersCircleBanner.png",
        alt: "BefriendersCircle platform banner",
      },
      gallery: [
        {
          id: "befrienderscircle-integration-tests",
          src: "/images/projects/befrienders-integration-tests.webp",
          alt: "BefriendersCircle slide listing eleven backend integration-test files",
          caption:
            "A crop from the walkthrough listing the eleven Jest and Supertest integration files.",
          view: "document",
          width: 1600,
          height: 600,
          aspect: "wide",
          layout: "full",
        },
        {
          id: "befrienderscircle-e2e-tests",
          src: "/images/projects/befrienders-e2e-tests.webp",
          alt: "BefriendersCircle slide listing six Cypress end-to-end test files",
          caption: "The six Cypress files I kept calling my monkeys.",
          view: "document",
          width: 1600,
          height: 600,
          aspect: "wide",
          layout: "wide",
        },
      ],
      videos: [
        {
          id: "befrienderscircle-prototype-walkthrough",
          src: "/videos/BefriendersPrototypeDemo.mp4",
          label: "BefriendersCircle original team walkthrough",
          width: 1920,
          height: 1080,
          poster: "/images/BefriendersCircleBanner.png",
          caption:
            "The original team walkthrough. The opening moves through caregiver resources and community support before the testing section.",
          description:
            "A 117-second team pitch showing the platform screens first, followed by the unit, integration, and end-to-end testing plan.",
          layout: "wide",
        },
        {
          id: "befrienderscircle-testing-walkthrough",
          src: "/videos/BefriendersTesting.web.mp4",
          label: "BefriendersCircle testing walkthrough",
          width: 1280,
          height: 720,
          poster: "/images/projects/befrienders-e2e-tests.webp",
          caption: "A cut from the original pitch.",
          description:
            "A 72-second walkthrough of the stack, unit and integration testing plan, Jest and Supertest file inventories, and six Cypress end-to-end flows.",
          layout: "column",
        },
      ],
    },
    links: [
      {
        id: "befrienderscircle-source",
        label: "GitHub Repository",
        url: "https://github.com/magentaong/befrienderscircle",
        target: "blank",
      },
    ],
    tags: ["React", "MongoDB", "Testing"],
  },
  {
    slug: "tasktales",
    title: "TaskTales",
    subtitle: "A gamified task app built in Java",
    date: "Jan 2025 - April 2025",
    summary:
      "Awarded a Singtel Honourable Mention for a Java Android app that turns tasks into character progress and weekly boss battles.",
    description: [
      "TaskTales is a gamified productivity android app, designed to combat procrastination by allowing users to choose characters, log tasks, gain points and battle weekly bosses. It was chosen to be awarded the Honourable Mention award by Singtel for our module, Information Systems and Programming.",
      "The onboarding process allows users to pick and customise their path, choosing a character that meets their own personal goal. From there, the app would randomise a set of habits and daily tasks to combat task paralysis in users.",
      "The application is built with Java using Android Studio, and Firebase was used to store data and for authentication.",
    ],
    challenges: [
      "Preventing users from exploiting the point system.",
      "Keeping onboarding simple while still giving users meaningful choices.",
      "Creating modular classes that matched the OOP design principles we were learning.",
      "Making the app usable across different Android screen sizes.",
    ],
    technologies: ["Java", "Firebase"],
    media: {
      cover: {
        id: "tasktales-cover",
        src: "/images/tasktalesthumbnail.jpg",
        alt: "TaskTales characters and title screen",
      },
      gallery: [
        {
          id: "tasktales-features",
          src: "/images/tasktalesfeatures.jpg",
          alt: "TaskTales task, character, and boss-battle features",
          aspect: "landscape",
          layout: "full",
        },
      ],
      videos: [
        {
          id: "tasktales-demo",
          src: "/videos/Team 43_Task Tales.mp4",
          label: "TaskTales project demo",
          width: 1920,
          height: 1080,
        },
      ],
    },
    links: [
      {
        id: "tasktales-source",
        label: "GitHub Repository",
        url: "https://github.com/aaj1510/tasktales",
        target: "blank",
      },
    ],
    tags: ["CRUD", "Java", "OOP"],
  },
  {
    slug: "stackoverflow",
    title: "StackOverflow",
    subtitle: "A two-player FPGA arcade game",
    date: "Jan 2025 - April 2025",
    summary:
      "Built a two-player FPGA stacking game and implemented FSM, datapath, and ALU logic to manage game state.",
    description: [
      "Rise to the Top. Beat the Clock. Outsmart Your Rival. Battle in a 1v1 arcade challenge where precision meets speed! One misstep, and it's joever! Are you up for the challenge?",
      "StackOverflow is a FPGA based 1v1 game, built with Lucid and Alchitry Labs as an IDE. It was one of the most if not THE MOST tough projects I've ever done, where we had to understand Finite State Machines, Datapath, and how ALU operations worked down to the bit.",
      "Definitely not a fun time doing the project, but the outcome was great and I've learnt to appreciate computers even more after this!",
    ],
    challenges: ["FPGA IS TOUGH MAN."],
    technologies: ["Lucid", "FPGA", "Alchitry"],
    media: {
      cover: {
        id: "stackoverflow-cover",
        src: "/images/StackOverflow.png",
        alt: "StackOverflow FPGA arcade game",
      },
      videos: [
        {
          id: "stackoverflow-gameplay",
          src: "/videos/StackOverflow.mp4",
          label: "StackOverflow gameplay demo",
          width: 2160,
          height: 3840,
          layout: "column",
        },
      ],
    },
    links: [
      {
        id: "stackoverflow-source",
        label: "GitHub Repository",
        url: "https://github.com/FauxCrow/FPGA-Arcade-Game",
        target: "blank",
      },
    ],
    tags: ["FPGA", "Lucid", "ALU Operations"],
  },
  {
    slug: "freelancedeveloper",
    title: "Freelance Developer",
    subtitle: "Custom sites and landing pages for clients",
    date: "March 2025 - Present",
    summary:
      "Designing and building custom portfolio sites in Figma, React, and Tailwind for clients who wants sites. This applies to Businesses too who wishes to digitalise their systems!",
    description: [
      "I design and build custom portfolio websites for clients who want something more personal than a template. Most of the work is figuring out what they want to be remembered for, then turning that into a site structure, visual direction, and build plan.",
      "My process usually starts in Figma, where I map the sections, layout, and visual rhythm before building with Next.js and Tailwind CSS. I keep the stack simple because the point is not to over-engineer a personal site; it is to make the client's work easy to understand and nice to revisit.",
      "This work has taught me how much taste lives in small decisions: spacing, image choices, copy, navigation labels, and whether a page sounds like the person it represents. More to come!! (i'm currently drowning in student work, haven't updated).",
    ],
    challenges: [
      "Translating vague client preferences into concrete design choices.",
      "Balancing personality with accessibility and responsive layout.",
      "Keeping the build maintainable for clients who may want small updates later.",
      "Making sure the final site sounds like the client, not like generic portfolio copy.",
    ],
    technologies: ["React", "Tailwind CSS", "Figma", "Vercel"],
    media: {
      cover: {
        id: "freelance-cover",
        src: "/images/IMAGE 2025-03-13 06:48:43.jpg",
        alt: "A custom portfolio website displayed across devices",
      },
      gallery: [
        {
          id: "freelance-digibase",
          src: "/images/digibase.jpg",
          alt: "Digibase website design",
          aspect: "landscape",
          layout: "full",
        },
      ],
    },
    links: [
      {
        id: "freelance-live",
        label: "Latest Design",
        url: "https://aloykoh.vercel.app",
        target: "blank",
      },
      {
        id: "freelance-source",
        label: "GitHub Repository",
        url: "https://github.com/magentaong",
        target: "blank",
      },
    ],
    tags: ["React", "Tailwind CSS", "Figma"],
  },
  {
    slug: "lepaklah",
    title: "LepakLah!",
    subtitle: "Senior-friendly activity booking and matching",
    date: "June 2024 - September 2024",
    summary:
      "Won 3rd Place at Dell InnovateFest 2024 for a Flutter app helping seniors book activities and find buddies with shared interests to combat senior loneliness.",
    description: [
      "We built LepakLah! during Dell InnovateFest 2024 to make activity-centre bookings less tedious for seniors at LionBefrienders. It won 3rd Place, which was a nice ending to a very compressed build.",
      "My first ever proper application build, which taught me a lot about systems, setting up my own dev environment, and developing widgets. I'll never forget the moment when my teammate told me to 'NEVER FORGET THIS', when changing a zshrc script, i have to source it after, it sounds so basic but I was new to all this :<",
      "The senior-facing app keeps the type large and the flow short: browse an activity, book a slot, and manage the booking without digging through menus.",
      "We also built a buddy-matching idea around shared interests, plus an admin dashboard for trend spotting and activity creation at active ageing centres.",
      "The project made us design both sides of the same service at once—the person trying to join an activity and the staff member trying to keep the centre running.",
    ],
    challenges: [
      "Designing flows that older users could understand without extra explanation.",
      "Building a buddy matching concept around interests without making it feel impersonal.",
      "Thinking through admin needs alongside the senior-facing app.",
      "Deploying with Red Hat OpenShift, Docker, and Kubernetes under hackathon constraints.",
    ],
    technologies: [
      "Flutter",
      "Python",
      "AI",
      "Docker",
      "Kubernetes",
      "Red Hat OpenShift",
      "Figma",
    ],
    media: {
      cover: {
        id: "lepaklah-cover",
        src: "/images/LepakLah.png",
        alt: "LepakLah activity booking app interface",
      },
      gallery: [
        {
          id: "lepaklah-presentation",
          src: "/images/2025-03-11 13.59.40.jpg",
          alt: "The LepakLah team receiving third place at Dell InnovateFest 2024",
          aspect: "landscape",
          layout: "full",
        },
      ],
      videos: [
        {
          id: "lepaklah-prototype",
          src: "/videos/FigmaPrototype1.mp4",
          label: "LepakLah Figma prototype walkthrough",
          width: 626,
          height: 1080,
          layout: "column",
        },
      ],
    },
    links: [
      {
        id: "lepaklah-overview",
        label: "Project Overview",
        url: "https://www.linkedin.com/in/magenta-ong/details/projects/",
        target: "blank",
      },
      {
        id: "lepaklah-source",
        label: "GitHub Repository",
        url: "https://github.com/magentaong/dell-innovatefest-2024",
        target: "blank",
      },
    ],
    tags: ["Flutter", "AI", "Docker", "Kubernetes"],
  },
  {
    slug: "whiskers",
    title: "Whiskers",
    subtitle: "An interactive robo-cat for low-engagement spaces",
    date: "January 2024 - April 2024",
    summary:
      "Connected OpenAI, Whisper, Raspberry Pi, sensors, and servo responses into a physical prototype for public-space interaction.",
    description: [
      "Whiskers was our answer to a design prompt about a high-traffic place where almost nobody stopped to interact: make a robot cat people would actually walk up to.",
      "A Raspberry Pi 4 handled the sensors, servo movements, and the link between Whisper speech-to-text and GPT responses. The cat could react to touch and voice instead of feeling like a chatbot placed next to some hardware.",
      "It was an early design-thinking project, and a useful lesson in building the physical interaction and the software response as one experience.",
      "The project that taught me so much about design thinking.",
    ],
    challenges: [
      "Handling speech recognition in a noisy public environment.",
      "Connecting chatbot responses to physical movement without making the interaction feel delayed.",
      "Designing around Raspberry Pi performance and power constraints.",
      "Making the prototype inviting enough for people to approach.",
    ],
    technologies: [
      "OpenAI GPT",
      "Whisper",
      "Raspberry Pi",
      "Python",
      "Robotics",
      "Servo Motors",
    ],
    media: {
      cover: {
        id: "whiskers-cover",
        src: "/images/Whiskers.png",
        alt: "Whiskers robotic cat prototype",
      },
      gallery: [
        {
          id: "whiskers-product",
          src: "/images/WhiskersProduct.png",
          alt: "Whiskers product concept and interaction flow",
          aspect: "landscape",
          layout: "full",
        },
      ],
      videos: [
        {
          id: "whiskers-demo",
          src: "/videos/DTI Group 5_ Whiskers.mp4",
          label: "Whiskers prototype demonstration",
          width: 1920,
          height: 1080,
        },
      ],
    },
    links: [
      {
        id: "whiskers-site",
        label: "Project Website",
        url: "https://aliciang999.wixsite.com/my-site-3",
        target: "blank",
      },
    ],
    tags: ["OpenAI", "Raspberry Pi", "Robotics", "Python"],
  },
];

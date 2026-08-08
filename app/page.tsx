import SiteHeader from "@/components/home/SiteHeader";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import ArchiveBridge from "@/components/home/ArchiveBridge";
import Projects from "@/components/home/Projects";
import MiniProjects from "@/components/home/MiniProjects";
import DevLog from "@/components/home/DevLog";
import PhotoStrip from "@/components/home/PhotoStrip";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";
import { homeContent } from "@/data/home";
import { projects } from "@/data/projects";
import { miniProjects } from "@/data/miniprojects";
import { devLogEntries } from "@/data/devlog";
import CatFollower from "@/components/shared/catfollower";
import FishCursor from "@/components/shared/FishCursor";
import { PointerCompanionProvider } from "@/components/shared/PointerCompanion";
import { siteData } from "@/data/site";

const currentProject = projects.find((project) => project.home?.current);
const currentMiniProject = miniProjects.find(
  (project) => project.slug === homeContent.currentBuilds.miniProjectSlug,
);
const latestNote = devLogEntries.find(
  (entry) => entry.id === homeContent.featuredDevlogId,
);

const featuredProjects = projects
  .flatMap((project) =>
    project.home?.feature
      ? [{ project, feature: project.home.feature }]
      : [],
  )
  .sort((a, b) => a.feature.order - b.feature.order);

export default function Home() {
  return (
    <PointerCompanionProvider config={siteData.pointerCompanion}>
      <div className="editorial-home min-h-screen bg-[var(--folio-paper)] text-[var(--folio-ink)]">
        <SiteHeader />
        <CatFollower />
        <FishCursor />

        <main id="main-content" tabIndex={-1}>
          <Hero
            currentProject={currentProject}
            currentMiniProject={currentMiniProject}
            latestNote={latestNote}
          />
          <About />
          <ArchiveBridge />
          <Projects featuredProjects={featuredProjects} />
          <MiniProjects
            projects={miniProjects}
            initialSlugs={homeContent.miniProjectSlugs}
          />
          <DevLog />
          <PhotoStrip />
          <Skills />
          <Contact />
        </main>
      </div>
    </PointerCompanionProvider>
  );
}

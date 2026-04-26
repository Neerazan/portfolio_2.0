"use client";

import { projects } from "@/src/data/projects";
import type { GithubData } from "@/src/lib/github.types";
import { useDisplayMode } from "@/src/context/DisplayModeContext";

import NormalHeader from "@/src/components/normal/Header";
import NormalHero from "@/src/components/normal/Hero";
import NormalTitle from "@/src/components/normal/Title";
import NormalAbout from "@/src/components/normal/About";
import NormalTechStack from "@/src/components/normal/Tech";
import NormalWorkExperience from "@/src/components/normal/WorkExperience";
import NormalProject from "@/src/components/normal/Project";
import NormalContact from "@/src/components/normal/Contact";
import NormalFooter from "@/src/components/normal/Footer";

import DevBootLoader from "@/src/components/developer/DevBootLoader";
import dynamic from "next/dynamic";

// Dev Mode is huge (Three.js, Framer Motion, etc). Keep it dynamically imported
// and disable SSR so it never blocks the initial load or impacts SEO/performance.
const DevModeLayout = dynamic(
  async () => {
    // Artificial delay for boot sequence simulation
    await new Promise((resolve) => setTimeout(resolve, 400));
    return import("@/src/components/developer/DevModeLayout");
  },
  {
    loading: () => <DevBootLoader />,
    ssr: false,
  }
);

interface ClientPageContentProps {
  githubData: GithubData;
}

export default function ClientPageContent({ githubData }: ClientPageContentProps) {
  const { mode } = useDisplayMode();
  const isDev = mode === "developer";

  if (isDev) {
    return <DevModeLayout githubData={githubData} />;
  }

  // Normal Mode Layout - Fully SSR'd for perfect SEO and fast hydration
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-linear-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      {/* Subtle Grid Texture - GPU-composited */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "translateZ(0)",
          willChange: "auto",
        }}
      />

      <div className="relative z-10">
        <NormalHeader />
        <NormalHero />

        {/* About Section */}
        <NormalTitle title="About Me" id="about" />
        <NormalAbout />

        {/* Skills and Tech Stack */}
        <NormalTitle title="Skills & Technologies" id="skills" />
        <NormalTechStack />

        {/* Work Experience */}
        <NormalTitle title="Work Experience" id="work" />
        <NormalWorkExperience />

        <NormalTitle title="Some featured projects" id="projects" />
        <div className="flex flex-col gap-12 sm:gap-16 mb-12 sm:mb-24">
          {projects.map((project, index) => (
             <NormalProject key={index} {...project} />
          ))}
        </div>
        
        <NormalTitle title="Have an idea?" id="contact" />
        <NormalContact />
        <NormalFooter />
      </div>
    </div>
  );
}

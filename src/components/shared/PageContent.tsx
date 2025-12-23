"use client";

import { projects } from "@/src/data/projects";
import type { GithubData } from "@/src/lib/github.types";

import { DisplayModeProvider, useDisplayMode } from "@/src/context/DisplayModeContext";

import NormalHeader from "@/src/components/normal/Header";
import NormalHero from "@/src/components/normal/Hero";
import NormalTitle from "@/src/components/normal/Title";

import DevBootLoader from "@/src/components/developer/DevBootLoader";
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold components
const NormalAbout = dynamic(() => import("@/src/components/normal/About"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl mx-auto w-full max-w-6xl" />
});
const NormalTechStack = dynamic(() => import("@/src/components/normal/Tech"), {
  loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-3xl mx-auto w-full max-w-6xl" />
});
const NormalWorkExperience = dynamic(() => import("@/src/components/normal/WorkExperience"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl mx-auto w-full max-w-6xl" />
});
const NormalProject = dynamic(() => import("@/src/components/normal/Project"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl mx-auto w-full max-w-6xl" />
});
const NormalContact = dynamic(() => import("@/src/components/normal/Contact"), {
  loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl mx-auto w-full max-w-6xl" />
});
const NormalFooter = dynamic(() => import("@/src/components/normal/Footer"));

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

interface PageContentProps {
  githubData: GithubData;
}

function PageContentInner({ githubData }: PageContentProps) {
  const { mode } = useDisplayMode();
  const isDev = mode === "developer";

  if (isDev) {
    return <DevModeLayout githubData={githubData} />;
  }

  // Normal Mode with Static Gradient Background
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-linear-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] text-white">
      {/* Subtle Grid Texture - Optimized for GPU performance */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "translateZ(0)",
          willChange: "auto",
          backfaceVisibility: "hidden"
        }}
      />

      <div className="relative z-10">
        <NormalHeader />
        <NormalHero />

        {/* About Section */}
        <NormalTitle title="About Me" id="about" className={undefined} />
        <NormalAbout />

        {/* Skills and Tech Stack */}
        <NormalTitle title="Skills & Technologies" id="skills" className={undefined} />
        <NormalTechStack />

        {/* Work Experience */}
        <NormalTitle title="Work Experience" id="work" className={undefined} />
        <NormalWorkExperience />

        <NormalTitle title="Some featured projects" id="projects" className={undefined} />
        <div className="flex flex-col gap-12 sm:gap-16 mb-12 sm:mb-24">
          {projects.map((project, index) => (
            <NormalProject key={index} {...project} />
          ))}
        </div>
        <NormalTitle
          title="Have an idea?"
          id="contact"
          className={undefined}
        />
        <NormalContact />
        <NormalFooter />
      </div>
    </div>
  );
}

export default function PageContent({ githubData }: PageContentProps) {
  return (
    <DisplayModeProvider>
      <PageContentInner githubData={githubData} />
    </DisplayModeProvider>
  );
}

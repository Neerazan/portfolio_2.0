"use client";

import { projects } from "@/src/data/projects";

import SharedHero from "@/src/components/shared/Hero";
import { DisplayModeProvider, useDisplayMode } from "@/src/context/DisplayModeContext";

import NormalAbout from "@/src/components/normal/About";
import NormalContact from "@/src/components/normal/Contact";
import NormalFooter from "@/src/components/normal/Footer";
import NormalHeader from "@/src/components/normal/Header";
import NormalProject from "@/src/components/normal/Project";
import NormalTechStack from "@/src/components/normal/Tech";
import NormalTitle from "@/src/components/normal/Title";
import NormalWorkExperience from "@/src/components/normal/WorkExperience";

import DevBootLoader from "@/src/components/developer/DevBootLoader";
import dynamic from "next/dynamic";

const DevModeLayout = dynamic(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return import("@/src/components/developer/DevModeLayout");
  },
  {
    loading: () => <DevBootLoader />,
    ssr: false,
  }
);

function PageContent() {
  const { mode } = useDisplayMode();
  const isDev = mode === "developer";

  if (isDev) {
    return <DevModeLayout />;
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
        <SharedHero />

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

export default function App() {
  return (
    <DisplayModeProvider>
      <PageContent />
    </DisplayModeProvider>
  );
}

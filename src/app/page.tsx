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

  // Normal Mode with Aurora Background
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div
        className="fixed inset-[-50%] w-[200%] h-[200%] pointer-events-none opacity-20 animate-aurora z-0 transform-gpu backface-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(76, 29, 149, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 10%, rgba(6, 182, 212, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)
          `,
          filter: "blur(40px)",
          backgroundSize: "50% 50%"
        }}
      />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
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

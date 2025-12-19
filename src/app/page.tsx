"use client";

import { projects } from "@/src/data/projects";

import SharedHero from "@/src/components/shared/Hero";
import { DisplayModeProvider, useDisplayMode } from "@/src/context/DisplayModeContext";

import DeveloperHeader from "@/src/components/developer/Header";
import NormalHeader from "@/src/components/normal/Header";

import DeveloperAbout from "@/src/components/developer/About";
import NormalAbout from "@/src/components/normal/About";

import DeveloperContact from "@/src/components/developer/Contact";
import NormalContact from "@/src/components/normal/Contact";

import DeveloperProject from "@/src/components/developer/Project";
import NormalProject from "@/src/components/normal/Project";

import DeveloperTechStack from "@/src/components/developer/Tech";
import NormalTechStack from "@/src/components/normal/Tech";

import DeveloperWorkExperience from "@/src/components/developer/WorkExperience";
import NormalWorkExperience from "@/src/components/normal/WorkExperience";

import DeveloperFooter from "@/src/components/developer/Footer";
import NormalFooter from "@/src/components/normal/Footer";

import DeveloperTitle from "@/src/components/developer/Title";
import NormalTitle from "@/src/components/normal/Title";

function PageContent() {
  const { mode } = useDisplayMode();
  const isDev = mode === "developer";

  const Header = isDev ? DeveloperHeader : NormalHeader;
  const About = isDev ? DeveloperAbout : NormalAbout;
  const Contact = isDev ? DeveloperContact : NormalContact;
  const Project = isDev ? DeveloperProject : NormalProject;
  const TechStack = isDev ? DeveloperTechStack : NormalTechStack;
  const WorkExperience = isDev ? DeveloperWorkExperience : NormalWorkExperience;
  const Footer = isDev ? DeveloperFooter : NormalFooter;
  const Title = isDev ? DeveloperTitle : NormalTitle;


  const content = (
    <>
      <Header />
      <SharedHero />

      {/* About Section */}
      <Title title="About Me" id="about" className={undefined} />
      <About />

      {/* Skills and Tech Stack */}
      <Title title="Skills & Technologies" id="skills" className={undefined} />
      <TechStack />

      {/* Work Experience */}
      <Title title="Work Experience" id="work" className={undefined} />
      <WorkExperience />

      <Title title="Some featured projects" id="projects" className={undefined} />
      <div className="flex flex-col gap-12 sm:gap-16">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
      <Title
        title="Have an idea?"
        id="contact"
        className={undefined}
      />
      <Contact />
      <Footer />
    </>
  );

  if (isDev) {
    return (
      <div className="pt-6.5">
        {content}
      </div>
    );
  }

  // Normal Mode with Aurora Background
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <div
        className="fixed inset-[-50%] w-[200%] h-[200%] pointer-events-none opacity-30 animate-aurora z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(76, 29, 149, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 10%, rgba(6, 182, 212, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)
          `,
          filter: "blur(60px)",
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
        {content}
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

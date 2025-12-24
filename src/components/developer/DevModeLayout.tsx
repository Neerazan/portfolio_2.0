"use client";

import type { GithubData } from "@/src/lib/github.types";

import DeveloperAbout from "@/src/components/developer/About";
import DeveloperContact from "@/src/components/developer/Contact";
import DeveloperFooter from "@/src/components/developer/Footer";
import DeveloperHeader from "@/src/components/developer/Header";
import DeveloperHero from "@/src/components/developer/Hero";
import DeveloperProject from "@/src/components/developer/Project";
import DeveloperTechStack from "@/src/components/developer/Tech";
import DeveloperTitle from "@/src/components/developer/Title";
import DeveloperWorkExperience from "@/src/components/developer/WorkExperience";

interface DevModeLayoutProps {
  githubData?: GithubData;
}

export default function DevModeLayout({ githubData }: DevModeLayoutProps) {
  return (
    <div className="pt-6.5">
      <DeveloperHeader />
      <DeveloperHero githubData={githubData} />

      {/* About Section */}
      <DeveloperTitle title="About Me" id="about" className={undefined} />
      <DeveloperAbout />

      {/* Skills and Tech Stack */}
      <DeveloperTitle title="Skills & Technologies" id="skills" className={undefined} />
      <DeveloperTechStack />

      {/* Work Experience */}
      <DeveloperTitle title="Work Experience" id="work" className={undefined} />
      <DeveloperWorkExperience />

      <DeveloperTitle title="Some featured projects" id="projects" className={undefined} />
      <DeveloperProject />
      <DeveloperTitle
        title="Have an idea?"
        id="contact"
        className={undefined}
      />
      <DeveloperContact />
      <DeveloperFooter />
    </div>
  );
}

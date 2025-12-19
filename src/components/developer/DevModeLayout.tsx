"use client";

import { projects } from "@/src/data/projects";

import DeveloperAbout from "@/src/components/developer/About";
import DeveloperContact from "@/src/components/developer/Contact";
import DeveloperFooter from "@/src/components/developer/Footer";
import DeveloperHeader from "@/src/components/developer/Header";
import DeveloperProject from "@/src/components/developer/Project";
import DeveloperTechStack from "@/src/components/developer/Tech";
import DeveloperTitle from "@/src/components/developer/Title";
import DeveloperWorkExperience from "@/src/components/developer/WorkExperience";
import SharedHero from "@/src/components/shared/Hero";

export default function DevModeLayout() {
  return (
    <div className="pt-6.5">
      <DeveloperHeader />
      <SharedHero />

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
      <div className="flex flex-col gap-12 sm:gap-16">
        {projects.map((project, index) => (
          <DeveloperProject key={index} {...project} />
        ))}
      </div>
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

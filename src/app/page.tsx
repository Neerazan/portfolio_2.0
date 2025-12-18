"use client";

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

  const tishyImages: string[] = [
    "/assets/projects/tishy-1.png",
    "/assets/projects/tishy-2.png",
  ];
  const polarImages: string[] = [
    "/assets/projects/polar-1.png",
    "/assets/projects/polar-2.png",
  ];
  const r4cImages: string[] = [
    "/assets/projects/r4c-1.png",
    "/assets/projects/r4c-2.png",
  ];
  const kiranaImages: string[] = [
    "/assets/projects/kirana-1.png",
    "/assets/projects/kirana-2.png",
    "/assets/projects/kirana-3.png",
  ];

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
      <div>
        <Project
          title="Tishy & Co."
          number="1"
          description="Tishy & Co is an award-winning catering service provider based in Sydney, specializing in premium catering for corporate events, private parties, and special occasions. During my time at Aarambha IT, I contributed to this project by developing the backend and RESTful APIs using Django, integrating Celery for background tasks, and working on several frontend components. I also handled API integration with the React-based frontend, ensuring seamless communication between the client and server."
          technologies={[
            "React.js",
            "TailwindCSS",
            "vite",
            "Django",
            "Celery",
            "PostgreSQL",
            "Nginx",
            "Oracle",
            "Cloudflare",
            "R2"
          ]}
          images={tishyImages}
          demoLink="https://tishyandco.com.au/"
        />

        <Project
          title="Polar Treks"
          number="2"
          description="Polar Treks is a travel and adventure platform designed to offer seamless booking and exploration experiences. While working at Aarambha IT, I contributed by enhancing the user interface for better responsiveness and visual appeal, optimizing and maintaining the Django-based backend, and ensuring smooth integration between the frontend and backend systems."
          technologies={[
            "Next.js",
            "TailwindCSS",
            "Django",
            "PostgreSQL",
            "Nginx",
            "Oracle",
            "Cloudflare",
          ]}
          images={polarImages}
          demoLink="https://polartreks.com/"
        />

        <Project
          title="Kirana Pasal"
          number="3"
          description="Kirana Pasal is a fully functional e-commerce platform built on WordPress and WooCommerce, specializing in South Asian groceries. I was responsible for the end-to-end development, including responsive front-end design using Elementor, integrating secure Stripe payments, optimizing performance with Nginx, and implementing Yoast SEO for organic growth."
          technologies={[
            "Wordpress",
            "WooCommerce",
            "Elementor",
            "Yoast SEO",
            "Stripe",
            "Nginx",
          ]}
          images={kiranaImages}
          demoLink="https://www.kiranapasal.shop"
        />

        <Project
          title="Right4Children"
          number="4"
          description="Right4Children is a child- and youth-focused organization dedicated to empowering young people by helping them access their rights through impactful programs and services. During my time at Aarambha IT, I worked as a full-stack developer on this project, building and integrating both frontend and backend features using Django and Next.js. My contributions included developing core APIs, managing database models, and implementing dynamic, responsive UI components to ensure a seamless user experience."
          technologies={[
            "Next.js",
            "Tailwind CSS",
            "Shadcn",
            "Django",
            "PostgreSQL",
            "Nginx",
            "Oracle",
          ]}
          images={r4cImages}
          demoLink="https://right4children.org/"
          githubLink="https://github.com/nirajan-dhakal/right4children"
        />
      </div>
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
        className="fixed inset-0 pointer-events-none opacity-30 animate-aurora z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 18% 20%, rgba(76, 29, 149, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 10%, rgba(6, 182, 212, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)
          `,
          filter: "blur(60px)",
          backgroundSize: "200% 200%"
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
                                                                                                    
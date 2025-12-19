"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItemProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive?: boolean;
}

const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string): void => {
  event.preventDefault();
  const scrollSection = document.getElementById(id);
  if (scrollSection) {
    scrollSection.scrollIntoView({ behavior: "smooth" });
  }
};

const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Experiences" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    // Use IntersectionObserver to track active section
    // We use a rootMargin that creates a narrow band in the middle of the viewport
    // This effectively detects which section is "mostly" in the center
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    // Observe all sections including home
    const sectionIds = ["home", ...navSections.map((s) => s.id)];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <nav className="flex items-center justify-between gap-x-10 px-2 py-1" aria-label="Main navigation">
        <Navitem
          href="#home"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
          }}
          isActive={activeSection === "home"}
          aria-label="Home"
        >
          <div className="m-1 px-4 py-1 transition-all duration-300 hover:opacity-80">
            <span className={activeSection === "home" ? "text-cyan-400 font-bold" : "text-gray-400 font-medium"}>
              Home
            </span>
          </div>
        </Navitem>
        <Navitem
          href="#about"
          isActive={activeSection === "about"}
          className="transition-all duration-300 hover:text-cyan-400 font-medium text-sm tracking-wide"
          onClick={(event) => handleScroll(event, 'about')}
          aria-label="About section"
        >
          About
        </Navitem>
        <Navitem
          href="#skills"
          isActive={activeSection === "skills"}
          className="transition-all duration-300 hover:text-cyan-400 font-medium text-sm tracking-wide"
          onClick={(event) => handleScroll(event, 'skills')}
          aria-label="Skills section"
        >
          Skills
        </Navitem>
        <Navitem
          href="#work"
          isActive={activeSection === "work"}
          className="transition-all duration-300 hover:text-cyan-400 font-medium text-sm tracking-wide"
          onClick={(event) => handleScroll(event, 'work')}
          aria-label="Work experience section"
        >
          Experiences
        </Navitem>
        <Navitem
          href="#projects"
          isActive={activeSection === "projects"}
          className="transition-all duration-300 hover:text-cyan-400 font-medium text-sm tracking-wide"
          onClick={(event) => handleScroll(event, 'projects')}
          aria-label="Projects section"
        >
          Projects
        </Navitem>
        <Navitem
          href="#contact"
          isActive={activeSection === "contact"}
          className="mr-6 transition-all duration-300 hover:text-cyan-400 font-medium text-sm tracking-wide"
          onClick={(event) => handleScroll(event, 'contact')}
          aria-label="Contact section"
        >
          Contact
        </Navitem>
      </nav>
    </div>
  );
}

export function Navitem({ children, className, href, onClick, isActive }: NavItemProps) {
  const activeClass = isActive ? "text-cyan-400 border-b border-cyan-400/50 pb-0.5" : "text-gray-400 hover:text-white pb-0.5 border-b border-transparent";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${activeClass} ${className} transition-all duration-200`}
    >
      {children}
    </Link>
  );
}

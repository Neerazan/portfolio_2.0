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
    // Handle scroll events to update active section
    const handleScrollEvent = () => {
      // Check if at top of page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Find which section is currently in view
      const sections = navSections.map(({ id }) => ({
        id,
        element: document.getElementById(id),
      })).filter(({ element }) => element !== null);

      let currentSection = "home";
      let closestDistance = Infinity;

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the upper half of viewport
          const distance = Math.abs(rect.top - window.innerHeight / 2);

          if (rect.top < window.innerHeight / 2 && distance < closestDistance) {
            closestDistance = distance;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    // Initial check
    handleScrollEvent();

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
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

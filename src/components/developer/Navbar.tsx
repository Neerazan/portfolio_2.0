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
      <nav className="flex items-center justify-between gap-x-8 bg-black px-6 py-2 border border-white/5 shadow-2xl" aria-label="Main navigation">
        <Navitem
          href="#home"
          className="font-mono text-sm"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
          }}
          isActive={activeSection === "home"}
          aria-label="Home"
        >
          ~/
        </Navitem>
        <Navitem
          href="#about"
          isActive={activeSection === "about"}
          className="font-mono text-sm"
          onClick={(event) => handleScroll(event, 'about')}
          aria-label="About section"
        >
          /system
        </Navitem>
        <Navitem
          href="#skills"
          isActive={activeSection === "skills"}
          className="font-mono text-sm"
          onClick={(event) => handleScroll(event, 'skills')}
          aria-label="Skills section"
        >
          /dependencies
        </Navitem>
        <Navitem
          href="#work"
          isActive={activeSection === "work"}
          className="font-mono text-sm"
          onClick={(event) => handleScroll(event, 'work')}
          aria-label="Work experience section"
        >
          /var/log
        </Navitem>
        <Navitem
          href="#projects"
          isActive={activeSection === "projects"}
          className="font-mono text-sm"
          onClick={(event) => handleScroll(event, 'projects')}
          aria-label="Projects section"
        >
          /deployments
        </Navitem>
        <Navitem
          href="#contact"
          isActive={activeSection === "contact"}
          className="font-mono text-sm text-blue-400 hover:text-blue-300"
          onClick={(event) => handleScroll(event, 'contact')}
          aria-label="Contact section"
        >
          ./connect_ssh.sh
        </Navitem>
      </nav>
    </div>
  );
}

export function Navitem({ children, className, href, onClick, isActive }: NavItemProps) {
  const activeClass = isActive ? "text-green-400 font-bold" : "text-gray-400 hover:text-white";
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${activeClass} ${className} transition-colors duration-200 flex items-center`}
    >
      {isActive && <span className="mr-1 text-blue-400">&gt;</span>}
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";

import { navSections } from "../../data/nav";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NavItemProps } from "../../types";

export default function Navbar() {
  const { activeSection, scrollToSection } = useScrollSpy();

  return (
    <div className="hidden lg:block">
      <nav className="flex items-center justify-between gap-x-8 bg-[#0d1117] px-6 py-2 border border-white/5 shadow-2xl" aria-label="Main navigation">
        <Navitem
          href="#home"
          className="font-mono text-sm"
          onClick={(e) => scrollToSection(e, 'home')}
          isActive={activeSection === "home"}
          aria-label="Home"
        >
          ~/
        </Navitem>
        {navSections.map((section) => (
          <Navitem
            key={section.id}
            href={`#${section.id}`}
            isActive={activeSection === section.id}
            className="font-mono text-sm"
            onClick={(e) => scrollToSection(e, section.id)}
            aria-label={`${section.label} section`}
          >
            {section.id === 'contact' ? './connect_ssh.sh' :
              section.id === 'about' ? '/system' :
                section.id === 'skills' ? '/dependencies' :
                  section.id === 'work' ? '/var/log' :
                    section.id === 'projects' ? '/deployments' : `/${section.id}`}
          </Navitem>
        ))}
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

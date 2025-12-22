"use client";

import Link from "next/link";

import { navSections } from "../../data/nav";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NavItemProps } from "../../types";

export default function Navbar() {
  const { activeSection, scrollToSection } = useScrollSpy();

  return (
    <div className="hidden lg:block">
      <nav className="flex items-center justify-between gap-x-8 px-2 py-1" aria-label="Main navigation">
        <Navitem
          href="#home"
          className="cursor-pointer"
          onClick={(e) => scrollToSection(e, 'home')}
          isActive={activeSection === "home"}
          aria-label="Home"
        >
          Home
        </Navitem>
        {navSections.map((section) => (
          <Navitem
            key={section.id}
            href={`#${section.id}`}
            isActive={activeSection === section.id}
            onClick={(e) => scrollToSection(e, section.id)}
            aria-label={`${section.label} section`}
          >
            {section.label}
          </Navitem>
        ))}
      </nav>
    </div>
  );
}

export function Navitem({ children, className, href, onClick, isActive }: NavItemProps) {
  // Common base classes for all items
  const baseClasses = "transition-colors transition-transform duration-300 font-medium tracking-wide flex items-center justify-center";

  // Active: larger scale, cyan color
  // Inactive: gray color, white on hover
  const stateClasses = isActive
    ? "text-indigo-400 scale-110 origin-center text-sm border-b border-indigo-400/50 pb-0.5"
    : "text-gray-400 hover:text-indigo-400 text-sm hover:scale-105 origin-center border-b border-transparent pb-0.5";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${stateClasses} ${className || ""}`}
    >
      {children}
    </Link>
  );
}

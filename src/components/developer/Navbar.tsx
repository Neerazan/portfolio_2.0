"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { navSections } from "../../data/nav";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { NavItemProps } from "../../types";

export default function Navbar() {
  const { activeSection, scrollToSection } = useScrollSpy();

  return (
    <div className="hidden lg:block">
      <nav className="flex items-center justify-between gap-x-2" aria-label="Main navigation">
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
                    section.id === 'projects' ? '/projects' : `/${section.id}`}
          </Navitem>
        ))}
      </nav>
    </div>
  );
}

const MotionLink = motion(Link);

export function Navitem({ children, className, href, onClick, isActive }: NavItemProps) {
  return (
    <MotionLink
      href={href}
      onClick={onClick}
      animate={{
        color: isActive ? "#4ade80" : "#9ca3af" // transition between gray-400 and green-400
      }}
      whileHover={{ color: "#ffffff" }}
      transition={{ duration: 0.3 }}
      className={`${className} flex items-center relative font-medium group pl-3`}
    >
      <div className="absolute left-0 flex items-center justify-center w-4">
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5, x: -5 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="text-blue-400 font-bold"
              aria-hidden="true"
            >
              &gt;
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="relative">
        {children}
      </span>
    </MotionLink>
  );
}

"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

interface NavButtonProps {
  className?: string;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 35,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 35,
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
};

export function NavButton({ className, setIsMenuOpen, isMenuOpen }: NavButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleScroll = (id: string): void => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const scrollSection = document.getElementById(id);
      if (scrollSection) {
        scrollSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); // Wait for menu close animation
  };

  const menuItems = [
    {
      label: "Home",
      href: "/",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMenuOpen(false);
      }
    },
    { label: "About", href: "#about", action: () => handleScroll("about") },
    { label: "Skills", href: "#skills", action: () => handleScroll("skills") },
    { label: "Experiences", href: "#work", action: () => handleScroll("work") },
    { label: "Projects", href: "#projects", action: () => handleScroll("projects") },
    { label: "Contact", href: "#contact", action: () => handleScroll("contact") },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden relative z-100 p-2 text-white hover:text-indigo-400 transition-colors duration-300 ${className}`}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <span className="sr-only">Toggle menu</span>
        {isMenuOpen ? (
          <HiX className="w-8 h-8" />
        ) : (
          <HiMenuAlt4 className="w-8 h-8" />
        )}
      </button>

      {/* Full Screen Menu Overlay - Portalled to body to escape parent stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 z-1110 bg-linear-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] flex flex-col items-center justify-center lg:hidden overflow-hidden"
            >
              {/* Close Button inside Portal */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-3 right-4 z-110 p-2 text-white/50 hover:text-white transition-colors duration-300 transform hover:rotate-90"
                aria-label="Close menu"
              >
                <HiX className="w-8 h-8" />
              </button>

              {/* Decorative Glows */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

              {/* Background Texture */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />

              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
                className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md px-6 max-h-[85vh] overflow-y-auto py-10 no-scrollbar"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.label} variants={itemVariants} className="w-full text-center shrink-0">
                    <button
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          setIsMenuOpen(false);
                        }
                      }}
                      className="group relative inline-block text-4xl font-bold text-white transition-all duration-300 cursor-pointer"
                    >
                      <span className="relative z-10 group-hover:text-indigo-400 transition-colors duration-300">
                        {item.label}
                      </span>
                      <span className="absolute -bottom-2 left-0 w-0 h-1 bg-indigo-500/50 transition-all duration-300 group-hover:w-full" />
                    </button>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="mt-8 shrink-0">
                  <Link
                    href="/nirajan_dhakal_cv.pdf"
                    target="_blank"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-8 py-3 border border-white/20 text-white font-medium text-lg uppercase tracking-widest hover:bg-white/5 hover:border-indigo-400/50 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-colors duration-300 rounded"
                  >
                    Download CV
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
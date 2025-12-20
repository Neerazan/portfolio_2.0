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
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  },
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.07,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 50 },
  open: { opacity: 1, y: 0 }
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
    { label: "Home", href: "/", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
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
        className={`lg:hidden relative z-100 p-2 text-white hover:text-indigo-400 transition-all duration-300 ${className}`}
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
              className="fixed inset-0 z-1110 bg-[#0a0a0a]/99 flex flex-col items-center justify-center lg:hidden overflow-hidden"
            >
              {/* Close Button inside Portal */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 z-110 p-2 text-white hover:text-cyan-400 transition-all duration-300"
                aria-label="Close menu"
              >
                <HiX className="w-8 h-8" />
              </button>

              {/* Background Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />

              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
                className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6 max-h-[85vh] overflow-y-auto py-10 no-scrollbar"
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
                      className="text-4xl font-light text-white/90 hover:text-indigo-400 hover:scale-110 transition-all duration-300 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="mt-8 shrink-0">
                  <Link
                    href="/nirajan_dhakal_cv.pdf"
                    target="_blank"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-8 py-3 border border-white/20 text-white font-medium text-lg uppercase tracking-widest hover:bg-white/5 hover:border-indigo-400/50 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 rounded"
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
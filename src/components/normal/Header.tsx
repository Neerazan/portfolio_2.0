"use client";

import { Satisfy } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import ModeToggle from "../shared/ModeToggle";
import { NavButton } from "./NavButton";
import Navbar from "./Navbar";

const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-60 bg-[#151520]/98 border-b border-indigo-500/10" role="banner">
      <div className="mx-auto px-4 py-3 flex items-center justify-between lg:w-15/20">
        <div className="flex items-center justify-center gap-x-2">
          <Link href="/" className="px-2">
            <h1
              className={`text-[24px] text-white ${satisfy.className}`}
            >
              Neerajan .
            </h1>
          </Link>
        </div>

        <Navbar />

        <div className="flex items-center gap-4">
          <ModeToggle />
          <NavButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            className="lg:hidden"
          />
          <Link
            href="/nirajan_dhakal_cv.pdf"
            target="_blank"
            className="hidden lg:block group"
            aria-label="Download CV - PDF document"
          >
            <button className="relative px-6 py-2.5 bg-white/5 border border-white/10 text-white font-medium text-xs tracking-[0.2em] uppercase rounded-full overflow-hidden transition-colors duration-300 group-hover:bg-white/10 group-hover:border-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] flex items-center gap-2 cursor-pointer">
              <span className="relative z-10">Download CV</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

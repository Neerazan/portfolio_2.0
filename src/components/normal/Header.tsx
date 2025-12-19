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
    <header className="fixed top-0 left-0 right-0 z-60 bg-[#101111] backdrop-blur-xl border-b border-[#7A87FB]/10" role="banner">
      <div className="mx-auto px-4 py-4 flex items-center justify-between lg:w-15/20">
        <div className="flex items-center justify-center gap-x-2">
          <Link href="/" className="px-2">
            <h1
              className={`text-[35px] text-white ${satisfy.className}`}
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
            className="hidden lg:block group cursor-pointer"
            aria-label="Download CV - PDF document"
          >
            <button className="px-6 py-2.5 border border-white/20 text-white font-medium text-sm hover:bg-white/5 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 uppercase tracking-widest rounded cursor-pointer">
              Download CV
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}



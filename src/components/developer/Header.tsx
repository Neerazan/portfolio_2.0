"use client";

import Link from "next/link";
import { useState } from "react";
import ModeToggle from "../shared/ModeToggle";
import { NavButton } from "./NavButton";
import Navbar from "./Navbar";

const satisfy = { className: "font-mono font-bold tracking-tighter" }; // Using system font for now

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5" role="banner">
      <div className="mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center justify-center gap-x-2">
          <Link href="/" className={`text-2xl text-white ${satisfy.className}`}>
            <span className="text-cyan-400">root</span>@<span className="text-purple-400">portfolio</span>:~#
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
            className="hidden lg:block cursor-pointer group"
            aria-label="Download CV - PDF document"
          >
            <div className="font-mono text-xs sm:text-sm px-4 py-2 bg-[#0d1117] border border-green-500/30 text-green-400 rounded hover:bg-green-500/10 transition-colors flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <span>wget cv.pdf</span>
              <span className="w-2 h-4 bg-green-500 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}



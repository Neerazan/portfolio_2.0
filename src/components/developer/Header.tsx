"use client";

import Link from "next/link";
import { useState } from "react";
import ModeToggle from "../shared/ModeToggle";
import { NavButton } from "./NavButton";
import Navbar from "./Navbar";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-100 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/5`} role="banner">
      <div className="mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center justify-center gap-x-2">
          {/* Terminal Title */}
          <h1 className="font-mono text-sm sm:text-base md:text-lg">
            <span className="text-green-500 font-bold">root</span>
            <span className="text-gray-400">@</span>
            <span className="text-white font-bold">portfolio</span>
            <span className="text-white">:~#</span>
          </h1>
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
            <div className="font-mono text-xs px-4 py-2 bg-[#0d1117] border border-green-500/30 text-green-400 rounded hover:bg-green-500/10 hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all duration-300 flex items-center gap-2 whitespace-nowrap min-w-fit">
              <span className="text-gray-500">$</span>
              <span>wget cv.pdf</span>
              <span className="block w-1.5 h-3 bg-green-500 animate-pulse" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}



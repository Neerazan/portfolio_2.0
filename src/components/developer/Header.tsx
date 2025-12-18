"use client";

import Link from "next/link";
import { useState } from "react";
import ModeToggle from "../shared/ModeToggle";
import Button from "../ui/Button";
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
            className="hidden lg:block cursor-pointer"
            aria-label="Download CV - PDF document"
          >
            <Button title="Download CV" />
          </Link>
        </div>
      </div>
    </header>
  );
}



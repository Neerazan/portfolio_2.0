"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "./Navbar";
import Button from "./ui/Button";
import { NavButton } from "./ui/NavButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#101111]/80 backdrop-blur-md border-b border-[#7A87FB]/10" role="banner">
      <div className="mx-auto px-4 py-4 flex items-center justify-between lg:w-15/20">
        <div className="flex items-center justify-center gap-x-2">
          <h1
            className="px-2 font-['Poppins'] text-2xl bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Neerajan
          </h1>
        </div>

        <Navbar />

        <div className="flex items-center gap-4">
          <NavButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            className="lg:hidden"
          />
          <Link
            href="/nirajan_dhakal_cv.pdf"
            target="_blank"
            className="hidden lg:block"
            aria-label="Download CV - PDF document"
          >
            <Button title="Download CV" />
          </Link>
        </div>
      </div>
    </header>
  );
}



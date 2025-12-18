import Image from "next/image";
import Link from "next/link";
import { Navitem } from "./Navbar";

interface NabButtonProps {
  className?: string;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
}

export function NavButton({ className, setIsMenuOpen, isMenuOpen }: NabButtonProps) {

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string): void => {
    event.preventDefault();
    setIsMenuOpen(false);
    const scrollSection = document.getElementById(id);
    if (scrollSection) {
      scrollSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden cursor-pointer rounded-full bg-linear-to-r from-purple-600 to-cyan-600 p-0.5 transition-all duration-300 hover:shadow-lg hover:shadow-[#7A87FB]/50 ${className}`}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <div className="rounded-full border-4 border-[#101111]">
          <div className="rounded-full bg-[#292929] px-4 py-1 flex items-center justify-center">
            <Image
              src={"/assets/jam_menu.svg"}
              alt="Menu"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </div>
        </div>
      </button>

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed top-20 right-4 z-50 w-48 rounded-lg border border-purple-600 bg-[#1C1C1C] shadow-2xl backdrop-blur-lg transition-all duration-300 ease-out lg:hidden ${isMenuOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <Navitem
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
          }}
          className="block px-4 py-4 transition-colors duration-200 first:rounded-t-lg hover:bg-[#292929] min-h-11"
        >
          Home
        </Navitem>
        <Navitem
          href="#about"
          onClick={(event) => handleScroll(event, 'about')}
          className="block px-4 py-4 transition-colors duration-200 hover:bg-[#292929] min-h-11"
        >
          About
        </Navitem>
        <Navitem
          href="#skills"
          onClick={(event) => handleScroll(event, 'skills')}
          className="block px-4 py-4 transition-colors duration-200 hover:bg-[#292929] min-h-11"
        >
          Skills
        </Navitem>
        <Navitem
          href="#work"
          onClick={(event) => handleScroll(event, 'work')}
          className="block px-4 py-4 transition-colors duration-200 hover:bg-[#292929] min-h-11"
        >
          Experiences
        </Navitem>
        <Navitem
          href="#projects"
          onClick={(event) => handleScroll(event, 'projects')}
          className="block px-4 py-4 transition-colors duration-200 hover:bg-[#292929] min-h-11"
        >
          Projects
        </Navitem>
        <Navitem
          href="#contact"
          onClick={(event) => handleScroll(event, 'contact')}
          className="block px-4 py-4 transition-colors duration-200 hover:bg-[#292929] min-h-11"
        >
          Contact
        </Navitem>

        {/* Separator */}
        <div className="mx-4 my-2 h-px bg-linear-to-r from-purple-600 to-cyan-600"></div>

        {/* Download CV Button */}
        <div className="p-3">
          <Link
            href="/nirajan_dhakal_cv.pdf"
            download="/nirajan_dhakal_cv.pdf"
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer flex w-full rounded-full bg-linear-to-r from-purple-600 to-cyan-600 px-4 py-3 text-center text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 min-h-11 items-center justify-center"
          >
            Download CV
          </Link>
        </div>
      </div>
    </>
  );
}
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
      {/* Terminal-style Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`lg:hidden cursor-pointer p-2 bg-[#0d1117] border border-gray-800 rounded hover:border-blue-500/50 transition-all duration-300 ${className}`}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
      >
        <div className="flex flex-col gap-1">
          <div className={`h-0.5 w-5 bg-gray-400 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`h-0.5 w-5 bg-gray-400 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`h-0.5 w-5 bg-gray-400 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>

      {/* Terminal-style Fullscreen Menu Panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-9999 bg-black transition-all duration-300 ease-out lg:hidden h-screen w-screen ${isMenuOpen
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="h-full min-h-screen flex flex-col bg-black relative">
          {/* Terminal Header */}
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between bg-[#0d1117] relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="ml-3 text-sm text-gray-400 font-mono">menu.sh</span>
            </div>
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              aria-label="Close menu"
            >
              <div className="relative w-5 h-5">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 rotate-45 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-400 -rotate-45 transform -translate-y-1/2"></div>
              </div>
            </button>
          </div>

          {/* Nav Items - Centered */}
          <div className="flex-1 flex flex-col justify-center px-8 py-8 bg-black overflow-y-auto">
            <div className="space-y-2 max-w-md mx-auto w-full">
              <Navitem
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> cd ~/
              </Navitem>
              <Navitem
                href="#about"
                onClick={(event) => handleScroll(event, 'about')}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> cat about.txt
              </Navitem>
              <Navitem
                href="#skills"
                onClick={(event) => handleScroll(event, 'skills')}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> ls skills/
              </Navitem>
              <Navitem
                href="#work"
                onClick={(event) => handleScroll(event, 'work')}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> git log
              </Navitem>
              <Navitem
                href="#projects"
                onClick={(event) => handleScroll(event, 'projects')}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> ls projects/
              </Navitem>
              <Navitem
                href="#contact"
                onClick={(event) => handleScroll(event, 'contact')}
                className="block px-5 py-4 transition-all duration-200 hover:bg-[#161b22] rounded-lg font-mono text-lg text-gray-400 hover:text-white border border-transparent hover:border-gray-800"
              >
                <span className="text-blue-400">$</span> ./contact.sh
              </Navitem>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 bg-[#0d1117] relative z-10">
            {/* Download CV Button */}
            <div className="p-6">
              <Link
                href="/nirajan_dhakal_cv.pdf"
                target="_blank"
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer flex w-full px-5 py-4 bg-[#0a0a0a] border border-green-500/30 text-green-400 rounded-lg font-mono text-base hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all items-center justify-center gap-2"
              >
                <span className="text-gray-500">$</span>
                <span>wget cv.pdf</span>
              </Link>
            </div>

            {/* Footer Info */}
            <div className="px-6 pb-6 flex items-center justify-between text-xs font-mono text-gray-600">
              <div>
                <span className="text-gray-700">#</span> Terminal Menu v1.0
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

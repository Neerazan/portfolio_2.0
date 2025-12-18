import { Satisfy } from "next/font/google";
import { Socials } from './Social';

const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-[#7A87FB]/10 bg-linear-to-b from-transparent to-[#0a0a0a]/50 backdrop-blur-sm">
      <div className="mx-auto w-13/14 lg:w-15/20 px-4 py-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className={`bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-[35px] text-transparent ${satisfy.className}`}>
            Neerajan .
          </h1>

          <p className="text-gray-400 text-sm max-w-md">
            Thanks for stopping by! Let&apos;s create something amazing together.
          </p>

          <Socials />

          <div className="pt-4 border-t border-[#7A87FB]/10 w-full max-w-md">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Neerajan • Designed & Built with passion
            </p>
          </div>
        </div>
      </div>

      {/* Subtle decorative glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#7A87FB]/15 rounded-full blur-2xl -z-10"></div>
    </footer>
  )
}

export default Footer
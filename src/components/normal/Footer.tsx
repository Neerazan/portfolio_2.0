import { Satisfy } from "next/font/google";

const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"] });

const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-white/5 bg-linear-to-b from-[#0a0a0f] to-[#151520]">
      <div className="mx-auto w-13/14 lg:w-15/20 px-4 py-12">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Logo */}
          <h1 className={`text-[40px] text-white ${satisfy.className}`}>
            Neerajan .
          </h1>

          {/* Tagline */}
          <p className="text-gray-400 text-base max-w-md leading-relaxed">
            Thanks for stopping by! Let&apos;s create something amazing together.
          </p>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Neerajan • Designed & Built with passion
          </p>
        </div>
      </div>

      {/* Decorative Gradient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-linear-to-t from-cyan-500/10 to-transparent -z-10"></div>
    </footer>
  )
}

export default Footer
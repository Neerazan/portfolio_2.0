"use client";
import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTerminal, FaTwitter } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function Hero() {
  const { mode } = useDisplayMode();
  const isDev = mode === "developer";

  const handleScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Neerazan", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/nirajan-dhakal", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com/nirajandhakal", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:nirajandhakal@gmail.com", label: "Email" },
  ];

  // Mouse Interaction for Typography & Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setWindowSize({ width, height });
      }
    };

    // Call update on mount asynchronously to avoid cascading renders warning
    const rafId = requestAnimationFrame(handleResize);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [0, windowSize.height], [5, -5]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [0, windowSize.width], [-5, 5]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // Don't track mouse on mobile
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div
      id="home"
      className={`relative min-h-svh w-full text-white overflow-x-hidden flex flex-col ${isDev ? "bg-[#0a0a0a]" : "bg-transparent"}`}
      onMouseMove={handleMouseMove}
    >

      {/* Grid Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay will-change-transform"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="flex flex-col lg:flex-row flex-1 relative z-10 container mx-auto px-0 lg:px-0">
        {/* 
          LEFT SIDEBAR - Social Links
          Fixed on desktop to stay efficient
        */}
        <aside className={`hidden lg:flex flex-col justify-between items-center w-24 h-screen fixed left-0 top-0 border-r backdrop-blur-md z-50 py-12 transition-colors duration-500 ${isDev ? 'border-green-500/20 bg-[#0d1117]/80' : 'border-white/5 bg-black/20'}`}>
          <div className={`w-px h-24 bg-linear-to-b from-transparent to-transparent ${isDev ? 'via-green-500/20' : 'via-white/20'}`} />

          <div className="flex flex-col gap-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 transition-colors duration-300 ${isDev ? 'text-green-500/60 hover:text-green-400' : 'text-gray-400 hover:text-white'}`}
                aria-label={social.label}
              >
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 transition-all group-hover:h-full opacity-0 group-hover:opacity-100 rounded-r-md ${isDev ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-cyan-400'}`} />
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                <span
                  className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none border whitespace-nowrap ${isDev
                    ? 'bg-green-950/90 border-green-500/30 text-green-400 font-mono text-[10px] shadow-sm'
                    : 'bg-white/10 backdrop-blur-md text-xs font-medium text-white border-white/10'
                    }`}
                >
                  {isDev ? `> ${social.label.toLowerCase()}` : social.label}
                </span>
              </a>
            ))}
          </div>

          <div className={`w-px h-24 bg-linear-to-b from-transparent to-transparent ${isDev ? 'via-green-500/20' : 'via-white/20'}`} />
        </aside>

        {/* 
          MAIN CONTENT AREA 
        */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:pl-36 lg:pr-12 w-full pt-20 lg:pt-0">

          {/* Text Section */}
          <div className="lg:w-1/2 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className={`h-px w-12 ${isDev ? 'bg-green-500/50' : 'bg-gray-500'}`} />
              <span className={`${isDev ? 'text-green-400 font-mono tracking-normal lowercase' : 'text-gray-400 font-medium tracking-[0.2em] uppercase'} text-sm`}>
                {isDev ? '> initializing_portfolio_v2...' : 'Full Stack Developer'}
              </span>
            </motion.div>

            <h1 className={`${isDev ? 'font-mono' : 'font-bold tracking-tighter'} text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-8 mix-blend-overlay opacity-90`}>
              {isDev ? (
                <>
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 transition-colors duration-500 cursor-default">
                    {"<Build />"}
                  </span>
                  <span className="block text-gray-500 text-6xl sm:text-8xl lg:text-9xl mt-2 hover:text-orange-400 transition-colors duration-500 cursor-default">
                    {"scale()"}
                  </span>
                </>
              ) : (
                <>
                  <span className="block transition-colors duration-500 cursor-default">
                    BUILD
                  </span>
                  <span className="block text-gray-500 transition-colors duration-500 cursor-default">
                    & SCALE
                  </span>
                </>
              )}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl"
            >
              <p className={`${isDev ? 'font-mono text-base sm:text-lg text-green-400/80' : 'text-xl sm:text-2xl text-gray-400 font-light'} leading-relaxed mb-10`}>
                I&apos;m <span className={`${isDev ? 'text-green-400 font-bold' : 'text-white font-medium'}`}>Nirajan Dhakal</span>. I engineer <span className={`${isDev ? 'text-blue-400' : 'text-gray-200'}`}>robust implementations</span> and <span className={`${isDev ? 'text-orange-400' : 'text-gray-200'}`}>scalable architecture</span> to power modern digital experiences.
              </p>

              <div className="flex flex-wrap gap-6">
                {isDev ? (
                  <>
                    <button
                      onClick={handleScroll}
                      className="group font-mono text-sm px-6 py-3 bg-black border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 flex items-center gap-2 rounded cursor-pointer"
                    >
                      <span className="text-gray-500">$</span>
                      <span>./contact.sh</span>
                      <span className="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1" />
                    </button>

                    <button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="group font-mono text-sm px-6 py-3 bg-black border border-gray-700 text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 flex items-center gap-2 rounded cursor-pointer"
                    >
                      <span className="text-gray-500">$</span>
                      <span>git checkout projects</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleScroll}
                      className="rounded cursor-pointer group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-wide text-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                      <span className="relative z-10">Get in Touch</span>
                      <HiArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-cyan-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>

                    <button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="rounded cursor-pointer px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-wide text-sm hover:bg-white/5 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md transition-all duration-300"
                    >
                      View Projects
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* 
            Right Creative Section - Interactive 3D Card Stack (Backend Focused)
          */}
          {/* 
            Right Creative Section - System Monitor (Backend Focused)
          */}
          <motion.div
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-[600px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Terminal Window */}
            <div className="w-full max-w-lg bg-[#0d1117] rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm relative z-10 group hover:border-gray-700 transition-colors">

              {/* Terminal Header */}
              <div className="bg-[#161b22] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
                </div>
                <div className="text-gray-500 text-xs font-medium flex items-center gap-1.5 opacity-60">
                  <FaTerminal className="text-[10px]" />
                  <span>zsh — nirajan@portfolio — 80x24</span>
                </div>
                <div className="w-10" /> {/* Spacer for centering */}
              </div>

              {/* Terminal Content */}
              <div className="p-6 text-gray-300 space-y-4 font-mono leading-relaxed bg-[#0d1117]/95 backdrop-blur-sm">

                {/* Command Input */}
                <div className="flex items-center gap-2 text-green-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-100">neofetch</span>
                </div>

                {/* Neofetch Output */}
                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 mt-4 items-start">
                  {/* ASCII Logo - Better 'N' */}
                  <div className="text-blue-500 font-bold select-none leading-[1.15] hidden sm:block font-mono whitespace-pre text-xs sm:text-sm">
                    {`
      z$$$$$$.
    $$$$$$$$$$
   $$$$$$$$$$$
  $$$$$$$$$$$$
 $$$$$$$$$$$$$
$$$$$$$$$$$$$$
$$$$$$"  "$$$$
"$$$"      "$$
                    `}
                  </div>

                  {/* System Info */}
                  <div className="space-y-1.5 text-xs sm:text-sm font-mono">
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">Host</span>
                      <span className="text-gray-300">portfolio.v2.0</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">OS</span>
                      <span className="text-gray-300">NirajanOS (Linux)</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">Kernel</span>
                      <span className="text-gray-300">Next.js v14.2.0</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">Uptime</span>
                      <span className="text-gray-300">Since 2024-06-01</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">Shell</span>
                      <span className="text-gray-300">zsh 5.9</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-green-400 font-bold min-w-[70px]">Role</span>
                      <span className="text-gray-300">Full Stack Engineer</span>
                    </div>
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800 w-full max-w-[200px]">
                      <div className="w-4 h-4 bg-black rounded-xs"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-purple-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-cyan-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded-xs"></div>
                    </div>
                  </div>
                </div>

                {/* Active Prompt */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="w-2.5 h-4 bg-gray-500 animate-pulse block" />
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -z-10" />
            </div>

            {/* Decorative Matrix Rain / Texture behind */}
            <div className="absolute -z-10 -right-20 -bottom-20 opacity-20 text-[10px] leading-[10px] font-mono select-none text-green-500/50 hidden xl:block pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i}>{Array.from({ length: 30 }).map(() => Math.random() > 0.5 ? '0' : '1').join(' ')}</div>
              ))}
            </div>
          </motion.div>

        </main>

        {/* Mobile Socials - Terminal Style */}
        <div className={`lg:hidden flex flex-col gap-3 pb-12 mt-12 z-20 w-full max-w-sm mx-auto px-6 ${isDev ? 'block' : 'hidden'}`}>
          <div className="text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span> cat .social_links
          </div>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#0d1117] border border-gray-800 rounded text-xs font-mono text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center gap-2"
              >
                <social.icon className="w-4 h-4" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Socials - Normal Mode */}
        <div className={`lg:hidden flex justify-center gap-6 pb-12 mt-8 z-20 w-full ${isDev ? 'hidden' : 'flex'}`}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

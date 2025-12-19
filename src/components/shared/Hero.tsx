"use client";
import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaDatabase, FaEnvelope, FaGithub, FaLinkedin, FaServer, FaTerminal, FaTwitter } from "react-icons/fa";
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

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotateX = useSpring(useTransform(mouseY, [0, windowSize.height], [5, -5]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [0, windowSize.width], [-5, 5]), { damping: 25, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <div
      id="home"
      className={`relative min-h-dvh w-full text-white overflow-x-hidden flex flex-col ${isDev ? "bg-[#0a0a0a]" : "bg-transparent"}`}
      onMouseMove={handleMouseMove}
    >

      {/* Grid Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
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
        <aside className="hidden lg:flex flex-col justify-between items-center w-24 h-screen fixed left-0 top-0 border-r border-white/5 bg-black/20 backdrop-blur-md z-50 py-12">
          <div className="w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />

          <div className="flex flex-col gap-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-cyan-400 transition-all group-hover:h-full opacity-0 group-hover:opacity-100 rounded-r-md" />
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/10 backdrop-blur-md text-xs font-medium text-white rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none border border-white/10 whitespace-nowrap">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          <div className="w-px h-24 bg-linear-to-b from-transparent via-white/20 to-transparent" />
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
              <div className="h-px w-12 bg-cyan-500/50" />
              <span className="text-cyan-400 font-medium tracking-[0.2em] text-sm uppercase">Full Stack Developer</span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white leading-[0.9] mb-8 mix-blend-overlay opacity-90">
              <span className="block hover:text-transparent hover:bg-clip-text hover:bg-linear-to-r hover:from-cyan-300 hover:to-purple-400 transition-colors duration-500 cursor-default">
                BUILD
              </span>
              <span className="block text-gray-500 hover:text-white transition-colors duration-500 cursor-default">
                & SCALE
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-xl"
            >
              <p className="text-xl sm:text-2xl text-gray-300 font-light leading-relaxed mb-10">
                I&apos;m <span className="text-white font-medium">Nirajan Dhakal</span>. I engineer <span className="text-purple-300 border-b border-purple-500/30">robust implementations</span> and <span className="text-cyan-300 border-b border-cyan-500/30">scalable architecture</span> to power modern digital experiences.
              </p>

              <div className="flex flex-wrap gap-6">
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
              </div>
            </motion.div>
          </div>

          {/* 
            Right Creative Section - Interactive 3D Card Stack (Backend Focused)
          */}
          <motion.div
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-[600px] perspective-1000"
            style={{ perspective: 1000 }}
          >
            {/* Abstract Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Container for tilting cards */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[500px] h-[500px] flex items-center justify-center"
            >
              {/* 
                  Card 1: Code Logic (The Backend Implementation)
                  Positioned slightly behind
                */}
              <motion.div
                className="absolute left-0 top-10 w-[380px] bg-[#0d1117] rounded-xl border border-white/10 shadow-2xl p-6 z-10"
                style={{ transform: "translateZ(20px)" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono">server.ts</span>
                </div>
                <div className="space-y-2 font-mono text-sm leading-relaxed">
                  <div className="flex">
                    <span className="text-purple-400 mr-2">async function</span>
                    <span className="text-blue-400">connectDB</span>
                    <span className="text-yellow-300">() {"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">try</span> <span className="text-yellow-300">{"{"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-gray-400">// Establish high-performance connection</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-purple-400">await</span> <span className="text-blue-300">db</span>.<span className="text-blue-400">connect</span>(<span className="text-green-300">process.env.DB_URI</span>);
                  </div>
                  <div className="pl-8">
                    <span className="text-blue-300">console</span>.<span className="text-blue-400">log</span>(<span className="text-green-300">"🚀 Database Synchronized"</span>);
                  </div>
                  <div className="pl-4">
                    <span className="text-yellow-300">{"}"}</span> <span className="text-purple-400">catch</span> (<span className="text-red-400">err</span>) <span className="text-yellow-300">{"{"}</span>
                  </div>
                  <div className="pl-8 w-full bg-red-500/10 rounded">
                    <span className="text-gray-400">// Error handling logic...</span>
                  </div>
                  <div className="text-yellow-300">{"}"}</div>
                </div>
              </motion.div>

              {/* 
                  Card 2: System Terminal (The Infrastructure/Status)
                  Positioned slightly in front
                */}
              <motion.div
                className="absolute right-0 bottom-20 w-[340px] h-[360px] bg-black/80 backdrop-blur-md rounded-lg border border-gray-800 shadow-2xl p-0 z-20 flex flex-col overflow-hidden"
                style={{ transform: "translateZ(60px)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {/* Terminal Header */}
                <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono">
                    <FaTerminal className="text-xs" />
                    <span>root@server:~</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-xs text-green-400 space-y-3 flex-1">
                  <div>
                    <span className="text-blue-400">➜</span> <span className="text-white">~ start-services</span>
                  </div>
                  <div className="text-gray-500">Initializing system modules...</div>

                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>API Gateway</span>
                    <span className="text-gray-600 ml-auto mx-2">................</span>
                    <span className="text-green-500">[OK]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>PostgreSQL</span>
                    <span className="text-gray-600 ml-auto mx-2">.................</span>
                    <span className="text-green-500">[OK]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    <span>Redis Cache</span>
                    <span className="text-gray-600 ml-auto mx-2">.................</span>
                    <span className="text-green-500">[OK]</span>
                  </div>

                  <div className="pt-4 border-t border-gray-800 mt-4">
                    <div className="text-gray-500 mb-1">System Load</div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "42%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                      <span>CPU: 12%</span>
                      <span>MEM: 42%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements/Icons around */}
              <motion.div
                className="absolute -right-8 top-0 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-green-400 z-30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: "translateZ(80px)" }}
              >
                <FaDatabase className="text-xl" />
              </motion.div>

              <motion.div
                className="absolute left-10 -bottom-10 p-3 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-blue-400 z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transform: "translateZ(40px)" }}
              >
                <FaServer className="text-xl" />
              </motion.div>

            </motion.div>
          </motion.div>

        </main>

        {/* Mobile Socials */}
        <div className="lg:hidden flex justify-center gap-6 pb-12 mt-8 z-20 w-full">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
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

"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function Hero() {
  const handleScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[95vh] bg-[#0a0a0a] text-white overflow-hidden flex flex-col justify-center">
      {/* Background Ambience - Subtle Professional Gradient */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen opacity-30" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-30" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-20 lg:py-0">

        {/* Left Column: Text Content */}
        <div className="flex flex-col items-start space-y-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-3 py-1 mb-4 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-medium text-cyan-400 tracking-wide">AVAILABLE FOR WORK</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white mb-6">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-white">
                Nirajan Dhakal.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              I specialize in full-stack development and cloud technologies, building scalable APIs and crafting seamless integrations for modern applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleScroll}
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Let&apos;s Connect
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors duration-300">
              View Projects
            </button>
          </motion.div>
        </div>

        {/* Right Column: Creative Image Composition */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px]"
          >
            {/* Creative Backdrop Element 1: Skewed Box */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-800 to-black rounded-[3rem] transform rotate-6 translate-x-4 translate-y-4 border border-white/5 opacity-50" />

            {/* Creative Backdrop Element 2: Outline */}
            <div className="absolute inset-0 border border-white/10 rounded-[3rem] transform -rotate-3 -translate-x-2 -translate-y-2" />

            {/* Main Image Container */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#0f0f0f] border border-white/10 group">
              <Image
                src="/assets/pp.png"
                alt="Nirajan Dhakal"
                fill
                className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                priority
              />

              {/* Subtle Gradient Overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Floating Badge (Creative Touch) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-[#1a1a1a] p-4 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md flex items-center gap-3 z-20"
            >
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Open to opportunities</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <Marquee />
      </div>
    </div>
  );
}

const skills = [
  "Python", "JavaScript", "TypeScript", "Node.js", "RESTful APIs", "AWS", "SQL", "Docker", "CI/CD", "React", "Next.js", "PostgreSQL"
];

const Marquee = React.memo(() => {
  return (
    <div className="relative flex w-full overflow-hidden py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex items-center mx-8 group">
            <span className="text-gray-500 font-medium text-lg uppercase tracking-wider group-hover:text-white transition-colors duration-300">
              {skill}
            </span>
            <span className="ml-8 text-gray-700">•</span>
          </div>
        ))}
      </div>
    </div>
  );
});

Marquee.displayName = "Marquee";

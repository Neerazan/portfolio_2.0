"use client";
import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
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
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/nirajan-dhakal-a49a36214/", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://www.linkedin.com/in/nirajan-dhakal-a49a36214/", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:nirajandhakal634@gmail.com", label: "Email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 120,
        damping: 20
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0.1, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        type: "spring" as const,
        stiffness: 110,
        damping: 18
      }
    }
  };

  const rightSideVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: "spring" as const,
        stiffness: 90,
        damping: 20
      }
    }
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`relative min-h-svh w-full text-white overflow-x-hidden flex flex-col ${isDev ? "bg-[#0a0a0a]" : "bg-transparent"}`}
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
        <aside className={`hidden lg:flex flex-col justify-between items-center w-24 h-screen fixed left-0 top-0 border-r z-50 py-12 transition-colors duration-500 ${isDev ? 'border-green-500/20 bg-[#0d1117]/95' : 'border-white/5 bg-[#151520]/95'}`}>
          <div className={`w-px h-24 bg-linear-to-b from-transparent to-transparent ${isDev ? 'via-green-500/20' : 'via-white/20'}`} />

          <div className="flex flex-col gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                variants={socialVariants}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-3 transition-colors duration-300 ${isDev ? 'text-green-500/60 hover:text-green-400' : 'text-gray-400 hover:text-white'}`}
                aria-label={social.label}
              >
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 transition-all group-hover:h-full opacity-0 group-hover:opacity-100 rounded-r-md ${isDev ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-indigo-400'}`} />
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                <span
                  className={`absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none border whitespace-nowrap ${isDev
                    ? 'bg-green-950/90 border-green-500/30 text-green-400 font-mono text-[10px] shadow-sm'
                    : 'bg-white/10 text-xs font-medium text-white border-white/10'
                    }`}
                >
                  {isDev ? `> ${social.label.toLowerCase()}` : social.label}
                </span>
              </motion.a>
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
              variants={textVariants}
              className="flex items-center gap-4 mb-6"
            >
              <div className={`h-px w-12 ${isDev ? 'bg-green-500/50' : 'bg-gray-500'}`} />
              <span className={`${isDev ? 'text-green-400 font-mono tracking-normal lowercase' : 'text-gray-400 font-medium tracking-[0.2em] uppercase'} text-sm`}>
                {isDev ? '> initializing_portfolio_v2...' : 'Full Stack Developer'}
              </span>
            </motion.div>

            <motion.h1
              variants={titleVariants}
              className={`${isDev ? 'font-mono' : 'font-bold tracking-tighter font-display'} text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white leading-[0.9] mb-8 mix-blend-overlay opacity-90`}
            >
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
            </motion.h1>

            <motion.div
              variants={textVariants}
              className="max-w-xl"
            >
              <p className={`${isDev ? 'font-mono text-base sm:text-lg text-green-400/80' : 'text-xl sm:text-2xl text-gray-400 font-light font-display'} leading-relaxed mb-10`}>
                Hi, I&apos;m <span className={`${isDev ? 'text-green-400 font-bold' : 'text-white font-medium'}`}>Nirajan Dhakal</span> a full-stack developer focused on building <span className={`${isDev ? 'text-blue-400' : 'text-gray-200'}`}>maintainable backends</span>, <span className={`${isDev ? 'text-orange-400' : 'text-gray-200'}`}>clean APIs</span>, and production-ready web applications.
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
                      <div className="w-2 h-4 bg-green-500 animate-[pulse_1s_infinite] ml-1" />
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
                      className="rounded cursor-pointer group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-wide text-sm transition-all duration-300 flex items-center gap-3 overflow-hidden"
                    >
                      <span className="relative z-10">Get in Touch</span>
                      <HiArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-indigo-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>

                    <button
                      onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                      className="rounded cursor-pointer px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-wide text-sm hover:bg-white/5 hover:border-indigo-400/50 hover:text-indigo-400 transition-all duration-300"
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
            variants={rightSideVariants}
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-[600px]"
          >
            {isDev ? (
              <>
                {/* GitHub Activity Graph */}
                <div className="w-full max-w-lg bg-[#0d1117] rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-xs relative z-10 group hover:border-green-500/30 transition-colors">

                  {/* Header */}
                  <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                        N
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Neerazan</div>
                        <div className="text-gray-500 text-[10px]">@neerazan</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <FaGithub className="text-base" />
                    </div>
                  </div>

                  {/* Contribution Graph */}
                  <div className="p-4 space-y-4">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">
                        <span className="text-green-400 font-bold">847</span> contributions in the last year
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <span>Less</span>
                        <div className="flex gap-0.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-gray-800" />
                          <div className="w-2.5 h-2.5 rounded-sm bg-green-900/60" />
                          <div className="w-2.5 h-2.5 rounded-sm bg-green-700/80" />
                          <div className="w-2.5 h-2.5 rounded-sm bg-green-500" />
                          <div className="w-2.5 h-2.5 rounded-sm bg-green-400" />
                        </div>
                        <span>More</span>
                      </div>
                    </div>

                    {/* Contribution Heatmap Grid */}
                    <div className="overflow-hidden">
                      <div className="flex gap-[3px]">
                        {/* Generate 20 weeks of contribution data */}
                        {Array.from({ length: 20 }).map((_, weekIndex) => (
                          <div key={weekIndex} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                              // Create a deterministic but varied pattern
                              const seed = (weekIndex * 7 + dayIndex + 42) % 100;
                              const isWeekend = dayIndex === 0 || dayIndex === 6;
                              let level = 0;

                              if (seed > 85) level = 4;
                              else if (seed > 65) level = 3;
                              else if (seed > 40) level = 2;
                              else if (seed > 20) level = 1;
                              if (isWeekend && level > 0) level = Math.max(1, level - 1);

                              const colors = [
                                'bg-[#161b22] border border-gray-800/50',
                                'bg-green-900/60',
                                'bg-green-700/80',
                                'bg-green-500',
                                'bg-green-400'
                              ];

                              return (
                                <div
                                  key={dayIndex}
                                  className={`w-2.5 h-2.5 rounded-sm ${colors[level]} hover:ring-1 hover:ring-green-400/50 transition-all cursor-default`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="border-t border-gray-800 pt-3 mt-2">
                      <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Recent Activity
                      </div>
                      <div className="space-y-2">
                        {[
                          { action: 'Pushed to', repo: 'portfolio_2.0', branch: 'main', time: '2 hours ago', icon: '↑' },
                          { action: 'Opened PR in', repo: 'nextjs-ecommerce', branch: '#42', time: '5 hours ago', icon: '⎇' },
                          { action: 'Merged', repo: 'api-gateway', branch: 'feat/auth', time: '1 day ago', icon: '✓' },
                          { action: 'Created', repo: 'redis-cache-layer', branch: '', time: '3 days ago', icon: '+' },
                        ].map((activity, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] group/item hover:bg-white/5 px-2 py-1.5 -mx-2 rounded transition-colors cursor-default">
                            <span className="text-green-500 w-4 text-center font-bold">{activity.icon}</span>
                            <span className="text-gray-400">{activity.action}</span>
                            <span className="text-blue-400 hover:underline">{activity.repo}</span>
                            {activity.branch && (
                              <span className="text-gray-600 text-[10px] px-1.5 py-0.5 bg-gray-800/50 rounded">
                                {activity.branch}
                              </span>
                            )}
                            <span className="text-gray-600 ml-auto text-[10px]">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-800 pt-2 flex justify-between items-center text-[10px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span> 24 stars earned
                      </span>
                      <span className="text-green-400/80">Currently coding...</span>
                    </div>
                  </div>
                </div>

                {/* Decorative glow behind */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
              </>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Abstract Visual Elements for Normal Mode - NO ANIMATIONS */}
                <div className="relative w-full max-w-lg aspect-square">
                  {/* Static Glass Cards */}
                  <div className="absolute top-10 right-0 w-64 h-80 bg-[#151515]/95 border border-white/10 rounded-3xl shadow-2xl z-20 flex flex-col p-6 overflow-hidden">
                    <div className="w-12 h-2 bg-indigo-400/50 rounded-full mb-6" />
                    <div className="space-y-4">
                      <div className="w-full h-4 bg-white/10 rounded-md" />
                      <div className="w-5/6 h-4 bg-white/10 rounded-md" />
                      <div className="w-4/6 h-4 bg-white/10 rounded-md" />
                    </div>
                    <div className="mt-auto flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                    </div>
                    {/* Animated Glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full" />
                  </div>

                  <div className="absolute bottom-10 left-0 w-72 h-64 bg-[#151515]/95 border border-white/5 rounded-3xl shadow-xl z-10 p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 rounded-full bg-orange-400/40" />
                      <div className="w-3 h-3 rounded-full bg-indigo-400/40" />
                      <div className="w-3 h-3 rounded-full bg-purple-400/40" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-white/5 rounded-full" />
                      <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                    </div>
                  </div>

                  {/* Static Background Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-tr from-indigo-500/20 via-purple-500/10 to-transparent rounded-full -z-10" />

                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
                  <div className="absolute top-1/3 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />
                </div>
              </div>
            )}
          </motion.div>

        </main>

        {/* Mobile Socials - Terminal Style */}
        <div className={`lg:hidden flex flex-col gap-3 pb-12 mt-12 z-20 w-full max-w-sm mx-auto px-6 ${isDev ? 'block' : 'hidden'}`}>
          <div className="text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span> cat .social_links
          </div>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + (index * 0.1),
                  ease: "easeOut"
                }}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#0d1117] border border-gray-800 rounded text-xs font-mono text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center gap-2 shadow-sm"
              >
                <social.icon className="w-4 h-4" />
                <span>{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Mobile Socials - Normal Mode */}
        <div className={`lg:hidden flex justify-center gap-6 pb-12 mt-8 z-20 w-full ${isDev ? 'hidden' : 'flex'}`}>
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + (index * 0.1),
                ease: "easeOut"
              }}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

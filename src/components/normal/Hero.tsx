"use client";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

export default function NormalHero() {
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

  return (
    <div
      id="home"
      className="relative min-h-svh w-full text-white overflow-x-hidden flex flex-col bg-transparent"
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
        {/* Desktop Social Panel */}
        <aside className="hidden lg:flex flex-col justify-between items-center w-20 h-screen fixed left-0 top-0 border-r z-40 py-10 transition-colors duration-500 border-indigo-500/15 bg-[#151520]/95 backdrop-blur-sm">
          <div className="w-px h-16 bg-linear-to-b from-transparent via-indigo-400/20 to-transparent" />

          <div className="flex flex-col gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 transition-all duration-300 text-indigo-200/70 hover:text-white"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={social.label}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 transition-all group-hover:h-full opacity-0 group-hover:opacity-100 rounded-r-md bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.35)]" />
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap bg-[#1f1f2b]/95 border border-indigo-500/30 text-indigo-100/90 text-[11px] shadow-sm">
                  {social.label}
                </span>
              </a>
            ))}
          </div>

          <div className="w-px h-16 bg-linear-to-b from-transparent via-indigo-400/20 to-transparent" />
        </aside>

        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:pl-28 lg:pr-12 w-full pt-20 lg:pt-0">

          {/* Text Section */}
          <div className="lg:w-1/2 max-w-2xl">
            <div className="flex items-center gap-3 mb-4 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="h-px w-10 bg-gray-500" />
              <span className="text-gray-400 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
                Full Stack Developer
              </span>
            </div>

            <h1 className="font-bold tracking-tighter font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] mb-6">
              <span className="block transition-colors duration-500 cursor-default">
                BUILD
              </span>
              <span className="block text-gray-500 transition-colors duration-500 cursor-default">
                & SCALE
              </span>
            </h1>

            <div className="max-w-lg animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-light font-display leading-relaxed mb-8">
                Hi, I&apos;m <span className="text-white font-medium">Nirajan Dhakal</span> a full-stack developer focused on building <span className="text-gray-200">maintainable backends</span>, <span className="text-gray-200">clean APIs</span>, and production-ready web applications.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleScroll}
                  className="rounded cursor-pointer group relative px-6 py-3 bg-white text-black font-bold uppercase tracking-wide text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <HiArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-indigo-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>

                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded cursor-pointer px-6 py-3 border border-white/20 text-white font-medium uppercase tracking-wide text-xs sm:text-sm hover:bg-white/5 hover:border-indigo-400/50 hover:text-indigo-400 transition-all duration-300"
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>

          {/* Right Creative Section - Abstract Visual Elements */}
          <div
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-[500px] animate-fade-in-right"
            style={{ animationDelay: '150ms' }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
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
          </div>
        </main>

        {/* Mobile Socials */}
        <div className="lg:hidden flex justify-center gap-6 pb-12 mt-8 z-20 w-full">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 animate-fade-in-up"
              style={{ animationDelay: `${200 + index * 50}ms` }}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

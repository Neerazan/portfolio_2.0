"use client";
import vector from "@/public/assets/Vector.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo } from "react";
import GlowingIcon from "./ui/Star";
import StarBackground from "./ui/StarBackground";

interface Skill {
  name: string;
}

interface Point {
  x: number;
  y: number;
}

interface MeteorPath {
  path: Point[];
  duration: number;
}

// Memoized Meteor component - prevents unnecessary re-renders
const Meteor = memo(({
  path,
  duration,
  delay,
  isMobile
}: {
  path: Point[];
  duration: number;
  delay: number;
  isMobile: boolean;
}) => {
  const size = isMobile ? 6 : 8;

  return (
    <motion.div
      className="absolute pointer-events-none will-change-transform"
      style={{
        width: size,
        height: size,
        left: `${path[0].x}%`,
        top: `${path[0].y}%`,
      }}
      animate={{
        left: path.map((p) => `${p.x}%`),
        top: path.map((p) => `${p.y}%`),
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear", // Changed from easeInOut for better performance
        delay,
      }}
    >
      <div
        className="rounded-full bg-white relative"
        style={{
          marginLeft: -size / 2,
          marginTop: -size / 2,
          width: size,
          height: size,
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
        }}
      />
    </motion.div>
  );
});

Meteor.displayName = "Meteor";

// Simplified grid with CSS instead of individual divs
const GridBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Mobile: 4x4 grid */}
    <div
      className="md:hidden absolute inset-0 opacity-15"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '25% 25%'
      }}
    />

    {/* Tablet: 5x5 grid */}
    <div
      className="hidden md:block lg:hidden absolute inset-0 opacity-20"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '20% 20%'
      }}
    />

    {/* Desktop: 6x6 grid */}
    <div
      className="hidden lg:block absolute inset-0 opacity-20"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '16.666% 16.666%'
      }}
    />
  </div>
));

GridBackground.displayName = "GridBackground";

// Simplified stars component
const Stars = memo(() => (
  <>
    {/* Mobile Stars */}
    <div className="md:hidden absolute inset-0 pointer-events-none">
      <div className="absolute z-30" style={{ left: '75%', top: '25%', transform: 'translate(-50%, -50%)' }}>
        <div className="scale-75"><GlowingIcon /></div>
      </div>
      <div className="absolute z-30" style={{ left: '25%', top: '75%', transform: 'translate(-50%, -50%)' }}>
        <div className="scale-75"><GlowingIcon /></div>
      </div>
    </div>

    {/* Tablet Stars */}
    <div className="hidden md:block lg:hidden absolute inset-0">
      <div className="absolute z-30" style={{ left: '80%', top: '20%', transform: 'translate(-50%, -50%)' }}>
        <GlowingIcon />
      </div>
      <div className="absolute z-30" style={{ left: '20%', top: '80%', transform: 'translate(-50%, -50%)' }}>
        <GlowingIcon />
      </div>
    </div>

    {/* Desktop Stars */}
    <div className="hidden lg:block absolute inset-0">
      <div className="absolute z-30" style={{ left: '66.66%', top: '16.66%', transform: 'translate(-50%, -50%)' }}>
        <GlowingIcon />
      </div>
      <div className="absolute z-30" style={{ left: '16.66%', top: '66.66%', transform: 'translate(-50%, -50%)' }}>
        <GlowingIcon />
      </div>
    </div>
  </>
));

Stars.displayName = "Stars";

export default function Hero() {
  const handleScroll = (): void => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Simplified meteor paths - fewer points for better performance
  const mobileMeteorPaths: MeteorPath[] = useMemo(() => [
    {
      path: [
        { x: 0, y: 25 },
        { x: 100, y: 25 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
        { x: 0, y: 25 },
      ],
      duration: 40,
    },
    {
      path: [
        { x: 100, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 50 },
        { x: 100, y: 50 },
        { x: 100, y: 0 },
      ],
      duration: 45,
    },
  ], []);

  const desktopMeteorPaths: MeteorPath[] = useMemo(() => [
    {
      path: [
        { x: 0, y: 16.66 },
        { x: 100, y: 16.66 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
        { x: 0, y: 16.66 },
      ],
      duration: 45,
    },
    {
      path: [
        { x: 100, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 50 },
        { x: 100, y: 50 },
        { x: 100, y: 0 },
      ],
      duration: 50,
    },
  ], []);

  return (
    <div className="h-[97vh] bg-[#101111] text-white overflow-hidden flex flex-col">
      {/* Hero Section */}
      <div
        id="home"
        className="relative flex flex-col items-center justify-center px-4 h-[85vh] md:h-full"
      >
        {/* Simplified Background grid */}
        <GridBackground />

        {/* Stars */}
        <Stars />

        {/* Reduced Meteors - only 2 instead of 3 */}
        <div className="md:hidden">
          {mobileMeteorPaths.map((meteor, idx) => (
            <Meteor
              key={`mobile-${idx}`}
              path={meteor.path}
              duration={meteor.duration}
              delay={idx * 5}
              isMobile={true}
            />
          ))}
        </div>

        <div className="hidden md:block">
          {desktopMeteorPaths.map((meteor, idx) => (
            <Meteor
              key={`desktop-${idx}`}
              path={meteor.path}
              duration={meteor.duration}
              delay={idx * 5}
              isMobile={false}
            />
          ))}
        </div>

        {/* Star Background */}
        <StarBackground />

        {/* Content - Optimized for LCP */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Render text immediately without animation on initial load */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white animate-fade-in">
            <span className="gradient-text p-1">Hi, I&apos;m Nirajan Dhakal</span>.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2 animate-fade-in-delayed">
            I specialize in full-stack development and cloud technologies, building scalable APIs, managing server infrastructures, and crafting seamless integrations between backend systems and modern frontend applications.
          </p>

          <button
            onClick={handleScroll}
            className="relative px-8 py-3 rounded-full text-white font-medium text-base overflow-hidden cursor-pointer group animate-fade-in-more-delayed transition-transform hover:scale-105 active:scale-95 min-h-11 min-w-11"
            aria-label="Let's Connect - scroll to contact section"
          >
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full p-0.5">
              <div className="w-full h-full bg-[#101111] rounded-full" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Let&apos;s Connect</span>
          </button>
        </div>

        {/* CSS Animations for better LCP */}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }
          
          .animate-fade-in-delayed {
            opacity: 0;
            animation: fadeIn 0.4s ease-out 0.1s forwards;
          }
          
          .animate-fade-in-more-delayed {
            opacity: 0;
            animation: fadeIn 0.4s ease-out 0.2s forwards;
          }
          
          .gradient-text {
            background: linear-gradient(to right, #c084fc, #f9a8d4, #67e8f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
          }
        `}</style>
      </div>

      {/* Marquee */}
      <Marquee />
    </div>
  );
}

const skills: Skill[] = [
  { name: "Python" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "Node.js" },
  { name: "RESTful APIs" },
  { name: "AWS" },
  { name: "SQL" },
  { name: "Docker" },
  { name: "CI/CD" },
  { name: "React" },
  { name: "Git/GitHub" },
  { name: "Redis" },
  { name: "PostgreSQL" },
];

// Memoized Marquee to prevent unnecessary re-renders
const Marquee = memo(() => {
  const renderSkills = (prefix: string) =>
    skills.map((skill, index) => (
      <div
        key={`${prefix}-${index}`}
        className="flex items-center justify-between gap-x-3 sm:gap-x-4 p-3 sm:p-4 lg:gap-x-6 lg:p-6"
      >
        <h1 className="text-sm sm:text-base lg:text-lg">{skill.name}</h1>
        <Image src={vector} alt="Vector" className="w-4 sm:w-5 lg:w-6" />
      </div>
    ));

  return (
    <div className="relative flex w-full overflow-hidden border-b-2 border-white/20 md:border-t-2">
      <div className="animate-marquee flex whitespace-nowrap will-change-transform">
        {renderSkills("first")}
        {renderSkills("second")}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
});

Marquee.displayName = "Marquee";

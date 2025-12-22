"use client";

import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import { ProjectProps } from "../../types";

// Memoized static components
const TerminalDots = () => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10"></div>
  </div>
);

const ScanlineEffect = () => (
  <>
    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-400 to-transparent scanline"></div>
    </div>
    <style jsx>{`
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .scanline {
        animation: scan 10s linear infinite;
        will-change: transform;
      }
    `}</style>
  </>
);

const GridOverlay = () => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}
  />
);

export default function Project({
  title,
  number,
  description,
  technologies,
  images = [],
  demoLink,
  githubLink
}: ProjectProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timestamp, setTimestamp] = useState("00:00:00");
  const [isInView, setIsInView] = useState(false);

  // Memoize slug to prevent recalculation
  const slug = useMemo(() => title.toLowerCase().replace(/\s+/g, '-'), [title]);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`project-${number}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [number]);

  // Simulate load time - only once
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimestamp(new Date().toLocaleTimeString());
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Memoized callbacks for better performance
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') setIsFullscreen(false);
  }, [prevImage, nextImage]);

  const toggleFullscreen = useCallback(() => setIsFullscreen(false), []);

  if (!images || images.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom easing
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.4 }
    }
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.3, duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div
        id={`project-${number}`}
        className="relative mx-auto w-full max-w-7xl px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="bg-[#0D1117] border border-[#30363d] rounded-xl overflow-hidden hover:border-[#8b949e]/40 hover:shadow-[0_0_30px_rgba(48,54,61,0.2)] transition-all duration-300 shadow-2xl font-mono">
          {/* Terminal-style Header */}
          <motion.div
            className="bg-[#161B22] px-4 sm:px-6 py-3 border-b border-[#30363d] flex items-center justify-between"
            variants={headerVariants}
          >
            <div className="flex items-center gap-4">
              <TerminalDots />
              <div className="flex items-center gap-2 text-sm text-[#8b949e]">
                <span className="opacity-50">/</span>
                <span>projects</span>
                <span className="opacity-50">/</span>
                <span className="text-blue-400">{slug}.tsx</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[#8b949e]/60 hidden sm:inline">PID: {number}</span>
              <div className="flex items-center gap-2 px-2 py-0.5 bg-[#238636]/10 border border-[#238636]/30 rounded">
                <div className="w-1.5 h-1.5 rounded-full bg-[#238636] animate-pulse"></div>
                <span className="text-[#238636] font-bold text-[11px]">LIVE</span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[1.6fr_1fr]">
            {/* Terminal Output Area (Image Carousel) */}
            <div className="relative aspect-video lg:aspect-auto lg:h-full lg:min-h-[420px] border-b lg:border-b-0 lg:border-r border-[#30363d] bg-black overflow-hidden group">
              <ScanlineEffect />

              {/* Terminal prompt overlay */}
              <motion.div
                className="absolute top-4 left-4 z-20 text-xs text-[#8b949e] font-mono flex flex-col gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~/projects</span>
                  <span className="text-white">cat render_view.log</span>
                </div>
                <div className="text-[#8b949e]/50 pl-4">
                  [ {timestamp} ] RENDERED FRAME_{currentImageIndex + 1}
                </div>
              </motion.div>

              <div className="relative w-full h-full overflow-hidden">
                <motion.div
                  className="flex w-full h-full"
                  animate={{ x: `-${currentImageIndex * 100}%` }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    type: "tween"
                  }}
                >
                  {images.map((image, index) => (
                    <div key={index} className="w-full h-full shrink-0 relative flex items-center justify-center p-8 bg-[#0D1117]">
                      <div className="relative w-full h-full max-w-2xl">
                        <Image
                          src={image}
                          alt={`${title} screenshot ${index + 1}`}
                          fill
                          className="object-contain transition-opacity duration-700 opacity-90 group-hover:opacity-100"
                          priority={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                      <GridOverlay />
                    </div>
                  ))}
                </motion.div>

                {/* Enhanced Image Indicators */}
                {images.length > 1 && (
                  <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2.5 bg-[#161B22]/90 backdrop-blur-md rounded-full border border-[#30363d] z-20 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    <button
                      onClick={prevImage}
                      className="text-[#8b949e] hover:text-white transition-colors cursor-pointer"
                      aria-label="Previous"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    <div className="flex gap-1.5 items-center">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${index === currentImageIndex
                            ? 'w-6 bg-blue-400'
                            : 'w-1 bg-[#30363d] hover:bg-[#8b949e]'
                            }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextImage}
                      className="text-[#8b949e] hover:text-white transition-colors cursor-pointer"
                      aria-label="Next"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* System Logs / Details Panel */}
            <motion.div
              className="p-8 flex flex-col justify-between h-full bg-[#0D1117] relative"
              variants={contentVariants}
            >
              <div>
                {/* Log Header */}
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-[#30363d]">
                  <span className="text-blue-400 text-sm font-bold">INFO</span>
                  <span className="text-[#8b949e] text-xs uppercase tracking-[0.2em] font-bold">Project_Specification</span>
                  <div className="flex-1"></div>
                </div>

                <div className="mb-6 space-y-1">
                  <div className="flex items-center gap-2 text-[#8b949e] text-xs">
                    <span className="text-green-400">➜</span>
                    <span>TITLE:</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {title}
                  </h2>
                </div>

                <div className="mb-8 group">
                  <div className="inline-flex items-center gap-2 text-[#8b949e] text-xs mb-3 bg-[#30363d]/30 px-2 py-0.5 rounded">
                    <span className="text-orange-400 font-bold">DESCRIPTION</span>
                    <span className="opacity-10">|</span>
                    <span>markdown</span>
                  </div>
                  <p className="text-[#8b949e] text-base leading-relaxed pl-4 border-l-2 border-[#30363d] group-hover:border-blue-400/50 transition-colors duration-500">
                    {description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 text-[#8b949e] text-xs mb-4">
                    <span className="text-purple-400 font-bold">TECH_STACK_MANIFEST</span>
                    <span className="opacity-20">::</span>
                    <span className="text-[10px]">v2.4.0</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 pl-4 border-l border-[#30363d]/50">
                    {technologies?.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 group/item"
                      >
                        <span className="text-xs text-[#8b949e]/30 font-mono">{(i + 1).toString().padStart(2, '0')}</span>
                        <span className="text-[#8b949e] text-xs">::</span>
                        <span className="text-[#c9d1d9] text-sm font-medium group-hover/item:text-blue-400 transition-colors cursor-default">
                          {tech}
                        </span>
                        <div className="h-px flex-1 bg-[#30363d]/20 group-hover/item:bg-blue-400/20 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Command Line Actions */}
              <div className="space-y-3 mt-8 pt-8 border-t border-[#30363d]">
                <div className="text-xs text-[#8b949e] mb-2 px-1 font-bold">AVAILABLE ACTIONS:</div>
                {demoLink && (
                  <Link
                    href={demoLink}
                    target="_blank"
                    className="group relative w-full px-4 py-3 bg-[#161B22] border border-[#30363d] text-[#c9d1d9] hover:border-blue-400 hover:text-blue-400 transition-all duration-300 flex items-center justify-between rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0">{'>'}</span>
                      <span className="font-medium">Open Live Deployment</span>
                    </div>
                    <FaExternalLinkAlt size={12} className="opacity-40 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-blue-400/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                  </Link>
                )}
                {githubLink && (
                  <Link
                    href={githubLink}
                    target="_blank"
                    className="group w-full px-4 py-3 bg-transparent border border-[#30363d] text-[#8b949e] hover:border-[#8b949e] hover:text-[#c9d1d9] transition-all duration-300 flex items-center justify-between rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span>View Source Code</span>
                    </div>
                    <FaGithub size={16} className="opacity-40 group-hover:opacity-100" />
                  </Link>
                )}
              </div>
            </motion.div >
          </div >

          {/* Footer status bar */}
          <div className="bg-[#161B22] px-6 py-2 border-t border-[#30363d] flex items-center justify-between text-xs text-[#8b949e] font-mono" >
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex items-center gap-2">
                <span className="opacity-40">Load:</span>
                <span className="text-green-400">0.02, 0.05, 0.08</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline opacity-40">UTF-8</span>
              <div className="flex items-center gap-2 px-2 py-0.5 bg-[#30363d]/50 rounded">
                <span className="text-blue-400">main</span>
                <span className="text-orange-400">!</span>
              </div>
            </div>
          </div >
        </div >
      </motion.div >

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {
          isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
              onClick={toggleFullscreen}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={toggleFullscreen}
                className="absolute top-6 right-6 p-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded border border-blue-500/30 transition-all z-50 shadow-2xl cursor-pointer"
              >
                <IoClose size={24} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full max-w-7xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[currentImageIndex]}
                  alt={`${title} fullscreen`}
                  fill
                  className="object-contain"
                />

                {images.length > 1 && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/80 text-blue-400 rounded-full border border-white/5 hover:bg-blue-500/10 hover:border-blue-400/30 transition-all backdrop-blur-md cursor-pointer"
                    >
                      <FaChevronLeft size={20} />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/80 text-blue-400 rounded-full border border-white/5 hover:bg-blue-500/10 hover:border-blue-400/30 transition-all backdrop-blur-md cursor-pointer"
                    >
                      <FaChevronRight size={20} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </>
  );
}

"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

import { ProjectProps } from "../../types";

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

  if (!images || images.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-7xl px-4 sm:px-6"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 shadow-2xl">
        {/* Dashboard Header */}
        <div className="bg-[#111] px-4 sm:px-6 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              <span className="text-sm font-mono text-gray-400">Deployed</span>
            </div>
            <span className="text-gray-600 text-sm">|</span>
            <span className="text-sm font-mono text-white font-bold">{title.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <div className="text-xs font-mono text-gray-500">
            ID: {number.padStart(4, '0')}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr]">
          {/* Preview Area (Image Carousel) */}
          <div className="relative aspect-video lg:aspect-21/10 border-b lg:border-b-0 lg:border-r border-white/5 bg-linear-to-br from-black to-zinc-950 group overflow-hidden">
            <div className="relative w-full h-full">
              <motion.div
                initial={false}
                animate={{ x: `-${currentImageIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex w-full h-full"
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full shrink-0 relative">
                    <Image
                      src={image}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      className="object-contain p-4"
                      style={{ objectPosition: 'center' }}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </motion.div>

              {/* Image indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Controls */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-9 z-10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="p-3 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 border border-white/10 hover:border-white/20 transition-all pointer-events-auto cursor-pointer"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="p-3 bg-black/70 backdrop-blur-sm text-white rounded-full hover:bg-black/90 border border-white/10 hover:border-white/20 transition-all pointer-events-auto cursor-pointer"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Details Panel */}
          <div className="p-6 sm:p-8 flex flex-col justify-between h-full bg-linear-to-br from-[#0c0c0c] to-[#0a0a0a]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{title}</h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 font-mono">
                {description}
              </p>

              <div className="mb-6">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-3">Environment Variables</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies?.map((tech, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-1.5 px-3 py-1.5 bg-[#0d1117] border border-blue-500/20 rounded text-xs font-mono hover:bg-blue-500/10 hover:border-blue-500/40 transition-all cursor-default"
                    >
                      <span className="text-blue-500 group-hover:text-blue-400">$</span>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-white/10">
              {demoLink && (
                <Link
                  href={demoLink}
                  target="_blank"
                  className="group relative px-4 py-2 bg-[#0d1117] border border-green-500/50 text-green-400 font-mono text-xs hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)] transition-all duration-300 flex items-center gap-2"
                >
                  <span className="text-gray-600 group-hover:text-green-500 transition-colors">./</span>
                  <span className="uppercase tracking-wider">Deploy</span>
                  <FaExternalLinkAlt size={10} className="ml-1" />
                </Link>
              )}
              {githubLink && (
                <Link
                  href={githubLink}
                  target="_blank"
                  className="group relative px-4 py-2 bg-[#0d1117] border border-gray-700 text-gray-400 font-mono text-xs hover:bg-white/5 hover:border-white/50 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <span className="text-gray-600 group-hover:text-gray-400 transition-colors">git</span>
                  <span className="uppercase tracking-wider">Source</span>
                  <FaGithub size={12} className="ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
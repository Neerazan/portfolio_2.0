"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export interface ProjectProps {
  title: string;
  number: string;
  description: string;
  technologies?: string[];
  images: string[];
  demoLink?: string;
  githubLink?: string;
}

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
      className="relative mx-auto mt-8 sm:mt-10 w-full sm:w-11/12 lg:w-14/20 px-4 sm:px-0"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative flex w-full flex-col items-start justify-center gap-6 sm:gap-8 bg-white/5 backdrop-blur-sm p-5 sm:p-8 rounded-2xl border border-white/5 md:flex-row hover:border-cyan-500/30 transition-all duration-300 shadow-2xl">
        <div className="relative w-full overflow-hidden rounded-lg md:w-1/2 aspect-video group">
          <motion.div
            initial={false}
            animate={{ x: `-${currentImageIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.5,
              velocity: 2
            }}
            className="flex w-full h-full"
          >
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${title} screenshot ${index + 1}`}
                width={1200}
                height={675}
                className="w-full h-full object-cover shrink-0"
                loading={index === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/1200x675/1c1c1c/7A87FB?text=Image+Not+Available';
                  target.onerror = null;
                }}
              />
            ))}
          </motion.div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/90 hover:bg-black/70 transition-colors z-20 cursor-pointer"
                aria-label="Previous image"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/90 hover:bg-black/70 transition-colors z-20 cursor-pointer"
                aria-label="Next image"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/75'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {
            (demoLink || githubLink) && (
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 flex gap-2 sm:gap-3">
                  {
                    demoLink && (
                      <div className="group relative">
                        <Link
                          href={demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-cyan-300 transition-colors duration-300 rounded group"
                        >
                          Live Demo
                          <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-black"></span>
                        </Link>
                      </div>
                    )
                  }
                  {
                    githubLink && (
                      <Link
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 border border-white/20 text-white font-medium text-xs sm:text-sm hover:bg-white/5 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 uppercase tracking-widest rounded"
                      >
                        GitHub
                      </Link>
                    )
                  }
                </div>
              </div>
            )
          }
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 md:w-1/2">
          <div className="flex items-center gap-3 sm:gap-4">
            <Num number={number} />
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">
              {title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-2">
            {technologies?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 sm:px-3 text-xs sm:text-sm bg-white/5 rounded-full text-gray-300 border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Num({ number }: { number: string }) {
  return (
    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md border border-[#7A87FB]/20 bg-[#151515]">
      <div className="font-['Roboto_Mono'] text-lg sm:text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
        {number}
      </div>
    </div>
  );
}
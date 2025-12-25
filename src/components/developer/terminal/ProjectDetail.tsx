import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { GridOverlay, ScanlineEffect } from "./TerminalElements";
import { SlugifiedProject } from "./types";

export const ProjectDetailView = memo(({ project, category }: { project: SlugifiedProject; category: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % project.images.length);
  }, [project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 border border-[#30363d] rounded-xl overflow-hidden bg-[#0D1117] shadow-2xl"
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] items-center">
        {/* Image Panel */}
        <div className="relative aspect-video bg-[#0D1117] overflow-hidden group flex items-center justify-center">
          <ScanlineEffect />

          {/* Preload Next/Prev Images */}
          <div className="hidden pointer-events-none" aria-hidden="true">
            {project.images.map((img) => (
              <Image
                key={`${img}-preload`}
                src={img}
                alt="preload"
                width={10}
                height={10}
                priority
              />
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center p-8 lg:p-4"
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority={currentImageIndex === 0}
                />
              </div>
              <GridOverlay />
            </motion.div>
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute cursor-pointer md:left-6 left-9 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all text-white/50 hover:text-white border border-white/5 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute cursor-pointer md:right-6 right-9 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all text-white/50 hover:text-white border border-white/5 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next image"
              >
                <FaChevronRight size={14} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                {project.images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-blue-400' : 'w-1 bg-white/20'
                      }`}
                    aria-label={`Image ${i + 1} of ${project.images.length}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Panel */}
        <div className="p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#30363d]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
              <div className="px-2 py-0.5 bg-blue-400/10 border border-blue-400/20 rounded text-[10px] text-blue-400 font-bold uppercase">
                {category}
              </div>
            </div>

            <p className="text-[#8b949e] text-sm leading-relaxed mb-8 pl-4 border-l-2 border-[#30363d]">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-4 mb-8">
                <div className="text-[10px] text-[#8b949e] uppercase font-bold tracking-widest">
                  Stack Manifest
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#161B22] border border-[#30363d] text-[#c9d1d9] text-[11px] rounded hover:border-blue-400/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-bold rounded transition-colors"
              >
                <FaExternalLinkAlt size={12} />
                Live Demo
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#161B22] border border-[#30363d] text-[#c9d1d9] hover:border-[#8b949e] text-sm font-bold rounded transition-colors"
              >
                <FaGithub size={14} />
                Source Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ProjectDetailView.displayName = 'ProjectDetailView';

"use client";

import { motion } from "framer-motion";

interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  return (
    <div
      id={id}
      className={className ? className : "mt-32 sm:mt-40 ml-6 flex items-center md:w-15/20 md:mx-auto mb-10 sm:mb-12 relative"}
    >
      {/* Title Text */}
      <h2 className="mr-4 text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-gray-400 drop-shadow-sm tracking-tight">
        {title}
      </h2>

      {/* Decorative Sparkles */}
      <div className="relative flex items-center h-full">
        <Sparkle
          color="#e5e7eb" // Light gray
          size={20}
          delay={0}
          className="relative z-10"
        />
      </div>

      {/* Modern Gradient Line */}
      <div className="h-px flex-1 mx-6 bg-linear-to-r from-gray-500/50 via-gray-600/20 to-transparent" />
    </div>
  );
}

function Sparkle({ color, size, delay, className }: { color: string; size: number; delay: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ scale: 0.8, opacity: 0.8 }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.8, 1, 0.8],
        rotate: [0, 15, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </motion.svg>
  );
}

export default Title;

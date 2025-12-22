"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  const { elementRef, isVisible } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        type: "spring" as const,
        stiffness: 200
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <motion.div
      id={id}
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className={className ? className : "mt-24 sm:mt-32 ml-6 flex items-center md:w-15/20 md:mx-auto mb-8 sm:mb-10 relative"}
    >
      {/* Title Text */}
      <motion.h2
        className="mr-3 text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-gray-400 drop-shadow-sm tracking-tight"
      >
        {title}
      </motion.h2>

      {/* Decorative Sparkle - Animated */}
      <div className="relative flex items-center h-full">
        <motion.div
          variants={sparkleVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Sparkle
            color="#e5e7eb" // Light gray
            size={20}
            className="relative z-10"
          />
        </motion.div>
      </div>

      {/* Modern Gradient Line - Animated */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="h-px flex-1 mx-6 bg-linear-to-r from-gray-500/50 via-gray-600/20 to-transparent origin-left"
      />
    </motion.div>
  );
}

function Sparkle({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
    </svg>
  );
}

export default Title;

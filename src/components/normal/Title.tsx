"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";

interface TitleProps {
  title: string;
  className?: string;
  id?: string;
}

function Title({ title, className, id }: TitleProps) {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <div
      id={id}
      ref={elementRef}
      className={`${className ? className : "mt-24 sm:mt-32 ml-6 flex items-center md:w-15/20 md:mx-auto mb-8 sm:mb-10 relative"} reveal ${isVisible ? "active" : ""}`}
    >
      {/* Title Text */}
      <h2
        className="mr-3 text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-gray-400 drop-shadow-sm tracking-tight"
      >
        {title}
      </h2>

      {/* Decorative Sparkle - Animated via CSS transition */}
      <div className="relative flex items-center h-full">
        <div
          className={`transform transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'}`}
        >
          <Sparkle
            color="#e5e7eb" // Light gray
            size={20}
            className="relative z-10"
          />
        </div>
      </div>

      {/* Modern Gradient Line - Animated via CSS transition */}
      <div
        className={`h-px flex-1 mx-6 bg-linear-to-r from-gray-500/50 via-gray-600/20 to-transparent origin-left transition-all duration-700 delay-200 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
      />
    </div>
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


"use client";

import { useState, useId } from 'react';
import { motion } from 'framer-motion';

const GlowingIcon = ({ className = '', size = 14, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const uniqueId = useId();
  const gradientId = `starGradient-${uniqueId}`;
  const glowId = `starGlow-${uniqueId}`;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-7 h-7 
        sm:w-6 sm:h-6 
        md:w-6 md:h-6 
        lg:w-9 lg:h-9
        cursor-pointer 
        transition-all duration-300 ease-in-out
        ${className} 
        ${isHovered ? 'scale-110' : 'scale-100'}
      `}
      style={{
        filter: isHovered 
          ? 'drop-shadow(0 0 12px rgba(122, 135, 251, 0.8)) drop-shadow(0 0 20px rgba(255, 212, 156, 0.6))' 
          : 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.4))',
      }}
      {...props}
    >
      <defs>
        <linearGradient 
          id={gradientId} 
          x1="0%" 
          y1="0%" 
          x2="100%" 
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop 
            offset="0%" 
            stopColor="#FFD49C" 
            stopOpacity="1"
            animate={{
              stopColor: isHovered ? ['#FFD49C', '#FFF5E1', '#FFD49C'] : '#FFD49C'
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.stop 
            offset="100%" 
            stopColor="#7A87FB" 
            stopOpacity="1"
            animate={{
              stopColor: isHovered ? ['#7A87FB', '#A5B4FC', '#7A87FB'] : '#7A87FB'
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </linearGradient>

        {/* Radial gradient for glow effect */}
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
          <stop offset="50%" stopColor="rgba(122, 135, 251, 0.4)" />
          <stop offset="100%" stopColor="rgba(255, 212, 156, 0)" />
        </radialGradient>

        {/* Blur filter for soft glow */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow circle - animated */}
      <motion.circle
        cx="7"
        cy="7"
        r="6"
        fill={`url(#${glowId})`}
        opacity={isHovered ? 0.6 : 0.3}
        animate={{
          scale: isHovered ? [1, 1.2, 1] : 1,
          opacity: isHovered ? [0.6, 0.8, 0.6] : [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main star path with shimmer effect */}
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 14C6.986 10.1388 3.85739 7.01297 0 7.01297C3.86599 7.01297 7 3.87312 7 0C7.01394 3.86124 10.1426 6.98703 14 6.98703C10.1339 6.98703 7 10.1269 7 14Z"
        fill={isHovered ? `url(#${gradientId})` : '#FFFFFF'}
        filter="url(#glow)"
        animate={{
          opacity: isHovered ? [1, 0.85, 1] : 1
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Sparkle effect on hover */}
      {isHovered && (
        <>
          <motion.circle
            cx="7"
            cy="2"
            r="1"
            fill="#FFFFFF"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0
            }}
          />
          <motion.circle
            cx="12"
            cy="7"
            r="0.8"
            fill="#FFD49C"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.3
            }}
          />
          <motion.circle
            cx="2"
            cy="7"
            r="0.8"
            fill="#7A87FB"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.6
            }}
          />
        </>
      )}
    </motion.svg>
  );
};

export default GlowingIcon;

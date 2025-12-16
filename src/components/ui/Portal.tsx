"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export interface PortalProps {
  src: string;
  className?: string;
}

const glowColors = [
  "#FFD49C", // warm orange
  "#64FFDA", // teal
  "#FF6B6B", // coral
  "#A78BFA", // purple
  "#48BB78", // green
  "#4299E1", // blue
  "#F6E05E", // yellow
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * glowColors.length);
  return glowColors[randomIndex];
};

const GlowEffect = ({ src, className = "" } : { src: string, className?: string }) => {
  const [hoverColor, setHoverColor] = useState(getRandomColor());
  const imgRef = useRef(null);

  // Change color every 3 seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setHoverColor(getRandomColor());
    }, 3000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt="Portal"
      className={`transform transition-all duration-300 animate-pulse ${className}`}
      style={{
        filter: `brightness(0.4) saturate(1.3) drop-shadow(0 0 2rem ${hoverColor}) drop-shadow(0 0 4rem ${hoverColor}) drop-shadow(0 0 6rem ${hoverColor})`
      }}
      width={500}
      height={500}
    />
  );
};

export default GlowEffect;

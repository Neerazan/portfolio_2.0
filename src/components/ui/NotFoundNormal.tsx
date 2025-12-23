"use client";

import GlowingIcon from "@/src/components/ui/Star";
import StarBackground from "@/src/components/ui/StarBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoHome } from "react-icons/io5";

export default function NotFoundNormal() {
  return (
    <div className="h-screen bg-[#101111] text-white overflow-hidden flex flex-col items-center justify-center relative">
      {/* Responsive Background grid */}
      <div className="absolute inset-0">
        {/* Mobile: 4x4 grid */}
        <div className="md:hidden grid grid-cols-4 grid-rows-4 h-full opacity-15">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-white/10" />
          ))}
        </div>

        {/* Tablet+: 5x5 grid */}
        <div className="hidden md:grid lg:hidden grid-cols-5 grid-rows-5 h-full opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="border border-white/15" />
          ))}
        </div>

        {/* Desktop: 6x6 grid */}
        <div className="hidden lg:grid grid-cols-6 grid-rows-6 h-full opacity-20">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-white/20" />
          ))}
        </div>
      </div>

      {/* Glowing Stars positioned at grid intersections */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        <div
          className="absolute z-30"
          style={{
            left: "75%",
            top: "25%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="scale-75">
            <GlowingIcon />
          </div>
        </div>
        <div
          className="absolute z-30"
          style={{
            left: "25%",
            top: "75%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="scale-75">
            <GlowingIcon />
          </div>
        </div>
      </div>

      <div className="hidden md:block lg:hidden absolute inset-0">
        <div
          className="absolute z-30"
          style={{
            left: "80%",
            top: "20%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <GlowingIcon />
        </div>
        <div
          className="absolute z-30"
          style={{
            left: "20%",
            top: "80%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <GlowingIcon />
        </div>
      </div>

      <div className="hidden lg:block absolute inset-0">
        <div
          className="absolute z-30"
          style={{
            left: "66.66%",
            top: "16.66%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <GlowingIcon />
        </div>
        <div
          className="absolute z-30"
          style={{
            left: "16.66%",
            top: "66.66%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <GlowingIcon />
        </div>
      </div>

      {/* Star Background */}
      <StarBackground />

      {/* Animated 404 Text */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-7xl sm:text-8xl md:text-9xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/95 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto leading-relaxed"
        >
          Oops! It looks like you&apos;ve wandered into uncharted territory. The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 rounded-full text-white font-medium text-base overflow-hidden cursor-pointer group flex items-center justify-center gap-2"
            >
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full p-0.5">
                <div className="w-full h-full bg-[#101111] rounded-full" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <IoHome className="relative z-10 w-5 h-5" />
              <span className="relative z-10">Go Home</span>
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 rounded-full text-white font-medium text-base overflow-hidden cursor-pointer group flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 rounded-full p-0.5">
              <div className="w-full h-full bg-[#101111] rounded-full" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-pink-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <IoArrowBack className="relative z-10 w-5 h-5" />
            <span className="relative z-10">Go Back</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative animated shapes */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-400/20 rounded-lg pointer-events-none hidden md:block"
      />

      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-10 right-10 w-32 h-32 border-2 border-cyan-400/20 rounded-full pointer-events-none hidden md:block"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/4 w-24 h-24 border border-pink-400/20 pointer-events-none hidden lg:block"
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
      />
    </div>
  );
}

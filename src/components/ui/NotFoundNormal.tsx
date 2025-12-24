"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IoArrowBack, IoHome } from "react-icons/io5";

export default function NotFoundNormal() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative overflow-hidden font-display selection:bg-indigo-500/30">
      {/* Background Grid Overlay - Consistent with Hero */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay will-change-transform"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        {/* Animated 404 Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-gray-600" />
            <span className="text-gray-500 font-medium tracking-[0.2em] uppercase text-xs sm:text-sm">
              Error Profile: 404
            </span>
            <div className="h-px w-10 bg-gray-600" />
          </div>

          <h1 className="font-bold tracking-tighter text-7xl sm:text-8xl md:text-9xl text-white leading-none mb-6">
            <span className="block transition-colors duration-500 cursor-default">
              LOST
            </span>
            <span className="block text-gray-500 transition-colors duration-500 cursor-default">
              IN SPACE
            </span>
          </h1>

          <div className="max-w-md mx-auto mb-10">
            <p className="text-base sm:text-lg text-gray-400 font-light leading-relaxed">
              The page you are looking for has either been moved to another dimension or never existed in this timeline.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="w-full sm:w-auto overflow-hidden">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-wide text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 rounded cursor-pointer group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <IoHome className="w-4 h-4" />
                  Return Home
                </span>
                <div className="absolute inset-0 bg-indigo-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </motion.button>
            </Link>

            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3 border border-white/20 text-white font-medium uppercase tracking-wide text-xs sm:text-sm hover:bg-white/5 hover:border-indigo-400/50 hover:text-indigo-400 transition-all duration-300 flex items-center justify-center gap-2 rounded cursor-pointer"
            >
              <IoArrowBack className="w-4 h-4" />
              Go Back
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Minimalist Accents */}
      <div className="absolute bottom-12 left-12 hidden lg:block overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="w-32 h-px bg-linear-to-r from-white/20 to-transparent" />
          <div className="w-24 h-px bg-linear-to-r from-white/10 to-transparent" />
        </div>
      </div>

      <div className="absolute top-12 right-12 hidden lg:block overflow-hidden">
        <div className="flex flex-col items-end gap-2">
          <div className="w-32 h-px bg-linear-to-l from-white/20 to-transparent" />
          <div className="w-48 h-px bg-linear-to-l from-white/10 to-transparent" />
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-gray-600 text-[10px] uppercase tracking-[0.3em] font-light"
      >
        Dhakal Systems Protocol — 404_NULL_REF
      </motion.p>
    </div>
  );
}

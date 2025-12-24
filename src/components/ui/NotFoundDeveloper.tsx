"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAlertCircle, IoArrowBack, IoHome, IoTerminal } from "react-icons/io5";

const ASCII_404 = `    _  _    ___  _  _   
   | || |  / _ \\| || |  
   | || |_| | | | || |_ 
   |__   _| | | |__   _|
      | | | |_| |  | |  
      |_|  \\___/   |_|  
`;

export default function NotFoundDeveloper() {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    "Initializing recovery sequence...",
    "Scanning local directory for requested resource...",
    "Error: Resource not found (HTTP 404)",
    "Consulting local documentation...",
    "Self-diagnostic: Complete. Systems operational.",
    "Recommendation: Return to safety.",
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        {/* Terminal Header */}
        <div className="bg-[#161B22] backdrop-blur-sm rounded-t-lg border border-white/10 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-[10px] sm:text-xs text-gray-400 truncate ml-2">
            sh — system-panic — 80x24
          </div>
          <IoTerminal className="text-gray-500 text-sm sm:text-base shrink-0" />
        </div>

        {/* Terminal Body */}
        <div className="bg-[#0D1117] backdrop-blur-sm rounded-b-lg border-x border-b border-white/10 p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] overflow-x-auto">
          <div className="text-[10px] sm:text-xs md:text-sm leading-relaxed">
            <div className="text-blue-400 mb-3 sm:mb-4">➜ ~ cat /var/log/last_visit.log</div>

            <pre className="text-red-400 mb-4 sm:mb-6 text-[8px] sm:text-[10px] md:text-xs leading-tight overflow-x-auto">
              {ASCII_404}
            </pre>

            {lines.slice(0, currentLine).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-1 sm:mb-2 wrap-break-words"
              >
                <span className="text-gray-500 text-[9px] sm:text-[10px]">
                  [{new Date().toLocaleTimeString()}]
                </span>{" "}
                {line}
              </motion.div>
            ))}

            {currentLine < lines.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-1 sm:mb-2 wrap-break-words"
              >
                <span className="text-gray-500 text-[9px] sm:text-[10px]">
                  [{new Date().toLocaleTimeString()}]
                </span>
                <span className="animate-pulse"> ▊</span>
              </motion.div>
            )}

            {currentLine === lines.length && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="my-4 sm:my-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 flex items-start gap-2 sm:gap-3"
                >
                  <IoAlertCircle className="shrink-0 mt-0.5 text-base sm:text-lg" />
                  <span className="text-[10px] sm:text-xs md:text-sm wrap-break-words">
                    The route you requested does not exist in our system registry.
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6"
                >
                  <Link href="/" className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 sm:px-6 py-2 sm:py-2.5 border border-white/10 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      <IoHome className="shrink-0" />
                      <span>--home</span>
                    </motion.div>
                  </Link>

                  <motion.div
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 border border-white/10 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <IoArrowBack className="shrink-0" />
                    <span>--back</span>
                  </motion.div>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-gray-600"
        >
          Dhakal Recovery Mode v4.0.4 - Unauthorized Access is a Feature
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAlertCircle, IoArrowBack, IoHome, IoTerminal } from "react-icons/io5";

const ASCII_404 = `
  _  _    ___   _  _ 
 | || |  / _ \\ | || |
 | || |_| | | | | || |_
 |__   _| | | | |__   _|
    | | | |_| |    | |
    |_|  \\___/     |_|
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
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines.length]);

  return (
    <div className="h-screen bg-[#0a0a0a] text-gray-300 font-mono p-4 sm:p-8 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[#0D1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-fit"
      >
        {/* Terminal Header */}
        <div className="bg-[#161B22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium opacity-60">
            <IoTerminal className="w-4 h-4" />
            sh — system-panic — 80x24
          </div>
          <div className="w-10" />
        </div>

        {/* Terminal Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-green-400">
            <span>➜</span><span className="text-blue-400">~</span>
            <span className="text-gray-100">cat /var/log/last_visit.log</span>
          </div>

          <div className="text-red-400 whitespace-pre font-bold leading-none scale-75 sm:scale-100 origin-left">
            {ASCII_404}
          </div>

          <div className="space-y-1">
            {lines.slice(0, currentLine).map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                <span className={line.includes("Error") ? "text-red-400" : "text-gray-400"}>
                  {line}
                </span>
              </div>
            ))}
            {currentLine < lines.length && (
              <div className="flex gap-3">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                <span className="w-2 h-5 bg-white/50 animate-pulse" />
              </div>
            )}
          </div>

          {currentLine === lines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-6 border-t border-white/5 space-y-4"
            >
              <div className="flex items-center gap-3 text-yellow-500/80">
                <IoAlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">The route you requested does not exist in our system registry.</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 border border-white/10 rounded-lg flex items-center gap-2 text-sm transition-colors cursor-pointer"
                  >
                    <IoHome className="w-4 h-4 text-blue-400" />
                    <span>--home</span>
                  </motion.button>
                </Link>

                <motion.button
                  onClick={() => window.history.back()}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2 border border-white/10 rounded-lg flex items-center gap-2 text-sm transition-colors cursor-pointer"
                >
                  <IoArrowBack className="w-4 h-4 text-green-400" />
                  <span>--back</span>
                </motion.button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 text-gray-600 text-[10px] uppercase tracking-[0.2em]"
      >
        Antigravity Recovery Mode v4.0.4 - Unauthorized Access is a Feature
      </motion.p>
    </div>
  );
}

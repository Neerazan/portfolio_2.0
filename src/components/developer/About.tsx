"use client";

import { motion } from "framer-motion";
import { FaBolt, FaCode, FaDatabase, FaNetworkWired, FaServer, FaShieldAlt } from "react-icons/fa";

export default function About() {
  const systemSpecs = [
    { label: "OS", value: "NirajanOS v2.4" },
    { label: "KERNEL", value: "JavaScript / Python / Go" },
    { label: "ROLE", value: "Full Stack Engineer" },
    { label: "LOCATION", value: "Kathmandu, Nepal" },
    { label: "UPTIME", value: "Always Learning" },
    { label: "ARCHITECTURE", value: "Microservices / Serverless" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-0 bg-[#0a0a0a] text-gray-300 relative overflow-hidden">
      {/* Background Code Texture */}
      <div className="absolute top-0 right-0 p-10 opacity-5 font-mono text-xs hidden lg:block pointer-events-none select-none">
        {`
class Engineer {
  constructor() {
    this.name = "Nirajan";
    this.passion = "Building";
  }
}
         `}
      </div>

      <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 items-start">
        {/* Left Col: System Specs (Bio) - Wider Span */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 w-full"
        >
          <div className="w-full bg-[#0d1117] rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm relative z-10 group hover:border-gray-700 transition-colors">
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-gray-800 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50" />
              </div>
              <div className="text-gray-500 text-xs font-medium flex items-center gap-1.5 opacity-60">
                <span>zsh — nirajan@portfolio — 80x24</span>
              </div>
              <div className="w-10" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 text-gray-300 space-y-6 font-mono leading-relaxed bg-[#0d1117]/95 backdrop-blur-sm">

              {/* Neofetch Block */}
              <div>
                {/* Command Input */}
                <div className="flex items-center gap-2 text-green-400 mb-4">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-100">neofetch</span>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 items-start">
                  {/* ASCII Logo */}
                  <div className="text-blue-500 font-bold select-none leading-[1.15] hidden sm:block font-mono whitespace-pre text-xs sm:text-sm">
                    {`
      z$$$$$$.
    $$$$$$$$$$
   $$$$$$$$$$$
  $$$$$$$$$$$$
 $$$$$$$$$$$$$
$$$$$$$$$$$$$$
$$$$$$"  "$$$$
"$$$"      "$$
                    `}
                  </div>

                  {/* System Info */}
                  <div className="space-y-1.5 text-xs sm:text-sm font-mono">
                    {systemSpecs.map((spec, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="text-green-400 font-bold min-w-[70px] uppercase text-[10px] sm:text-xs tracking-wider">{spec.label}</span>
                        <span className="text-gray-300">{spec.value}</span>
                      </div>
                    ))}

                    {/* Color Palette */}
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800 w-full max-w-[200px]">
                      <div className="w-4 h-4 bg-black rounded-xs"></div>
                      <div className="w-4 h-4 bg-red-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-blue-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-purple-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-cyan-500 rounded-xs"></div>
                      <div className="w-4 h-4 bg-gray-200 rounded-xs"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Info Block */}
              <div className="space-y-2 pt-2 border-t border-gray-800/50">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span className="text-green-400">➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-100">cat bio.txt</span>
                </div>
                <div className="text-gray-400 leading-relaxed pl-5 text-sm">
                  <p className="mb-4">
                    <span className="text-orange-400 opacity-80">&gt; info:</span> I am a software engineer focused on <span className="text-gray-100">backend architecture</span> and <span className="text-gray-100">cloud infrastructure</span>.
                  </p>
                  <p>
                    My system is optimized for building scalable applications. I blend technical precision with creative problem-solving to deliver high-performance digital solutions.
                  </p>
                </div>
              </div>

              {/* Active Prompt */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <span className="w-2.5 h-4 bg-gray-500 animate-pulse block" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Modules - Compact & Narrower */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 w-full pt-4 lg:pt-0"
        >
          <h3 className="text-xl font-mono text-gray-500 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            INSTALLED_MODULES
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {[
              { name: "Backend Logic", icon: FaServer, color: "text-green-400" },
              { name: "Database Design", icon: FaDatabase, color: "text-yellow-400" },
              { name: "Cloud Native", icon: FaNetworkWired, color: "text-blue-400" },
              { name: "System Security", icon: FaShieldAlt, color: "text-red-400" },
              { name: "clean_code.js", icon: FaCode, color: "text-orange-400" },
              { name: "Optimization", icon: FaBolt, color: "text-orange-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="bg-[#151515] p-3 rounded border border-white/5 hover:border-white/20 transition-all flex items-center gap-3 group cursor-default"
              >
                <div className={`p-1.5 bg-white/5 rounded ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <item.icon className="text-sm" />
                </div>
                <span className="font-mono text-xs sm:text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

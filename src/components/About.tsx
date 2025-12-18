"use client";

import { motion } from "framer-motion";
import { FaBolt, FaCode, FaDatabase, FaNetworkWired, FaServer, FaShieldAlt } from "react-icons/fa";
import { HiChip } from "react-icons/hi";

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
    <div className="mx-auto max-w-7xl px-6 py-20 bg-[#0a0a0a] text-gray-300 relative overflow-hidden">
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

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Col: System Specs (Bio) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <HiChip className="text-4xl text-cyan-400" />
            <h2 className="text-3xl font-bold tracking-tighter text-white">
              SYSTEM <span className="text-purple-400">SPECS</span>
            </h2>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-xl p-6 font-mono text-sm relative overflow-hidden group">
            {/* Gloss effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4 relative z-10">
              {systemSpecs.map((spec, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="text-cyan-400">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-gray-400 leading-relaxed font-sans">
              <p className="mb-4">
                <span className="text-purple-400 font-mono">&gt; info:</span> I am a software engineer focused on <span className="text-white">backend architecture</span> and <span className="text-white">cloud infrastructure</span>.
              </p>
              <p>
                My system is optimized for building scalable applications. I blend technical precision with creative problem-solving to deliver high-performance digital solutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Modules (What Drives Me) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-mono text-gray-500 mb-8 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            INSTALLED_MODULES
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Backend Logic", icon: FaServer, color: "text-green-400" },
              { name: "Database Design", icon: FaDatabase, color: "text-yellow-400" },
              { name: "Cloud Native", icon: FaNetworkWired, color: "text-cyan-400" },
              { name: "System Security", icon: FaShieldAlt, color: "text-red-400" },
              { name: "clean_code.js", icon: FaCode, color: "text-purple-400" },
              { name: "Optimization", icon: FaBolt, color: "text-orange-400" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-[#151515] p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors flex items-center gap-3"
              >
                <div className={`p-2 bg-white/5 rounded ${item.color}`}>
                  <item.icon />
                </div>
                <span className="font-mono text-sm text-gray-300">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

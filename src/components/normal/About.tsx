"use client";

import { motion } from "framer-motion";
import { FaBolt, FaCode, FaCubes, FaGraduationCap, FaRocket, FaUsers } from "react-icons/fa";


export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 bg-transparent text-gray-300 relative">



      <div className="max-w-4xl mx-auto sm:px-6 mb-12 sm:mb-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 md:p-10 bg-white/5 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-300">
              I&apos;m <span className="text-cyan-400 font-semibold">
                Nirajan Dhakal
              </span>, a software engineer focused on full-stack development, cloud computing, and system design.
              I enjoy building scalable applications, optimizing performance, and solving complex problems.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mt-6"
            >
              <p className="text-gray-300">
                I graduated from <span className="text-cyan-400 font-semibold">Asia Pacific University of Innovation and Technology</span> with a BSc in Information Technology, where I built real-world projects and gained experience in system design, performance optimization, and developing scalable applications.
              </p>
            </motion.div>
          </div>


          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
              What Drives Me
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
              I believe in writing clean, maintainable code and building systems that not only work today but scale for tomorrow. My approach combines technical excellence with a user-first mindset.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { name: "Clean Code", desc: "Writing maintainable, scalable solutions", icon: FaCode },
                { name: "Innovation", desc: "Exploring new technologies", icon: FaRocket },
                { name: "Performance", desc: "Optimizing for speed & efficiency", icon: FaBolt },
                { name: "User Focus", desc: "Building intuitive experiences", icon: FaUsers },
                { name: "System Design", desc: "Architecting robust systems", icon: FaCubes },
                { name: "Continuous Learning", desc: "Always improving my craft", icon: FaGraduationCap },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 sm:p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group flex items-center gap-4 hover:bg-white/10"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400/80 group-hover:text-cyan-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}

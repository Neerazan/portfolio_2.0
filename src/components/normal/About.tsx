"use client";

import { FaBolt, FaCode, FaCubes, FaGraduationCap, FaRocket, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 bg-transparent text-gray-300 relative">
      <div className="max-w-4xl mx-auto sm:px-6 mb-12 sm:mb-24 z-10">
        <div className="p-6 sm:p-8 md:p-10 bg-[#151520]/95 rounded-2xl shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
          <div className="mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-300">
              I&apos;m <span className="text-white font-semibold">
                Nirajan Dhakal
              </span>, a software engineer focused on full-stack development, cloud computing, and system design.
              I enjoy building scalable applications, optimizing performance, and solving complex problems.
            </p>

            <div className="space-y-4 mt-6">
              <p className="text-gray-300">
                I graduated from <span className="text-white font-semibold">Asia Pacific University of Innovation and Technology</span> with a BSc in Information Technology, where I built real-world projects and gained experience in system design, performance optimization, and developing scalable applications.
              </p>
            </div>
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
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-[#151520]/95 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group flex items-center gap-4 hover:bg-white/10"
                >
                  <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-indigo-400 transition-colors" />
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

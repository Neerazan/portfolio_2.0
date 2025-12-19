"use client";
import { motion } from 'framer-motion';
import { DiRedis } from "react-icons/di";
import {
  FaAws,
  FaDocker,
  FaGitAlt,
  FaNode,
  FaReact
} from 'react-icons/fa';
import {
  SiDjango,
  SiFastapi,
  SiGithubactions,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  version: string; // Mock version for aesthetic
}

interface DependencyGroup {
  category: string; // "dependencies", "devDependencies", etc.
  skills: Skill[];
}

const techStack: DependencyGroup[] = [
  {
    category: "dependencies", // Frontend
    skills: [
      { name: "react", icon: FaReact, version: "^18.3.1" },
      { name: "next", icon: SiNextdotjs, version: "^14.2.0" },
      { name: "typescript", icon: SiTypescript, version: "^5.4.0" },
      { name: "tailwindcss", icon: SiTailwindcss, version: "^3.4.1" },
      { name: "redux", icon: SiRedux, version: "^9.1.0" },
    ]
  },
  {
    category: "peerDependencies", // Backend
    skills: [
      { name: "node", icon: FaNode, version: "^20.12.0" },
      { name: "django", icon: SiDjango, version: "^5.0.3" },
      { name: "fastapi", icon: SiFastapi, version: "^0.110.0" },
      { name: "nestjs", icon: SiNestjs, version: "^10.3.0" },
      { name: "postgresql", icon: SiPostgresql, version: "^16.2" },
      { name: "redis", icon: DiRedis, version: "^7.2.0" },
    ]
  },
  {
    category: "devDependencies", // Tools
    skills: [
      { name: "git", icon: FaGitAlt, version: "^2.44.0" },
      { name: "docker", icon: FaDocker, version: "^26.0.0" },
      { name: "aws-sdk", icon: FaAws, version: "^3.5.0" },
      { name: "github-actions", icon: SiGithubactions, version: "^4.0.0" },
    ]
  }
];

export default function TechStack() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-20 bg-[#0a0a0a]">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px w-10 bg-blue-500" />
        <h2 className="text-xl font-mono text-blue-400">package.json</h2>
      </div>

      <div className="bg-[#151515] rounded-xl border border-white/5 p-6 sm:p-10 font-mono text-sm shadow-2xl overflow-hidden relative">
        {/* Line Numbers Decoration */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/2 border-r border-white/5 flex-col items-end pr-3 pt-6 text-gray-700 select-none hidden sm:flex">
          {Array.from({ length: 25 }).map((_, i) => (
            <span key={i} className="leading-7">{i + 1}</span>
          ))}
        </div>

        <div className="sm:pl-12 relative z-10">
          <span className="text-gray-500">{"{"}</span>
          <div className="pl-4 sm:pl-8 space-y-6 mt-2">

            <div className="mb-4">
              <span className="text-green-400">&quot;name&quot;</span>: <span className="text-yellow-300">&quot;nirajan-dhakal-portfolio&quot;</span>,
              <br />
              <span className="text-green-400">&quot;version&quot;</span>: <span className="text-yellow-300">&quot;2.0.0&quot;</span>,
              <br />
              <span className="text-green-400">&quot;author&quot;</span>: <span className="text-yellow-300">&quot;Nirajan Dhakal&quot;</span>,
            </div>

            {techStack.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: groupIndex * 0.2 }}
              >
                <span className="text-green-400">&quot;{group.category}&quot;</span>: <span className="text-yellow-300">{"{"}</span>

                <div className="pl-4 sm:pl-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8 py-2">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 group cursor-default"
                    >
                      <span className="text-blue-400 group-hover:text-blue-300 transition-colors">&quot;{skill.name}&quot;</span>
                      <span className="text-white">:</span>
                      <span className="text-orange-300">&quot;{skill.version}&quot;</span>
                      <span className="text-gray-600">,</span>

                      {/* Hover Icon Reveal */}
                      <skill.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>

                <span className="text-yellow-300">{"}"}</span><span className="text-gray-500">,</span>
              </motion.div>
            ))}

          </div>
          <span className="text-gray-500">{"}"}</span>
        </div>
      </div>
    </div>
  );
}

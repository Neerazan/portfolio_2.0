"use client";

import { motion } from "framer-motion";
import { DiRedis } from "react-icons/di";
import {
  FaAws,
  FaDocker,
  FaGitAlt,
  FaNode,
  FaReact,
} from "react-icons/fa";
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
} from "react-icons/si";
import { VscClose, VscJson } from "react-icons/vsc";

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; title?: string }>;
  version: string;
}

interface DependencyGroup {
  category: string;
  description: string;
  skills: Skill[];
}

const techStack: DependencyGroup[] = [
  {
    category: "dependencies",
    description: "// Frontend libraries",
    skills: [
      { name: "react", icon: FaReact, version: "^18.3.1" },
      { name: "next", icon: SiNextdotjs, version: "^14.2.0" },
      { name: "typescript", icon: SiTypescript, version: "^5.4.0" },
      { name: "tailwindcss", icon: SiTailwindcss, version: "^3.4.1" },
      { name: "redux", icon: SiRedux, version: "^9.1.0" },
    ],
  },
  {
    category: "peerDependencies",
    description: "// Backend / APIs",
    skills: [
      { name: "node", icon: FaNode, version: "^20.12.0" },
      { name: "django", icon: SiDjango, version: "^5.0.3" },
      { name: "fastapi", icon: SiFastapi, version: "^0.110.0" },
      { name: "nestjs", icon: SiNestjs, version: "^10.3.0" },
      { name: "postgresql", icon: SiPostgresql, version: "^16.2" },
      { name: "redis", icon: DiRedis, version: "^7.2.0" },
    ],
  },
  {
    category: "devDependencies",
    description: "// Tools / DevOps",
    skills: [
      { name: "git", icon: FaGitAlt, version: "^2.44.0" },
      { name: "docker", icon: FaDocker, version: "^26.0.0" },
      { name: "aws-sdk", icon: FaAws, version: "^3.5.0" },
      { name: "github-actions", icon: SiGithubactions, version: "^4.0.0" },
    ],
  },
];

const learning = [
  "Generative AI",
  "Cloud Infrastructure",
  "System Design",
];

export default function TechStack() {
  // Calculate exact line count
  let lineCount = 0;
  lineCount += 1; // {
  lineCount += 3; // name, version, author
  lineCount += 1; // blank line

  techStack.forEach((group) => {
    lineCount += 1; // comment
    lineCount += 1; // category opening
    lineCount += group.skills.length; // each skill
    lineCount += 1; // closing }
    lineCount += 1; // blank line
  });

  lineCount += 1; // learning comment
  lineCount += 1; // "learning": [
  lineCount += learning.length; // each learning item
  lineCount += 1; // ]
  lineCount += 1; // final }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      {/* VS Code Tab Header */}
      <div className="bg-[#1f1f1f] rounded-t-lg border-b border-[#252525] flex items-center justify-between px-2 py-1.5 shadow-lg">
        <div className="flex items-center gap-2 bg-[#151515] px-4 py-2 rounded-t border-t-2 border-t-blue-500">
          <VscJson className="text-yellow-400 text-lg" />
          <span className="text-gray-300 text-sm font-medium">
            skillsManifest.json
          </span>
          <VscClose className="text-gray-500 hover:text-gray-300 hover:bg-[#252525] rounded cursor-pointer ml-6 transition-colors" />
        </div>
        <div className="flex gap-2 mr-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer transition-colors"></div>
        </div>
      </div>

      {/* Main Editor Window */}
      <div className="bg-[#151515] rounded-b-lg flex overflow-hidden font-mono text-sm border-x border-b border-[#252525] shadow-2xl">
        {/* Line Numbers */}
        <div className="bg-[#151515] text-gray-600 text-right pr-4 pl-4 py-6 select-none border-r border-[#252525] min-w-[60px]">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div
              key={i}
              className="h-6 flex items-center justify-end hover:text-gray-400 transition-colors"
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 py-6 px-6 overflow-x-auto">
          <div className="leading-6">
            <span className="text-gray-500">{"{"}</span>
            <br />
            <span className="text-blue-400 ml-4">{"\""}name{"\""}</span>
            <span className="text-gray-500">:{" "}</span>
            <span className="text-orange-400">{"\""}nirajan-dhakal-portfolio{"\""}</span>
            <span className="text-gray-500">,</span>
            <br />
            <span className="text-blue-400 ml-4">{"\""}version{"\""}</span>
            <span className="text-gray-500">:{" "}</span>
            <span className="text-orange-400">{"\""}2.0.0{"\""}</span>
            <span className="text-gray-500">,</span>
            <br />
            <span className="text-blue-400 ml-4">{"\""}author{"\""}</span>
            <span className="text-gray-500">:{" "}</span>
            <span className="text-orange-400">{"\""}Nirajan Dhakal{"\""}</span>
            <span className="text-gray-500">,</span>
            <br />
            <br />

            {techStack.map((group, groupIndex) => (
              <div key={groupIndex}>
                <span className="text-green-400 ml-4">
                  {group.description}
                </span>
                <br />
                <span className="text-blue-400 ml-4">{"\""}{group.category}{"\""}</span>
                <span className="text-gray-500">:{" "}</span>
                <span className="text-gray-500">{"{"}</span>
                <br />
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group ml-8 flex items-center gap-3 hover:bg-[#1f1f1f] h-6 px-3 -mx-3 rounded transition-all cursor-pointer"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: (groupIndex * 0.1) + (index * 0.04),
                    }}
                    viewport={{ once: true, margin: "-20px" }}
                  >
                    <skill.icon
                      className="text-lg transition-transform group-hover:scale-125 group-hover:rotate-6 shrink-0"
                      title={skill.name}
                    />
                    <span className="text-blue-400">{"\""}{skill.name}{"\""}</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-orange-400">{"\""}{skill.version}{"\""}</span>
                    <span className="text-gray-500">,</span>
                  </motion.div>
                ))}
                <span className="text-gray-500 ml-4">{"}"}</span>
                <span className="text-gray-500">,</span>
                <br />
                <br />
              </div>
            ))}

            {/* Learning Section */}
            <span className="text-green-400 ml-4">
              {"// Currently exploring"}
            </span>
            <br />
            <span className="text-blue-400 ml-4">{"\""}learning{"\""}</span>
            <span className="text-gray-500">:{" "}</span>
            <span className="text-gray-500">[</span>
            <br />
            {learning.map((item, index) => (
              <motion.div
                key={item}
                className="ml-8 h-6 flex items-center"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.5 + (index * 0.05),
                }}
                viewport={{ once: true, margin: "-20px" }}
              >
                <span className="text-orange-400">{"\""}{item}{"\""}</span>
                {index < learning.length - 1 ? (
                  <span className="text-gray-500">,</span>
                ) : (
                  ""
                )}
              </motion.div>
            ))}
            <span className="text-gray-500 ml-4">]</span>
            <br />
            <span className="text-gray-500">{"}"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

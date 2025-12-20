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
  SiTypescript
} from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'primary' | 'secondary';
}

interface Tech {
  category: string;
  description: string;
  skills: Skill[];
}

const technologies: Tech[] = [
  {
    category: "Frontend",
    description: "Building responsive and interactive user interfaces",
    skills: [
      { name: "React", icon: FaReact, type: "primary" },
      { name: "Next.js", icon: SiNextdotjs, type: "primary" },
      { name: "TailwindCSS", icon: SiTailwindcss, type: "primary" },
      { name: "TypeScript", icon: SiTypescript, type: "secondary" },
      { name: "Redux", icon: SiRedux, type: "secondary" },
    ]
  },
  {
    category: "Backend",
    description: "Developing scalable server-side applications",
    skills: [
      { name: "Node.js", icon: FaNode, type: "primary" },
      { name: "Django", icon: SiDjango, type: "primary" },
      { name: "FastAPI", icon: SiFastapi, type: "primary" },
      { name: "Nest.js", icon: SiNestjs, type: "primary" },
      { name: "PostgreSQL", icon: SiPostgresql, type: "secondary" },
    ]
  },
  {
    category: "Tools & DevOps",
    description: "Streamlining development and deployment workflows",
    skills: [
      { name: "Git", icon: FaGitAlt, type: "primary" },
      { name: "Docker", icon: FaDocker, type: "primary" },
      { name: "AWS", icon: FaAws, type: "secondary" },
      { name: "CI/CD", icon: SiGithubactions, type: "secondary" },
      { name: "Redis", icon: DiRedis, type: "secondary" },
    ]
  }
];

export default function TechStack() {
  return (
    <div className="mx-auto mb-12 sm:mb-24 w-full px-4 sm:px-6 sm:w-15/20">
      <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group rounded-xl sm:rounded-3xl bg-white/5 backdrop-blur-sm p-px hover:shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className="h-full rounded-xl sm:rounded-3xl bg-transparent p-3 sm:p-6 transition-all duration-300">
              <h3 className="mb-2 text-base sm:text-xl font-bold text-white">
                {tech.category}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-6">{tech.description}</p>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {tech.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-200 border border-white/5 hover:border-white/20"
                  >
                    <skill.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-gray-300" />
                    <span className="text-[10px] sm:text-xs text-gray-300 text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}



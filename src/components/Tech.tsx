"use client";
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNode, 
  FaGitAlt, 
  FaDocker, 
  FaAws 
} from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiTypescript, 
  SiRedux,
  SiDjango, 
  SiNestjs, 
  SiPostgresql,
  SiFastapi,
  SiGithubactions
} from 'react-icons/si';
import { DiRedis } from "react-icons/di";

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

const technologies : Tech[] = [
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
    <div className="mx-auto my-12 sm:my-20 w-full px-4 sm:px-6 sm:w-15/20">
      <div className="grid gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group rounded-xl sm:rounded-3xl bg-linear-to-r from-purple-600 to-cyan-600 p-px hover:shadow-lg hover:shadow-[#7A87FB]/20"
          >
            <div className="h-full rounded-xl sm:rounded-3xl bg-[#151515] p-3 sm:p-6 transition-all duration-300">
              <h3 className="mb-2 text-base sm:text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400">
                {tech.category}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-6">{tech.description}</p>
              
              <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                {tech.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#292929] hover:brightness-125 transition-all duration-200"
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



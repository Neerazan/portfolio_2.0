"use client";
import { motion } from "framer-motion";
import { FaGitAlt } from "react-icons/fa";

const workExperiences = [
  {
    company: "3P Trades LLC",
    role: "Software Engineer",
    period: "Feb 2025 - Present",
    commitHash: "3p-8a2f9c",
    type: "feat",
    details: [
      "Contributed to Materiel Insights platform",
      "Developed full-stack Next.js/Node.js apps",
      "Implemented RAG for AI querying",
      "Deployed Serverless architecture on AWS",
    ],
  },
  {
    company: "Aarambha IT Research Center",
    role: "Full Stack Developer",
    period: "Jun 2024 - Feb 2025",
    commitHash: "airc-7b3d1",
    type: "fix",
    details: [
      "Developed RESTful APIs with Django/DRF",
      "Integrated Stripe payments & Celery tasks",
      "Optimized backend infrastructure",
      "Configured CI/CD with GitHub Actions",
    ],
  },
  {
    company: "Pine Softwares",
    role: "Full Stack Intern",
    period: "Apr 2023 - Aug 2023",
    commitHash: "pine-1c9e2",
    type: "init",
    details: [
      "Built Laravel & MySQL web apps",
      "Implemented responsive Bootstrap UIs",
    ],
  },
];

function WorkExperience() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex items-center gap-3 mb-12 font-mono text-gray-400">
        <FaGitAlt className="text-orange-500 text-xl" />
        <span>git log --pretty=format:&quot;%h - %an, %ar : %s&quot;</span>
      </div>

      <div className="relative border-l-2 border-gray-800 ml-3 md:ml-6 space-y-12">
        {workExperiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Git Node Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#101111] border-2 border-blue-500" />

            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
              <span className="font-mono text-yellow-500 text-sm">
                {exp.commitHash}
              </span>
              <h3 className="text-xl font-bold text-white tracking-tight">
                <span className="text-orange-400">{exp.type}:</span> {exp.role} @ {exp.company}
              </h3>
            </div>

            <div className="font-mono text-xs text-gray-500 mb-4 flex items-center gap-2">
              <span>Date: {exp.period}</span>
            </div>

            <div className="bg-[#101111] border border-white/5 rounded-lg p-4 font-mono text-sm text-gray-300">
              {/* Simulating Diff */}
              {exp.details.map((detail, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-green-500 select-none">+</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Origin Node */}
        <div className="relative pl-8 md:pl-12 pt-4 opacity-50">
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#101111] border-2 border-gray-600" />
          <div className="font-mono text-sm text-gray-500">
            Initial commit
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkExperience;

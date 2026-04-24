"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const workExperiences = [
  {
    title: "3P Trades LLC (Remote)",
    position: "Software Engineer",
    period: "February 2025 - February 2026",
    details: [
      "Contributed to Materiel Insights, a platform for BOM and Aircraft lifecycle management.",
      "Developed and optimized full-stack applications using Next.js, TypeScript, Node.js, ZenStack, and Vercel AI SDK.",
      "Implemented RAG (Retrieval-Augmented Generation) for AI-powered natural language database querying.",
      "Deployed and managed infrastructure on AWS EC2, RDS, and DynamoDB using a Serverless architecture.",
      "Configured CloudFront for efficient content delivery and enhanced system performance.",
    ],
    icon: (
      <Image
        src={"/assets/projects/3p-logo.png"}
        alt="3P Logo"
        width={300}
        height={300}
        className="bg-clip-text h-32 w-32 object-contain"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    ),
  },
  {
    title: "Aarambha IT Research Center",
    position: "Full Stack Developer",
    period: "June 2024 - February 2025",
    details: [
      "Developed RESTful APIs using Django and DRF, integrating Stripe payments with Celery and Redis.",
      "Improved API performance and backend infrastructure for multiple projects.",
      "Implemented lab report system and analytics dashboard using PostgreSQL.",
      "Deployed applications on Oracle Cloud with Nginx, systemd, and Cloudflare.",
      "Configured AWS S3, Cloudflare R2, and automated deployments via GitHub Actions CI/CD.",
    ],
    icon: (
      <Image
        src={"/assets/projects/aarambha-logo.png"}
        alt="Aarambha Logo"
        width={300}
        height={300}
        className="bg-clip-text h-32 w-32 object-contain"
      />
    ),
  },
  {
    title: "Pine Softwares Pvt. Ltd.",
    position: "Full Stack Developer Intern",
    period: "April 2023 - August 2023",
    details: [
      "Developed full-stack web applications using Laravel and MySQL for multiple clients",
      "Implemented responsive UI designs using Bootstrap"
    ],
    icon: (
      <Image
        src={"/assets/projects/pine.png"}
        alt="Pine Softwares Logo"
        width={300}
        height={300}
        className="bg-clip-text h-32 w-32 object-contain p-8"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    ),
  },
];

interface WorkExperienceItemProps {
  item: typeof workExperiences[0];
  index: number;
}

function WorkExperienceItem({ item, index }: WorkExperienceItemProps) {
  const { elementRef, isVisible } = useScrollReveal();

  const isEven = index % 2 === 0;

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -50 : 50,
      y: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      style={{ willChange: "transform, opacity" }}
      className={`relative flex flex-col sm:flex-row ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"
        } items-start gap-4 pl-8 sm:items-center sm:gap-8 sm:pl-0 md:gap-16`}
    >
      <div className="absolute top-1/2 -left-1.5 z-10 -translate-y-1/2 transform sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
        <div className="h-4 w-4 rounded-full bg-indigo-400 sm:h-5 sm:w-5"></div>
      </div>

      <div className="group relative w-full rounded-xl border border-white/5 bg-[#151520]/95 p-4 shadow-xl transition-colors duration-300 hover:border-indigo-500/30 hover:bg-[#151520]/98 sm:w-[calc(50%-3rem)] sm:p-6">
        <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
          <span className="text-xl sm:text-2xl">{item.icon}</span>
          <div>
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {item.title}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400 sm:text-base">
                {item.position}
              </p>
              <span className="h-1 w-1 rounded-full bg-gray-500"></span>
            </div>
            <p className="text-sm text-gray-400 sm:text-base">
              {item.period}
            </p>
          </div>
        </div>
        <ul className="space-y-1 sm:space-y-2">
          {item.details.map((detail, detailIndex) => (
            <li key={detailIndex} className="flex items-start gap-2">
              <span className="text-indigo-400">
                ▹
              </span>
              <span className="text-sm text-gray-300 sm:text-base">
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function WorkExperience() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 mb-10 sm:mb-20 overflow-x-clip">
      <div className="absolute left-4 h-full w-0.5 transform bg-linear-to-b from-gray-500/20 via-gray-600/20 to-gray-500/20 sm:left-1/2 sm:-translate-x-1/2"></div>

      <div className="space-y-8 sm:space-y-16">
        {workExperiences.map((item, index) => (
          <WorkExperienceItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default WorkExperience;

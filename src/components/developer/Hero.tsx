"use client";
import type { ContributionDay, GithubData } from "@/src/lib/github.types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

interface DeveloperHeroProps {
  githubData?: GithubData;
}

// ... helper and fallback data ...

// Helper to get contribution level (0-4) from count
function getContributionLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

// Helper to determine coding status based on Kathmandu time
function getStatus() {
  const now = new Date();
  const hour = parseInt(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    hour: 'numeric',
    hour12: false,
  }).format(now));

  // 7am-9am, 10am-5pm, 8pm-10pm
  const isCoding = (hour >= 7 && hour < 9) || (hour >= 10 && hour < 17) || (hour >= 20 && hour < 22);
  return isCoding ? "Currently coding..." : "Currently debugging life, not code...";
}

// Default fallback data for when GitHub API fails
const defaultActivities = [
  { action: 'Pushed to', repo: 'portfolio_2.0', branch: 'main', time: 'recently', icon: '↑' },
  { action: 'Working on', repo: 'projects', branch: '', time: '', icon: '⎇' },
];

export default function DeveloperHero({ githubData }: DeveloperHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [codingStatus, setCodingStatus] = useState("Currently coding...");

  // Extract data with fallbacks
  const profile = githubData?.profile;
  const contributions = githubData?.contributions;
  const activities = githubData?.activities?.length ? githubData.activities : defaultActivities;

  // Get all contribution data (usually 52-53 weeks) for the heatmap
  const contributionWeeks = contributions?.weeks || [];
  const totalContributions = contributions?.totalContributions || 0;

  useEffect(() => {
    setCodingStatus(getStatus());
    const interval = setInterval(() => {
      setCodingStatus(getStatus());
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [contributionWeeks]);

  const handleScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Helper to check if a week is the start of a month
  const getMonthLabel = (weekIndex: number) => {
    if (weekIndex === 0) {
      const date = new Date(contributionWeeks[0].contributionDays[0].date);
      return date.toLocaleString('default', { month: 'short' });
    }

    const prevWeekFirstDay = new Date(contributionWeeks[weekIndex - 1].contributionDays[0].date);
    const currWeekFirstDay = new Date(contributionWeeks[weekIndex].contributionDays[0].date);

    if (prevWeekFirstDay.getMonth() !== currWeekFirstDay.getMonth()) {
      return currWeekFirstDay.toLocaleString('default', { month: 'short' });
    }
    return null;
  };

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/Neerazan", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/nirajan-dhakal-a49a36214/", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://www.linkedin.com/in/nirajan-dhakal-a49a36214/", label: "Twitter" },
    { icon: FaEnvelope, href: "mailto:nirajandhakal634@gmail.com", label: "Email" },
  ];

  return (
    <div
      id="home"
      className="relative min-h-svh w-full text-white overflow-x-hidden flex flex-col bg-[#0a0a0a]"
    >
      {/* Grid Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay will-change-transform"
        style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      <div className="flex flex-col lg:flex-row flex-1 relative z-10 container mx-auto px-0 lg:px-0">
        {/* LEFT SIDEBAR - Social Links */}
        <aside className="hidden lg:flex flex-col justify-between items-center w-20 h-screen fixed left-0 top-0 border-r z-50 py-10 transition-colors duration-500 border-green-500/20 bg-[#0d1117]/95">
          <div className="w-px h-20 bg-linear-to-b from-transparent to-transparent via-green-500/20" />

          <div className="flex flex-col gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 transition-colors duration-300 animate-fade-in-left text-green-500/60 hover:text-green-400"
                style={{ animationDelay: `${index * 50}ms` }}
                aria-label={social.label}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 transition-all group-hover:h-full opacity-0 group-hover:opacity-100 rounded-r-md bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none border whitespace-nowrap bg-green-950/90 border-green-500/30 text-green-400 font-mono text-[10px] shadow-sm">
                  {`> ${social.label.toLowerCase()}`}
                </span>
              </a>
            ))}
          </div>

          <div className="w-px h-20 bg-linear-to-b from-transparent to-transparent via-green-500/20" />
        </aside>

        <main className="flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between px-6 sm:px-12 lg:pl-28 lg:pr-12 w-full pt-20 lg:pt-0">

          {/* Text Section */}
          <div className="lg:w-1/2 max-w-2xl">
            <div className="flex items-center gap-3 mb-4 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="h-px w-10 bg-green-500/50" />
              <span className="text-green-400 font-mono tracking-normal lowercase text-xs sm:text-sm">
                {'> initializing_portfolio_v2...'}
              </span>
            </div>

            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] mb-6">
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-400 hover:from-green-300 hover:to-emerald-300 transition-colors duration-500 cursor-default">
                {"<Build />"}
              </span>
              <span className="block text-gray-500 text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 hover:text-orange-400 transition-colors duration-500 cursor-default">
                {"scale()"}
              </span>
            </h1>

            <div className="max-w-lg animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <p className="font-mono text-sm sm:text-base text-green-400/80 leading-relaxed mb-8">
                Hi, I&apos;m <span className="text-green-400 font-bold">Nirajan Dhakal</span> a full-stack developer focused on building <span className="text-blue-400">maintainable backends</span>, <span className="text-orange-400">clean APIs</span>, and production-ready web applications.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleScroll}
                  className="group font-mono text-xs sm:text-sm px-5 py-2.5 bg-black border border-green-500/50 text-green-400 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-all duration-300 flex items-center gap-2 rounded cursor-pointer"
                >
                  <span className="text-gray-500">$</span>
                  <span>./contact.sh</span>
                  <div className="w-1.5 h-3.5 bg-green-500 animate-[pulse_1s_infinite] ml-1" />
                </button>

                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group font-mono text-xs sm:text-sm px-5 py-2.5 bg-black border border-gray-700 text-gray-400 hover:border-green-500/50 hover:text-green-400 transition-all duration-300 flex items-center gap-2 rounded cursor-pointer"
                >
                  <span className="text-gray-500">$</span>
                  <span>git checkout projects</span>
                </button>
              </div>
            </div>
          </div>

          {/* GitHub Activity Graph */}
          <div
            className="hidden lg:flex lg:w-1/2 items-center justify-center relative h-[500px] animate-fade-in-right"
            style={{ animationDelay: '150ms' }}
          >
            <div className="w-full max-w-lg bg-[#0d1117] rounded-lg border border-gray-800 shadow-2xl overflow-hidden font-mono text-xs relative z-10 group hover:border-green-500/30 transition-colors">
              {/* Header */}
              <div className="bg-[#161b22] px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {profile?.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.username}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-base">
                      N
                    </div>
                  )}
                  <div>
                    <div className="text-white font-semibold text-base">{profile?.username || 'Neerazan'}</div>
                    <div className="text-gray-500 text-xs">@{profile?.username?.toLowerCase() || 'neerazan'}</div>
                  </div>
                </div>
                <a
                  href={profile?.htmlUrl || 'https://github.com/Neerazan'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
              </div>

              {/* Contribution Graph */}
              <div className="p-6 space-y-5">
                {/* Stats Row */}
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-gray-400">
                    <span className="text-green-400 font-bold">{totalContributions.toLocaleString()}</span> contributions in the last year
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-gray-800" />
                      <div className="w-3 h-3 rounded-[2px] bg-green-900/60" />
                      <div className="w-3 h-3 rounded-[2px] bg-green-700/80" />
                      <div className="w-3 h-3 rounded-[2px] bg-green-500" />
                      <div className="w-3 h-3 rounded-[2px] bg-green-400" />
                    </div>
                    <span>More</span>
                  </div>
                </div>

                {/* Contribution Heatmap Grid */}
                <div
                  ref={scrollRef}
                  className="overflow-x-auto custom-scrollbar pb-2"
                >
                  {/* Month Labels */}
                  <div className="flex gap-[4px] min-w-max mb-2">
                    {contributionWeeks.map((_, i) => {
                      const label = getMonthLabel(i);
                      return (
                        <div key={i} className="w-3 text-[11px] text-gray-600 font-mono relative">
                          {label && <span className="absolute left-0 bottom-0 whitespace-nowrap">{label}</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-[4px] min-w-max">
                    {contributionWeeks.length > 0 ? (
                      contributionWeeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[4px]">
                          {week.contributionDays.map((day: ContributionDay, dayIndex: number) => {
                            const level = getContributionLevel(day.contributionCount);
                            const colors = [
                              'bg-[#161b22] border border-gray-800/50',
                              'bg-green-900/60',
                              'bg-green-700/80',
                              'bg-green-500',
                              'bg-green-400'
                            ];

                            return (
                              <div
                                key={dayIndex}
                                title={`${day.contributionCount} contributions on ${day.date}`}
                                className={`w-3 h-3 rounded-[2px] ${colors[level]} cursor-default`}
                              />
                            );
                          })}
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 52 }).map((_, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[4px]">
                          {Array.from({ length: 7 }).map((_, dayIndex) => (
                            <div
                              key={dayIndex}
                              className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-gray-800/50 animate-pulse"
                            />
                          ))}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="border-t border-gray-800 pt-4 mt-2">
                  <div className="text-gray-400 text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Recent Activity
                  </div>
                  <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                    {activities.map((activity, i) => (
                      <div key={i} className="flex items-center gap-3.5 text-[13px] group/item hover:bg-white/5 py-2 px-2.5 rounded-md transition-all cursor-default border border-transparent hover:border-gray-800/50">
                        <span className="text-green-500 w-6 h-6 flex items-center justify-center font-bold bg-[#161b22] rounded text-[12px] border border-gray-800 group-hover/item:border-green-500/30 transition-colors">
                          {activity.icon}
                        </span>
                        <div className="flex flex-1 items-center gap-2 overflow-hidden">
                          <span className="text-gray-400 whitespace-nowrap">{activity.action}</span>
                          <span className="text-blue-400 hover:text-blue-300 hover:underline truncate font-medium">
                            {activity.repo}
                          </span>
                          {activity.branch && (
                            <span className="text-gray-500 text-[10px] px-1.5 py-0.5 bg-[#161b22] border border-gray-800/50 rounded shrink-0">
                              {activity.branch}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-600 text-[10px] font-mono ml-auto opacity-70 group-hover/item:opacity-100 transition-opacity">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-800 pt-3.5 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="text-blue-400 font-bold">{profile?.publicRepos || 0}</span>
                      <span className="text-gray-600">repos</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-orange-400 font-bold">{profile?.followers || 0}</span>
                      <span className="text-gray-600">followers</span>
                    </span>
                  </div>
                  <span className="text-green-400/80 hidden sm:inline">{codingStatus}</span>
                </div>
              </div>
            </div>
            {/* Decorative glow behind */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </main>

        {/* Mobile Socials - Terminal Style */}
        <div className="lg:hidden flex flex-col gap-3 pb-12 mt-12 z-20 w-full max-w-sm mx-auto px-6">
          <div className="text-xs font-mono text-gray-500 mb-2">
            <span className="text-blue-400">$</span> cat .social_links
          </div>
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-[#0d1117] border border-gray-800 rounded text-xs font-mono text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all flex items-center gap-2 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                <social.icon className="w-4 h-4" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

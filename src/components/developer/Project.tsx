"use client";

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaFileCode, FaFolder, FaGithub, FaLevelUpAlt, FaMapMarkerAlt, FaQuestionCircle, FaTerminal, FaTrashAlt } from 'react-icons/fa';

import { projects } from "@/src/data/projects";
import { ProjectProps } from "../../types";

// --- Types ---
type HistoryItem = {
  command: string;
  output: React.ReactNode;
  type?: 'command' | 'status' | 'error' | 'info';
};

type SlugifiedProject = ProjectProps & { slug: string };

// --- Constants ---
const COMMANDS = ['help', 'ls', 'cd', 'cat', 'clear', 'pwd'] as const;
const ROOT_PATH = "~/projects";

// --- Utility Functions ---
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

// --- Memoized Sub-components ---
const TerminalDots = memo(() => (
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10" />
    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10" />
    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10" />
  </div>
));
TerminalDots.displayName = 'TerminalDots';

const ScanlineEffect = memo(() => (
  <>
    <div className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-400 to-transparent animate-scan" />
    </div>
    <style jsx>{`
      @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
      .animate-scan {
        animation: scan 10s linear infinite;
        will-change: transform;
      }
    `}</style>
  </>
));
ScanlineEffect.displayName = 'ScanlineEffect';

const GridOverlay = memo(() => (
  <div
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}
  />
));
GridOverlay.displayName = 'GridOverlay';

// --- Extracted Project Detail Component ---
const ProjectDetailView = memo(({ project, category }: { project: SlugifiedProject; category: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  const handleNextImage = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % project.images.length);
  }, [project.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 border border-[#30363d] rounded-xl overflow-hidden bg-[#0D1117] shadow-2xl"
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] items-center">
        {/* Image Panel */}
        <div className="relative aspect-video bg-[#0D1117] overflow-hidden group flex items-center justify-center">
          <ScanlineEffect />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center p-8 lg:p-4"
            >
              <div className="relative w-full h-full">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
              <GridOverlay />
            </motion.div>
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute cursor-pointer md:left-6 left-9 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all text-white/50 hover:text-white border border-white/5 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute cursor-pointer md:right-6 right-9 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full transition-all text-white/50 hover:text-white border border-white/5 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next image"
              >
                <FaChevronRight size={14} />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                {project.images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-4 bg-blue-400' : 'w-1 bg-white/20'
                      }`}
                    aria-label={`Image ${i + 1} of ${project.images.length}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info Panel */}
        <div className="p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#30363d]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
              <div className="px-2 py-0.5 bg-blue-400/10 border border-blue-400/20 rounded text-[10px] text-blue-400 font-bold uppercase">
                {category}
              </div>
            </div>

            <p className="text-[#8b949e] text-sm leading-relaxed mb-8 pl-4 border-l-2 border-[#30363d]">
              {project.description}
            </p>

            {project.technologies && project.technologies.length > 0 && (
              <div className="space-y-4 mb-8">
                <div className="text-[10px] text-[#8b949e] uppercase font-bold tracking-widest">
                  Stack Manifest
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#161B22] border border-[#30363d] text-[#c9d1d9] text-[11px] rounded hover:border-blue-400/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-bold rounded transition-colors"
              >
                <FaExternalLinkAlt size={12} />
                Live Demo
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#161B22] border border-[#30363d] text-[#c9d1d9] hover:border-[#8b949e] text-sm font-bold rounded transition-colors"
              >
                <FaGithub size={14} />
                Source Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
ProjectDetailView.displayName = 'ProjectDetailView';

// --- Custom Hook for Terminal Logic ---
const useTerminalCommands = (
  categories: string[],
  slugifiedProjects: SlugifiedProject[],
  currentPath: string,
  setCurrentPath: (path: string) => void,
  onCommand: (cmd: string) => void
) => {
  return useCallback((cmd: string): { output: React.ReactNode; type: HistoryItem['type'] } => {
    const [baseCmd, ...args] = cmd.toLowerCase().split(' ');
    let output: React.ReactNode = null;
    let type: HistoryItem['type'] = 'command';

    switch (baseCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <span className="text-green-400">ls</span>
            <span>List contents of current directory</span>
            <span className="text-green-400">cd &lt;dir&gt;</span>
            <span>Change directory</span>
            <span className="text-green-400">pwd</span>
            <span>Print working directory</span>
            <span className="text-green-400">cat &lt;file&gt;</span>
            <span>View project details</span>
            <span className="text-green-400">clear</span>
            <span>Clear terminal history</span>
            <span className="text-green-400">help</span>
            <span>Show this help message</span>
          </div>
        );
        break;

      case 'pwd':
        output = <span className="text-[#8b949e]">{currentPath.replace('~', '/home/neerazan')}</span>;
        break;

      case 'ls':
        if (currentPath === ROOT_PATH) {
          output = (
            <div className="flex flex-wrap gap-6">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={(e) => { e.stopPropagation(); onCommand(`cd ${cat}`); }}
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group"
                >
                  <FaFolder className="group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted underline-offset-4">{cat}/</span>
                </button>
              ))}
            </div>
          );
        } else {
          const category = currentPath.split('/').pop();
          const filtered = slugifiedProjects.filter(p => p.category === category);
          output = (
            <div className="flex flex-wrap gap-6">
              {filtered.map(p => (
                <button
                  key={p.slug}
                  onClick={(e) => { e.stopPropagation(); onCommand(`cat ${p.slug}`); }}
                  className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors cursor-pointer group"
                >
                  <FaFileCode className="group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-dotted underline-offset-4">{p.slug}.tsx</span>
                </button>
              ))}
            </div>
          );
        }
        break;

      case 'cd':
        const target = args[0];
        if (!target || target === "~" || target === ROOT_PATH) {
          setCurrentPath(ROOT_PATH);
        } else if (target === "..") {
          if (currentPath !== ROOT_PATH) {
            setCurrentPath(ROOT_PATH);
          }
        } else if (categories.includes(target)) {
          setCurrentPath(`${ROOT_PATH}/${target}`);
        } else {
          output = <span className="text-red-400">Directory not found: {target}</span>;
          type = 'error';
        }
        break;

      case 'cat':
        const slug = args[0]?.replace('.tsx', '');
        const project = slugifiedProjects.find(p => p.slug === slug);
        if (project) {
          output = (
            <div className="space-y-4">
              <div className="text-blue-400 text-sm italic">Opening {slug}.tsx...</div>
              <ProjectDetailView project={project} category={project.category} />
            </div>
          );
        } else {
          output = <span className="text-red-400">File not found: {slug}</span>;
          type = 'error';
        }
        break;

      default:
        output = (
          <div className="space-y-1">
            <p className="text-red-400">Command not found: {baseCmd}</p>
            <p className="text-xs text-[#8b949e]">Type &apos;help&apos; for available commands.</p>
          </div>
        );
        type = 'error';
    }

    return { output, type };
  }, [categories, slugifiedProjects, currentPath, setCurrentPath, onCommand]);
};

// --- Main Component ---
export default function Project() {
  const [currentPath, setCurrentPath] = useState(ROOT_PATH);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [booting, setBooting] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const handleCommandRef = useRef<(cmd: string) => void>(() => { });

  // Memoize expensive computations with proper dependencies
  const categories = useMemo(
    () => Array.from(new Set(projects.map(p => p.category))),
    []
  );

  const slugifiedProjects = useMemo(
    () => projects.map(p => ({ ...p, slug: slugify(p.title) })),
    []
  );

  const executeCommand = useTerminalCommands(
    categories,
    slugifiedProjects,
    currentPath,
    setCurrentPath,
    useCallback((cmd: string) => handleCommandRef.current(cmd), [])
  );

  // Scroll to bottom when history changes
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Intersection Observer for auto-focus (desktop only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && inputRef.current && window.innerWidth > 768) {
          inputRef.current.focus({ preventScroll: true });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
      setHistory([
        {
          command: "system --init",
          output: (
            <div className="text-[#8b949e] space-y-1">
              <p className="text-blue-400">Welcome to Project Explorer v2.0.0</p>
              <p>Type <span className="text-white">help</span> to see available commands.</p>
            </div>
          ),
          type: 'status'
        }
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = useCallback((cmd: string) => {
    const fullCmd = cmd.trim();
    if (!fullCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, fullCmd]);
    setHistoryIndex(-1);

    if (fullCmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputValue("");
      return;
    }

    const { output, type } = executeCommand(fullCmd);
    setHistory(prev => [...prev, { command: fullCmd, output, type }]);
    setInputValue("");
  }, [executeCommand]);

  // Update the ref whenever handleCommand is recreated
  useEffect(() => {
    handleCommandRef.current = handleCommand;
  }, [handleCommand]);

  const handleTabComplete = useCallback(() => {
    const parts = inputValue.toLowerCase().split(' ');
    const base = parts[0];
    const arg = parts.slice(1).join(' ');

    // Command completion
    if (parts.length === 1) {
      const matches = COMMANDS.filter(c => c.startsWith(base));
      if (matches.length === 1) {
        setInputValue(matches[0] + ' ');
      }
      return;
    }

    // Argument completion
    if (base === 'cd') {
      const matches = categories.filter(c => c.startsWith(arg));
      if (matches.length === 1) {
        setInputValue(`cd ${matches[0]}`);
      }
    } else if (base === 'cat') {
      const filtered = slugifiedProjects
        .filter(p => currentPath === ROOT_PATH || p.category === currentPath.split('/').pop())
        .map(p => p.slug);
      const matches = filtered.filter(f => f.startsWith(arg));
      if (matches.length === 1) {
        setInputValue(`cat ${matches[0]}.tsx`);
      }
    }
  }, [inputValue, categories, slugifiedProjects, currentPath]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleTabComplete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue("");
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      }
    }
  }, [inputValue, handleCommand, handleTabComplete, commandHistory, historyIndex]);

  const handleTerminalClick = useCallback(() => {
    if (window.innerWidth > 768 && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Memoized button handlers
  const handleLsClick = useCallback(() => handleCommand('ls'), [handleCommand]);
  const handlePwdClick = useCallback(() => handleCommand('pwd'), [handleCommand]);
  const handleCdBackClick = useCallback(() => handleCommand('cd ..'), [handleCommand]);
  const handleClearClick = useCallback(() => handleCommand('clear'), [handleCommand]);
  const handleHelpClick = useCallback(() => handleCommand('help'), [handleCommand]);

  return (
    <div
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 font-mono overflow-x-clip"
    >
      <div className="bg-[#0D1117] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[750px] lg:h-[800px]">
        {/* Terminal Header */}
        <div className="bg-[#161B22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <TerminalDots />
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8b949e]">
              <FaTerminal size={10} className="text-gray-500" />
              <span>neerazan-dhakal@portfolio:</span>
              <span className="text-blue-400">{currentPath}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#8b949e]">
            <span className="hidden md:inline">PID: 4821</span>
            <span className="px-1.5 py-0.5 bg-green-400/10 text-green-400 border border-green-400/20 rounded">
              SSH ACTIVE
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 text-sm sm:text-base space-y-6 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent"
          onClick={handleTerminalClick}
        >
          {booting ? (
            <div className="flex items-center gap-3 text-blue-400 animate-pulse">
              <FaTerminal />
              <span>Initializing secure connection...</span>
            </div>
          ) : (
            <>
              {/* History */}
              <div className="space-y-6">
                {history.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">➜</span>
                      <span className="text-blue-400">{ROOT_PATH}</span>
                      <span className="text-white">{item.command}</span>
                    </div>
                    {item.output && (
                      <div className="pl-6 animate-in fade-in slide-in-from-left-2 duration-300 wrap-break-words whitespace-pre-wrap">
                        {item.output}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Line */}
              <div className="flex items-center gap-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400 shrink-0">{currentPath.split('/').pop()}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white caret-blue-400 focus:ring-0"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
              </div>
            </>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#161B22] border-t border-[#30363d] px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLsClick}
              className="px-3 py-1.5 bg-[#30363d]/50 hover:bg-[#30363d] text-[#8b949e] hover:text-white rounded text-xs flex items-center gap-2 transition-colors shrink-0"
              title="List files"
              aria-label="List files"
            >
              <FaTerminal size={10} />
              ls
            </button>
            <button
              onClick={handlePwdClick}
              className="px-3 py-1.5 bg-[#30363d]/50 hover:bg-[#30363d] text-[#8b949e] hover:text-white rounded text-xs flex items-center gap-2 transition-colors shrink-0"
              title="Print working directory"
              aria-label="Print working directory"
            >
              <FaMapMarkerAlt size={10} />
              pwd
            </button>
            <button
              onClick={handleCdBackClick}
              className="px-3 py-1.5 bg-[#30363d]/50 hover:bg-[#30363d] text-[#8b949e] hover:text-white rounded text-xs flex items-center gap-2 transition-colors shrink-0"
              title="Go back"
              aria-label="Go back to parent directory"
            >
              <FaLevelUpAlt size={10} />
              cd ..
            </button>
            <button
              onClick={handleClearClick}
              className="px-3 py-1.5 bg-[#30363d]/50 hover:bg-[#30363d] text-[#8b949e] hover:text-white rounded text-xs flex items-center gap-2 transition-colors shrink-0"
              title="Clear terminal"
              aria-label="Clear terminal"
            >
              <FaTrashAlt size={10} />
              clear
            </button>
            <button
              onClick={handleHelpClick}
              className="px-3 py-1.5 bg-[#30363d]/50 hover:bg-[#30363d] text-[#8b949e] hover:text-white rounded text-xs flex items-center gap-2 transition-colors shrink-0"
              title="Show help"
              aria-label="Show help"
            >
              <FaQuestionCircle size={10} />
              help
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#8b949e] uppercase tracking-widest whitespace-nowrap">
            <span className="opacity-40">Status:</span>
            <span className="text-blue-400">Project_Shell_Active</span>
            <span className="opacity-40">|</span>
            <span>V_2.4.0</span>
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-full h-full bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}

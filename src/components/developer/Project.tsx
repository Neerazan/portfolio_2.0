"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaLevelUpAlt, FaMapMarkerAlt, FaQuestionCircle, FaTerminal, FaTrashAlt } from 'react-icons/fa';

import { projects } from "@/src/data/projects";
import { COMMANDS, MAX_HISTORY, ROOT_PATH } from './terminal/constants';
import { TerminalDots } from './terminal/TerminalElements';
import { HistoryItem } from './terminal/types';
import { useTerminalCommands } from './terminal/useTerminal';
import { slugify } from './terminal/utils';

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

  // Memoize expensive computations
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

  // Intersection Observer for auto-focus
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

    setCommandHistory(prev => [...prev.slice(-(MAX_HISTORY - 1)), fullCmd]);
    setHistoryIndex(-1);

    if (fullCmd.toLowerCase() === 'clear') {
      setHistory([]);
      setInputValue("");
      return;
    }

    const { output, type } = executeCommand(fullCmd);
    setHistory(prev => [...prev.slice(-(MAX_HISTORY - 1)), { command: fullCmd, output, type }]);
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

    if (parts.length === 1) {
      const matches = COMMANDS.filter(c => c.startsWith(base));
      if (matches.length === 1) {
        setInputValue(matches[0] + ' ');
      }
      return;
    }

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

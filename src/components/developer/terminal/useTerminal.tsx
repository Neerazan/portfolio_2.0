import React, { useCallback } from "react";
import { FaFileCode, FaFolder } from "react-icons/fa";
import { ROOT_PATH } from "./constants";
import { ProjectDetailView } from "./ProjectDetail";
import { HistoryItem, SlugifiedProject } from "./types";

export const useTerminalCommands = (
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

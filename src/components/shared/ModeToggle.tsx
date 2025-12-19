"use client";

import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { FaLaptop, FaTerminal } from "react-icons/fa";

export default function ModeToggle() {
  const { mode, toggleMode } = useDisplayMode();

  return (
    <button
      onClick={toggleMode}
      className={`
        cursor-pointer relative flex items-center justify-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 outline-none
        ${mode === "developer"
          ? "bg-[#0d1117] border-green-500/30 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:bg-green-500/10 hover:border-green-400 hover:text-green-300"
          : "bg-white/10 border-white/20 text-white hover:bg-white/20"}
      `}
      aria-label="Toggle Display Mode"
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        {mode === "developer" ? (
          <>
            <FaTerminal className="text-sm" />
            <span className="text-xs font-mono font-bold tracking-wider">DEV MODE</span>
          </>
        ) : (
          <>
            <FaLaptop className="text-sm text-cyan-300" />
            <span className="text-xs font-bold tracking-wider">NORMAL</span>
          </>
        )}
      </div>
    </button>
  );
}

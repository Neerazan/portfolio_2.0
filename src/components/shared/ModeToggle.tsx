"use client";

import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { FaCode, FaUser } from "react-icons/fa";

export default function ModeToggle() {
  const { mode, toggleMode } = useDisplayMode();

  return (
    <button
      onClick={toggleMode}
      className={`
        cursor-pointer relative flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border
        ${mode === 'developer'
          ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]'
          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'}
      `}
      title={mode === 'developer' ? "Switch to Normal Mode" : "Switch to Developer Mode"}
      aria-label="Toggle Display Mode"
    >
      {/* Pulse Effect for visibility */}
      <span className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 ${mode === 'normal' ? 'animate-pulse bg-white/5' : ''}`} />

      {mode === 'developer' ? (
        <>
          <FaCode className="w-4 h-4" />
          <span className="text-xs font-medium tracking-wide uppercase">Dev Mode</span>
        </>
      ) : (
        <>
          <FaUser className="w-3.5 h-3.5" />
          <span className="text-xs font-medium tracking-wide uppercase">Normal</span>
        </>
      )}
    </button>
  );
}

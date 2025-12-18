"use client";

import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { FaCode, FaUser } from "react-icons/fa";

export default function ModeToggle() {
  const { mode, toggleMode } = useDisplayMode();

  return (
    <button
      onClick={toggleMode}
      className={`
        flex items-center justify-center p-2 rounded-full transition-all duration-300
        ${mode === 'developer'
          ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20'
          : 'bg-white/10 text-white hover:bg-white/20'}
      `}
      title={mode === 'developer' ? "Switch to Normal Mode" : "Switch to Developer Mode"}
      aria-label="Toggle Display Mode"
    >
      {mode === 'developer' ? (
        <FaCode className="w-5 h-5" />
      ) : (
        <FaUser className="w-4 h-4" />
      )}
    </button>
  );
}

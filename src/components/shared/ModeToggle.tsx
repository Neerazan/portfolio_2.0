import { useDisplayMode } from "@/src/context/DisplayModeContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaCode, FaPalette, FaTerminal } from "react-icons/fa";

export default function ModeToggle() {
  const { mode, toggleMode } = useDisplayMode();
  const [showPrompt, setShowPrompt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem("mode-toggle-prompt-seen");
    const savedMode = localStorage.getItem("site-display-mode");

    // Show prompt only if:
    // 1. User hasn't dismissed it
    // 2. We are in "normal" (standard) mode
    // 3. User hasn't explicitly set a mode before (optional, or just check 'seen')
    if (!hasSeenPrompt && mode === "normal" && !savedMode) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [mode]);

  // Smart Positioning Logic
  useEffect(() => {
    if (showPrompt && containerRef.current) {
      const updatePosition = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const screenWidth = window.innerWidth;
        const modalWidth = 280; // approximate width
        const padding = 20;

        let calculatedShift = 0;

        // If overflowing right
        if (center + modalWidth / 2 > screenWidth - padding) {
          calculatedShift = (screenWidth - padding) - (center + modalWidth / 2);
        }
        // If overflowing left
        else if (center - modalWidth / 2 < padding) {
          calculatedShift = padding - (center - modalWidth / 2);
        }

        setShift(calculatedShift);
      };

      updatePosition();
      window.addEventListener("resize", updatePosition);
      return () => window.removeEventListener("resize", updatePosition);
    }
  }, [showPrompt]);

  const dismissPrompt = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setShowPrompt(false);
    localStorage.setItem("mode-toggle-prompt-seen", "true");
  };

  const handleToggle = () => {
    dismissPrompt();
    toggleMode();
  };

  return (
    <div className="relative" ref={containerRef}>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: "-50%", scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              x: `calc(-50% + ${shift}px)`, // Apply shift to keep on screen
              scale: 1
            }}
            exit={{ opacity: 0, y: 10, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full mt-6 left-1/2 w-[280px] bg-[#1a1f2e] border border-white/10 rounded-2xl p-5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-50 pointer-events-auto flex flex-col items-center text-center"
          >
            {/* SVG Arrow - cleaner rendering without artifacts */}
            <svg
              width="24"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              className="absolute -top-3 left-1/2 z-20 block"
              style={{
                marginLeft: -12, // Center the 24px wide SVG
                transform: `translateX(${-shift}px)` // Counter-shift
              }}
            >
              <path d="M12 0L24 12H0L12 0Z" fill="#1a1f2e" />
              <path d="M0 12L12 0L24 12" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>

            {/* Content */}
            <div className="relative z-10 w-full flex flex-col gap-3">
              <div className="w-10 h-10 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-1">
                <FaCode className="text-xl text-indigo-300" />
              </div>

              <div>
                <h3 className="text-white font-semibold text-base mb-1">
                  Developer Mode Available
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  Switch to <span className="text-indigo-400 font-semibold">Developer Mode</span> for a more technical, developer-focused experience.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full mt-1">
                <button
                  onClick={dismissPrompt}
                  className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium transition-colors cursor-pointer border border-white/5"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleToggle}
                  className="flex-1 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/50 text-xs font-medium transition-colors cursor-pointer"
                >
                  Try It Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleToggle}
        className={`
          cursor-pointer relative flex items-center justify-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500 outline-none
          ${mode === "developer"
            ? "bg-[#0d1117] border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-400 hover:text-green-300"
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
              <FaPalette className="text-sm text-indigo-300" />
              <span className="text-xs font-bold tracking-wider">STANDARD</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}

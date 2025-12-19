"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type DisplayMode = "normal" | "developer";

interface DisplayModeContextType {
  mode: DisplayMode;
  toggleMode: () => void;
  setMode: (mode: DisplayMode) => void;
}

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

export function DisplayModeProvider({ children }: { children: React.ReactNode }) {
  // Always initialize with a safe default "normal" for SSR matching
  const [mode, setModeState] = useState<DisplayMode>("normal");

  useEffect(() => {
    // Check localStorage for saved mode
    const savedMode = localStorage.getItem("site-display-mode") as DisplayMode;
    if (savedMode && (savedMode === "normal" || savedMode === "developer")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
    localStorage.setItem("site-display-mode", newMode);
  };

  const toggleMode = () => {
    setMode(mode === "normal" ? "developer" : "normal");
  };

  // We must always render the Provider, even if not mounted, to allow children to use hooks.
  // During SSR and initial client render (before useEffect), mode is "normal".
  // If localStorage has "developer", it will switch after mount.
  // This might cause a quick flash, but prevents the build crash.

  return (
    <DisplayModeContext.Provider value={{ mode, toggleMode, setMode }}>
      {/* 
        Optional: To prevent hydration mismatch if local storage differs from server 'normal',
        we could render nothing until mounted if we wanted absolute strictness, 
        but that hurts LCP. 
        Better strategy: Render with default (normal).
      */}
      {children}
    </DisplayModeContext.Provider>
  );
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (context === undefined) {
    throw new Error("useDisplayMode must be used within a DisplayModeProvider");
  }
  return context;
}

"use client";

import { DisplayModeProvider } from "@/src/context/DisplayModeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DisplayModeProvider>
      {children}
    </DisplayModeProvider>
  );
}

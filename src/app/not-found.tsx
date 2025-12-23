"use client";

import NotFoundDeveloper from "@/src/components/ui/NotFoundDeveloper";
import NotFoundNormal from "@/src/components/ui/NotFoundNormal";
import { useDisplayMode } from "@/src/context/DisplayModeContext";

export default function NotFound() {
  const { mode } = useDisplayMode();

  return mode === "developer" ? <NotFoundDeveloper /> : <NotFoundNormal />;
}

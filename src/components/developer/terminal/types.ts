import { ReactNode } from "react";
import { ProjectProps } from "../../../types";

export type HistoryItem = {
  command: string;
  output: ReactNode;
  type?: "command" | "status" | "error" | "info";
};

export type SlugifiedProject = ProjectProps & { slug: string };

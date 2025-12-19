export interface NavItemProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  isActive?: boolean;
}

export interface ProjectProps {
  title: string;
  number: string;
  description: string;
  technologies?: string[];
  images: string[];
  demoLink?: string;
  githubLink?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export type SubmitStatus = 'success' | 'error' | null;

export interface NavSection {
  id: string;
  label: string;
}

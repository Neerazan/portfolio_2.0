# Portfolio 2.0

A modern, dual-mode portfolio website built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

This project features two distinct interactive experiences:
1.  **Normal Mode**: A clean, minimalistic, and professional interface designed for recruiters and non-technical visitors.
2.  **Developer Mode**: An immersive "meta-interface" that mimics a Linux terminal and IDE environment, designed for engineers and enthusiasts.

---

## 🚀 Features

-   **Dual-Mode Interface**: Toggle between "Creative/Normal" and "Developer/Terminal" modes instantly.
-   **Developer Mode Aesthetics**:
    -   **Shell**: Terminal-style header (`root@portfolio:~#`).
    -   **Process Monitor**: `htop`-inspired hero section with live resource animations.
    -   **File System**: Tree-view visualization for technical skills.
    -   **IDE Layout**: Project showcase mimicking a split-screen code editor.
    -   **Logs**: Work experience presented as `git log` or system logs.
-   **Tech Stack**:
    -   [Next.js 14+](https://nextjs.org/) (App Router)
    -   [Tailwind CSS](https://tailwindcss.com/)
    -   [Framer Motion](https://www.framer.com/motion/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Lucide React](https://lucide.dev/) / React Icons

---

## 🛠️ Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📖 Developer Mode Design Guide

For a deep dive into the design philosophy, inspiration, and implementation details of the Developer Mode—including a guide on how to customize the content for your own extensive experience—please read our dedicated documentation:

👉 **[Developer Mode Design Guide](./DEVELOPER_MODE.md)**

---

## 📂 Project Structure

-   `src/components/developer`: Contains all Terminal/IDE-styled components.
-   `src/components/normal`: Contains the standard professional UI components.
-   `src/context`: Manages the global state for Mode switching.
-   `src/components/shared`: Components shared or adaptable across both modes (e.g., Hero base).

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

```bash
pnpm build
```

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

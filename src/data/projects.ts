import { ProjectProps } from "../types";

export const projects: ProjectProps[] = [
  {
    title: "AI Email Assistant",
    number: "1",
    description: `A simple AI email assistant that lets you manage your Gmail through chat instead of a traditional inbox. You can read emails, get quick summaries of long threads, filter unread messages, and draft replies with context.

It’s designed to save time while keeping things simple and you’re always in control, since nothing gets sent without your approval.`,
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Supabase",
      "Nginx",
      "Oracle"
    ],
    images: [
      "/assets/projects/email-1.png",
      "/assets/projects/email-2.png",
      "/assets/projects/email-3.png",
      "/assets/projects/email-4.png",
    ],
    demoLink: "https://ai-email.dhakalnirajan.com.np",
    githubLink: "https://github.com/Neerazan/lca-email-assistant-api",
    category: "personal-project"
  },
  {
    title: "Tishy & Co",
    number: "2",
    description: "Tishy & Co is an award-winning catering service provider based in Sydney, specializing in premium catering for corporate events, private parties, and special occasions. During my time at Aarambha IT, I contributed to this project by developing the backend and RESTful APIs using Django, integrating Celery for background tasks, and working on several frontend components. I also handled API integration with the React-based frontend, ensuring seamless communication between the client and server.",
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Vite",
      "Django",
      "Celery",
      "PostgreSQL",
      "Nginx",
      "Oracle",
      "Cloudflare",
      "R2"
    ],
    images: [
      "/assets/projects/tishy-1.png",
      "/assets/projects/tishy-2.png",
    ],
    demoLink: "https://tishyandco.com.au/",
    category: "professional-projects"
  },
  {
    title: "Polar Treks",
    number: "3",
    description: "Polar Treks is a travel and adventure platform designed to offer seamless booking and exploration experiences. While working at Aarambha IT, I contributed by enhancing the user interface for better responsiveness and visual appeal, optimizing and maintaining the Django-based backend, and ensuring smooth integration between the frontend and backend systems.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Django",
      "PostgreSQL",
      "Nginx",
      "Oracle",
      "Cloudflare",
    ],
    images: [
      "/assets/projects/polar-1.png",
      "/assets/projects/polar-2.png",
    ],
    demoLink: "https://polartreks.com/",
    category: "professional-projects"
  },
  {
    title: "Kirana Pasal",
    number: "4",
    description: "Kirana Pasal is a fully functional e-commerce platform built on WordPress and WooCommerce, specializing in South Asian groceries. I was responsible for the end-to-end development, including responsive frontend design using Elementor, integrating secure Stripe payments, optimizing performance with Nginx, and implementing Yoast SEO for organic growth.",
    technologies: [
      "WordPress",
      "WooCommerce",
      "Elementor",
      "Yoast SEO",
      "Stripe",
      "Nginx",
    ],
    images: [
      "/assets/projects/kirana-1.png",
      "/assets/projects/kirana-2.png",
      "/assets/projects/kirana-3.png",
    ],
    demoLink: "https://www.kiranapasal.shop",
    category: "freelance-projects"
  },
  {
    title: "Right4Children",
    number: "5",
    description: "Right4Children is a child and youth focused organization that works to help young people access their rights through meaningful programs. While working at Aarambha IT, I contributed to this project as a full-stack developer, building backend features with Django and creating responsive, user friendly interfaces with Next.js. I worked on core APIs, database models, and UI components to deliver a smooth and reliable user experience.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Shadcn",
      "Django",
      "PostgreSQL",
      "Nginx",
      "Oracle",
    ],
    images: [
      "/assets/projects/r4c-1.png",
      "/assets/projects/r4c-2.png",
    ],
    demoLink: "https://right4children.org/",
    githubLink: "https://github.com/nirajan-dhakal/right4children",
    category: "professional-projects"
  }
];

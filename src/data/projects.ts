import { ProjectProps } from "../types";

export const projects: ProjectProps[] = [
  {
    title: "Tishy & Co.",
    number: "1",
    description: "Tishy & Co is an award-winning catering service provider based in Sydney, specializing in premium catering for corporate events, private parties, and special occasions. During my time at Aarambha IT, I contributed to this project by developing the backend and RESTful APIs using Django, integrating Celery for background tasks, and working on several frontend components. I also handled API integration with the React-based frontend, ensuring seamless communication between the client and server.",
    technologies: [
      "React.js",
      "TailwindCSS",
      "vite",
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
    demoLink: "https://tishyandco.com.au/"
  },
  {
    title: "Polar Treks",
    number: "2",
    description: "Polar Treks is a travel and adventure platform designed to offer seamless booking and exploration experiences. While working at Aarambha IT, I contributed by enhancing the user interface for better responsiveness and visual appeal, optimizing and maintaining the Django-based backend, and ensuring smooth integration between the frontend and backend systems.",
    technologies: [
      "Next.js",
      "TailwindCSS",
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
    demoLink: "https://polartreks.com/"
  },
  {
    title: "Kirana Pasal",
    number: "3",
    description: "Kirana Pasal is a fully functional e-commerce platform built on WordPress and WooCommerce, specializing in South Asian groceries. I was responsible for the end-to-end development, including responsive front-end design using Elementor, integrating secure Stripe payments, optimizing performance with Nginx, and implementing Yoast SEO for organic growth.",
    technologies: [
      "Wordpress",
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
    demoLink: "https://www.kiranapasal.shop"
  },
  {
    title: "Right4Children",
    number: "4",
    description: "Right4Children is a child- and youth-focused organization dedicated to empowering young people by helping them access their rights through impactful programs and services. During my time at Aarambha IT, I worked as a full-stack developer on this project, building and integrating both frontend and backend features using Django and Next.js. My contributions included developing core APIs, managing database models, and implementing dynamic, responsive UI components to ensure a seamless user experience.",
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
    githubLink: "https://github.com/nirajan-dhakal/right4children"
  }
];

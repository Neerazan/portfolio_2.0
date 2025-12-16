import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Project from "@/src/components/Project";
import TechStack from "@/src/components/Tech";
import Title from "@/src/components/ui/Title";
import WorkExperience from "@/src/components/WorkExperience";
import Footer from "../components/Footer";

export default function App() {
  const tishyImages: string[] = [
    "/assets/projects/tishy-1.png",
    "/assets/projects/tishy-2.png",
  ];
  const polarImages: string[] = [
    "/assets/projects/polar-1.png",
    "/assets/projects/polar-2.png",
  ];
  const r4cImages: string[] = [
    "/assets/projects/r4c-1.png",
    "/assets/projects/r4c-2.png",
  ];
  const kiranaImages: string[] = [
    "/assets/projects/kirana-1.png",
    "/assets/projects/kirana-2.png",
    "/assets/projects/kirana-3.png",
  ];

  return (
    <div className="pt-6.5">
      <Header />
    <Hero />

      {/* About Section */}
      <Title title="About Me" id="about" className={undefined} />
      <About />

      {/* Skills and Tech Stack */}
      <Title title="Skills & Technologies" id="skills" className={undefined} />
      <TechStack />

      {/* Work Experience */}
      <Title title="Work Experience" id="work" className={undefined} />
      <WorkExperience />

      <Title title="Some featured projects" id="projects" className={undefined} />
      <div>
        <Project
          title="Tishy & Co."
          number="1"
          description="Tishy & Co is an award-winning catering service provider based in Sydney, specializing in premium catering for corporate events, private parties, and special occasions. During my time at Aarambha IT, I contributed to this project by developing the backend and RESTful APIs using Django, integrating Celery for background tasks, and working on several frontend components. I also handled API integration with the React-based frontend, ensuring seamless communication between the client and server."
          technologies={[
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
          ]}

          images={tishyImages}
          demoLink="https://tishyandco.com.au/"
        />

        <Project
          title="Polar Treks"
          number="2"
          description="Polar Treks is a travel and adventure platform designed to offer seamless booking and exploration experiences. While working at Aarambha IT, I contributed by enhancing the user interface for better responsiveness and visual appeal, optimizing and maintaining the Django-based backend, and ensuring smooth integration between the frontend and backend systems."
          technologies={[
            "Next.js",
            "TailwindCSS",
            "Django",
            "PostgreSQL",
            "Nginx",
            "Oracle",
            "Cloudflare",
          ]}
          images={polarImages}
          demoLink="https://polartreks.com/"
        />

        <Project
          title="Kirana Pasal"
          number="3"
          description="Kirana Pasal is a fully functional e-commerce platform built on WordPress and WooCommerce, specializing in South Asian groceries. I was responsible for the end-to-end development, including responsive front-end design using Elementor, integrating secure Stripe payments, optimizing performance with Nginx, and implementing Yoast SEO for organic growth."
          technologies={[
            "Wordpress",
            "WooCommerce",
            "Elementor",
            "Yoast SEO",
            "Stripe",
            "Nginx",
          ]}
          images={kiranaImages}
          demoLink="https://www.kiranapasal.shop"
        />
        
        <Project
          title="Right4Children"
          number="4"
          description="Right4Children is a child- and youth-focused organization dedicated to empowering young people by helping them access their rights through impactful programs and services. During my time at Aarambha IT, I worked as a full-stack developer on this project, building and integrating both frontend and backend features using Django and Next.js. My contributions included developing core APIs, managing database models, and implementing dynamic, responsive UI components to ensure a seamless user experience."
          technologies={[
            "Next.js",
            "Tailwind CSS",
            "Shadcn",
            "Django",
            "PostgreSQL",
            "Nginx",
            "Oracle",
          ]}
          images={r4cImages}
          demoLink="https://right4children.org/"
        />
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

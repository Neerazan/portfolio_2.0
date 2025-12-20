import { useEffect, useState } from "react";
import { navSections } from "../data/nav";

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    let lastRun = 0;
    const handleScrollEvent = () => {
      const now = Date.now();
      if (now - lastRun < 100) return;
      lastRun = now;

      // Check if at top of page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Find which section is currently in view
      const sections = navSections.map(({ id }) => ({
        id,
        element: document.getElementById(id),
      })).filter(({ element }) => element !== null);

      let currentSection = "home";
      let closestDistance = Infinity;

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the upper half of viewport
          const distance = Math.abs(rect.top - window.innerHeight / 2);

          if (rect.top < window.innerHeight / 2 && distance < closestDistance) {
            closestDistance = distance;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });
    // Initial check
    handleScrollEvent();

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
      return;
    }
    const scrollSection = document.getElementById(id);
    if (scrollSection) {
      scrollSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { activeSection, scrollToSection };
}

"use client";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={elementRef}
      className={`reveal ${isVisible ? "active" : ""} mx-auto w-11/12 max-w-7xl`}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Side - Contact Form (Span 2) */}
        <div className="flex flex-col rounded-2xl bg-[#151520]/95 p-6 lg:col-span-2 border border-white/5 hover:border-indigo-500/30 transition-colors duration-300 shadow-2xl">
          <p className="mb-6 text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed font-light">
            I&apos;d love to hear from you! Feel free to reach out for questions,
            collaboration, or just to connect.
          </p>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>

        {/* Right Side - Bento Boxes (Span 1) */}
        <div className="flex flex-col gap-6 lg:h-full">
          {/* Top Box - Quote */}
          <div className="flex flex-2 flex-col justify-center rounded-2xl bg-[#151520]/95 p-6 border border-white/5 hover:border-white/10 transition-colors duration-300 shadow-2xl relative overflow-hidden group">
            <blockquote className="relative z-10 text-lg font-medium italic text-gray-300">
              &quot;Great things are not done by impulse, but by a series of small things brought together.&quot;
            </blockquote>
            <p className="mt-4 text-sm text-gray-500">- Vincent van Gogh</p>
          </div>

          {/* Bottom Box - Availability */}
          <div className="flex flex-1 flex-col justify-end items-start rounded-2xl bg-[#151520]/95 p-6 border border-white/5 hover:border-white/10 transition-colors duration-300 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xl font-bold text-white mb-2">Let&apos;s Build</p>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm text-gray-400">Available for work</span>
              </div>
            </div>

            <GlowingIcon className="absolute top-6 right-6 w-8 opacity-50 text-white/20 rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GlowingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM9 15a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 9 15Z" clipRule="evenodd" />
    </svg>
  )
}

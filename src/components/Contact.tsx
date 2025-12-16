"use client";

import ContactForm from "./ContactForm";
import GlowingIcon from "./ui/Star";
import Title from "./ui/Title";

export default function Contact() {
  return (
    <div
      className="text-text-sm mx-auto flex w-13/14 flex-col items-start justify-start gap-5 lg:mx-auto lg:mt-20 lg:w-15/20"
      id="contact"
    >
      <div className="flex w-full lg:gap-70">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col lg:w-187">
            <Title
              title="Have idea about project?"
              className="mt-12 mb-5 ml-0 flex items-center md:w-15/20"
            />
            <div className="flex flex-col items-start justify-start gap-5">
              <p className="mt-4 mb-5 lg:max-w-200">
                I&apos;d love to hear from you! Feel free to reach out for
                questions, collaboration, or just to connect.
              </p>
            </div>

            {/* Show Contact Form on all devices */}
            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </div>
        <Style />
      </div>
    </div>
  );
}

export function Style() {
  return (
    <div
      data-layer="Frame 1597884173"
      className="Frame1597884173 relative mt-30 hidden h-80 w-40 lg:block"
    >
      <div
        data-layer="Line 134"
        className="Line134 absolute top-[392.02px] left-[355px] h-px w-96 origin-top-left -rotate-90 border border-purple-400"
      ></div>
      <div
        data-layer="Line 135"
        className="Line135 absolute top-[392.02px] left-[275px] h-px w-96 origin-top-left -rotate-90 border border-purple-400"
      ></div>
      <div
        data-layer="Line 138"
        className="Line138 absolute top-[392.02px] left-[196px] h-px w-96 origin-top-left -rotate-90 border border-purple-400"
      ></div>
      <div
        data-layer="Line 137"
        className="Line137 absolute top-[291px] left-0 h-px w-96 border border-purple-400"
      ></div>
      <div
        data-layer="Line 139"
        className="Line139 absolute top-[204px] left-0 h-px w-96 border border-purple-400"
      ></div>
      <div className="absolute top-51 left-49 w-8 -translate-x-1/2 -translate-y-1/2 transform">
        <GlowingIcon />
      </div>
      <div className="absolute top-73 left-69 w-8 -translate-x-1/2 -translate-y-1/2 transform">
        <GlowingIcon />
      </div>
    </div>
  );
}

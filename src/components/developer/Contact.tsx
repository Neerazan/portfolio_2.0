"use client";

import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <div
      className="mx-auto flex flex-col items-center justify-center gap-10 py-20 px-4 max-w-7xl"
      id="contact"
    >
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
          Establish <span className="text-green-500">Connection</span>
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto font-mono text-sm leading-relaxed">
          Ready to start a new session? Initialize a handshake below and I'll respond with an ACK as soon as possible.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <ContactForm />
      </div>
    </div>
  );
}

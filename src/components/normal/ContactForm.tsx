"use client";

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactForm() {
  const {
    formState,
    isSubmitting,
    submitStatus,
    turnstileRef,
    handleSubmit,
    handleChange
  } = useContactForm();

  useEffect(() => {
    if (submitStatus === 'success') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [submitStatus]);

  const inputClass = "w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 rounded-lg border border-white/10 focus:border-cyan-500/50 outline-none transition-colors text-white/90 placeholder:text-white/40 disabled:opacity-50";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <input
        type="text"
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        disabled={isSubmitting}
        className={inputClass}
      />

      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        disabled={isSubmitting}
        className={inputClass}
      />

      <textarea
        name="message"
        value={formState.message}
        onChange={handleChange}
        placeholder="Type your message here..."
        required
        rows={4}
        disabled={isSubmitting}
        className={`${inputClass} resize-y min-h-[100px]`}
      />

      <div className="flex justify-center">
        <div ref={turnstileRef}></div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded cursor-pointer group relative w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-white text-black font-bold uppercase tracking-widest text-sm sm:text-base hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 group-hover:text-black transition-colors">
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </span>
        {!isSubmitting && (
          <div className="absolute inset-0 bg-cyan-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
        )}
      </button>

      {submitStatus && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-sm sm:text-base text-center mt-4 ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
        >
          {submitStatus === 'success'
            ? 'Message sent successfully!'
            : 'Failed to send message. Please try again.'}
        </motion.p>
      )}
    </motion.form>
  );
}

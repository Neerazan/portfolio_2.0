/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from 'framer-motion';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'success' | 'error' | null;

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Check if script is already present
    let script = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]') as HTMLScriptElement;

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        // Clear any existing content in the ref to prevent duplicates if needed, though render normally replaces
        // But the issue is likely strict mode double-invoking useEffect or multiple script loads
        if (widgetIdRef.current) return; // Already rendered

        widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'normal',
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      script.onerror = () => console.error('Failed to load Turnstile script');
      document.head.appendChild(script);
    } else {
      // Script already exists, checking if loaded
      if ((window as any).turnstile) {
        renderWidget();
      } else {
        script.addEventListener('load', renderWidget);
      }
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      // Don't remove the script tag as other components might need it
      if (script) {
        script.removeEventListener('load', renderWidget);
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get Turnstile token from the widget
    let turnstileToken = '';
    if (widgetIdRef.current && (window as any).turnstile) {
      turnstileToken = (window as any).turnstile.getResponse(widgetIdRef.current);
    }

    if (!turnstileToken) {
      setSubmitStatus('error');
      console.error('Turnstile token not available');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formState,
          turnstileToken
        }),
      });

      if (!response.ok) throw new Error('Form submission failed');

      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });

      // Reset Turnstile widget
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.reset(widgetIdRef.current);
      }

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const inputClass = "w-full p-2.5 sm:p-3 text-sm sm:text-base bg-white/5 rounded-lg border border-white/10 focus:border-cyan-500/50 outline-none transition-colors text-white/90 placeholder:text-white/40 disabled:opacity-50";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-2 sm:space-y-5 w-full"
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
        className="rounded cursor-pointer w-full py-2.5 sm:py-3 px-4 sm:px-6 bg-white text-black font-bold uppercase tracking-widest text-sm sm:text-base hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
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

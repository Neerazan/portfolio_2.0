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
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        widgetIdRef.current = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          theme: 'dark',
          size: 'normal',
        });
      }
    };
    script.onerror = () => console.error('Failed to load Turnstile script');
    document.head.appendChild(script);
    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.reset(widgetIdRef.current);
      }
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

  const inputClass = "w-full bg-transparent border-none outline-none text-green-400 placeholder:text-gray-700 font-mono text-sm sm:text-base p-0 focus:ring-0";
  const containerClass = "flex items-center gap-2 bg-[#0d1117] border border-gray-800 rounded px-3 py-2 focus-within:border-green-500/50 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl bg-[#010409] rounded-lg border border-gray-800 shadow-2xl overflow-hidden"
    >
      {/* Terminal Header */}
      <div className="bg-[#161b22] px-4 py-2 border-b border-gray-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="ml-4 font-mono text-xs text-gray-500 flex-1 text-center">
          bash — 80x24
        </div>
      </div>

      <div className="p-6 font-mono text-sm">
        <div className="mb-6 text-gray-400">
          Last login: {new Date().toDateString()} on ttys000 <br />
          <span className="text-green-500">➜</span> <span className="text-cyan-400">~</span> <span className="text-white">./contact_me.sh</span>
          <br />
          Initializing secure connection... <span className="text-green-500">Done</span>.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-500 mb-1 text-xs">name:</label>
            <div className={containerClass}>
              <span className="text-purple-500">$</span>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-1 text-xs">email:</label>
            <div className={containerClass}>
              <span className="text-purple-500">$</span>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-500 mb-1 text-xs">message:</label>
            <div className={`${containerClass} items-start`}>
              <span className="text-purple-500 mt-0.5">&gt;</span>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Type your message..."
                required
                rows={4}
                disabled={isSubmitting}
                className={`${inputClass} resize-y min-h-[80px]`}
              />
            </div>
          </div>

          <div className="flex justify-center py-2">
            <div ref={turnstileRef}></div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-mono rounded border border-[rgba(240,246,252,0.1)] transition-all disabled:opacity-50 disabled:grayscale"
          >
            {isSubmitting ? '[ TRANSMITTING... ]' : '[ EXECUTE_SEND ]'}
          </button>

          {submitStatus && (
            <div className={`mt-4 p-3 border rounded ${submitStatus === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
              <span className="font-bold">{submitStatus === 'success' ? 'SUCCESS:' : 'ERROR:'}</span> {
                submitStatus === 'success' ? 'Packet transmission complete. Protocol closed.' : 'Transmission failed. Check connection.'
              }
            </div>
          )}

        </form>
      </div>
    </motion.div>
  );
}

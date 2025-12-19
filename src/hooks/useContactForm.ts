/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ContactFormState, SubmitStatus } from '../types';

export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let script = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]') as HTMLScriptElement;

    const renderWidget = () => {
      if (turnstileRef.current && (window as any).turnstile) {
        if (widgetIdRef.current) return;

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
      if (script) {
        script.removeEventListener('load', renderWidget);
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

      // Optional: scroll to bottom if needed, can be handled by component
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

  return {
    formState,
    isSubmitting,
    submitStatus,
    turnstileRef,
    handleSubmit,
    handleChange
  };
}

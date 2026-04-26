/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ContactFormState, SubmitStatus } from '../types';

/**
 * Loads the Cloudflare Turnstile script lazily only when the contact section
 * is visible in the viewport, using IntersectionObserver.
 * This prevents 437KB of Cloudflare resources from blocking the initial page load.
 */
function useLazyTurnstile(turnstileRef: React.RefObject<HTMLDivElement | null>, widgetIdRef: React.RefObject<string | null>) {
  useEffect(() => {
    let script: HTMLScriptElement | null = null;

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

    const loadTurnstile = () => {
      const existing = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]') as HTMLScriptElement;

      if (existing) {
        if ((window as any).turnstile) {
          renderWidget();
        } else {
          existing.addEventListener('load', renderWidget);
        }
        return;
      }

      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      script.onerror = () => console.error('Failed to load Turnstile script');
      document.head.appendChild(script);
    };

    // Observe the turnstile container — only load when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadTurnstile();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before it enters viewport
    );

    if (turnstileRef.current) {
      observer.observe(turnstileRef.current);
    }

    return () => {
      observer.disconnect();
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      if (script) {
        script.removeEventListener('load', renderWidget);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

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

  // Lazy-load Turnstile only when contact section is in viewport
  useLazyTurnstile(turnstileRef, widgetIdRef);

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

  return {
    formState,
    isSubmitting,
    submitStatus,
    turnstileRef,
    handleSubmit,
    handleChange
  };
}

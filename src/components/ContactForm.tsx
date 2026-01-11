'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string; // Honeypot field - should remain empty
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // Honeypot - bots will fill this
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', website: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to send message'
      );
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-green-500/10 border border-green-500/30 text-center"
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-4">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-primary hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors
            ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
            focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50`}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors
            ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
            focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Honeypot field - hidden from real users, bots will fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={status === 'submitting'}
          className={`w-full px-4 py-3 rounded-lg bg-muted border transition-colors resize-none
            ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-primary'}
            focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50`}
          placeholder="How can I help you?"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-500">Failed to send message</p>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-medium
          hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

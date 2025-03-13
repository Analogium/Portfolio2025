import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS with the public key
emailjs.init(publicKey);

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  recipientEmail: string;
  onClose?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ recipientEmail, onClose }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setStatus('loading');
      
      await emailjs.send(
        'default_service',
        'template_aogn2xs',
        {
          title: 'Contact Us',
          name: data.name,
          email: data.email,
          message: data.message,
          to_email: recipientEmail,
        },
        publicKey
      );

      setStatus('success');
      reset();
      setTimeout(() => {
        onClose?.();
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[rgb(var(--text))]">
            {t('contact.name')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full rounded-md border-[rgb(var(--border))]/30 
                     bg-[rgb(var(--card))]/50 text-[rgb(var(--text))]
                     focus:border-primary focus:ring focus:ring-primary/20"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--text))]">
            {t('contact.email')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full rounded-md border-[rgb(var(--border))]/30 
                     bg-[rgb(var(--card))]/50 text-[rgb(var(--text))]
                     focus:border-primary focus:ring focus:ring-primary/20"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[rgb(var(--text))]">
            {t('contact.message')}
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="mt-1 block w-full rounded-md border-[rgb(var(--border))]/30 
                     bg-[rgb(var(--card))]/50 text-[rgb(var(--text))]
                     focus:border-primary focus:ring focus:ring-primary/20"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-md
                   bg-primary hover:bg-primary-dark text-white font-medium
                   transition-colors duration-300 disabled:opacity-50"
        >
          {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-5 h-5" />}
          {status === 'error' && <XCircle className="w-5 h-5" />}
          {status === 'idle' && t('contact.send')}
          {status === 'loading' && t('contact.sending')}
          {status === 'success' && t('contact.sent')}
          {status === 'error' && t('contact.error')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
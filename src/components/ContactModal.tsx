import React from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ContactForm from './ContactForm';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, recipientEmail }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative glass-card w-full max-w-lg rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[rgb(var(--text))]">
              {t('contact.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-[rgb(var(--text-secondary))] hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ContactForm recipientEmail={recipientEmail} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
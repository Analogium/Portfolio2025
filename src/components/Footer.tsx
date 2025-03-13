import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[rgb(var(--card))]/[var(--card-opacity)] border-t border-[rgb(var(--border))]/[var(--border-opacity)]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-[rgb(var(--text))]">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-[rgb(var(--text-secondary))] text-sm mt-2">
            {t('footer.tech')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
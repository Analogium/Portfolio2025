import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Réduire padding au scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      {/* Fond flouté */}
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgb(var(--background))]/70 shadow-lg shadow-[rgb(var(--background))]/10" />

      <div className="relative max-w-7xl mx-auto px-4 z-10">
        {/* Haut de navbar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="relative group z-10">
            <span className="text-2xl font-bold text-gradient">
              Theo Lambert
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              {[
                { path: '/', label: t('nav.home') },
                { path: '/projects', label: t('nav.projects') },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-white dark:text-white'
                      : 'text-[rgb(var(--text))] hover:text-primary dark:text-[rgb(var(--text))] dark:hover:text-primary'
                  }`}
                >
                  {isActive(item.path) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full -z-10 animate-gradient opacity-100" />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Switchers */}
            <div className="flex items-center space-x-2 pl-4 border-l border-[rgb(var(--border))]/[var(--border-opacity)]">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Bouton burger mobile */}
          <div className="md:hidden flex items-center space-x-4 z-10">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full transition-all duration-300 hover:scale-110" />
              {isOpen ? (
                <X className="w-5 h-5 text-[rgb(var(--text))] relative z-10" />
              ) : (
                <Menu className="w-5 h-5 text-[rgb(var(--text))] relative z-10" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {[
              { path: '/', label: t('nav.home') },
              { path: '/projects', label: t('nav.projects') },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-primary to-secondary text-white dark:text-white'
                    : 'text-[rgb(var(--text))] hover:bg-[rgb(var(--border))]/10 dark:text-[rgb(var(--text))] dark:hover:bg-[rgb(var(--border))]/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

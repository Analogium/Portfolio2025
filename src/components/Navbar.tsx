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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="absolute inset-0 backdrop-blur-xl bg-[rgb(var(--background))]/70 shadow-lg shadow-[rgb(var(--background))]/10" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative group"
          >
            <span className="text-2xl font-bold text-gradient">
              Theo Lambert
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop Navigation */}
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

            <div className="flex items-center space-x-2 pl-4 border-l border-[rgb(var(--border))]/[var(--border-opacity)]">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full transition-all duration-300 hover:scale-110" />
              {isOpen ? (
                <X className="w-5 h-5 text-[rgb(var(--text))]" />
              ) : (
                <Menu className="w-5 h-5 text-[rgb(var(--text))]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-64 opacity-100 mt-4'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="py-4 space-y-2">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
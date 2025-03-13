import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 glass-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              {t('nav.home')}
            </Link>
            <Link to="/projects" className="nav-link">
              {t('nav.projects')}
            </Link>
            <div className="flex items-center space-x-2">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[rgb(var(--text-secondary))] hover:text-primary transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[rgb(var(--border))]/[var(--border-opacity)]">
            <Link
              to="/"
              className="block py-2 nav-link"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/projects"
              className="block py-2 nav-link"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.projects')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
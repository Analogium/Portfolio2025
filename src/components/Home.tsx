import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ContactModal from './ContactModal';

const Home = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'No profile data available'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent dark:from-primary/10" />
        
        <div className="relative z-10 text-center">
          {profile.avatar_url && (
            <div className="relative inline-block">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary to-primary-dark rounded-full blur-xl opacity-50" />
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl mb-8 object-cover"
              />
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-primary-light animate-gradient">
            {t('hero.greeting', { name: profile.name })}
          </h1>
          
          <p className="text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-3xl mx-auto leading-relaxed mb-12">
            {profile.bio}
          </p>

          <div className="flex justify-center gap-6">
            <a
              href={`https://github.com/${profile.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-card"
            >
              <Github className="w-6 h-6" />
            </a>
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-card"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="social-link-card"
            >
              <Mail className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary-dark/5 dark:bg-primary-dark/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mt-10">
        {/* Frontend Skills */}
        <div className="skill-card">
          <div className="skill-icon">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{t('skills.frontend.title')}</h3>
          <p className="text-[rgb(var(--text-secondary))] mb-6">{t('skills.frontend.description')}</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills_by_category.frontend.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* Backend Skills */}
        <div className="skill-card">
          <div className="skill-icon">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{t('skills.backend.title')}</h3>
          <p className="text-[rgb(var(--text-secondary))] mb-6">{t('skills.backend.description')}</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills_by_category.backend.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {/* DevOps Skills */}
        <div className="skill-card">
          <div className="skill-icon">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{t('skills.devops.title')}</h3>
          <p className="text-[rgb(var(--text-secondary))] mb-6">{t('skills.devops.description')}</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills_by_category.devops.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-20 glass-card rounded-3xl p-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-[rgb(var(--text-secondary))] mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center px-8 py-4 rounded-full animated-gradient text-white font-medium 
                   transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {t('cta.button')}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        recipientEmail={profile.email}
      />
    </div>
  );
};

export default Home;
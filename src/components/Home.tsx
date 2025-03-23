import React, { useState } from 'react';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';
import { Github, Linkedin, Mail, ArrowRight, Code, Server, Cloud, FileDown } from 'lucide-react';
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

  const handleDownloadCV = () => {
    if (profile?.cv_url) {
      window.open(profile.cv_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin"></div>
        </div>
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
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center relative py-20">
        <div className="hero-background" />
        
        <div className="relative z-10 text-center">
          {profile.avatar_url && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-lg opacity-50 animate-pulse"></div>
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="relative w-40 h-40 rounded-full border-4 border-white/10 shadow-2xl object-cover"
              />
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="text-gradient">{t('hero.greeting', { name: profile.name })}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[rgb(var(--text-secondary))] max-w-3xl mx-auto leading-relaxed mb-12 glass-card p-6 rounded-2xl">
            {profile.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <a
              href={`https://github.com/${profile.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-gradient"
            >
              <Github className="w-6 h-6 inline-block mr-2" />
              GitHub
            </a>
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="button-gradient"
              >
                <Linkedin className="w-6 h-6 inline-block mr-2" />
                LinkedIn
              </a>
            )}
            {profile.cv_url && (
              <button
                onClick={handleDownloadCV}
                className="button-gradient"
              >
                <FileDown className="w-6 h-6 inline-block mr-2" />
                {t('hero.downloadCV')}
              </button>
            )}
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="button-gradient"
            >
              <Mail className="w-6 h-6 inline-block mr-2" />
              Contact
            </button>
          </div>

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
            <ArrowRight className="w-6 h-6 rotate-90 text-primary" />
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-gradient">{t('skills.title')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Frontend Skills */}
          <div className="skill-card">
            <div className="skill-icon">
              <Code className="w-8 h-8 text-primary" />
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
              <Server className="w-8 h-8 text-secondary" />
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
              <Cloud className="w-8 h-8 text-accent" />
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
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 animate-gradient"></div>
          
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-gradient">{t('cta.title')}</span>
          </h2>
          
          <p className="text-xl text-[rgb(var(--text-secondary))] mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          
          <Link
            to="/projects"
            className="button-gradient inline-flex items-center"
          >
            {t('cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
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
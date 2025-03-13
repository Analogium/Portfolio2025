import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            projects: 'Projects',
          },
          hero: {
            greeting: "Hi, I'm {{name}}. Nice to meet you.",
          },
          skills: {
            title: 'Technologies I Work With',
            frontend: {
              title: 'Frontend Development',
              description: 'Creating beautiful, responsive interfaces with modern frameworks',
            },
            backend: {
              title: 'Backend Development',
              description: 'Building robust and scalable server-side applications',
            },
            devops: {
              title: 'DevOps',
              description: 'Automating deployment and maintaining infrastructure',
            },
          },
          contact: {
            title: 'Get in Touch',
            name: 'Your Name',
            email: 'Your Email',
            message: 'Message',
            send: 'Send Message',
            sending: 'Sending...',
            sent: 'Message Sent!',
            error: 'Error, try again',
          },
          cta: {
            title: 'Interested in collaborating?',
            description: "I'm always open to discussing new projects and opportunities.",
            button: 'View My Work',
          },
          projects: {
            title: 'My Projects',
            description: 'Here are some of the projects I\'ve worked on. Each one represents a unique challenge and learning experience.',
            code: 'Code',
            demo: 'Live Demo',
          },
          footer: {
            copyright: 'Portfolio. Crafted with passion and precision.',
            tech: 'Built with React, Tailwind CSS, and Supabase',
          },
        },
      },
      fr: {
        translation: {
          nav: {
            home: 'Accueil',
            projects: 'Projets',
          },
          hero: {
            greeting: "Bonjour, je suis {{name}}. Ravi de vous rencontrer.",
          },
          skills: {
            title: 'Technologies que j\'utilise',
            frontend: {
              title: 'Développement Frontend',
              description: 'Création d\'interfaces responsives avec des frameworks modernes',
            },
            backend: {
              title: 'Développement Backend',
              description: 'Construction d\'applications serveur robustes et évolutives',
            },
            devops: {
              title: 'DevOps',
              description: 'Automatisation du déploiement et maintenance de l\'infrastructure',
            },
          },
          contact: {
            title: 'Contactez-moi',
            name: 'Votre Nom',
            email: 'Votre Email',
            message: 'Message',
            send: 'Envoyer',
            sending: 'Envoi en cours...',
            sent: 'Message envoyé !',
            error: 'Erreur, réessayez',
          },
          cta: {
            title: 'Intéressé par une collaboration ?',
            description: 'Je suis toujours ouvert à la discussion de nouveaux projets et opportunités.',
            button: 'Voir mon travail',
          },
          projects: {
            title: 'Mes Projets',
            description: 'Voici quelques-uns des projets sur lesquels j\'ai travaillé. Chacun représente un défi unique et une expérience enrichissante.',
            code: 'Code',
            demo: 'Démo',
          },
          footer: {
            copyright: 'Portfolio. Créé avec passion et précision.',
            tech: 'Développé avec React, Tailwind CSS et Supabase',
          },
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
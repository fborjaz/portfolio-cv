'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { getResumeData } from '@/data/resumeData';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useRef, useState } from 'react';
import { translations } from '@/context/LanguageContext';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const roles = (translations[language].hero as { roles: string[] }).roles;

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === role) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) => (isDeleting ? prev.slice(0, -1) : role.slice(0, prev.length + 1)));
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  // Entrada del hero orquestada con una timeline de GSAP (stagger de los bloques).
  const heroRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })
          .from('.hero-reveal', {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.15,
          });
      });
    },
    { scope: heroRef },
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [180, 0, 180],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 -right-1/4 w-64 md:w-96 h-64 md:h-96 bg-secondary/10 rounded-full blur-3xl"
        />

        {/* Additional floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl hidden md:block"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-2xl hidden md:block"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div
        ref={heroRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        {/* Greeting */}
        <div className="hero-reveal mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {t('hero.greeting')}
          </span>
        </div>

        {/* Name */}
        <h1 className="hero-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          {t('hero.iam')} <span className="gradient-text">{resumeData.personal.name}</span>
        </h1>

        {/* Animated role */}
        <div className="hero-reveal text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 h-10">
          <span>{displayText}</span>
          <span className="typing-cursor" />
        </div>

        {/* Description */}
        <p className="hero-reveal text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div
          className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-full 
                       font-medium transition-all duration-300 shadow-lg shadow-primary/25 
                       flex items-center justify-center gap-2 text-sm sm:text-base magnetic-btn"
          >
            {t('hero.viewProjects')}
          </motion.a>
          <motion.a
            href="/documents/CV_Frank_Borja_.pdf"
            download
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary hover:bg-primary/10 
                       rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            {t('hero.downloadCV')}
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="hero-reveal flex items-center justify-center gap-3 sm:gap-4">
          {[
            {
              icon: Github,
              href: resumeData.personal.github,
              label: 'GitHub',
              color: 'group-hover:text-gray-900 dark:group-hover:text-white',
            },
            {
              icon: Linkedin,
              href: resumeData.personal.linkedin,
              label: 'LinkedIn',
              color: 'group-hover:text-blue-600',
            },
            {
              icon: Mail,
              href: `mailto:${resumeData.personal.email}`,
              label: 'Email',
              color: 'group-hover:text-red-500',
            },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted hover:bg-primary/10 hover:shadow-lg
                         flex items-center justify-center transition-all duration-300 group"
              aria-label={social.label}
            >
              <social.icon
                className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground ${social.color} transition-colors duration-300`}
              />
            </motion.a>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: 'spring' }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs sm:text-sm">{t('hero.scroll')}</span>
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(99, 102, 241, 0.4)',
                  '0 0 0 10px rgba(99, 102, 241, 0)',
                  '0 0 0 0 rgba(99, 102, 241, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full"
            >
              <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

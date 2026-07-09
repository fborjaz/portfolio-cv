"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    // Cargar idioma guardado del localStorage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Mantener <html lang> sincronizado para accesibilidad y SEO
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Retornar la key si no se encuentra la traducción
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Traducciones
const translations: Record<Language, Record<string, unknown>> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre Mí",
      skills: "Habilidades",
      experience: "Experiencia",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      greeting: "👋 ¡Hola! Bienvenido a mi portfolio",
      iam: "Soy",
      roles: [
        "Desarrollador Full Stack",
        "Ingeniero de Software",
        "Creador de Experiencias Web",
        "Entusiasta de la IA",
      ],
      description:
        "Transformo ideas en experiencias digitales excepcionales. Especializado en crear aplicaciones web modernas, escalables y con una experiencia de usuario impecable.",
      viewProjects: "Ver Proyectos",
      downloadCV: "Descargar CV",
      scroll: "Scroll",
    },
    about: {
      badge: "Sobre Mí",
      title: "Conoce un poco más sobre",
      titleHighlight: "quién soy",
      subtitle:
        "Mi trayectoria en el desarrollo de software y lo que me apasiona",
      greeting: "¡Hola! Soy",
      bio: "Cuando no estoy programando, me gusta explorar nuevas tecnologías, contribuir a proyectos open source, y compartir conocimientos con la comunidad de desarrolladores. Creo firmemente en el aprendizaje continuo y en construir productos que generen un impacto positivo.",
      photoPlaceholder: "Tu foto aquí",
      highlights: {
        cleanCode: {
          title: "Clean Code",
          description: "Código limpio, mantenible y bien documentado",
        },
        uiux: {
          title: "UI/UX Design",
          description: "Diseños modernos centrados en el usuario",
        },
        problemSolver: {
          title: "Problem Solver",
          description: "Soluciones creativas a problemas complejos",
        },
        teamPlayer: {
          title: "Team Player",
          description: "Colaboración efectiva en equipos ágiles",
        },
      },
    },
    skills: {
      badge: "Habilidades",
      title: "Tecnologías que",
      titleHighlight: "domino",
      subtitle:
        "Un resumen de mis habilidades técnicas y nivel de experiencia en cada una",
      otherTech: "Otras Tecnologías",
    },
    experience: {
      badge: "Trayectoria",
      title: "Trayectoria",
      myExperience: "Mi",
      professional: "experiencia profesional",
      subtitle:
        "Un recorrido por mi carrera profesional y los logros alcanzados",
      work: "Experiencia Laboral",
      education: "Educación",
      certifications: "Certificaciones",
      languages: "Idiomas",
    },
    projects: {
      badge: "Portfolio",
      title: "Mis",
      titleHighlight: "proyectos",
      titleEnd: "destacados",
      subtitle:
        "Una selección de proyectos que demuestran mis habilidades y experiencia",
      all: "Todos",
      featured: "Destacados",
      featuredBadge: "⭐ Destacado",
      viewMore: "Ver más proyectos en GitHub",
      details: "Ver detalles",
      features: "Funcionalidades",
      privateRepo: "Repositorio privado",
      viewSite: "Ver sitio",
      viewCode: "Ver código",
      close: "Cerrar",
    },
    contact: {
      badge: "Contacto",
      title: "¿Tienes un proyecto en mente?",
      titleHighlight: "¡Hablemos!",
      subtitle:
        "Estoy disponible para proyectos freelance, oportunidades laborales o simplemente para charlar sobre tecnología",
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
      tip: "💡 ¿Sabías que...?",
      tipText:
        "También puedes preguntarle al chatbot con IA sobre mi experiencia, habilidades y proyectos. ¡Está en la esquina inferior derecha!",
      form: {
        name: "Nombre",
        namePlaceholder: "Tu nombre",
        email: "Email",
        emailPlaceholder: "tu@email.com",
        subject: "Asunto",
        subjectPlaceholder: "¿En qué puedo ayudarte?",
        message: "Mensaje",
        messagePlaceholder: "Cuéntame sobre tu proyecto o idea...",
        submit: "Enviar mensaje",
        sending: "Enviando...",
        sent: "¡Mensaje enviado!",
      },
    },
    footer: {
      description:
        "Desarrollador Full Stack apasionado por crear experiencias digitales excepcionales. Siempre aprendiendo nuevas tecnologías.",
      rights: "Todos los derechos reservados.",
      madeWith: "Hecho con",
      using: "usando Next.js",
      quickLinks: "Links Rápidos",
      contact: "Contacto",
    },
    chat: {
      title: "Asistente IA",
      online: "En línea",
      welcome:
        "¡Hola! 👋 Soy un asistente con IA que puede responder preguntas sobre mi experiencia, habilidades y proyectos. ¿En qué puedo ayudarte?",
      placeholder: "Escribe tu mensaje...",
      suggestions: "Preguntas sugeridas:",
      suggestedQuestions: [
        "¿Cuál es tu experiencia?",
        "¿Qué tecnologías dominas?",
        "Cuéntame sobre tus proyectos",
        "¿Estás disponible para trabajar?",
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "👋 Hi! Welcome to my portfolio",
      iam: "I'm",
      roles: [
        "Full Stack Developer",
        "Software Engineer",
        "Web Experience Creator",
        "AI Enthusiast",
      ],
      description:
        "I transform ideas into exceptional digital experiences. Specialized in creating modern, scalable web applications with an impeccable user experience.",
      viewProjects: "View Projects",
      downloadCV: "Download CV",
      scroll: "Scroll",
    },
    about: {
      badge: "About Me",
      title: "Get to know a little more about",
      titleHighlight: "who I am",
      subtitle:
        "My journey in software development and what I'm passionate about",
      greeting: "Hi! I'm",
      bio: "When I'm not coding, I enjoy exploring new technologies, contributing to open source projects, and sharing knowledge with the developer community. I firmly believe in continuous learning and building products that make a positive impact.",
      photoPlaceholder: "Your photo here",
      highlights: {
        cleanCode: {
          title: "Clean Code",
          description: "Clean, maintainable, and well-documented code",
        },
        uiux: {
          title: "UI/UX Design",
          description: "Modern user-centered designs",
        },
        problemSolver: {
          title: "Problem Solver",
          description: "Creative solutions to complex problems",
        },
        teamPlayer: {
          title: "Team Player",
          description: "Effective collaboration in agile teams",
        },
      },
    },
    skills: {
      badge: "Skills",
      title: "Technologies I",
      titleHighlight: "master",
      subtitle:
        "A summary of my technical skills and experience level in each one",
      otherTech: "Other Technologies",
    },
    experience: {
      badge: "Career",
      title: "Career",
      myExperience: "My",
      professional: "professional experience",
      subtitle: "A journey through my professional career and achievements",
      work: "Work Experience",
      education: "Education",
      certifications: "Certifications",
      languages: "Languages",
    },
    projects: {
      badge: "Portfolio",
      title: "My",
      titleHighlight: "featured",
      titleEnd: "projects",
      subtitle:
        "A selection of projects that demonstrate my skills and experience",
      all: "All",
      featured: "Featured",
      featuredBadge: "⭐ Featured",
      viewMore: "View more projects on GitHub",
      details: "View details",
      features: "Features",
      privateRepo: "Private repository",
      viewSite: "View site",
      viewCode: "View code",
      close: "Close",
    },
    contact: {
      badge: "Contact",
      title: "Have a project in mind?",
      titleHighlight: "Let's talk!",
      subtitle:
        "I'm available for freelance projects, job opportunities, or just to chat about technology",
      email: "Email",
      phone: "Phone",
      location: "Location",
      tip: "💡 Did you know...?",
      tipText:
        "You can also ask the AI chatbot about my experience, skills, and projects. It's in the bottom right corner!",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "you@email.com",
        subject: "Subject",
        subjectPlaceholder: "How can I help you?",
        message: "Message",
        messagePlaceholder: "Tell me about your project or idea...",
        submit: "Send message",
        sending: "Sending...",
        sent: "Message sent!",
      },
    },
    footer: {
      description:
        "Full Stack Developer passionate about creating exceptional digital experiences. Always learning new technologies.",
      rights: "All rights reserved.",
      madeWith: "Made with",
      using: "using Next.js",
      quickLinks: "Quick Links",
      contact: "Contact",
    },
    chat: {
      title: "AI Assistant",
      online: "Online",
      welcome:
        "Hi! 👋 I'm an AI assistant that can answer questions about my experience, skills, and projects. How can I help you?",
      placeholder: "Type your message...",
      suggestions: "Suggested questions:",
      suggestedQuestions: [
        "What's your experience?",
        "What technologies do you master?",
        "Tell me about your projects",
        "Are you available for work?",
      ],
    },
  },
};

export { translations };

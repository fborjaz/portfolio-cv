export const resumeDataES = {
   personal: {
      name: "Frank Borja",
      title: "Desarrollador Full Stack",
      email: "frank.borja.31@gmail.com",
      phone: "+593 982117699",
      location: "Guayaquil, Ecuador",
      linkedin: "https://www.linkedin.com/in/fborjaz/",
      github: "https://github.com/fborjaz",
      summary: `Desarrollador de Software apasionado, actualmente cursando Ingeniería en Software 
    en la Universidad Estatal de Milagro. Especializado en desarrollo web y móvil full-stack,
    con experiencia creando sistemas ERP y aplicaciones para clientes internacionales. 
    Certificado en AWS Cloud y entusiasta de la inteligencia artificial.`,
   },

   skills: [
      { name: "React / Next.js", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "Tailwind CSS", level: 95, category: "Frontend" },
      { name: "HTML5 / CSS3", level: 95, category: "Frontend" },
      { name: "Framer Motion", level: 80, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "Python / Django", level: 85, category: "Backend" },
      { name: "Express.js", level: 75, category: "Backend" },
      { name: "REST APIs", level: 85, category: "Backend" },
      { name: "PostgreSQL", level: 80, category: "Database" },
      { name: "MongoDB", level: 75, category: "Database" },
      { name: "MySQL", level: 80, category: "Database" },
      { name: "Firebase", level: 70, category: "Database" },
      { name: "AWS Cloud", level: 75, category: "Cloud" },
      { name: "Vercel", level: 85, category: "Cloud" },
      { name: "Docker", level: 70, category: "DevOps" },
      { name: "Git / GitHub", level: 90, category: "Tools" },
      { name: "VS Code", level: 95, category: "Tools" },
      { name: "Figma", level: 75, category: "Design" },
      { name: "Adobe Illustrator", level: 85, category: "Design" },
      { name: "React Native", level: 75, category: "Mobile" },
      { name: "Expo", level: 70, category: "Mobile" },
   ],

   experience: [
      {
         id: 1,
         title: "Desarrollador de Software Freelance",
         company: "Proyectos Independientes",
         location: "Remoto",
         startDate: "2022",
         endDate: "Presente",
         description: [
            "Desarrollo de Sistemas ERP: Liderando la arquitectura y desarrollo full-stack de un sistema de Planificación de Recursos Empresariales (ERP) personalizado, optimizando control de inventario y procesos de ventas",
            "Desarrollo Web y Móvil: Diseño y despliegue exitoso de dos aplicaciones móviles y múltiples plataformas web personalizadas para clientes internacionales, cumpliendo requisitos específicos de negocio",
         ],
         technologies: ["React", "Next.js", "Node.js", "Python", "Django", "PostgreSQL", "React Native"],
      },
      {
         id: 2,
         title: "Especialista en Soporte TI (Pasantía)",
         company: "M. Boderos & Asociados - Bufete de Abogados",
         location: "Guayaquil, Ecuador",
         startDate: "Febrero 2021",
         endDate: "Noviembre 2021",
         description: [
            "Brindé soporte técnico y mantenimiento de equipos informáticos",
            "Administré redes y sistemas de la firma legal",
            "Implementé soluciones tecnológicas para mejorar la eficiencia operativa",
            "Gestioné respaldos de información y seguridad de datos",
         ],
         technologies: ["Windows Server", "Redes", "Soporte Técnico", "Office 365"],
      },
   ],

   projects: [
      {
         id: 1,
         title: "Sistema ERP Personalizado",
         description: "Sistema de Planificación de Recursos Empresariales con control de inventario, gestión de ventas y reportes analíticos.",
         image: "/projects/erp.jpg",
         technologies: ["Next.js", "Node.js", "PostgreSQL", "Tailwind", "Docker"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 2,
         title: "Aplicación Móvil",
         description: "Aplicación móvil desarrollada para clientes internacionales con funcionalidades personalizadas según requerimientos de negocio.",
         image: "/projects/mobile-app.jpg",
         technologies: ["React Native", "Expo", "Node.js", "MongoDB"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 3,
         title: "Plataforma Web Empresarial",
         description: "Plataforma web personalizada para gestión empresarial con panel de administración y dashboard analítico.",
         image: "/projects/web-platform.jpg",
         technologies: ["React", "Django", "PostgreSQL", "AWS"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 4,
         title: "Portfolio Personal",
         description: "Este mismo portfolio - diseñado con animaciones modernas, modo oscuro, soporte multiidioma y chatbot con IA.",
         image: "/projects/portfolio.jpg",
         technologies: ["Next.js", "Framer Motion", "Tailwind", "OpenAI"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: false,
      },
   ],

   education: [
      {
         degree: "Ingeniería en Software",
         institution: "Universidad Estatal de Milagro (UNEMI)",
         year: "2022 - En Curso",
         description: "Carrera en progreso - Especialización en desarrollo de software",
      },
      {
         degree: "Bachiller Técnico en Informática",
         institution: "Unidad Educativa Fiscal Vicente Rocafuerte",
         year: "2021",
         description: "Guayaquil - Formación técnica en informática y sistemas",
      },
   ],

   certifications: [
      "Participante Hackathon INNOVaiLAB | 2026",
      "Participante Hackathon Start Lab | 2025",
      "AWS Academy Graduate - Introducción a la Nube (Semestre 1 y 2) | Amazon Web Services | 2024",
      "Participante Hackathon 'Tech for Green' en UNEMI | 2024",
      "Especialista en Diseño Gráfico - Adobe Illustrator | 2019",
   ],

   languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Intermedio (B1)" },
   ],

   interests: [
      "Inteligencia Artificial",
      "Desarrollo Web",
      "Cloud Computing",
      "Diseño Gráfico",
      "Open Source",
      "Hackathons",
   ],
};

export const resumeDataEN = {
   personal: {
      name: "Frank Borja",
      title: "Full Stack Developer",
      email: "frank.borja.31@gmail.com",
      phone: "+593 982117699",
      location: "Guayaquil, Ecuador",
      linkedin: "https://www.linkedin.com/in/fborjaz/",
      github: "https://github.com/fborjaz",
      summary: `Passionate Software Developer, currently pursuing a B.S. in Software Engineering 
    at the State University of Milagro. Specialized in full-stack web and mobile development,
    with experience building ERP systems and applications for international clients. 
    AWS Cloud certified and AI enthusiast.`,
   },

   skills: [
      { name: "React / Next.js", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "Tailwind CSS", level: 95, category: "Frontend" },
      { name: "HTML5 / CSS3", level: 95, category: "Frontend" },
      { name: "Framer Motion", level: 80, category: "Frontend" },
      { name: "Node.js", level: 80, category: "Backend" },
      { name: "Python / Django", level: 85, category: "Backend" },
      { name: "Express.js", level: 75, category: "Backend" },
      { name: "REST APIs", level: 85, category: "Backend" },
      { name: "PostgreSQL", level: 80, category: "Database" },
      { name: "MongoDB", level: 75, category: "Database" },
      { name: "MySQL", level: 80, category: "Database" },
      { name: "Firebase", level: 70, category: "Database" },
      { name: "AWS Cloud", level: 75, category: "Cloud" },
      { name: "Vercel", level: 85, category: "Cloud" },
      { name: "Docker", level: 70, category: "DevOps" },
      { name: "Git / GitHub", level: 90, category: "Tools" },
      { name: "VS Code", level: 95, category: "Tools" },
      { name: "Figma", level: 75, category: "Design" },
      { name: "Adobe Illustrator", level: 85, category: "Design" },
      { name: "React Native", level: 75, category: "Mobile" },
      { name: "Expo", level: 70, category: "Mobile" },
   ],

   experience: [
      {
         id: 1,
         title: "Freelance Software Developer",
         company: "Independent Projects",
         location: "Remote",
         startDate: "2022",
         endDate: "Present",
         description: [
            "ERP Systems Development: Currently spearheading the architecture and full-stack development of a custom Enterprise Resource Planning (ERP) system, optimizing inventory control and sales processes",
            "Web & Mobile Development: Successfully designed and deployed two mobile applications and multiple custom web platforms for international clients, meeting specific business requirements",
         ],
         technologies: ["React", "Next.js", "Node.js", "Python", "Django", "PostgreSQL", "React Native"],
      },
      {
         id: 2,
         title: "IT Support Specialist (Internship)",
         company: "M. Boderos & Asociados - Law Firm",
         location: "Guayaquil, Ecuador",
         startDate: "February 2021",
         endDate: "November 2021",
         description: [
            "Provided technical support and computer equipment maintenance",
            "Managed networks and systems for the law firm",
            "Implemented technological solutions to improve operational efficiency",
            "Handled information backups and data security",
         ],
         technologies: ["Windows Server", "Networking", "Technical Support", "Office 365"],
      },
   ],

   projects: [
      {
         id: 1,
         title: "Custom ERP System",
         description: "Enterprise Resource Planning system with inventory control, sales management, and analytical reports.",
         image: "/projects/erp.jpg",
         technologies: ["Next.js", "Node.js", "PostgreSQL", "Tailwind", "Docker"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 2,
         title: "Mobile Application",
         description: "Mobile application developed for international clients with customized functionalities according to business requirements.",
         image: "/projects/mobile-app.jpg",
         technologies: ["React Native", "Expo", "Node.js", "MongoDB"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 3,
         title: "Enterprise Web Platform",
         description: "Custom web platform for business management with admin panel and analytical dashboard.",
         image: "/projects/web-platform.jpg",
         technologies: ["React", "Django", "PostgreSQL", "AWS"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: true,
      },
      {
         id: 4,
         title: "Personal Portfolio",
         description: "This portfolio - designed with modern animations, dark mode, multi-language support, and AI chatbot.",
         image: "/projects/portfolio.jpg",
         technologies: ["Next.js", "Framer Motion", "Tailwind", "OpenAI"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz",
         featured: false,
      },
   ],

   education: [
      {
         degree: "B.S. in Software Engineering",
         institution: "State University of Milagro (UNEMI)",
         year: "2022 - In Progress",
         description: "Degree in progress - Specialization in software development",
      },
      {
         degree: "Technical High School Diploma in Informatics",
         institution: "Vicente Rocafuerte Public High School",
         year: "2021",
         description: "Guayaquil - Technical training in informatics and systems",
      },
   ],

   certifications: [
      "Hackathon Participant INNOVaiLAB | 2026",
      "Hackathon Participant Start Lab | 2025",
      "AWS Academy Graduate - Introduction to Cloud (Semester 1 & 2) | Amazon Web Services | 2024",
      "Hackathon Participant 'Tech for Green' at UNEMI | 2024",
      "Graphic Design Specialist - Adobe Illustrator | 2019",
   ],

   languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Intermediate (B1)" },
   ],

   interests: [
      "Artificial Intelligence",
      "Web Development",
      "Cloud Computing",
      "Graphic Design",
      "Open Source",
      "Hackathons",
   ],
};

export type ResumeData = typeof resumeDataES;

// Función para obtener los datos del resume según el idioma
export function getResumeData(language: "es" | "en"): ResumeData {
   return language === "es" ? resumeDataES : resumeDataEN;
}

// Función para generar el contexto del CV para el chatbot
export function getResumeContext(language: "es" | "en" = "es"): string {
   const data = getResumeData(language);
   const { personal, skills, experience, projects, education, certifications, languages, interests } = data;

   if (language === "en") {
      return `
# CV Information for ${personal.name}

## Personal Information
- Name: ${personal.name}
- Title: ${personal.title}
- Email: ${personal.email}
- Location: ${personal.location}
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}

## Professional Summary
${personal.summary}

## Technical Skills
${skills.map(s => `- ${s.name}: ${s.level}% (${s.category})`).join('\n')}

## Work Experience
${experience.map(exp => `
### ${exp.title} at ${exp.company}
- Period: ${exp.startDate} - ${exp.endDate}
- Location: ${exp.location}
- Responsibilities:
${exp.description.map(d => `  - ${d}`).join('\n')}
- Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

## Featured Projects
${projects.map(p => `
### ${p.title}
${p.description}
Technologies: ${p.technologies.join(', ')}
`).join('\n')}

## Education
${education.map(e => `- ${e.degree} - ${e.institution} (${e.year})`).join('\n')}

## Certifications
${certifications.map(c => `- ${c}`).join('\n')}

## Languages
${languages.map(l => `- ${l.name}: ${l.level}`).join('\n')}

## Interests
${interests.join(', ')}
`;
   }

   return `
# Información del CV de ${personal.name}

## Datos Personales
- Nombre: ${personal.name}
- Título: ${personal.title}
- Email: ${personal.email}
- Ubicación: ${personal.location}
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}

## Resumen Profesional
${personal.summary}

## Habilidades Técnicas
${skills.map(s => `- ${s.name}: ${s.level}% (${s.category})`).join('\n')}

## Experiencia Laboral
${experience.map(exp => `
### ${exp.title} en ${exp.company}
- Período: ${exp.startDate} - ${exp.endDate}
- Ubicación: ${exp.location}
- Responsabilidades:
${exp.description.map(d => `  - ${d}`).join('\n')}
- Tecnologías: ${exp.technologies.join(', ')}
`).join('\n')}

## Proyectos Destacados
${projects.map(p => `
### ${p.title}
${p.description}
Tecnologías: ${p.technologies.join(', ')}
`).join('\n')}

## Educación
${education.map(e => `- ${e.degree} - ${e.institution} (${e.year})`).join('\n')}

## Certificaciones
${certifications.map(c => `- ${c}`).join('\n')}

## Idiomas
${languages.map(l => `- ${l.name}: ${l.level}`).join('\n')}

## Intereses
${interests.join(', ')}
`;
}

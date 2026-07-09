export const resumeDataES = {
   personal: {
      name: "Frank Borja",
      title: "Desarrollador Full-Stack · Sistemas ERP y Web",
      email: "frank.borja.31@gmail.com",
      phone: "+593 982117699",
      location: "Guayaquil, Ecuador",
      linkedin: "https://www.linkedin.com/in/fborjaz/",
      github: "https://github.com/fborjaz",
      summary: `Desarrollador Full-Stack con más de 3 años de experiencia diseñando y desplegando
    sistemas ERP y aplicaciones web a medida. Especializado en Django/Python en el backend y
    React/Next.js en el frontend. Creador de GoByTel, un ERP propio comercializado bajo licencia y
    actualmente en producción. Integro inteligencia artificial en mi flujo de desarrollo para
    acelerar entregas y mejorar la calidad del código.`,
   },

   skills: [
      { name: "Python / Django", level: 90, category: "Backend" },
      { name: "FastAPI", level: 80, category: "Backend" },
      { name: "Node.js", level: 78, category: "Backend" },
      { name: "React / Next.js", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "Tailwind CSS", level: 92, category: "Frontend" },
      { name: "PostgreSQL", level: 88, category: "Database" },
      { name: "MySQL / MariaDB", level: 82, category: "Database" },
      { name: "Redis", level: 72, category: "Database" },
      { name: "Docker", level: 78, category: "DevOps" },
      { name: "AWS (EC2, S3)", level: 78, category: "DevOps" },
      { name: "Git / CI/CD", level: 88, category: "DevOps" },
      { name: "REST API", level: 90, category: "API" },
      { name: "GraphQL", level: 72, category: "API" },
      { name: "JWT / OAuth2", level: 82, category: "API" },
      { name: "React Native", level: 75, category: "Mobile" },
      { name: "Flutter", level: 60, category: "Mobile" },
      { name: "Pytest / Jest", level: 75, category: "Testing" },
      { name: "Postman", level: 85, category: "Testing" },
   ],

   experience: [
      {
         id: 1,
         title: "Desarrollador Full-Stack & Fundador",
         company: "GoByTel ERP (Producto Propio)",
         location: "Remoto",
         startDate: "2023",
         endDate: "Presente",
         description: [
            "Diseñé y desarrollé desde cero un sistema ERP de gestión comercial con módulos de inventario, ventas y facturación, actualmente en producción en UltraFormato (sector distribución)",
            "Comercializado bajo licencia no exclusiva, reteniendo los derechos de propiedad intelectual y la capacidad de reventa a terceros",
            "Reduje el tiempo de cierre de inventario del cliente en un 40% mediante automatización de conteo y reportería",
         ],
         technologies: ["Django", "PostgreSQL", "React", "REST API", "Docker", "Git"],
      },
      {
         id: 2,
         title: "Desarrollador Full-Stack Freelance",
         company: "Proyectos Independientes",
         location: "Remoto",
         startDate: "2022",
         endDate: "Presente",
         description: [
            "Desarrollé 2 aplicaciones móviles y más de 4 plataformas web para clientes internacionales, entregando en ciclos de 4 a 8 semanas con metodología Agile/Scrum",
            "Integré herramientas de IA (LLM, automatización) reduciendo los tiempos de implementación en aproximadamente un 30%",
            "Implementé autenticación JWT/OAuth2 y REST APIs consumidas por front-ends en React y React Native",
         ],
         technologies: ["React", "Next.js", "Node.js", "Python", "React Native", "REST API"],
      },
      {
         id: 3,
         title: "Especialista en Soporte TI (Pasantía)",
         company: "M. Boderos & Asociados — Estudio Jurídico",
         location: "Guayaquil, Ecuador",
         startDate: "Febrero 2021",
         endDate: "Noviembre 2021",
         description: [
            "Administré infraestructura y equipos, y resolví incidencias técnicas para una firma legal con más de 15 usuarios",
         ],
         technologies: ["Windows Server", "Redes", "Soporte Técnico", "Office 365"],
      },
   ],

   projects: [
      {
         id: 1,
         title: "OmniPOS — GoByTel POS",
         description: "Sistema POS/ERP SaaS multi-tenant con facturación electrónica SRI (Ecuador), inventario, compras, RRHH/nómina, CRM y PWA instalable. 41 empresas activas en Ecuador, Perú y R. Dominicana.",
         longDescription:
            "OmniPOS (marca comercial GoByTel) es una plataforma en la nube donde cualquier negocio gestiona sus ventas, inventario, facturación y personal desde un solo lugar. Es multiempresa: cada negocio trabaja con sus propios datos, aislados y seguros. Hoy la usan 41 empresas en Ecuador, Perú y República Dominicana.",
         features: [
            "Punto de venta rápido con carrito, cobro, ventas en espera y turnos de caja",
            "Facturación electrónica válida ante el SRI de Ecuador: genera y envía facturas legales",
            "Control de inventario por sucursal: stock, movimientos, ajustes, traspasos y variantes (ej. tallas)",
            "Módulo de compras y proveedores con órdenes e ingresos de mercadería",
            "Finanzas del negocio: cajas, bancos, gastos y cuentas",
            "Recursos Humanos: nómina, contratos y gestión de empleados",
            "Ficha de clientes con crédito y datos de contacto (CRM)",
            "Reportes de ventas, inventario y finanzas para tomar decisiones",
            "Se instala como app en el celular (PWA), sin pasar por la tienda de aplicaciones",
            "Panel para dar de alta y administrar nuevas empresas en la plataforma",
         ],
         image: "/images/ERP-Gobytel-Claro.png",
         imageDark: "/images/ERP-Gobytel-Oscuro.png",
         technologies: ["PHP", "CodeIgniter 3", "MariaDB", "jQuery", "Bootstrap", "PWA"],
         liveUrl: "https://gobytel.com/",
         githubUrl: "https://github.com/fborjaz/OmniPOS",
         featured: true,
         private: true,
      },
      {
         id: 2,
         title: "OmniPOS Desktop — Contable.Net",
         description: "Versión de escritorio del POS/ERP en Windows Forms (.NET, C#) con arquitectura de 3 capas, SQL Server, reportes en Crystal Reports, facturación fiscal y auto-actualización mediante instalador Inno Setup.",
         longDescription:
            "La versión de escritorio para Windows del mismo POS/ERP, pensada para negocios que necesitan trabajar sin depender de una conexión a internet. Se instala con un solo clic y se mantiene actualizada de forma automática.",
         features: [
            "Punto de venta e inventario en el computador, funciona sin internet",
            "Facturación fiscal con los formatos de Ecuador y República Dominicana",
            "Impresión en impresoras fiscales y térmicas",
            "Reportes listos para imprimir y exportar",
            "Gestión de nómina y empleados",
            "Instalación de un clic y actualización automática al salir una versión nueva",
            "Respaldos de la base de datos para proteger la información",
         ],
         image: "/projects/omnipos-desktop.svg",
         imageDark: "/projects/omnipos-desktop.svg",
         technologies: ["C#", ".NET", "WinForms", "SQL Server", "Crystal Reports"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/OmniPOS-Desktop",
         featured: true,
         private: true,
      },
      {
         id: 3,
         title: "Súper Mercado Económico",
         description: "Sistema de gestión para supermercado en Django: administración de productos, marcas, proveedores y categorías con autenticación segura y panel de administración. Interfaz minimalista en modo oscuro.",
         longDescription:
            "Aplicación web para administrar un supermercado o tienda: mantener ordenado el catálogo de productos y todo lo que gira a su alrededor, con un panel simple y agradable de usar.",
         features: [
            "Agregar, editar y eliminar productos con foto, descripción, precio y stock",
            "Organización de productos por marcas y categorías",
            "Registro de proveedores con su información de contacto",
            "Búsqueda y filtrado rápido del catálogo",
            "Acceso protegido con registro e inicio de sesión",
            "Diseño minimalista en modo oscuro, intuitivo y fácil de usar",
         ],
         image: "/projects/sales-may.svg",
         imageDark: "/projects/sales-may.svg",
         technologies: ["Django", "Python", "SQLite", "Bootstrap", "JavaScript"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/proy_sales_may",
         featured: false,
         private: false,
      },
      {
         id: 4,
         title: "Sistema de Gestión de Eventos",
         description: "Plataforma para crear, organizar y administrar eventos con registro de participantes y panel de administración. Construida con POO en Python sobre Django y PostgreSQL.",
         longDescription:
            "Sistema para crear y administrar eventos de principio a fin y llevar el control de quién asiste, todo desde un panel central.",
         features: [
            "Crear eventos indicando fecha, hora, lugar y capacidad",
            "Inscripción y registro de participantes",
            "Control de cupos disponibles por evento",
            "Panel de administración para gestionar todos los eventos",
            "Acceso seguro con usuarios",
            "Interfaz moderna en modo oscuro",
         ],
         image: "/projects/system-event.svg",
         imageDark: "/projects/system-event.svg",
         technologies: ["Django", "Python", "PostgreSQL", "JavaScript", "CSS"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/Proy_System_Event",
         featured: false,
         private: false,
      },
      {
         id: 5,
         title: "Sistema de Gestión de Ventas",
         description: "Sistema integral de ventas en Django: gestión de productos, clientes, facturas y reportes analíticos para la toma de decisiones. Frontend estilizado con Tailwind CSS.",
         longDescription:
            "Sistema integral para registrar y analizar las ventas de una empresa: productos, clientes, facturas y reportes, todo en un mismo lugar para mejorar la toma de decisiones.",
         features: [
            "Gestión de productos con foto, precio y stock, organizados por marcas y categorías",
            "Registro y administración de clientes",
            "Emisión y control de facturas",
            "Reportes y análisis de ventas para decidir mejor",
            "Acceso protegido con usuarios",
            "Interfaz responsiva y estilizada, cómoda en cualquier pantalla",
         ],
         image: "/projects/fact-sales.svg",
         imageDark: "/projects/fact-sales.svg",
         technologies: ["Django", "Python", "PostgreSQL", "Tailwind", "JavaScript"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/System_Fact_Sales_DJ",
         featured: false,
         private: false,
      },
      {
         id: 6,
         title: "Portfolio Personal",
         description: "Este mismo portfolio - diseñado con animaciones modernas, modo oscuro, soporte multiidioma y chatbot con IA.",
         longDescription:
            "Este mismo sitio: mi portafolio personal, hecho para presentar quién soy y en qué trabajo de una forma moderna e interactiva.",
         features: [
            "Secciones de perfil, habilidades, experiencia y proyectos",
            "Modo claro y oscuro",
            "Disponible en español e inglés",
            "Chatbot con inteligencia artificial que responde sobre mi experiencia",
            "Formulario de contacto que envía el mensaje a mi correo",
            "Animaciones modernas y diseño responsivo",
         ],
         image: "/projects/portfolio.svg",
         imageDark: "/projects/portfolio.svg",
         technologies: ["Next.js", "Framer Motion", "Tailwind", "OpenAI"],
         liveUrl: "https://portfolio-cv-gamma-sandy.vercel.app/",
         githubUrl: "https://github.com/fborjaz/portfolio-cv",
         featured: false,
         private: false,
      },
   ],

   education: [
      {
         degree: "Ingeniería en Software",
         institution: "Universidad Estatal de Milagro (UNEMI)",
         year: "2022 - Presente",
         description: "7.º semestre · Graduación estimada 2027 · Área: Desarrollo de Software y Sistemas de Información",
      },
      {
         degree: "Bachillerato Técnico en Informática",
         institution: "U.E.F. Vicente Rocafuerte",
         year: "2021",
         description: "Guayaquil - Formación técnica en informática y sistemas",
      },
   ],

   certifications: [
      "AWS Academy Graduate — Introduction to Cloud (Semestre 1 y 2) | Amazon Web Services | Sep 2024",
      "Especialista en Diseño Gráfico — Adobe Illustrator | 2019",
      "Hackathon INNOVAILAB | 2026",
      "Hackathon STARTLAB | 2025",
      "Hackathon 'Tech for Green' @ UNEMI | 2024",
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
      title: "Full-Stack Developer · ERP & Web Systems",
      email: "frank.borja.31@gmail.com",
      phone: "+593 982117699",
      location: "Guayaquil, Ecuador",
      linkedin: "https://www.linkedin.com/in/fborjaz/",
      github: "https://github.com/fborjaz",
      summary: `Full-Stack Developer with 3+ years of experience designing and deploying custom ERP
    systems and web applications. Specialized in Django/Python on the backend and React/Next.js on
    the frontend. Creator of GoByTel, a proprietary ERP licensed commercially and currently in
    production. I integrate AI into my development workflow to speed up delivery and improve code
    quality.`,
   },

   skills: [
      { name: "Python / Django", level: 90, category: "Backend" },
      { name: "FastAPI", level: 80, category: "Backend" },
      { name: "Node.js", level: 78, category: "Backend" },
      { name: "React / Next.js", level: 90, category: "Frontend" },
      { name: "TypeScript", level: 85, category: "Frontend" },
      { name: "JavaScript", level: 90, category: "Frontend" },
      { name: "Tailwind CSS", level: 92, category: "Frontend" },
      { name: "PostgreSQL", level: 88, category: "Database" },
      { name: "MySQL / MariaDB", level: 82, category: "Database" },
      { name: "Redis", level: 72, category: "Database" },
      { name: "Docker", level: 78, category: "DevOps" },
      { name: "AWS (EC2, S3)", level: 78, category: "DevOps" },
      { name: "Git / CI/CD", level: 88, category: "DevOps" },
      { name: "REST API", level: 90, category: "API" },
      { name: "GraphQL", level: 72, category: "API" },
      { name: "JWT / OAuth2", level: 82, category: "API" },
      { name: "React Native", level: 75, category: "Mobile" },
      { name: "Flutter", level: 60, category: "Mobile" },
      { name: "Pytest / Jest", level: 75, category: "Testing" },
      { name: "Postman", level: 85, category: "Testing" },
   ],

   experience: [
      {
         id: 1,
         title: "Full-Stack Developer & Founder",
         company: "GoByTel ERP (Own Product)",
         location: "Remote",
         startDate: "2023",
         endDate: "Present",
         description: [
            "Designed and built from scratch a commercial-management ERP with inventory, sales and invoicing modules, currently in production at UltraFormato (distribution sector)",
            "Commercialized under a non-exclusive license, retaining intellectual property rights and the ability to resell to third parties",
            "Cut the client's inventory-closing time by 40% through automated counting and reporting",
         ],
         technologies: ["Django", "PostgreSQL", "React", "REST API", "Docker", "Git"],
      },
      {
         id: 2,
         title: "Freelance Full-Stack Developer",
         company: "Independent Projects",
         location: "Remote",
         startDate: "2022",
         endDate: "Present",
         description: [
            "Built 2 mobile applications and 4+ web platforms for international clients, delivering in 4–8 week cycles with Agile/Scrum",
            "Integrated AI tools (LLMs, automation), reducing implementation times by approximately 30%",
            "Implemented JWT/OAuth2 authentication and REST APIs consumed by React and React Native front-ends",
         ],
         technologies: ["React", "Next.js", "Node.js", "Python", "React Native", "REST API"],
      },
      {
         id: 3,
         title: "IT Support Specialist (Internship)",
         company: "M. Boderos & Asociados — Law Firm",
         location: "Guayaquil, Ecuador",
         startDate: "February 2021",
         endDate: "November 2021",
         description: [
            "Managed infrastructure and equipment and resolved technical incidents for a law firm with 15+ users",
         ],
         technologies: ["Windows Server", "Networking", "Technical Support", "Office 365"],
      },
   ],

   projects: [
      {
         id: 1,
         title: "OmniPOS — GoByTel POS",
         description: "Multi-tenant SaaS POS/ERP with SRI electronic invoicing (Ecuador), inventory, purchasing, HR/payroll, CRM and an installable PWA. 41 active companies across Ecuador, Peru and the Dominican Republic.",
         longDescription:
            "OmniPOS (commercial brand GoByTel) is a cloud platform where any business manages its sales, inventory, invoicing and staff from a single place. It is multi-company: each business works with its own isolated, secure data. It is currently used by 41 companies across Ecuador, Peru and the Dominican Republic.",
         features: [
            "Fast point of sale with cart, checkout, held sales and cash-register shifts",
            "Electronic invoicing valid before Ecuador's SRI: generates and submits legal invoices",
            "Inventory control per branch: stock, movements, adjustments, transfers and variants (e.g. sizes)",
            "Purchasing and suppliers module with purchase orders and goods receipts",
            "Business finances: cash registers, banks, expenses and accounts",
            "Human Resources: payroll, contracts and employee management",
            "Customer records with credit and contact details (CRM)",
            "Sales, inventory and finance reports to support decisions",
            "Installs as a phone app (PWA), without going through an app store",
            "Panel to onboard and manage new companies on the platform",
         ],
         image: "/images/ERP-Gobytel-Claro.png",
         imageDark: "/images/ERP-Gobytel-Oscuro.png",
         technologies: ["PHP", "CodeIgniter 3", "MariaDB", "jQuery", "Bootstrap", "PWA"],
         liveUrl: "https://gobytel.com/",
         githubUrl: "https://github.com/fborjaz/OmniPOS",
         featured: true,
         private: true,
      },
      {
         id: 2,
         title: "OmniPOS Desktop — Contable.Net",
         description: "Desktop edition of the POS/ERP built with Windows Forms (.NET, C#): 3-tier architecture, SQL Server, Crystal Reports, fiscal invoicing and auto-updates delivered through an Inno Setup installer.",
         longDescription:
            "The Windows desktop edition of the same POS/ERP, designed for businesses that need to work without depending on an internet connection. It installs with a single click and keeps itself updated automatically.",
         features: [
            "Point of sale and inventory on the computer, works offline",
            "Fiscal invoicing with Ecuador and Dominican Republic formats",
            "Printing on fiscal and thermal printers",
            "Reports ready to print and export",
            "Payroll and employee management",
            "One-click install and automatic update when a new version is released",
            "Database backups to protect the information",
         ],
         image: "/projects/omnipos-desktop.svg",
         imageDark: "/projects/omnipos-desktop.svg",
         technologies: ["C#", ".NET", "WinForms", "SQL Server", "Crystal Reports"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/OmniPOS-Desktop",
         featured: true,
         private: true,
      },
      {
         id: 3,
         title: "Economic Supermarket",
         description: "Supermarket management system in Django: manage products, brands, suppliers and categories with secure authentication and an admin panel. Minimalist dark-mode interface.",
         longDescription:
            "A web app to manage a supermarket or store: keep the product catalog and everything around it organized, through a simple and pleasant admin panel.",
         features: [
            "Add, edit and delete products with photo, description, price and stock",
            "Organize products by brands and categories",
            "Supplier records with their contact information",
            "Fast catalog search and filtering",
            "Protected access with sign-up and login",
            "Minimalist dark-mode design, intuitive and easy to use",
         ],
         image: "/projects/sales-may.svg",
         imageDark: "/projects/sales-may.svg",
         technologies: ["Django", "Python", "SQLite", "Bootstrap", "JavaScript"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/proy_sales_may",
         featured: false,
         private: false,
      },
      {
         id: 4,
         title: "Event Management System",
         description: "Platform to create, organize and manage events with participant registration and an admin dashboard. Built with OOP in Python on Django and PostgreSQL.",
         longDescription:
            "A system to create and manage events from start to finish and keep track of who attends, all from a central dashboard.",
         features: [
            "Create events with date, time, location and capacity",
            "Participant sign-up and registration",
            "Available-seat control per event",
            "Admin panel to manage all events",
            "Secure access with users",
            "Modern dark-mode interface",
         ],
         image: "/projects/system-event.svg",
         imageDark: "/projects/system-event.svg",
         technologies: ["Django", "Python", "PostgreSQL", "JavaScript", "CSS"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/Proy_System_Event",
         featured: false,
         private: false,
      },
      {
         id: 5,
         title: "Sales Management System",
         description: "End-to-end sales system in Django: product, customer and invoice management with analytical reports for better decision-making. Frontend styled with Tailwind CSS.",
         longDescription:
            "An all-in-one system to record and analyze a company's sales: products, customers, invoices and reports, all in one place to improve decision-making.",
         features: [
            "Product management with photo, price and stock, organized by brands and categories",
            "Customer registration and management",
            "Invoice issuing and control",
            "Sales reports and analytics to decide better",
            "Protected access with users",
            "Responsive, polished interface that works on any screen",
         ],
         image: "/projects/fact-sales.svg",
         imageDark: "/projects/fact-sales.svg",
         technologies: ["Django", "Python", "PostgreSQL", "Tailwind", "JavaScript"],
         liveUrl: "#",
         githubUrl: "https://github.com/fborjaz/System_Fact_Sales_DJ",
         featured: false,
         private: false,
      },
      {
         id: 6,
         title: "Personal Portfolio",
         description: "This portfolio - designed with modern animations, dark mode, multi-language support, and AI chatbot.",
         longDescription:
            "This very site: my personal portfolio, built to present who I am and what I work on in a modern, interactive way.",
         features: [
            "Profile, skills, experience and projects sections",
            "Light and dark mode",
            "Available in Spanish and English",
            "AI chatbot that answers questions about my experience",
            "Contact form that sends the message to my email",
            "Modern animations and responsive design",
         ],
         image: "/projects/portfolio.svg",
         imageDark: "/projects/portfolio.svg",
         technologies: ["Next.js", "Framer Motion", "Tailwind", "OpenAI"],
         liveUrl: "https://portfolio-cv-gamma-sandy.vercel.app/",
         githubUrl: "https://github.com/fborjaz/portfolio-cv",
         featured: false,
         private: false,
      },
   ],

   education: [
      {
         degree: "B.S. in Software Engineering",
         institution: "State University of Milagro (UNEMI)",
         year: "2022 - Present",
         description: "7th semester · Estimated graduation 2027 · Focus: Software Development & Information Systems",
      },
      {
         degree: "Technical High School Diploma in Informatics",
         institution: "Vicente Rocafuerte Public High School",
         year: "2021",
         description: "Guayaquil - Technical training in informatics and systems",
      },
   ],

   certifications: [
      "AWS Academy Graduate — Introduction to Cloud (Semester 1 & 2) | Amazon Web Services | Sep 2024",
      "Graphic Design Specialist — Adobe Illustrator | 2019",
      "INNOVAILAB Hackathon | 2026",
      "STARTLAB Hackathon | 2025",
      "'Tech for Green' Hackathon @ UNEMI | 2024",
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

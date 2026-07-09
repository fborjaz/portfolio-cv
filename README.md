# 🚀 Portfolio CV Moderno

Un portfolio/CV moderno y elegante construido con las últimas tecnologías web.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-pink?style=flat-square&logo=framer)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz limpia y profesional con gradientes y efectos visuales
- 🌙 **Modo Oscuro/Claro**: Toggle de tema con `next-themes` y transiciones suaves
- 🌍 **Multiidioma (ES/EN)**: Traducción completa vía Context propio, persistida en `localStorage`
- 🎭 **Animaciones**: Framer Motion + GSAP (timeline de entrada del Hero, respeta `prefers-reduced-motion`)
- 🤖 **Chatbot con IA**: Asistente que responde sobre el CV usando OpenAI (con modo fallback sin API key)
- 📬 **Formulario de Contacto**: Envío de correos real vía [Resend](https://resend.com)
- 🛡️ **Rate Limiting**: Protección de las API routes (Upstash Redis, con fallback en memoria)
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ⚡ **Rendimiento**: Optimizado para carga rápida
- 🔍 **SEO**: Meta tags y Open Graph optimizados

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **IA**: [OpenAI API](https://openai.com/) (`gpt-4o-mini`)
- **Email**: [Resend](https://resend.com)
- **Rate Limit**: [Upstash Redis](https://upstash.com/) + `@upstash/ratelimit`
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Tema**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # API Route del chatbot IA (OpenAI + fallback)
│   │   └── contact/route.ts   # API Route del formulario de contacto (Resend)
│   ├── globals.css            # Estilos globales
│   ├── layout.tsx             # Layout raíz (Theme + Language providers)
│   └── page.tsx               # Página principal (one-page)
├── components/
│   ├── sections/
│   │   ├── Hero.tsx           # Sección principal (typewriter + GSAP)
│   │   ├── About.tsx          # Sobre mí
│   │   ├── Skills.tsx         # Habilidades con barras animadas
│   │   ├── Experience.tsx     # Timeline de experiencia
│   │   ├── Projects.tsx       # Galería de proyectos
│   │   └── Contact.tsx        # Formulario de contacto
│   ├── AIChat.tsx             # Chatbot con IA
│   ├── Navbar.tsx             # Navegación
│   ├── Footer.tsx             # Pie de página
│   ├── ThemeProvider.tsx      # Provider de next-themes
│   ├── ThemeToggle.tsx        # Toggle modo oscuro/claro
│   ├── LanguageToggle.tsx     # Toggle idioma ES/EN
│   └── AnimatedSection.tsx    # Wrapper para animaciones on-scroll
├── context/
│   └── LanguageContext.tsx    # Estado de idioma + diccionario de traducciones
├── data/
│   └── resumeData.ts          # Datos del CV (ES + EN) y contexto para el chatbot
└── lib/
    ├── utils.ts               # Utilidades (cn, etc.)
    └── rateLimit.ts           # Rate limiting (Upstash Redis / memoria)
```

## 🚀 Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/fborjaz/portfolio-cv.git
   cd portfolio-cv
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Todas las variables son **opcionales**: el sitio funciona sin ellas gracias a
   los modos fallback. Edita `.env` para activar cada servicio:

   ```bash
   # Chatbot IA (sin esta key usa respuestas predefinidas)
   OPENAI_API_KEY=

   # Formulario de contacto (sin esta key el form devuelve un aviso)
   RESEND_API_KEY=
   CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
   CONTACT_TO_EMAIL=

   # Rate limit distribuido (sin esto cae a memoria del proceso)
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. **Abre [http://localhost:3000](http://localhost:3000)**

## 📝 Personalización

### Datos del CV

Edita `src/data/resumeData.ts` (objetos `resumeDataES` y `resumeDataEN`) para actualizar:

- Información personal, habilidades y experiencia
- Proyectos (el botón de demo se oculta si `liveUrl` es `"#"`)
- Educación, certificaciones e idiomas

### Traducciones de la interfaz

Los textos de la UI (nav, botones, secciones) viven en el diccionario `translations`
dentro de `src/context/LanguageContext.tsx`.

### Estilos

- Colores: `tailwind.config.ts` y `src/app/globals.css`
- Animaciones: ajusta cada componente

### Imágenes y CV

- Foto de perfil: `public/images/FT-Perfil.jpg`
- Logo: `public/images/Logo.png`
- CV descargable: `public/documents/CV_Frank_Borja.pdf`

## 🤖 Chatbot con IA

El chatbot responde preguntas sobre la experiencia, habilidades y proyectos usando
el contenido de `resumeData.ts` como contexto. Con `OPENAI_API_KEY` usa `gpt-4o-mini`;
sin ella, cae automáticamente a respuestas predefinidas por tema. Las peticiones están
limitadas a 30/min por IP.

## 📬 Formulario de Contacto

Envía correos vía Resend. En sandbox usa `onboarding@resend.dev` como remitente y solo
entrega al email de tu cuenta Resend (por eso `CONTACT_TO_EMAIL`). En producción, verifica
tu dominio y ajusta `CONTACT_FROM_EMAIL`. Limitado a 5 envíos/min por IP.

## 📦 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter
- `npm run format` - Formatea con Prettier

## 🌐 Despliegue

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Añade las variables de entorno que quieras activar (`OPENAI_API_KEY`, `RESEND_API_KEY`, Upstash…)
4. ¡Listo!

Compatible con cualquier plataforma que soporte Next.js (Netlify, Railway, AWS Amplify, Docker).

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto como base para tu portfolio.

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!

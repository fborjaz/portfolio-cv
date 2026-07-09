# Portfolio CV - Instrucciones del Proyecto

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **IA**: OpenAI API para chatbot interactivo
- **Iconos**: Lucide React
- **Tema**: next-themes para modo oscuro/claro

## Estructura del Proyecto

````
src/
├── app/
│   ├── api/
│   │   └── chat/          # API Route para chatbot IA
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero.tsx       # Sección principal con animaciones
│   │   ├── About.tsx      # Sobre mí
│   │   ├── Skills.tsx     # Habilidades con barras animadas
│   │   ├── Experience.tsx # Timeline de experiencia
│   │   ├── Projects.tsx   # Galería de proyectos
│   │   └── Contact.tsx    # Formulario de contacto
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── AIChat.tsx         # Chatbot con IA
│   ├── Navbar.tsx         # Navegación con scroll suave
│   ├── ThemeToggle.tsx    # Toggle modo oscuro/claro
│   └── AnimatedSection.tsx # Wrapper para animaciones
├── lib/
│   └── openai.ts          # Configuración OpenAI
└── data/
    └── resume.ts          # Datos del CV para IA

## Convenciones
- Usar componentes funcionales con TypeScript
- Animaciones consistentes con Framer Motion
- Diseño responsive (mobile-first)
- Accesibilidad (a11y) en todos los componentes
- Variables CSS para colores del tema

## Variables de Entorno Requeridas
```env
OPENAI_API_KEY=tu-api-key-aqui
````

## Comandos

- `npm run dev` - Desarrollo
- `npm run build` - Producción
- `npm run lint` - Linting

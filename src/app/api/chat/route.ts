import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getResumeContext, getResumeData } from "@/data/resumeData";
import { rateLimit } from "@/lib/rateLimit";

// Inicializar OpenAI solo si hay API key
const openai = process.env.OPENAI_API_KEY
   ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
   : null;

function getSystemPrompt(language: string, context: string): string {
   if (language === "en") {
      return `You are a friendly and professional virtual assistant representing a Full Stack developer. 
Your job is to answer questions about their experience, skills, projects, and work availability.

Here is the CV information you should use to respond:

${context}

IMPORTANT INSTRUCTIONS:
1. Always respond in English
2. Be friendly, professional and concise
3. If asked about something not in the CV, kindly say you don't have that information
4. You can be creative in presenting information but don't invent data
5. If asked about availability, indicate the developer is open to new opportunities
6. Use emojis occasionally to make the conversation friendlier
7. Keep responses short and to the point (maximum 2-3 paragraphs)
8. If asked how to contact, provide the email from the CV`;
   }

   return `Eres un asistente virtual amigable y profesional que representa a un desarrollador Full Stack. 
Tu trabajo es responder preguntas sobre su experiencia, habilidades, proyectos y disponibilidad laboral.

Aquí está la información del CV que debes usar para responder:

${context}

INSTRUCCIONES IMPORTANTES:
1. Responde siempre en español
2. Sé amable, profesional y conciso
3. Si te preguntan algo que no está en el CV, di amablemente que no tienes esa información
4. Puedes ser creativo al presentar la información pero no inventes datos
5. Si preguntan sobre disponibilidad, indica que el desarrollador está abierto a nuevas oportunidades
6. Usa emojis ocasionalmente para hacer la conversación más amigable
7. Mantén las respuestas cortas y al punto (máximo 2-3 párrafos)
8. Si preguntan cómo contactar, proporciona el email del CV`;
}

// Respuestas predefinidas para cuando no hay API de OpenAI.
// Los datos de contacto se leen de resumeData para tener una única fuente de verdad.
function buildFallbackResponses(language: "es" | "en"): Record<string, string> {
   const { personal } = getResumeData(language);
   const { name, email, phone, github } = personal;
   const githubShort = github.replace(/^https?:\/\//, "");

   if (language === "en") {
      return {
         experiencia: "I have 3+ years as a Full-Stack Developer. I'm the founder of GoByTel, a proprietary ERP currently in production, and I also work freelance building web and mobile apps for international clients. My core stack is Django/Python and React/Next.js, and I integrate AI into my workflow. 💼",
         habilidades: "My core stack is Python/Django and React/Next.js with TypeScript. I also work with FastAPI, Node.js, PostgreSQL, Docker, AWS and REST/GraphQL APIs (JWT/OAuth2). Always learning new tech! 🚀",
         proyectos: `I've developed several projects using React, Next.js and Python. You can see my projects on my GitHub: ${githubShort} 📂`,
         disponible: `Yes! I'm currently open to new job opportunities, both freelance projects and full-time positions. You can contact me at: ${email} 📧`,
         contacto: `You can reach me by email at ${email}, by phone at ${phone}, or through LinkedIn. I'd love to discuss your project! 📬`,
         default: `Thanks for your question! I'm ${name}, a Software Engineering student at UNEMI and freelance developer. What would you like to know about my experience, skills or projects? 😊`,
      };
   }

   return {
      experiencia: "Tengo más de 3 años como desarrollador Full-Stack. Soy fundador de GoByTel, un ERP propio actualmente en producción, y también trabajo freelance creando apps web y móviles para clientes internacionales. Mi stack principal es Django/Python y React/Next.js, e integro IA en mi flujo de trabajo. 💼",
      habilidades: "Mi stack principal es Python/Django y React/Next.js con TypeScript. También trabajo con FastAPI, Node.js, PostgreSQL, Docker, AWS y APIs REST/GraphQL (JWT/OAuth2). ¡Siempre aprendiendo! 🚀",
      proyectos: `He desarrollado varios proyectos usando React, Next.js y Python. Puedes ver mis proyectos en mi GitHub: ${githubShort} 📂`,
      disponible: `¡Sí! Actualmente estoy abierto a nuevas oportunidades laborales, tanto proyectos freelance como posiciones de tiempo completo. Puedes contactarme por email: ${email} 📧`,
      contacto: `Puedes contactarme por email a ${email}, por teléfono al ${phone}, o a través de LinkedIn. ¡Estaré encantado de hablar sobre tu proyecto! 📬`,
      default: `¡Gracias por tu pregunta! Soy ${name}, estudiante de Ingeniería de Software en UNEMI y desarrollador freelance. ¿Qué te gustaría saber sobre mi experiencia, habilidades o proyectos? 😊`,
   };
}

function getFallbackResponse(message: string, language: "es" | "en" = "es"): string {
   const responses = buildFallbackResponses(language);
   const lowerMessage = message.toLowerCase();

   if (lowerMessage.includes("experiencia") || lowerMessage.includes("experience") || lowerMessage.includes("trabajo") || lowerMessage.includes("work") || lowerMessage.includes("carrera") || lowerMessage.includes("career")) {
      return responses.experiencia;
   }
   if (lowerMessage.includes("habilidad") || lowerMessage.includes("skill") || lowerMessage.includes("tecnolog") || lowerMessage.includes("technolog") || lowerMessage.includes("domina") || lowerMessage.includes("master")) {
      return responses.habilidades;
   }
   if (lowerMessage.includes("proyecto") || lowerMessage.includes("project") || lowerMessage.includes("portfolio")) {
      return responses.proyectos;
   }
   if (lowerMessage.includes("disponible") || lowerMessage.includes("available") || lowerMessage.includes("contratar") || lowerMessage.includes("hire")) {
      return responses.disponible;
   }
   if (lowerMessage.includes("contacto") || lowerMessage.includes("contact") || lowerMessage.includes("email")) {
      return responses.contacto;
   }

   return responses.default;
}

export async function POST(request: NextRequest) {
   // Parsear el body una sola vez: el stream solo se puede leer una vez.
   let body: { messages?: unknown; language?: "es" | "en"; context?: string };
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
   }
   const { messages, language = "es", context } = body;

   try {

      // Obtener IP del request (proxies pueden usar x-forwarded-for)
      const ip = (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown") as string;

      // Rate limiting: 30 peticiones por minuto por IP
      const allowed = await rateLimit(`chat:${ip}`, 30, 60);
      if (!allowed) {
         return NextResponse.json({ message: language === "en" ? "Too many requests. Please try again later." : "Demasiadas solicitudes. Intenta nuevamente más tarde." }, { status: 429 });
      }

      if (!messages || !Array.isArray(messages)) {
         return NextResponse.json(
            { error: language === "en" ? "Invalid messages" : "Mensajes inválidos" },
            { status: 400 }
         );
      }

      const lastUserMessage = messages[messages.length - 1]?.content || "";

      // Si no hay API key de OpenAI, usar respuestas predefinidas
      if (!openai) {
         const fallbackResponse = getFallbackResponse(lastUserMessage, language);
         return NextResponse.json({ message: fallbackResponse });
      }

      // Obtener contexto del CV
      const cvContext = context || getResumeContext(language as "es" | "en");
      const systemPrompt = getSystemPrompt(language, cvContext);

      // Llamar a OpenAI
      const completion = await openai.chat.completions.create({
         model: "gpt-4o-mini",
         messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-10), // Limitar el historial a los últimos 10 mensajes
         ],
         max_tokens: 500,
         temperature: 0.7,
      });

      const responseMessage = completion.choices[0]?.message?.content ||
         (language === "en"
            ? "Sorry, I couldn't process your message. Could you try again?"
            : "Lo siento, no pude procesar tu mensaje. ¿Podrías intentar de nuevo?");

      return NextResponse.json({ message: responseMessage });
   } catch (error) {
      console.error("Error en el chat:", error);

      // En caso de error, devolver respuesta de fallback (language ya parseado arriba)
      return NextResponse.json({
         message: language === "en"
            ? "Hi! There seems to be a technical issue with the AI assistant. Meanwhile, you can explore the portfolio sections or contact me directly. 😊"
            : "¡Hola! Parece que hay un problema técnico con el asistente IA. Mientras tanto, puedes explorar las secciones del portfolio o contactarme directamente. 😊",
      });
   }
}

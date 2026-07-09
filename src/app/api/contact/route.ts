import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getResumeData } from "@/data/resumeData";
import { rateLimit } from "@/lib/rateLimit";

const resend = process.env.RESEND_API_KEY
   ? new Resend(process.env.RESEND_API_KEY)
   : null;

// Dirección verificada en Resend. Por defecto el sandbox onboarding@resend.dev
// (solo entrega al email de tu cuenta). Cambia a un dominio verificado en prod.
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function escapeHtml(str: string): string {
   return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
   let body: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      language?: "es" | "en";
   };
   try {
      body = await request.json();
   } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
   }

   const { name, email, subject, message, language = "es" } = body;
   const t = (es: string, en: string) => (language === "en" ? en : es);

   // Rate limiting por IP: 5 peticiones por minuto
   const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
   const allowed = await rateLimit(`contact:${ip}`, 5, 60);
   if (!allowed) {
      return NextResponse.json(
         { error: t("Demasiadas solicitudes. Intenta más tarde.", "Too many requests. Try again later.") },
         { status: 429 },
      );
   }

   // Validación
   if (!name || !email || !subject || !message) {
      return NextResponse.json(
         { error: t("Todos los campos son obligatorios.", "All fields are required.") },
         { status: 400 },
      );
   }
   if (!isValidEmail(email)) {
      return NextResponse.json(
         { error: t("Correo inválido.", "Invalid email.") },
         { status: 400 },
      );
   }

   // Sin API key: no se puede enviar. Devolver error claro.
   if (!resend) {
      return NextResponse.json(
         {
            error: t(
               "El servicio de correo no está configurado. Contáctame directamente por email.",
               "Email service is not configured. Please contact me directly by email.",
            ),
         },
         { status: 503 },
      );
   }

   // Destino del correo. En sandbox de Resend debe ser el email de tu cuenta;
   // por eso permitimos un override por env. Si no, usa el email del CV.
   const to = process.env.CONTACT_TO_EMAIL || getResumeData(language).personal.email;

   try {
      const { error } = await resend.emails.send({
         from: FROM_EMAIL,
         to,
         replyTo: email,
         subject: `[Portfolio] ${subject}`,
         html: `
            <h2>${escapeHtml(t("Nuevo mensaje desde el portfolio", "New message from the portfolio"))}</h2>
            <p><strong>${t("Nombre", "Name")}:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>${t("Asunto", "Subject")}:</strong> ${escapeHtml(subject)}</p>
            <hr />
            <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
         `,
      });

      if (error) {
         console.error("Resend error:", error);
         return NextResponse.json(
            { error: t("No se pudo enviar el mensaje.", "Could not send the message.") },
            { status: 502 },
         );
      }

      return NextResponse.json({ ok: true });
   } catch (err) {
      console.error("Contact route error:", err);
      return NextResponse.json(
         { error: t("Error interno del servidor.", "Internal server error.") },
         { status: 500 },
      );
   }
}

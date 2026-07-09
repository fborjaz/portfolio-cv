import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frank Borja | Full Stack Developer",
  description:
    "Professional portfolio with experience in web development, modern applications and cutting-edge technologies. Portfolio profesional con experiencia en desarrollo web.",
  keywords: [
    "desarrollador",
    "developer",
    "portfolio",
    "full stack",
    "react",
    "next.js",
    "typescript",
    "Frank Borja",
  ],
  authors: [{ name: "Frank Borja" }],
  openGraph: {
    title: "Frank Borja | Full Stack Developer",
    description: "Professional portfolio - Full Stack Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

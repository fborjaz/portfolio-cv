"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Heart } from "lucide-react";
import Image from "next/image";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: resumeData.personal.github,
      label: "GitHub",
      color: "hover:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-900",
    },
    {
      icon: Linkedin,
      href: resumeData.personal.linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-600 hover:text-white",
    },
  ];

  const quickLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Image
                src="/images/Logo.png"
                alt="Frank Borja Logo"
                width={120}
                height={40}
                className="h-8 sm:h-10 w-auto mb-3 sm:mb-4"
              />
            </motion.div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Links rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: "var(--primary)" }}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm inline-block"
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-2 md:col-span-1"
          >
            <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">
              {t("nav.contact")}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <motion.li
                whileHover={{ x: 3 }}
                className="hover:text-primary transition-colors cursor-default"
              >
                {resumeData.personal.email}
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                className="hover:text-primary transition-colors cursor-default"
              >
                {resumeData.personal.phone}
              </motion.li>
              <motion.li
                whileHover={{ x: 3 }}
                className="hover:text-primary transition-colors cursor-default"
              >
                {resumeData.personal.location}
              </motion.li>
            </ul>
            <div className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10
                             flex items-center justify-center transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row 
                        items-center justify-between gap-3 sm:gap-4"
        >
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {resumeData.personal.name}. {t("footer.rights")}
          </p>
          <motion.p
            className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            {t("footer.madeWith")}{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-red-500" />
            </motion.span>{" "}
            {t("footer.using")}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

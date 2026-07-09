"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(formData.email)) {
      setError(
        language === "en"
          ? "Please enter a valid email address."
          : "Por favor ingresa un correo válido.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, language }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data.error ||
            (language === "en"
              ? "Could not send the message. Please try again."
              : "No se pudo enviar el mensaje. Intenta de nuevo."),
        );
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      setError(
        language === "en"
          ? "Network error. Please try again."
          : "Error de red. Intenta de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: resumeData.personal.email,
      href: `mailto:${resumeData.personal.email}`,
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: resumeData.personal.phone,
      href: `tel:${resumeData.personal.phone}`,
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: resumeData.personal.location,
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 bg-muted/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4"
            >
              {t("contact.badge")}
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("contact.title")}{" "}
              <span className="gradient-text">
                {t("contact.titleHighlight")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <AnimatedSection delay={0.1} animation="fadeRight">
              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-background rounded-lg sm:rounded-xl border border-border 
                               hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center 
                                    group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                    >
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} animation="scale">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl border border-primary/20"
              >
                <h3 className="font-bold text-sm sm:text-base mb-2 sm:mb-3">
                  {t("contact.tip")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("contact.tipText")}
                </p>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection
            delay={0.2}
            className="lg:col-span-3"
            animation="fadeLeft"
          >
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-background p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                  >
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-muted border border-border rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all text-sm sm:text-base hover:border-primary/30"
                    placeholder={t("contact.form.namePlaceholder")}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                  >
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-muted border border-border rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                               transition-all text-sm sm:text-base hover:border-primary/30"
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                </motion.div>
              </div>

              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="subject"
                  className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                >
                  {t("contact.form.subject")} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-muted border border-border rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all text-sm sm:text-base hover:border-primary/30"
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
              </motion.div>

              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2"
                >
                  {t("contact.form.message")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-muted border border-border rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition-all resize-none text-sm sm:text-base hover:border-primary/30"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </motion.div>

              {error && (
                <p className="mb-4 text-xs sm:text-sm text-red-500" role="alert">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting
                    ? "none"
                    : "0 10px 30px rgba(99, 102, 241, 0.3)",
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`w-full py-3 sm:py-4 rounded-lg font-medium flex items-center justify-center gap-2 
                           transition-all duration-300 text-sm sm:text-base ${
                             isSubmitted
                               ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                               : "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25"
                           } disabled:opacity-70`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("contact.form.sent")}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("contact.form.submit")}
                  </>
                )}
              </motion.button>
            </motion.form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === "es" ? "en" : "es")}
      className="flex items-center gap-1 px-3 py-2 rounded-full bg-primary/10 
                 hover:bg-primary/20 transition-colors text-sm font-medium"
      aria-label={language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <span className={language === "es" ? "opacity-100" : "opacity-50"}>
        🇪🇸
      </span>
      <span className="text-muted-foreground">/</span>
      <span className={language === "en" ? "opacity-100" : "opacity-50"}>
        🇺🇸
      </span>
    </motion.button>
  );
}

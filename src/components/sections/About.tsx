"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Lightbulb, Users } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

const highlightIcons = [Code2, Palette, Lightbulb, Users];
const highlightKeys = ["cleanCode", "uiux", "problemSolver", "teamPlayer"];

export default function About() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);

  const highlights = highlightKeys.map((key, index) => ({
    icon: highlightIcons[index],
    title: t(`about.highlights.${key}.title`),
    description: t(`about.highlights.${key}.description`),
  }));

  return (
    <section id="about" className="py-16 sm:py-20 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4"
            >
              {t("about.badge")}
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.titleHighlight")}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image/Avatar Section */}
          <AnimatedSection delay={0.2} animation="fadeRight">
            <div className="relative max-w-sm sm:max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 rounded-2xl overflow-hidden aspect-square shadow-2xl"
              >
                {/* Tu foto de perfil */}
                <Image
                  src="/images/FT-Perfil.jpg"
                  alt={resumeData.personal.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              {/* Decorative elements */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 sm:w-24 h-20 sm:h-24 bg-primary/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-24 sm:h-32 bg-secondary/20 rounded-full blur-2xl"
              />
              {/* Border gradient effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl opacity-30 blur -z-10" />
            </div>
          </AnimatedSection>

          {/* Content Section */}
          <div className="space-y-4 sm:space-y-6">
            <AnimatedSection delay={0.3} animation="fadeLeft">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                {t("about.greeting")} {resumeData.personal.name}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                {resumeData.personal.summary}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t("about.bio")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4} animation="fadeUp">
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
                {resumeData.interests.map((interest, index) => (
                  <motion.span
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: [-1, 1, 0] }}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium cursor-default
                               hover:bg-primary/20 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-20">
          {highlights.map((item, index) => (
            <AnimatedSection
              key={item.title}
              delay={0.1 * index}
              animation={index % 2 === 0 ? "fadeUp" : "scale"}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-background border border-border hover:border-primary/50 
                           transition-all duration-300 card-hover text-center group h-full"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center 
                                mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </motion.div>
                <h4 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

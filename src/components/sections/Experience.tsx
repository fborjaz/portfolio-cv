"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);

  return (
    <section
      id="experience"
      className="py-16 sm:py-20 bg-muted/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp">
          <div className="text-center mb-12 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4"
            >
              {t("experience.title")}
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t("experience.myExperience")}{" "}
              <span className="gradient-text">
                {t("experience.professional")}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              {t("experience.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center"
              >
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold">
                {t("experience.work")}
              </h3>
            </div>

            <div className="relative">
              {/* Timeline line with gradient */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20"
              />

              {resumeData.experience.map((exp, index) => (
                <AnimatedSection
                  key={exp.id}
                  delay={0.1 * index}
                  animation={index % 2 === 0 ? "fadeRight" : "fadeLeft"}
                >
                  <motion.div
                    whileHover={{ x: 8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative pl-12 sm:pl-16 pb-12 sm:pb-16 last:pb-0"
                  >
                    {/* Timeline dot with pulse */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(99, 102, 241, 0.4)",
                          "0 0 0 10px rgba(99, 102, 241, 0)",
                          "0 0 0 0 rgba(99, 102, 241, 0)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute left-2 sm:left-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary border-4 border-background"
                    />

                    <div className="bg-background rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 card-hover">
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 mb-3 sm:mb-4">
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold">
                            {exp.title}
                          </h4>
                          <p className="text-primary font-medium text-sm sm:text-base">
                            {exp.company}
                          </p>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm"
                        >
                          {exp.startDate} - {exp.endDate}
                        </motion.span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                        📍 {exp.location}
                      </p>
                      <ul className="space-y-2 mb-3 sm:mb-4">
                        {exp.description.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-xs sm:text-sm"
                          >
                            <span className="text-primary mt-0.5">▹</span>
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {exp.technologies.map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(99, 102, 241, 0.2)",
                            }}
                            className="px-2 sm:px-3 py-0.5 sm:py-1 bg-muted text-xs rounded-full transition-colors cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="space-y-8 sm:space-y-12">
            {/* Education */}
            <AnimatedSection delay={0.3} animation="fadeLeft">
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                  >
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {t("experience.education")}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {resumeData.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.03, x: 5 }}
                      className="p-3 sm:p-4 bg-background rounded-lg sm:rounded-xl border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="font-semibold text-xs sm:text-sm">
                        {edu.degree}
                      </h4>
                      <p className="text-primary text-xs sm:text-sm">
                        {edu.institution}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {edu.year}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Certifications */}
            <AnimatedSection delay={0.4} animation="fadeUp">
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                  >
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {t("experience.certifications")}
                  </h3>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {resumeData.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-background rounded-lg border border-border 
                                 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 flex-shrink-0 group-hover:bg-green-500 transition-colors"
                      />
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {cert}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Languages */}
            <AnimatedSection delay={0.5} animation="scale">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                  🌍 {t("experience.languages")}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {resumeData.languages.map((lang, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, width: 0 }}
                      whileInView={{ opacity: 1, width: "100%" }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      className="flex justify-between items-center p-3 bg-background rounded-lg border border-border hover:border-primary/50 transition-all"
                    >
                      <span className="font-medium text-sm sm:text-base">
                        {lang.name}
                      </span>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="text-xs sm:text-sm text-muted-foreground px-2 py-1 bg-primary/10 rounded-full"
                      >
                        {lang.level}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

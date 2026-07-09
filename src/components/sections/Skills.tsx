"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-green-500 to-emerald-500",
  Database: "from-orange-500 to-amber-500",
  Cloud: "from-purple-500 to-violet-500",
  DevOps: "from-red-500 to-pink-500",
  API: "from-sky-500 to-indigo-500",
  Testing: "from-yellow-500 to-orange-500",
  Tools: "from-indigo-500 to-blue-500",
  Design: "from-pink-500 to-rose-500",
  Mobile: "from-teal-500 to-cyan-500",
};

const categoryIcons: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  Database: "🗄️",
  Cloud: "☁️",
  DevOps: "🔧",
  API: "🔌",
  Testing: "🧪",
  Tools: "🛠️",
  Design: "✨",
  Mobile: "📱",
};

export default function Skills() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const categories = [...new Set(resumeData.skills.map((s) => s.category))];

  // Rellena las barras de skill al hacer scroll (GSAP + ScrollTrigger).
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const bars = gsap.utils.toArray<HTMLElement>(".skill-bar");
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        bars.forEach((bar) => {
          gsap.to(bar, {
            width: `${bar.dataset.level}%`,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: { trigger: bar, start: "top 90%", once: true },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        bars.forEach((bar) => gsap.set(bar, { width: `${bar.dataset.level}%` }));
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="skills" className="py-20">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("skills.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("skills.title")}{" "}
              <span className="gradient-text">
                {t("skills.titleHighlight")}
              </span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("skills.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Skills by Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, categoryIndex) => (
            <AnimatedSection
              key={category}
              delay={0.1 * categoryIndex}
              animation={categoryIndex % 2 === 0 ? "fadeLeft" : "fadeRight"}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-muted/30 rounded-2xl p-4 md:p-6 border border-border hover:border-primary/50 
                           transition-all duration-300 h-full"
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                  <span className="text-xl">
                    {categoryIcons[category] || "📦"}
                  </span>
                  <span
                    className={`bg-gradient-to-r ${
                      categoryColors[category] || "from-gray-500 to-gray-600"
                    } bg-clip-text text-transparent`}
                  >
                    {category}
                  </span>
                </h3>
                <div className="space-y-4">
                  {resumeData.skills
                    .filter((s) => s.category === category)
                    .map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-medium text-sm md:text-base group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                          <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="text-xs md:text-sm text-muted-foreground font-semibold"
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            data-level={skill.level}
                            style={{ width: 0 }}
                            className={`skill-bar h-full rounded-full bg-gradient-to-r ${
                              categoryColors[category] ||
                              "from-gray-500 to-gray-600"
                            } relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 shimmer" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <AnimatedSection delay={0.5} animation="scale">
          <div className="mt-12 md:mt-16 text-center">
            <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
              {t("skills.otherTech")}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {[
                "HTML5",
                "CSS3",
                "Bootstrap",
                "PHP",
                ".NET / C#",
                "SQLite",
                "Linux",
                "Nginx",
                "PWA",
                "WebSockets",
                "OpenAPI / Swagger",
                "Agile / Scrum",
                "Vercel",
                "Framer Motion",
                "GSAP",
                "Figma",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.03,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                    boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.4)",
                  }}
                  viewport={{ once: true }}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-background border border-border hover:border-primary 
                             hover:bg-primary/10 rounded-full text-xs md:text-sm transition-all duration-300 
                             cursor-default font-medium"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

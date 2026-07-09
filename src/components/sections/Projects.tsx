"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

type FilterType = "all" | "featured";

export default function Projects() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects =
    filter === "all"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t("projects.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("projects.title")}{" "}
              <span className="gradient-text">
                {t("projects.titleHighlight")}
              </span>{" "}
              {t("projects.titleEnd")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("projects.subtitle")}
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("all")}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  filter === "all"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t("projects.all")}
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter("featured")}
                className={`px-4 md:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  filter === "featured"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                ⭐ {t("projects.featured")}
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-background rounded-2xl border border-border 
                           overflow-hidden card-hover"
              >
                {/* Project Image */}
                <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Placeholder pattern */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{
                          rotate: hoveredId === project.id ? 360 : 0,
                          scale: hoveredId === project.id ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Folder className="w-12 h-12 md:w-16 md:h-16 text-primary/30" />
                      </motion.div>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      y: hoveredId === project.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent 
                               flex items-end justify-center pb-4 gap-3 md:gap-4"
                  >
                    {project.liveUrl !== "#" && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                        aria-label="Ver proyecto en vivo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-colors"
                      aria-label="Ver código en GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                  </motion.div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs
                                    rounded-full font-medium"
                    >
                      {t("projects.featuredBadge")}
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <AnimatedSection delay={0.5}>
          <div className="text-center mt-12">
            <motion.a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary 
                         text-primary hover:bg-primary/10 rounded-full font-medium transition-colors"
            >
              <Github className="w-5 h-5" />
              {t("projects.viewMore")}
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

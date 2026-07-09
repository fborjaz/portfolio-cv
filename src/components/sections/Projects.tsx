"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Folder,
  X,
  Check,
  Lock,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

type FilterType = "all" | "featured";
type Project = ReturnType<typeof getResumeData>["projects"][number];

export default function Projects() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const [filter, setFilter] = useState<FilterType>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredProjects =
    filter === "all"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.featured);

  const selectedProject: Project | null =
    resumeData.projects.find((p) => p.id === selectedId) ?? null;

  // Cerrar el modal con Escape y bloquear el scroll del fondo mientras está abierto
  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

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
                className="group relative flex flex-col bg-background rounded-2xl border border-border
                           overflow-hidden card-hover"
              >
                {/* Project Image */}
                <button
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  aria-label={`${t("projects.details")}: ${project.title}`}
                  className="relative block h-40 sm:h-44 md:h-48 w-full bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden text-left"
                >
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
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors hover:scale-110 active:scale-95"
                        aria-label={t("projects.viewSite")}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {!project.private && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-muted text-foreground rounded-full hover:bg-muted/80 transition-colors hover:scale-110 active:scale-95"
                        aria-label={t("projects.viewCode")}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </motion.div>

                  {/* Private badge */}
                  {project.private && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-background/80 backdrop-blur text-muted-foreground text-xs rounded-full font-medium">
                      <Lock className="w-3 h-3" />
                      {t("projects.privateRepo")}
                    </div>
                  )}

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                      {t("projects.featuredBadge")}
                    </div>
                  )}
                </button>

                {/* Project Info */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
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

                  {/* Details CTA */}
                  <button
                    type="button"
                    onClick={() => setSelectedId(project.id)}
                    className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl
                               bg-primary/10 text-primary text-sm font-medium
                               hover:bg-primary/20 transition-colors group/btn"
                  >
                    {t("projects.details")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
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

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto
                         bg-background border border-border rounded-2xl shadow-2xl no-scrollbar"
            >
              {/* Cover */}
              <div className="relative h-44 sm:h-56 bg-gradient-to-br from-primary/10 to-secondary/10">
                {selectedProject.image && (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label={t("projects.close")}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur
                             flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute top-3 left-3 flex gap-2">
                  {selectedProject.featured && (
                    <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                      {t("projects.featuredBadge")}
                    </span>
                  )}
                  {selectedProject.private && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-background/80 backdrop-blur text-muted-foreground text-xs rounded-full font-medium">
                      <Lock className="w-3 h-3" />
                      {t("projects.privateRepo")}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    {t("projects.features")}
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </span>
                        <span className="text-sm text-foreground/90 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedProject.liveUrl !== "#" && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white
                                 text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t("projects.viewSite")}
                    </a>
                  )}
                  {selectedProject.private ? (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted
                                     text-muted-foreground text-sm font-medium">
                      <Lock className="w-4 h-4" />
                      {t("projects.privateRepo")}
                    </span>
                  ) : (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary
                                 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {t("projects.viewCode")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Github,
  X,
  Check,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { getResumeData } from "@/data/resumeData";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FilterType = "all" | "featured";
type Project = ReturnType<typeof getResumeData>["projects"][number];

// Portada consciente del tema: usa la imagen clara u oscura según la clase `dark`
// del sitio (toggle por CSS, sin flash). Los SVG usan la misma en ambos temas.
function Cover({
  light,
  dark,
  alt,
  sizes,
  className = "",
}: {
  light: string;
  dark: string;
  alt: string;
  sizes: string;
  className?: string;
}) {
  if (light === dark) {
    return (
      <Image
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={light.endsWith(".svg")}
        className={className}
      />
    );
  }
  return (
    <>
      <Image
        src={light}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized={light.endsWith(".svg")}
        className={`${className} block dark:hidden`}
      />
      <Image
        src={dark}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        unoptimized={dark.endsWith(".svg")}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}

export default function Projects() {
  const { language, t } = useLanguage();
  const resumeData = getResumeData(language);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === "all"
      ? resumeData.projects
      : resumeData.projects.filter((p) => p.featured);

  const selectedProject: Project | null =
    resumeData.projects.find((p) => p.id === selectedId) ?? null;

  // ── Scroll-reveal de las tarjetas (stagger al entrar en viewport) ──
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".project-card", { opacity: 0, y: 48, scale: 0.97 });
        ScrollTrigger.batch(".project-card", {
          start: "top 88%",
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              overwrite: true,
            }),
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".project-card", { opacity: 1, y: 0, scale: 1 });
      });
    },
    { scope: gridRef, dependencies: [filter, language], revertOnUpdate: true },
  );

  // ── Timeline de apertura del modal ──
  useGSAP(
    () => {
      if (selectedId === null) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".modal-backdrop", { autoAlpha: 0, duration: 0.3 })
          .from(
            ".modal-panel",
            { autoAlpha: 0, y: 52, scale: 0.96, duration: 0.5 },
            "<0.05",
          )
          .from(
            ".modal-cover-img",
            { scale: 1.18, duration: 0.9, ease: "power2.out" },
            "<",
          )
          .from(
            ".modal-head > *",
            { autoAlpha: 0, y: 16, stagger: 0.06, duration: 0.4 },
            "-=0.45",
          )
          .from(
            ".modal-feature",
            { autoAlpha: 0, x: -18, stagger: 0.05, duration: 0.4 },
            "-=0.25",
          )
          .from(
            ".modal-action",
            { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.35 },
            "-=0.2",
          );
      });
    },
    { scope: overlayRef, dependencies: [selectedId] },
  );

  const closeModal = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return setSelectedId(null);
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => setSelectedId(null),
    });
  }, []);

  // Escape para cerrar + bloqueo de scroll del fondo mientras el modal está abierto
  useEffect(() => {
    if (selectedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedId, closeModal]);

  const filterBtn = (value: FilterType, label: string) => (
    <button
      type="button"
      onClick={() => setFilter(value)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        filter === value
          ? "bg-primary text-white shadow-lg shadow-primary/30"
          : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/70"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                <span className="w-6 h-px bg-primary" />
                {t("projects.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {t("projects.title")}{" "}
                <span className="gradient-text">
                  {t("projects.titleHighlight")}
                </span>{" "}
                {t("projects.titleEnd")}
              </h2>
              <p className="text-muted-foreground">{t("projects.subtitle")}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {filterBtn("all", t("projects.all"))}
              {filterBtn("featured", `⭐ ${t("projects.featured")}`)}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group relative flex flex-col rounded-2xl border border-border
                         bg-background overflow-hidden card-hover"
            >
              {/* Gradient glow on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl -z-10 opacity-0
                           group-hover:opacity-100 transition-opacity duration-500 blur
                           bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40"
              />

              {/* Cover — opens detail modal */}
              <button
                type="button"
                onClick={() => setSelectedId(project.id)}
                aria-label={`${t("projects.details")}: ${project.title}`}
                className="relative block w-full aspect-[16/10] overflow-hidden
                           bg-gradient-to-br from-primary/10 to-secondary/10 text-left"
              >
                <Cover
                  light={project.image}
                  dark={project.imageDark}
                  alt={project.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Top chips */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.private && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        {t("projects.privateRepo")}
                      </span>
                    )}
                    {project.liveUrl !== "#" && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur text-foreground">
                        <span className="relative flex w-2 h-2">
                          <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-75 animate-ping" />
                          <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                        </span>
                        {language === "es" ? "En vivo" : "Live"}
                      </span>
                    )}
                  </div>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-primary text-white shrink-0">
                      {t("projects.featuredBadge")}
                    </span>
                  )}
                </div>
              </button>

              {/* Info */}
              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md text-[11px] font-medium bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-muted text-muted-foreground">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedId(project.id)}
                  className="mt-auto inline-flex items-center justify-between gap-2 w-full px-4 py-2.5 rounded-xl
                             bg-primary/10 text-primary text-sm font-medium
                             hover:bg-primary hover:text-white transition-colors duration-300 group/btn"
                >
                  {t("projects.details")}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View More */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-14">
            <a
              href={resumeData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium
                         border-2 border-primary text-primary hover:bg-primary hover:text-white
                         transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
              {t("projects.viewMore")}
            </a>
          </div>
        </AnimatedSection>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div
            className="modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            className="modal-panel relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto no-scrollbar
                       bg-background border border-border rounded-2xl shadow-2xl"
          >
            {/* Cover */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
              <Cover
                light={selectedProject.image}
                dark={selectedProject.imageDark}
                alt={selectedProject.title}
                sizes="(max-width: 768px) 100vw, 672px"
                className="modal-cover-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              <button
                type="button"
                onClick={closeModal}
                aria-label={t("projects.close")}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur
                           flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-3 left-3 flex gap-2">
                {selectedProject.featured && (
                  <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-primary text-white">
                    {t("projects.featuredBadge")}
                  </span>
                )}
                {selectedProject.private && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 backdrop-blur text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    {t("projects.privateRepo")}
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="modal-head space-y-3">
                <h3 className="text-2xl font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-md text-[11px] font-medium bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {selectedProject.longDescription}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  {t("projects.features")}
                </h4>
                <ul className="space-y-2.5">
                  {selectedProject.features.map((feature) => (
                    <li
                      key={feature}
                      className="modal-feature flex items-start gap-3"
                    >
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

              <div className="flex flex-wrap gap-3 pt-1">
                {selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white
                               text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("projects.viewSite")}
                  </a>
                )}
                {selectedProject.private ? (
                  <span className="modal-action inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    {t("projects.privateRepo")}
                  </span>
                ) : (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-action inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary
                               text-primary text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    {t("projects.viewCode")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

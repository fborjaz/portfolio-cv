"use client";

import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimationType =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scale"
  | "rotate"
  | "blur";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  duration?: number;
}

// Estado inicial (desde el que GSAP anima con .from) por tipo de animación.
const fromVars: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 60 },
  fadeDown: { opacity: 0, y: -60 },
  fadeLeft: { opacity: 0, x: -60 },
  fadeRight: { opacity: 0, x: 60 },
  scale: { opacity: 0, scale: 0.8 },
  rotate: { opacity: 0, rotation: -10, scale: 0.9 },
  blur: { opacity: 0, filter: "blur(10px)" },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "fadeUp",
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respeta prefers-reduced-motion: sin movimiento, el elemento queda visible.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          ...fromVars[animation],
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

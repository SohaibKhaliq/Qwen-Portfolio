"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,92,255,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,212,255,0.12),transparent_55%)]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-foreground mb-6"
          style={{ opacity: 0 }}
        >
          Hi, I’m{" "}
          <span className="accent-text">Sohaib</span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-2xl text-muted max-w-2xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          A software developer crafting reliable, high-quality apps and intuitive user experiences with clean engineering and modern tooling.
        </p>
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <a
            href="#projects"
            className="btn-primary"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-xl border border-border text-muted hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const aboutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target === aboutRef.current) {
              const tl = gsap.timeline({
                defaults: { duration: 0.9, ease: "power3.out" });
              tl.from(aboutRef.current?.querySelectorAll(".animate-in"), {
                opacity: 0,
                y: 40,
                stagger: 0.15,
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (aboutRef.current) {
        observer.observe(aboutRef.current);
      }

      return () => observer.disconnect();
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="min-h-screen flex items-center py-24 px-6 relative">
      <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-in-from-bottom">
            Building reliable software with care.
          </h2>
          <p className="text-lg text-muted max-w-xl animate-in-left">
            I’m Sohaib — a passionate software developer who writes clean, maintainable code and focuses on creating user-centric experiences. With expertise in modern web technologies and solid engineering practices, I turn complex requirements into elegant solutions that scale. When I’m not coding, you can find me exploring new design systems or tinkering with interactive motion graphics.
          </p>
          <div className="flex gap-4 animate-in-right">
            <a href="#projects" className="btn-primary">View My Work</a>
            <a href="#contact" className="px-5 py-3 rounded-xl border border-border text-muted hover:text-foreground hover:border-foreground/40 transition-colors">Get In Touch</a>
          </div>
        </div>
        <div className="flex justify-center animate-in-from-top">
          <div className="w-80 h-80 bg-gradient-to-br from-accent/20 to-accent-2/20 rounded-full blur-[60px] absolute" />
          <div className="relative z-10 w-64 h-64 rounded-2xl overflow-hidden border-1 border-border shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center text-8xl text-accent opacity-20">👤</div>
          </div>
        </div>
      </div>
    </section>
  );
}
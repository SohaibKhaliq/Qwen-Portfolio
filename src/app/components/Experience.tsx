"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Experience() {
  const experienceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!experienceRef.current) return;

      // Section entrance
      gsap.from(experienceRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const items = entry.target.querySelectorAll(".experience-item");
              gsap.from(items, {
                opacity: 0,
                x: -50,
                duration: 0.7,
                stagger: 0.12,
                ease: "back.out(1.7)",
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      const container = experienceRef.current.querySelector(".experience-list");
      if (container) observer.observe(container);

      return () => observer.disconnect();
    }, experienceRef);

    return () => ctx.revert();
  }, []);

  const experienceData = [
    {
      year: "2024 – Present",
      role: "Senior Software Developer",
      company: "TechNova Solutions",
      description: "Led frontend architecture for enterprise dashboards, implemented GSAP-driven micro-interactions, and mentored junior developers.",
      technologies: ["React", "TypeScript", "Three.js"],
    },
    {
      year: "2022 – 2024",
      role: "Frontend Engineer",
      company: "Innovate Labs",
      description: "Built accessible, performant UIs using modern web standards and contributed to design system components.",
      technologies: ["Vue", "SASS", "Jest"],
    },
    {
      year: "2020 – 2022",
      role: "Web Developer",
      company: "Creative Studio X",
      description: "Delivered responsive websites for clients, optimized load times through asset bundling and lazy loading.",
      technologies: ["HTML/CSS", "JavaScript", "WordPress"],
    },
  ];

  return (
    <section id="experience" ref={experienceRef} className="min-h-screen py-24 px-6 relative">
      <div className="mx-auto max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Professional Experience</h2>
        <p className="text-center text-muted mb-12">My career journey and key contributions.</p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-accent to-accent-2"></div>

          <div className="experience-list space-y-20">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="experience-item flex flex-col md:flex-row items-start gap-8 relative">
                {/* Dot marker */}
                <div className="md:w-1/2 md:pr-1/2 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-acent shadow-lg border-4 bg-card relative z-10"></div>
                </div>

                {/* Content card */}
                <div className="md:w-1/2 pl-8 md:pl-0 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-accent-2">{exp.year}</span>
                    <span className="w-1 h-1 rounded-full bg-accent"></span>
                    <span className="font-semibold text-foreground">{exp.role}</span>
                  </div>
                  <h3 className="text-lg font-bold text-accent mb-2">{exp.company}</h3>
                  <p className="text-muted mb-4 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg bg-accent/10 text-xs text-accent border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
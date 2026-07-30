"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!projectsRef.current) return;
      const cards = projectsRef.current.querySelectorAll(".project-card");
      gsap.from(cards, { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power3.out" });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="min-h-screen py-24 px-6 relative">
      <div className="mx-auto max-w-6xl w-full grid md:grid-cols-2 gap-8">
        <div key="1" className="project-card aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-sm">
          <div className="project-card-inner">
            <div className="project-card-front">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Project One</h3>
                <p className="text-sm text-muted">Modern portfolio with GSAP</p>
              </div>
            </div>
            <div className="project-card-back flex-col text-left">
              <p className="mb-2"><strong className="text-accent">Tech:</strong> Next.js, TypeScript, GSAP</p>
              <p className="mb-2"><strong className="text-accent-2">Features:</strong> Cursor animations, scroll reveals</p>
              <p className="text-xs text-muted">Scroll back for front view</p>
            </div>
          </div>
        </div>
        <div key="2" className="project-card aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-card backdrop-blur-sm">
          <div className="project-card-inner">
            <div className="project-card-front">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Project Two</h3>
                <p className="text-sm text-muted">AI-powered dashboard</p>
              </div>
            </div>
            <div className="project-card-back flex-col text-left">
              <p className="mb-2"><strong className="text-accent">Tech:</strong> React, Chart.js, Node.js</p>
              <p className="mb-2"><strong className="text-accent-2">Features:</strong> Real-time analytics, dark mode</p>
              <p className="text-xs text-muted">Scroll back for front view</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
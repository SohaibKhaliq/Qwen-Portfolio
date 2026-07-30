"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!skillsRef.current) return;

      // Entry animation for container
      const section = skillsRef.current;
      gsap.from(section, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });

      // Find skill items when they come into view
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bars = entry.target.querySelectorAll(".skill-bar");
              gsap.to(bars, {
                width: (el) => el.dataset.percent + "%",
                duration: 1.2,
                stagger: 0.15,
                ease: "power2.out",
                onStart: () => {
                  gsap.set(bars, { width: "0%" });
                },
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      const skillGroup = section.querySelector(".skill-group");
      if (skillGroup) observer.observe(skillGroup);

      return () => observer.disconnect();
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const skillData = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Python", "API Design"] },
    { category: "Tools", items: ["Git", "GSAP", "Tailwind CSS"] },
    { category: "Design", items: ["Figma", "UI/UX", "Motion Graphics"] },
  ];

  const skillPercentages = {
    "React": 90,
    "TypeScript": 85,
    "Next.js": 80,
    "Node.js": 75,
    "Python": 70,
    "API Design": 75,
    "Git": 90,
    "GSAP": 85,
    "Tailwind CSS": 80,
    "Figma": 70,
    "UI/UX": 75,
    "Motion Graphics": 65,
  };

  return (
    <section id="skills" ref={skillsRef} className="min-h-screen py-24 px-6 relative bg-slate-950/30">
      <div className="mx-auto max-w-6xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Skills & Technologies</h2>
        <p className="text-center text-muted mb-12">Core competencies across frontend, backend, tools, and design.</p>

        <div className="space-y-10">
          {skillData.map((group, gIdx) => (
            <div key={gIdx} className="skill-group">
              <h3 className="text-lg font-semibold text-accent mb-4 capitalize">{group.category}</h3>
              <div className="space-y-4">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-foreground">{item}</span>
                      <span className="text-sm text-accent-2">{skillPercentages[item]}%</span>
                    </div>
                    <div className="w-full h-2 bg-border/30 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                        data-percent={skillPercentages[item]}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
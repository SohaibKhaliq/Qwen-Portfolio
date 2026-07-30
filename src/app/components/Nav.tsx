"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Nav() {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 px-6 py-4 md:px-10"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <a href="#" className="font-bold text-foreground text-lg tracking-tight hover:text-accent transition-colors">
          Soh.dev
        </a>
        <ul className="flex items-center gap-6 font-medium hidden md:flex">
          <li>
            <a href="#about" className="nav-link">About</a>
          </li>
          <li>
            <a href="#projects" className="nav-link">Projects</a>
          </li>
          <li>
            <a href="#skills" className="nav-link">Skills</a>
          </li>
          <li>
            <a href="#experience" className="nav-link">Experience</a>
          </li>
          <li>
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
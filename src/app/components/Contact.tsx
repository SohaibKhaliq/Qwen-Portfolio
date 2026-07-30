"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Contact() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!formRef.current) return;

      // Entrance animation
      gsap.from(formRef.current.querySelectorAll("form > *"), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Button hover micro-interaction
      const button = formRef.current.querySelector("button[type='submit']");
      if (button) {
        button.addEventListener("mousemove", (e) => {
          const target = button as HTMLButtonElement;
          const rect = target.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(target, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power1.out" });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, { x: 0, y: 0, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        });
      }
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Client-side validation
    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setStatus("error");
      return;
    }

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  };

  return (
    <section
      id="contact"
      ref={formRef}
      className="min-h-screen py-24 px-6 relative bg-gradient-to-b from-slate-900/30 to-slate-950"
    >
      <div className="mx-auto max-w-2xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">Get In Touch</h2>
        <p className="text-center text-muted mb-12">Have a project in mind? Let's collaborate.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-muted">Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/60 transition-shadow"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-muted">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/60 transition-shadow"
                placeholder="yourname@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-muted">Message</label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent/60 transition-shadow"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-2 text-primary font-semibold transition-transform active:scale-95 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Please try again" : "Send Message"}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-sm">Some required fields are invalid. Please check and resubmit.</p>
          )}

          {status === "success" && (
            <p className="text-green-400 text-sm">Thanks for reaching out! I'll reply within 24 hours.</p>
          )}
        </form>

        {/* Decorative glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-96 h-96 bg-accent/10 rounded-full blur-[120px] mx-auto" />
        </div>
      </div>
    </section>
  );
}
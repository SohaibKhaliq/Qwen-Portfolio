import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import About from "@/components/About";

const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <section id="projects" className="min-h-screen flex items-center py-24 px-6">
          <div className="mx-auto max-w-6xl w-full">
            <h2 className="text-4xl font-bold mb-10">Projects</h2>
            <p className="text-muted">Project showcase coming next.</p>
          </div>
        </section>
      </main>
    </>
  );
}
import Hero from "/components/Hero";
import Nav from "/components/Nav";
import About from "/components/About";
import Projects from "/components/Projects";
import Skills from "/components/Skills";
import Experience from "/components/Experience";
import Contact from "/components/Contact";
import Cursor from "/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
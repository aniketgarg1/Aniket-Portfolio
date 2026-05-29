import AnimatedBackground from "@/components/AnimatedBackground";
import MagicalCursor from "@/components/MagicalCursor";
import GoldenSnitch from "@/components/GoldenSnitch";
import WandScrollProgress from "@/components/WandScrollProgress";
import HallowsDivider from "@/components/HallowsDivider";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <MagicalCursor />
      <WandScrollProgress />
      <GoldenSnitch />
      <Navbar />
      <main className="relative">
        <Hero />
        <HallowsDivider label="Chapter I" />
        <About />
        <HallowsDivider label="Chapter II" />
        <Skills />
        <HallowsDivider label="Chapter III" />
        <Experience />
        <HallowsDivider label="Chapter IV" />
        <Projects />
        <HallowsDivider label="Chapter V" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

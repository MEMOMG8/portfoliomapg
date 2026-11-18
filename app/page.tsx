import Navbar from "@/components/Navbar";
import SocialSidebar from "@/components/SocialSidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import EngineeringDetails from "@/components/EngineeringDetails";
import SectionTheme from "@/components/SectionTheme";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <SectionTheme />
      <Navbar />
      <SocialSidebar />
      <Hero />
      <About />
      <Projects />
      <EngineeringDetails />
      <Experience />
      <Skills />
      <Certifications />
      <Contact />
    </main>
  );
}

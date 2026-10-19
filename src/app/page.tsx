import { Banner } from "@/components/sections/Banner";
import { Contact, Footer } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services, SkillsBand } from "@/components/sections/Services";
import { Terminal } from "@/components/sections/Terminal";

export default function Home() {
  return (
    <main className="page-scale relative overflow-x-clip bg-cream">
      <Hero />
      <SkillsBand />
      <Services />
      <Banner />
      <Education />
      <Terminal />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

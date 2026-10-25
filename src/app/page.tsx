import { Banner } from "@/components/sections/Banner";
import { Contact, Footer } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services, SkillsBand } from "@/components/sections/Services";
import { Terminal } from "@/components/sections/Terminal";
import { IntroLoader } from "@/components/IntroLoader";
import { CatCursor } from "@/components/motion/CatCursor";
import { ScrollProgress } from "@/components/motion/Interactive";
import { PageAnimations } from "@/components/motion/PageAnimations";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <ScrollProgress />
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
      <PageAnimations />
      <CatCursor />
    </>
  );
}

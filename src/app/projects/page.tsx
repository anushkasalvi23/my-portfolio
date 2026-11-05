import type { Metadata } from "next";
import { links, projects } from "@/data/portfolio";
import { Magnetic } from "@/components/motion/Interactive";
import { Starburst } from "@/components/primitives";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Contact } from "@/components/sections/Contact";
import { PageIntro, SitePage } from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI/ML systems, full-stack apps and interfaces built by Anushka Salvi.",
};

function Stats() {
  const stats = [
    { value: projects.length, label: "Projects", color: "#ffdc58" },
    { value: projects.filter((p) => p.status === "Completed").length, label: "Completed", color: "#b1ffae" },
    { value: projects.filter((p) => p.status === "In progress").length, label: "In progress", color: "#ffc5c1" },
  ];
  return (
    <dl data-anim="stagger" className="mx-auto grid max-w-[1209px] border-y-3 border-black sm:grid-cols-3">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col-reverse justify-end border-black px-6 py-8 max-sm:border-b-3 last:border-b-0 sm:py-[41px] sm:pl-[21px] ${i > 0 ? "sm:border-l-3" : ""}`}
        >
          <dt className="mt-[7px] flex items-center gap-3 text-[24px] leading-[normal] font-medium text-black">
            <span aria-hidden className="size-[18px] rounded-full border-2 border-black" style={{ backgroundColor: s.color }} />
            {s.label}
          </dt>
          <dd data-anim="counter" className="text-[48px] leading-[normal] font-medium text-black">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProjectsPage() {
  return (
    <SitePage active="projects">
      <PageIntro
        kicker="things I’ve built"
        title="Projects"
        subtitle="From real-time voice cloning to milk-quality dashboards: AI systems and apps, designed and built end to end."
        sticker={{ label: "AI · Web · Design", color: "#ffdc58" }}
      />
      <section className="relative px-4 pb-20 sm:px-8 xl:px-0 xl:pb-[140px]">
        <Starburst src="/figma/sticker-star-pink-alt.svg" className="hidden xl:block" style={{ left: -60, top: 900 }} />
        <Stats />
        <div className="mt-16 xl:mt-[90px]">
          <ProjectGallery projects={projects} />
        </div>
        <div data-anim="reveal" className="mt-24 flex flex-col items-center gap-6 text-center xl:mt-[120px]">
          <p className="font-scribble text-[40px] leading-none text-black sm:text-[48px]">there’s more on GitHub</p>
          <Magnetic>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[88px] w-[300px] items-center justify-center rounded-[13px] border-t-5 border-r-12 border-b-10 border-l-5 border-white bg-[#ffdc02] font-inter text-[30px] leading-[normal] font-medium text-black transition-transform duration-200 hover:-translate-y-1 sm:h-[104px] sm:w-[360px] sm:text-[36px]"
            >
              See all repos
            </a>
          </Magnetic>
        </div>
      </section>
      <Contact href="/contact" label="Start a project" />
    </SitePage>
  );
}

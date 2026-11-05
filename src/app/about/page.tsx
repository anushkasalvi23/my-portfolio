import type { Metadata } from "next";
import Image from "next/image";
import { about, links, toolbox } from "@/data/portfolio";
import { Magnetic } from "@/components/motion/Interactive";
import { Smiley, Starburst } from "@/components/primitives";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { SkillsBand } from "@/components/sections/Services";
import { PageIntro, SitePage } from "@/components/SitePage";

export const metadata: Metadata = {
  title: "About",
  description: "Who Anushka Salvi is: a software developer and designer from Pune working across full-stack, databases, UI/UX and AI/ML.",
};

function Bio() {
  return (
    <section className="relative px-4 py-16 sm:px-8 xl:px-0 xl:pt-[70px] xl:pb-[120px]">
      <div className="mx-auto max-w-[1209px]">
        <div className="flex items-center gap-4">
          <h2 data-anim="heading" className="text-[36px] leading-[normal] font-medium text-black md:text-[48px]">
            A little about me
          </h2>
          <Smiley />
        </div>
        <div data-anim="stagger" className="mt-8 flex flex-col gap-6 font-inter text-[20px] leading-[1.5] text-ink sm:text-[24px]">
          {about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl data-anim="reveal" className="mt-12 grid gap-[3px] border-3 border-black bg-black sm:grid-cols-2">
          {about.facts.map((fact) => (
            <div key={fact.label} className="px-6 py-5" style={{ backgroundColor: fact.color }}>
              <dt className="font-dm-mono text-[15px] tracking-[0.06em] text-black/70 uppercase">{fact.label}</dt>
              <dd className="mt-2 text-[22px] leading-[1.25] font-bold text-black sm:text-[24px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Tilts alternate between a few angles so the chips look stuck on by hand. */
const tilts = [-2.5, 1.5, -1, 2.5, -2, 1];

function Toolbox() {
  return (
    <section className="relative bg-white px-4 py-16 sm:px-8 xl:px-0 xl:py-[110px]">
      <Starburst src="/figma/sticker-star-pink-alt.svg" className="hidden xl:block" style={{ right: -40, top: 40 }} />
      <div className="mx-auto max-w-[1209px]">
        <p data-anim="reveal" className="font-scribble text-[40px] leading-none text-black">
          stuff I reach for
        </p>
        <h2 data-anim="heading" className="mt-2 text-[36px] leading-[normal] font-medium text-black md:text-[48px]">
          My toolbox
        </h2>
        <div data-anim="stagger" className="mt-12 grid gap-10 md:grid-cols-3 xl:gap-[46px]">
          {toolbox.map((box) => (
            <article key={box.group} className="border-4 border-black bg-cream shadow-[10px_10px_0px_0px_rgba(0,0,0,0.3)]">
              <h3 className="border-b-4 border-black px-6 py-4 text-[28px] font-bold text-black" style={{ backgroundColor: box.color }}>
                {box.group}
              </h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-4 px-6 py-7">
                {box.items.map((item, i) => (
                  <li
                    key={item}
                    className="border-2 border-black bg-white px-3 pt-1 font-scribble text-[32px] leading-[1.05] text-ink shadow-[0px_4px_4px_0px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:scale-110 hover:rotate-0"
                    style={{ transform: `rotate(${tilts[i % tilts.length]}deg)` }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <SitePage active="about">
      <PageIntro
        kicker="hello, it’s me"
        title="About"
        subtitle="Software developer and designer who builds AI-powered products and interfaces that get out of your way."
        sticker={{ label: "Pune, India", color: "#bae6ff" }}
      >
        <Magnetic>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[64px] items-center justify-center gap-[10px] rounded-[92px] border-[6px] border-black bg-sun px-8 text-[22px] font-bold whitespace-nowrap text-black transition-transform duration-200 hover:-translate-y-1 sm:h-[79px] sm:border-8 sm:text-[29px]"
          >
            Download résumé
            <Image src="/figma/icon-download.png" alt="" width={37} height={37} className="size-[28px] sm:size-[37px]" />
          </a>
        </Magnetic>
      </PageIntro>
      <SkillsBand />
      <Bio />
      <Toolbox />
      <Education />
      <Experience />
      <div className="pt-24 xl:pt-[120px]">
        <Contact href="/contact" label="Get in touch" />
      </div>
    </SitePage>
  );
}

import Image from "next/image";
import { projects, type Project } from "@/data/portfolio";
import { Fill, Starburst, SunSticker, Tape } from "../primitives";

// Design dimensions of a project card and its screenshot area.
const CARD_W = 536;
const MEDIA_H = 366;
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const tagColors: Record<string, string> = {
  ML: "#ffeeaf",
  RAG: "#b1f9ae",
  LLM: "#d7eefb",
};

const statusStyles = {
  Completed: "bg-[#b1ffae] border-[#0f790b]",
  "In progress": "bg-[#ffc5c1] border-[#a11c13]",
};

function ProjectCard({ project }: { project: Project }) {
  const { image } = project;
  return (
    <article className="relative w-full max-w-[536px] bg-white drop-shadow-[-9.422px_10.469px_0px_rgba(0,0,0,0.44)]">
      {/* Sketchy hand-drawn outline that overshoots the card edges */}
      <div aria-hidden className="pointer-events-none absolute top-[-13.61px] right-[-19.888px] bottom-[-15.703px] left-[-17.8px]">
        <Fill
          src={project.tallBorder ? "/figma/card-border-tall.svg" : "/figma/card-border.svg"}
          inset={project.tallBorder ? "-0.49% -0.55%" : "-0.5% -0.55%"}
        />
      </div>
      <Tape side="left" style={{ left: -45, top: -37 }} />
      <Tape side="right" style={{ right: -42.737, top: -37 }} />

      <div className="relative aspect-[536/366] w-full">
        <div
          className="absolute overflow-hidden border-black"
          style={{
            left: pct(image.left, CARD_W),
            top: pct(image.top, MEDIA_H),
            width: pct(image.width, CARD_W),
            height: pct(image.height, MEDIA_H),
            borderWidth: image.border,
          }}
        >
          {image.crop ? (
            <div className={`absolute ${image.crop}`}>
              <Image src={image.src} alt={`${project.title} screenshot`} fill sizes="(min-width: 640px) 670px, 100vw" className="max-w-none" />
            </div>
          ) : (
            <Image src={image.src} alt={`${project.title} screenshot`} fill sizes="(min-width: 640px) 475px, 90vw" className="object-cover" />
          )}
        </div>
      </div>

      <div className="relative px-5 pb-[29px] sm:px-[36px]">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[24px] leading-[normal] font-bold text-black sm:text-[32px] xl:whitespace-nowrap">{project.title}</h3>
          <a
            href={project.href}
            aria-label={`Open ${project.title}`}
            className="relative size-[38px] shrink-0 bg-black shadow-[4px_4px_0px_0px_#8e8f87] transition-transform duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#8e8f87]"
          >
            <Image
              src="/figma/icon-arrow-up-right.svg"
              alt=""
              width={24.359}
              height={24.584}
              className="absolute top-[7px] left-[7px] h-[24.584px] w-[24.359px] max-w-none"
            />
          </a>
        </div>
        <p className="mt-[14px] max-w-[456px] text-[16px] leading-[normal] font-medium text-black sm:text-[18px]">
          {project.description}
        </p>
        <ul className="mt-[15px] flex gap-[12px]">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="flex h-[23px] w-[61px] items-center justify-center rounded-[10px] border border-black text-[18px] leading-[normal] font-medium text-black"
              style={{ backgroundColor: tagColors[tag] ?? "#ffffff" }}
            >
              {tag}
            </li>
          ))}
        </ul>
        <Image src="/figma/project-divider.png" alt="" width={463} height={1} className="mt-[16px] h-px w-full" />
        <div className="mt-[14px] flex items-center justify-between">
          <a href={project.repo} className="flex items-center gap-[6px] text-[20px] leading-[normal] text-black hover:underline">
            <Image src="/figma/icon-github.png" alt="" width={38} height={39} className="h-[39px] w-[38px] object-contain" />
            GitHub
          </a>
          <span
            className={`flex h-[41px] w-[132px] items-center rounded-[19px] border pl-[13px] text-[20px] leading-[normal] text-black ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative px-4 pt-16 pb-20 sm:px-8 xl:h-[1876px] xl:px-0 xl:pt-[40px] xl:pb-0">
      <Starburst src="/figma/sticker-star-pink-alt.svg" className="hidden xl:block" style={{ right: -8, top: 1690 }} />

      <div className="relative mx-auto h-[110px] w-fit sm:h-[160px] xl:w-[664px] xl:translate-x-[15px]">
        <h2 className="relative pt-[20px] text-[48px] leading-[normal] text-black font-medium sm:pt-[41px] sm:text-[80px]">
          My Projects
          <Image
            src="/figma/underline-projects.svg"
            alt=""
            width={358}
            height={15}
            className="absolute top-[76px] left-[87px] h-[9px] w-[215px] max-w-none sm:top-[135px] sm:left-[145px] sm:h-[15px] sm:w-[358px]"
          />
        </h2>
        <SunSticker variant="blue" className="absolute top-0 left-[503px]" />
      </div>

      <div className="mx-auto mt-16 grid max-w-[1205px] justify-items-center gap-x-[133px] gap-y-24 sm:mt-[78px] xl:translate-x-[2.5px] xl:grid-cols-2 xl:gap-y-[116px]">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="relative mx-auto mt-[93px] w-fit xl:translate-x-[11.5px]">
        <a
          href="#projects"
          className="flex h-[88px] w-[260px] items-center justify-center rounded-[13px] border-t-5 border-r-12 border-b-10 border-l-5 border-white bg-[#ffdc02] font-inter text-[34px] leading-[normal] font-medium text-black transition-transform duration-200 hover:-translate-y-1 sm:h-[104px] sm:w-[303px] sm:text-[40px]"
        >
          View more
        </a>
        <div aria-hidden className="pointer-events-none absolute top-[104px] left-[315px] hidden h-[75px] w-[66px] sm:block">
          <Fill src="/figma/cursor-large.svg" inset="0 0 0 -1.52%" />
        </div>
      </div>
    </section>
  );
}

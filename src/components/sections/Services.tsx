import Image from "next/image";
import { projectCount, services, skills } from "@/data/portfolio";
import { at, Rotated, Fill, Smiley, Starburst, Sticker } from "../primitives";

export function SkillsBand() {
  return (
    <div className="bg-black px-6 py-6 md:py-[39px]">
      <ul className="mx-auto flex max-w-[1248px] flex-wrap justify-center gap-x-10 gap-y-2 text-[28px] leading-[normal] font-medium text-white md:gap-x-[64px] md:text-[48px] xl:gap-x-[113px]">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  // Left-column cards draw the vertical rules on both sides, as in the design.
  const sides = index % 2 === 0 ? "md:border-x-3" : "";
  return (
    <article className="flex flex-col border-black">
      <div className={`flex flex-col gap-[19px] border-b-3 border-black px-6 py-10 md:py-[60px] md:pr-[82px] md:pl-[26px] ${sides}`}>
        <div
          className="relative size-[70px] shrink-0 overflow-clip rounded-[50px] border-3 border-black"
          style={{ backgroundColor: service.accent }}
        >
          <Image
            src={service.icon.src}
            alt=""
            width={service.icon.width}
            height={service.icon.height}
            className="absolute max-w-none"
            style={{
              left: service.icon.left,
              top: service.icon.top,
              width: service.icon.width,
              height: service.icon.height,
            }}
          />
        </div>
        <h3 className="max-w-[339px] text-[28px] leading-[normal] font-bold text-black xl:text-[36px]">{service.title}</h3>
        <p className="max-w-[339px] text-[20px] leading-[normal] font-medium text-black xl:text-[24px]">{service.description}</p>
      </div>
      <a
        href="#projects"
        className={`border-b-3 border-black px-6 py-5 text-[28px] leading-[normal] font-medium text-black transition-[filter] duration-200 hover:brightness-95 md:py-[31px] md:pl-[26px] xl:text-[36px] ${sides}`}
        style={{ backgroundColor: service.footer }}
      >
        Learn more
      </a>
    </article>
  );
}

export function Services() {
  return (
    <section id="about" className="relative px-4 pt-16 pb-16 sm:px-8 xl:h-[1394px] xl:px-0 xl:pt-[102.4px] xl:pb-0">
      <Starburst className="hidden xl:block" style={{ left: -69, top: 7 }} />
      <Smiley className="absolute" style={at(427, 163.4)} />
      <Sticker desktopOnly font="handlee" color="#ffc9f0" className="absolute h-[43px] w-[140px] items-center justify-center overflow-clip" style={at(1223, 141.4)}>
        What i do?
      </Sticker>
      <Rotated
        box={[52.101, 81.382]}
        inner={[77.54, 45.122]}
        transform="rotate(-95.31deg)"
        desktopOnly
        className="pointer-events-none absolute"
        style={at(1223, 198.4)}
      >
        <Fill src="/figma/arrow-what-i-do.svg" />
      </Rotated>

      <div className="mx-auto max-w-[1209px] xl:translate-x-[-5.5px]">
        <h2 className="text-[36px] leading-[normal] font-medium text-black md:text-[48px] xl:-ml-[4px]">
          Here’s what <br />
          I’m good at...
        </h2>

        <div className="mt-10 grid border-y-3 border-black md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] xl:mt-[80px] xl:grid-cols-[319px_890px]">
          <div className="self-start border-b-3 border-black py-8 pl-[21px] md:py-[41px]">
            <p className="text-[48px] leading-[normal] font-medium text-black">{projectCount}</p>
            <p className="mt-[7px] text-[24px] leading-[normal] font-medium text-black">Projects</p>
          </div>
          <div className="grid items-start border-black max-md:border-t-3 md:grid-cols-[minmax(0,453fr)_minmax(0,437fr)]">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

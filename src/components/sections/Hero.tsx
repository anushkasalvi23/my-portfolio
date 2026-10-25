import Image from "next/image";
import { links } from "@/data/portfolio";
import { Magnetic } from "../motion/Interactive";
import { at, CurlyArrow, Fill, Logo, PIN, pin, Rotated, SelectionHandles, Starburst, Sticker, SunSticker, ThickRule } from "../primitives";

const navItems = [
  // Cell widths and text insets match the design's divider positions.
  { label: "About", href: "#about", divider: "/figma/navbar-divider-1.svg", cell: "md:w-[137px] md:pl-[39.5px]" },
  {
    label: "Projects",
    href: "#projects",
    divider: "/figma/navbar-divider-2.svg",
    cell: "md:w-[139px] md:pl-[17.5px]",
    active: true,
  },
  { label: "Contact", href: "#contact", divider: "/figma/navbar-divider-3.svg", cell: "md:w-[127px] md:pl-[17.5px]" },
];

const socials = [
  {
    label: "LinkedIn",
    href: links.linkedin,
    bg: "/figma/social-bg-red.svg",
    icon: { src: "/figma/icon-linkedin.png", left: 13, top: 14, width: 40, height: 40 },
  },
  {
    label: "GitHub",
    href: links.github,
    bg: "/figma/social-bg-yellow.svg",
    icon: { src: "/figma/icon-github.png", left: 12, top: 10, width: 43, height: 48 },
  },
  {
    label: "LeetCode",
    href: links.leetcode,
    bg: "/figma/social-bg-green.svg",
    icon: { src: "/figma/icon-leetcode.png", left: 14, top: 14, width: 36, height: 36 },
  },
];

function Navbar() {
  return (
    <nav
      aria-label="Primary"
      data-anim="nav"
      className={`relative flex h-[64px] w-full max-w-[753px] items-stretch border-5 border-black bg-cream drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] md:h-[80px] ${PIN}`}
      style={pin(131, 26)}
    >
      <div className="flex min-w-0 flex-1 items-center pl-3 md:pl-[9px]">
        <Logo />
      </div>
      {navItems.map((item) => (
        <div key={item.label} className={`relative flex w-[84px] items-center justify-center sm:w-[110px] md:justify-start ${item.cell}`}>
          <span aria-hidden className="absolute -top-[3px] left-[-2px] h-[calc(100%+8px)] w-[4px]">
            <Image
              src={item.divider}
              alt=""
              width={78}
              height={4}
              className="absolute top-1/2 left-1/2 h-[4px] w-[62px] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 md:w-[78px]"
            />
          </span>
          <a href={item.href} className="group relative text-[16px] font-medium text-ink sm:text-[20px] md:text-[24px]">
            <span
              aria-hidden
              className={`absolute top-[24px] left-[2px] h-[7px] w-[calc(100%+5px)] bg-sun transition-transform duration-200 ${
                item.active ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
              } max-md:top-[16px]`}
            />
            <span className="relative">{item.label}</span>
          </a>
        </div>
      ))}
      <SelectionHandles />
    </nav>
  );
}

function SocialLinks() {
  return (
    <ul data-anim="socials" className={`hidden gap-[13px] lg:flex ${PIN}`} style={pin(1127, 33)}>
      {socials.map((s) => (
        <li key={s.label}>
          <Magnetic strength={0.45}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="relative block size-[64px] transition-transform duration-200 hover:-translate-y-1"
            >
              <Fill src="/figma/social-circle-shadow.svg" inset="0 -6.25% -12.5% -6.25%" />
              <span className="absolute top-[2px] left-[3px] size-[59px]">
                <Fill src={s.bg} />
              </span>
              <Image
                src={s.icon.src}
                alt=""
                width={s.icon.width}
                height={s.icon.height}
                className="absolute object-contain"
                style={{ left: s.icon.left, top: s.icon.top, width: s.icon.width, height: s.icon.height }}
              />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}

/** "Anushka" set in a pixel font inside a red selection box. Sized in em so it scales with font-size. */
function NameBox() {
  // Offsets are relative to the padding box, hence the -2px for the border.
  const handle = "absolute size-[0.1714em] border-2 border-coral bg-coral";
  const left = "calc(-0.0869em - 2px)";
  const right = "calc(2.9646em - 2px)";
  const top = "calc(-0.0999em - 2px)";
  const bottom = "calc(1.2487em - 2px)";
  return (
    <div
      data-anim="name"
      className={`relative h-[1.3821em] w-[3.0491em] border-2 border-coral text-[96px] sm:text-[140px] xl:text-[175px] ${PIN}`}
      style={pin(451.2, 276.48)}
    >
      <h1
        className="absolute top-[calc(0.1401em-2px)] left-[calc(0.136em-2px)] font-pixel text-[1em] leading-none font-semibold text-black"
        style={{ fontVariationSettings: '"ELGR" 1, "ELSH" 2' }}
      >
        Anushka
      </h1>
      <span className={handle} style={{ left, top }} />
      <span className={handle} style={{ left: right, top }} />
      <span className={handle} style={{ left, top: bottom }} />
      <span className={handle} style={{ left: right, top: bottom }} />
    </div>
  );
}

function PillLink({
  href,
  children,
  color,
  newTab = true,
  className = "",
  style,
}: {
  href: string;
  newTab?: boolean;
  children: React.ReactNode;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      className={`flex h-[64px] w-[180px] items-center justify-center gap-[10px] rounded-[92px] border-[6px] border-black text-[22px] font-bold whitespace-nowrap text-black transition-transform duration-200 hover:-translate-y-1 sm:h-[79.367px] sm:w-[222.843px] sm:border-8 sm:text-[29px] ${className}`}
      style={{ backgroundColor: color, ...style }}
    >
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-14 xl:h-[991px] xl:overflow-visible xl:pb-0">
      {/* Decorative stickers that sit beneath the ruled lines */}
      <Starburst className="hidden xl:block" style={{ left: -75, top: 9 }} />
      <Starburst className="hidden xl:block" style={{ right: -56, top: -78 }} />

      <header className="relative flex items-start justify-between gap-6 px-4 pt-[26px] sm:px-8 xl:static xl:block xl:p-0">
        <Navbar />
        <SocialLinks />
      </header>
      <ThickRule className="mt-[19px] xl:absolute xl:inset-x-0 xl:top-[125px] xl:mt-0" />

      <div
        data-anim="myname"
        className={`relative mt-10 text-center font-scribble text-[40px] leading-[0.995] whitespace-nowrap text-black xl:mt-0 xl:w-[163px] xl:text-left xl:text-[50px] ${PIN}`}
        style={pin(645, 156)}
      >
        my name is
        <Image
          src="/figma/underline-my-name.svg"
          alt=""
          width={114}
          height={14}
          data-anim="draw"
          className="mx-auto mt-1 h-[14px] w-[114px] max-w-none xl:absolute xl:top-[60px] xl:left-[32px] xl:mt-0"
        />
      </div>

      {/* Ruled notebook paper */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[950px] xl:left-[6px]">
        <Image src="/figma/hero-lines.svg" alt="" fill className="max-w-none" />
      </div>

      <div className="relative z-20 mt-10 flex flex-col items-center gap-8 px-4 xl:absolute xl:inset-0 xl:mt-0 xl:block xl:p-0">
        {/* Decorations (desktop composition only) */}
        <div
          data-anim="pop"
          className="absolute hidden size-[92.011px] rounded-[50px] border-2 border-black bg-sun xl:block"
          style={at(209, 197)}
        >
          <Image
            src="/figma/icon-lightbulb.svg"
            alt=""
            width={47.109}
            height={67.931}
            className="absolute top-[9.81px] left-[20.38px] h-[67.931px] w-[47.109px] max-w-none"
          />
        </div>
        <Sticker desktopOnly color="#ffdc58" className="absolute h-[49px] w-[259px] pl-[14px]" style={at(94, 500)}>
          Software Developer
        </Sticker>
        <Sticker desktopOnly color="#ffa2a3" className="absolute h-[52px] w-[226px] pt-[6px] pl-[14px]" style={at(1066, 212)}>
          Graphic Designer
        </Sticker>
        <CurlyArrow transform="rotate(141.77deg)" className="absolute" style={at(1007, 260)} />
        <Rotated
          box={[87, 77.94]}
          inner={[83.6, 33.9]}
          transform="rotate(-38.06deg) skewX(0.33deg)"
          desktopOnly
          anim="draw"
          className="pointer-events-none absolute"
          style={at(317, 411)}
        >
          <Fill src="/figma/squiggle-arrow-hero.svg" inset="0 0 -11.77% -1.19%" />
        </Rotated>
        <SunSticker variant="pink" className="absolute" style={at(1204, 498)} />
        <Starburst
          src="/figma/sticker-star-red.svg"
          width={151}
          height={127.7}
          bleed="6.12%"
          className="hidden xl:block"
          style={{ left: -4, top: 725 }}
        />
        <Rotated
          box={[54.128, 63]}
          inner={[27.399, 57.307]}
          transform="rotate(32.89deg)"
          desktopOnly
          anim="draw"
          className="pointer-events-none absolute"
          style={at(954, 887)}
        >
          <Fill src="/figma/accent-lines-hero.svg" />
        </Rotated>

        <NameBox />

        <p
          data-anim="tagline"
          className={`flex items-center gap-[12px] font-dm-mono text-[16px] leading-[0.995] font-medium text-black sm:gap-[19px] sm:text-[26px] ${PIN}`}
          style={pin(436, 559)}
        >
          <Image src="/figma/status-dot.svg" alt="" width={22} height={22} data-anim="pulse" className="size-[14px] sm:size-[22px]" />
          Open to new work and good problems
        </p>

        <p
          data-anim="headline"
          className={`max-w-[766px] text-center font-inter text-[40px] font-medium leading-[1] text-[#191510] sm:text-[56px] xl:w-[766px] xl:text-[70px] xl:leading-[69px] ${PIN}`}
          style={pin(337, 641)}
        >
          I design software that gets out of your way
        </p>

        <div
          data-anim="cta"
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-[27.16px] ${PIN}`}
          style={pin(460.37, 840.05)}
        >
          <Magnetic>
            <PillLink href={links.resume} color="#bae6ff" style={{ transform: "rotate(0.54deg)" }}>
              Resume
              <Image src="/figma/icon-download.png" alt="" width={37} height={37} className="size-[28px] sm:size-[37px]" />
            </PillLink>
          </Magnetic>
          <Magnetic>
            <PillLink href="#contact" newTab={false} color="#ffdc58">
              Let’s talk
            </PillLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

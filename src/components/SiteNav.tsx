import Image from "next/image";
import Link from "next/link";
import { links } from "@/data/portfolio";
import { Magnetic } from "./motion/Interactive";
import { Fill, Logo, PIN, pin, SelectionHandles, ThickRule } from "./primitives";

export type NavKey = "about" | "projects" | "contact";

const navItems: { key: NavKey; label: string; href: string; divider: string; cell: string }[] = [
  // Cell widths and text insets match the design's divider positions.
  { key: "about", label: "About", href: "/about", divider: "/figma/navbar-divider-1.svg", cell: "md:w-[137px] md:pl-[39.5px]" },
  { key: "projects", label: "Projects", href: "/projects", divider: "/figma/navbar-divider-2.svg", cell: "md:w-[139px] md:pl-[17.5px]" },
  { key: "contact", label: "Contact", href: "/contact", divider: "/figma/navbar-divider-3.svg", cell: "md:w-[127px] md:pl-[17.5px]" },
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

/** `pinned` places it at its spot in the hero's free-form desktop composition. */
export function Navbar({ active, pinned = false }: { active?: NavKey; pinned?: boolean }) {
  return (
    <nav
      aria-label="Primary"
      data-anim="nav"
      className={`relative flex h-[64px] w-full max-w-[753px] items-stretch border-5 border-black bg-cream drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] md:h-[80px] ${pinned ? `z-30 ${PIN}` : ""}`}
      style={pinned ? pin(131, 26) : undefined}
    >
      <div className="flex min-w-0 flex-1 items-center pl-3 md:pl-[9px]">
        <Logo />
      </div>
      {navItems.map((item) => {
        const current = item.key === active;
        return (
          <div key={item.key} className={`relative flex w-[84px] items-center justify-center sm:w-[110px] md:justify-start ${item.cell}`}>
            <span aria-hidden className="absolute -top-[3px] left-[-2px] h-[calc(100%+8px)] w-[4px]">
              <Image
                src={item.divider}
                alt=""
                width={78}
                height={4}
                className="absolute top-1/2 left-1/2 h-[4px] w-[62px] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 md:w-[78px]"
              />
            </span>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className="group relative text-[16px] font-medium text-ink sm:text-[20px] md:text-[24px]"
            >
              <span
                aria-hidden
                className={`absolute top-[24px] left-[2px] h-[7px] w-[calc(100%+5px)] bg-sun transition-transform duration-200 ${
                  current ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"
                } max-md:top-[16px]`}
              />
              <span className="relative">{item.label}</span>
            </Link>
          </div>
        );
      })}
      <SelectionHandles />
    </nav>
  );
}

export function SocialLinks({ pinned = false }: { pinned?: boolean }) {
  return (
    <ul data-anim="socials" className={`hidden gap-[13px] lg:flex ${pinned ? `z-30 ${PIN}` : ""}`} style={pinned ? pin(1127, 33) : undefined}>
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

/** Header for the inner pages: the hero's navbar and socials, laid out in flow. */
export function SiteHeader({ active }: { active?: NavKey }) {
  return (
    <>
      <header className="relative z-30 px-4 pt-[26px] sm:px-8 xl:px-0">
        <div className="mx-auto flex max-w-[1214px] items-start justify-between gap-6 xl:translate-x-[18px]">
          <Navbar active={active} />
          <SocialLinks />
        </div>
      </header>
      <ThickRule className="mt-[19px]" />
    </>
  );
}

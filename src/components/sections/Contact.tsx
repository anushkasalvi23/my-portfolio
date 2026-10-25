import Image from "next/image";
import { links } from "@/data/portfolio";
import { Magnetic } from "../motion/Interactive";
import { Fill, Logo, Rotated, ThickRule } from "../primitives";

export function Contact() {
  return (
    <section id="contact" className="px-4 pt-[20px] sm:px-8 xl:px-0">
      <div
        data-anim="reveal"
        className="relative mx-auto max-w-[1235px] overflow-clip rounded-[2px] border-6 border-black bg-white px-6 pt-10 pb-16 text-center text-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] sm:shadow-[21px_21px_0px_0px_rgba(0,0,0,0.4)] xl:h-[466px] xl:px-0 xl:pt-[60px] xl:pb-0"
      >
        <h2 data-anim="heading" className="text-[30px] leading-[normal] font-medium sm:text-[48px]">
          Let’s start building your project
        </h2>
        <p className="mx-auto mt-[18px] max-w-[831px] text-[20px] leading-[normal] sm:text-[32px]">
          Want to see how to transform your brand into a unique style, send me a message
        </p>
        <div className="relative mx-auto mt-10 w-fit xl:mt-[53px] xl:translate-x-[23.5px]">
          <Magnetic>
            <a
              href={links.email}
              className="flex h-[76px] items-center justify-center rounded-[92px] border-[6px] border-black bg-sky px-8 text-[22px] leading-[normal] font-bold whitespace-nowrap transition-transform duration-200 hover:-translate-y-1 sm:h-[97px] sm:w-[361px] sm:border-8 sm:px-[55px] sm:text-[29px]"
              style={{ transform: "rotate(0.54deg)" }}
            >
              Send me message
            </a>
          </Magnetic>
          <Rotated
            box={[76.486, 89.147]}
            inner={[38.552, 81.233]}
            transform="rotate(32.89deg)"
            desktopOnly
            anim="draw"
            className="pointer-events-none absolute top-[48px] left-[342px]"
          >
            <Fill src="/figma/accent-lines.svg" />
          </Rotated>
        </div>
      </div>
    </section>
  );
}

const footerSocials = [
  { label: "LinkedIn", href: links.linkedin, src: "/figma/icon-linkedin.png", width: 53, height: 49 },
  { label: "Email", href: links.email, src: "/figma/icon-email.png", width: 58, height: 48 },
  { label: "GitHub", href: links.github, src: "/figma/icon-github.png", width: 47, height: 48 },
];

export function Footer() {
  return (
    <footer className="pt-16 xl:pt-[81px]">
      <ThickRule />
      <div
        data-anim="stagger"
        className="mx-auto flex max-w-[1244px] flex-col items-center gap-6 px-4 pt-10 pb-10 sm:px-8 md:flex-row md:justify-between xl:translate-x-[11px] xl:px-0 xl:pt-[49px] xl:pb-[26px]"
      >
        <Logo />
        <p className="text-[22px] leading-[normal] font-medium text-black md:text-[32px]">© 2026 Anushka Salvi</p>
        <ul className="flex items-center gap-[30px]">
          {footerSocials.map((s) => (
            <li key={s.label}>
              <a href={s.href} aria-label={s.label} className="block transition-transform duration-200 hover:-translate-y-1">
                <Image
                  src={s.src}
                  alt=""
                  width={s.width}
                  height={s.height}
                  className="h-[36px] w-auto object-contain md:h-auto md:w-[var(--w)]"
                  style={{ "--w": `${s.width}px` } as React.CSSProperties}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

import type { CSSProperties, ReactNode } from "react";
import { CatCursor } from "./motion/CatCursor";
import { ScrollProgress } from "./motion/Interactive";
import { PageAnimations } from "./motion/PageAnimations";
import { at, CurlyArrow, Starburst, Sticker, SunSticker } from "./primitives";
import { Footer } from "./sections/Contact";
import { SiteHeader, type NavKey } from "./SiteNav";

/** Frame shared by the inner pages: header, footer, cursor and scroll choreography. */
export function SitePage({ active, children }: { active?: NavKey; children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <main className="page-scale relative overflow-x-clip bg-cream">
        <SiteHeader active={active} />
        {children}
        <Footer />
      </main>
      <PageAnimations />
      <CatCursor />
    </>
  );
}

/** Delay for the CSS `rise` entrance, staggered by position. */
const rise = (i: number): CSSProperties => ({ animationDelay: `${0.08 + i * 0.12}s` });

/**
 * Page title on ruled notebook paper, set in the hero's pixel font inside the
 * same red selection box as "Anushka". Text enters with a CSS animation so it
 * is never hidden waiting for JS; the stickers use the GSAP `pop`/`draw` hooks.
 */
export function PageIntro({
  kicker,
  title,
  subtitle,
  sticker,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  sticker: { label: string; color: string };
  children?: ReactNode;
}) {
  const handle = "absolute size-[0.1714em] border-2 border-coral bg-coral";
  const near = "calc(-0.0857em - 2px)";
  return (
    <section className="page-intro relative overflow-hidden px-4 pt-14 pb-16 sm:px-8 xl:px-0 xl:pt-[72px] xl:pb-[96px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0_62px,#19151018_62px_64px)]"
      />
      <Starburst className="hidden xl:block" style={{ left: -70, top: 260 }} />
      <Starburst src="/figma/sticker-star-red.svg" width={151} height={127.7} bleed="6.12%" className="hidden xl:block" style={{ right: -40, top: -30 }} />
      <Sticker desktopOnly color={sticker.color} className="absolute h-[52px] items-center px-[16px]" style={at(150, 112)}>
        {sticker.label}
      </Sticker>
      <CurlyArrow transform="rotate(-38.23deg)" className="absolute" style={at(250, 196)} />
      <SunSticker variant="pink" className="absolute" style={at(1150, 210)} />

      <div className="relative flex flex-col items-center text-center">
        <p className="font-scribble text-[40px] leading-[0.995] text-black motion-safe:animate-rise xl:text-[50px]" style={rise(0)}>
          {kicker}
        </p>
        <div
          className="relative mt-6 w-fit border-2 border-coral text-[84px] motion-safe:animate-rise sm:text-[130px] xl:mt-8 xl:text-[175px]"
          style={rise(1)}
        >
          <h1
            className="px-[0.14em] pt-[0.04em] pb-[0.1em] font-pixel text-[1em] leading-none font-semibold text-black"
            style={{ fontVariationSettings: '"ELGR" 1, "ELSH" 2' }}
          >
            {title}
          </h1>
          <span aria-hidden className={handle} style={{ left: near, top: near }} />
          <span aria-hidden className={handle} style={{ right: near, top: near }} />
          <span aria-hidden className={handle} style={{ left: near, bottom: near }} />
          <span aria-hidden className={handle} style={{ right: near, bottom: near }} />
        </div>
        <p
          className="mt-10 max-w-[820px] font-inter text-[22px] leading-[1.25] font-medium text-[#191510] motion-safe:animate-rise sm:text-[28px] xl:text-[34px]"
          style={rise(2)}
        >
          {subtitle}
        </p>
        {children && (
          <div className="mt-10 motion-safe:animate-rise" style={rise(3)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

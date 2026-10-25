import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/** Width of the Figma frame every coordinate below is measured against. */
export const DESIGN_WIDTH = 1440;

/**
 * Absolute position from the design, anchored to the horizontal centre of the
 * section so the composition stays balanced on viewports wider or narrower
 * than 1440px.
 */
export function at(x: number, y: number): CSSProperties {
  return { left: `calc(50% + ${x - DESIGN_WIDTH / 2}px)`, top: y };
}

/**
 * Like `at`, but only applied from the `xl` breakpoint up (pair with `PIN`).
 * Below `xl` the element stays in normal flow so the layout can stack.
 */
export function pin(x: number, y: number): CSSProperties {
  return {
    "--px": `${x - DESIGN_WIDTH / 2}px`,
    "--py": `${y}px`,
  } as CSSProperties;
}

export const PIN = "xl:absolute xl:left-[calc(50%+var(--px))] xl:top-[var(--py)]";

/** A fixed-size box that centres a transformed child, as Figma exports rotations. */
export function Rotated({
  box,
  inner,
  transform,
  desktopOnly = false,
  anim,
  className = "",
  style,
  children,
}: {
  box: [number, number];
  inner: [number, number];
  transform: string;
  /** Hide below the `xl` breakpoint, where the free-form composition collapses. */
  desktopOnly?: boolean;
  /** Hook for the GSAP choreography in `PageAnimations`. */
  anim?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      data-anim={anim}
      className={`${desktopOnly ? "hidden xl:flex" : "flex"} items-center justify-center ${className}`}
      style={{ width: box[0], height: box[1], ...style }}
    >
      <div className="relative flex-none" style={{ width: inner[0], height: inner[1], transform }}>
        {children}
      </div>
    </div>
  );
}

/** Image that fills its (positioned) parent, optionally bleeding past it. */
export function Fill({ src, inset, className = "" }: { src: string; inset?: string; className?: string }) {
  return (
    <div className="absolute" style={{ inset: inset ?? 0 }}>
      <Image src={src} alt="" fill className={`max-w-none ${className}`} />
    </div>
  );
}

/** Small white squares on the corners of a "selected" frame. */
export function SelectionHandles({ size = 14 }: { size?: number }) {
  const offset = -size / 2;
  const corners: CSSProperties[] = [
    { left: offset, top: offset },
    { right: offset, top: offset },
    { left: offset, bottom: offset },
    { right: offset, bottom: offset },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute border-3 border-black bg-white"
          style={{ width: size, height: size, ...style }}
        />
      ))}
    </>
  );
}

/** Handwritten paper label. */
export function Sticker({
  children,
  color,
  font = "scribble",
  desktopOnly = false,
  anim = "pop",
  className = "",
  style,
}: {
  children: ReactNode;
  color: string;
  font?: "scribble" | "handlee";
  desktopOnly?: boolean;
  anim?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const type =
    font === "handlee"
      ? "font-handlee text-[32px] shadow-[1px_1px_11.2px_0px_rgba(0,0,0,0.08)]"
      : "font-scribble text-[40px] leading-[0.995] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]";
  return (
    <div
      data-anim={anim}
      className={`${desktopOnly ? "hidden xl:flex" : "flex"} whitespace-nowrap text-ink ${type} ${className}`}
      style={{ backgroundColor: color, ...style }}
    >
      {children}
    </div>
  );
}

/** Hand-drawn smiley used next to section titles. */
export function Smiley({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <Rotated
      desktopOnly
      box={[72.671, 68.194]}
      inner={[64.283, 58.903]}
      transform="rotate(8.96deg)"
      anim="pop"
      className={className}
      style={style}
    >
      <Fill src="/figma/smiley.svg" />
    </Rotated>
  );
}

/** Pink/red starburst stickers, flipped vertically as in the design. */
export function Starburst({
  src = "/figma/sticker-star-pink.svg",
  width = 151,
  height = 164.048,
  bleed = "4.73%",
  className = "",
  style,
}: {
  src?: string;
  width?: number;
  height?: number;
  bleed?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div aria-hidden data-anim="pop" className={`pointer-events-none absolute ${className}`} style={{ width, height, ...style }}>
      <div className="relative size-full -scale-y-100">
        <Fill src={src} inset={`0 0 -${bleed} 0`} />
      </div>
    </div>
  );
}

/** Spiky sun sticker on a square note. */
export function SunSticker({
  variant,
  className = "",
  style,
}: {
  variant: "pink" | "blue";
  className?: string;
  style?: CSSProperties;
}) {
  const pink = variant === "pink";
  return (
    <Rotated
      box={pink ? [204.634, 203.191] : [160.912, 159.777]}
      inner={pink ? [143.482, 149.353] : [112.826, 117.442]}
      transform="rotate(55.01deg)"
      desktopOnly
      anim="pop"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <Fill src={pink ? "/figma/sticker-sun-pink.svg" : "/figma/sticker-sun-blue.svg"} inset="0 0 -10.71% 0" />
    </Rotated>
  );
}

/** Curly hand-drawn arrow ("Arrow_07" in the design). */
export function CurlyArrow({ transform, className = "", style }: { transform: string; className?: string; style?: CSSProperties }) {
  return (
    <Rotated
      box={[118.321, 118.438]}
      inner={[83.944, 84.646]}
      transform={transform}
      desktopOnly
      anim="draw"
      className={`pointer-events-none ${className}`}
      style={style}
    >
      <div className="absolute inset-0 overflow-clip">
        <div className="absolute" style={{ inset: "29.83% 0.09% 29.96% 0" }}>
          <Fill src="/figma/squiggle-arrow.svg" inset="0 0 -11.75% -1.19%" />
        </div>
      </div>
    </Rotated>
  );
}

/** Translucent washi tape strip on a project card corner. */
export function Tape({ side, style }: { side: "left" | "right"; style?: CSSProperties }) {
  const left = side === "left";
  return (
    <Rotated
      box={[101.737, 86]}
      inner={[100.326, 34.354]}
      transform={left ? "rotate(-35.29deg)" : "rotate(-144.71deg) scaleY(-1)"}
      anim="tape"
      className="pointer-events-none absolute z-10"
      style={style}
    >
      <div
        className="size-full shadow-[0px_8px_4px_0px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: left ? "rgba(199,243,248,0.68)" : "rgba(255,220,88,0.64)" }}
      />
    </Rotated>
  );
}

/** Thick black rule that spans the full viewport width. */
export function ThickRule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden data-anim="draw" className={`pointer-events-none relative h-[6px] w-full ${className}`}>
      <Image src="/figma/rule-thick.svg" alt="" fill className="max-w-none" />
    </div>
  );
}

/** Sparkle logo + wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-[15px] text-ink ${className}`}>
      <Image src="/figma/logo-sparkle.svg" alt="" width={48.956} height={49} className="h-[34px] w-auto md:h-[49px]" />
      <span className="text-[26px] max-sm:sr-only md:text-[36px]">Anush</span>
    </a>
  );
}

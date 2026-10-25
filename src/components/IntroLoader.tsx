"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/** Fired on `window` the moment the loader starts revealing the page. */
export const INTRO_REVEAL_EVENT = "intro:reveal";

/** True while the loader covers the page (decided before first paint). */
export const introIsPlaying = () => document.documentElement.dataset.intro === "playing";

const DEFAULT_MESSAGES = ["Oh, hello!", "Welcome to my little world!"];

// Timing, modelled on the Portfoliofy "Creative Artsy" splash: letters rise in
// one by one (0.22s each), the bubble cuts to the next message, and the paper
// fades away. Longer messages type faster, and each one holds briefly so it
// can be read, keeping the whole intro under 2s.
const CHAR_IN = 0.2;
const MAX_STAGGER = 0.045;
const MAX_TYPE_TIME = 0.25;
const FIRST_DELAY = 0.05;
const HOLD = 0.35;
const EXIT = 0.3;

/**
 * Runs during HTML parsing, before first paint, so the loader never flashes on
 * repeat visits in the same tab or for visitors who prefer reduced motion.
 * Without JS the attribute is never set and the loader stays hidden.
 */
const decideScript = (key: string) =>
  `try{var d=document.documentElement;d.dataset.intro=sessionStorage.getItem(${JSON.stringify(key)})||matchMedia("(prefers-reduced-motion: reduce)").matches?"skip":"playing"}catch(e){document.documentElement.dataset.intro="skip"}`;

/** Inline script that runs on the server-rendered HTML only (see Next's "Preventing Flash" guide). */
function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Full-screen intro: a yellow speech bubble on notebook paper that types out
 * a few short messages, then fades away to reveal the page, which has been
 * rendered underneath the whole time. Shown once per browser tab.
 */
export function IntroLoader({ messages = DEFAULT_MESSAGES, storageKey = "intro-seen" }: { messages?: string[]; storageKey?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const bubble = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!introIsPlaying() || !bubble.current) return;
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {}

      const lines = gsap.utils.toArray<HTMLElement>("[data-line]");
      // The first line sits in flow and sizes the bubble; the rest are stacked
      // on top of it, so padding + border is whatever the first line doesn't fill.
      const chrome = bubble.current.offsetWidth - lines[0].offsetWidth;

      const tl = gsap.timeline();
      let t = FIRST_DELAY;
      lines.forEach((line, i) => {
        const chars = line.querySelectorAll("[data-char]");
        const stagger = Math.min(MAX_STAGGER, MAX_TYPE_TIME / Math.max(chars.length - 1, 1));
        if (i > 0) {
          tl.set(lines[i - 1], { autoAlpha: 0 }, t)
            .set(line, { autoAlpha: 1 }, t)
            .to(bubble.current, { width: line.offsetWidth + chrome, duration: 0.2, ease: "power3.out" }, t);
        }
        tl.to(chars, { opacity: 1, y: 0, duration: CHAR_IN, ease: "power1.out", stagger }, t);
        t += stagger * (chars.length - 1) + CHAR_IN + HOLD;
      });

      tl.call(() => window.dispatchEvent(new Event(INTRO_REVEAL_EVENT)), undefined, t)
        .to(root.current, { autoAlpha: 0, duration: EXIT, ease: "power1.inOut" }, t)
        .call(() => {
          document.documentElement.dataset.intro = "done";
        });
    },
    { scope: root },
  );

  return (
    <>
      <InlineScript html={decideScript(storageKey)} />
      <div
        ref={root}
        data-intro-loader
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-[#fdfdfb] bg-[repeating-linear-gradient(to_bottom,transparent_0_33px,#19151029_33px_34px)] px-4"
      >
        <div
          ref={bubble}
          className="relative overflow-hidden rounded-2xl rounded-tl-none border-2 border-[#191510] bg-[#f7c948] px-4 py-3 font-inter text-[clamp(18px,5.6vw,40px)] leading-[1.1] font-medium whitespace-nowrap text-[#191510]"
        >
          {messages.map((text, i) => (
            <span key={text} data-line className={i === 0 ? "block" : "invisible absolute top-3 left-4 block"}>
              {Array.from(text).map((char, j) => (
                <span key={j} data-char className="inline-block opacity-0" style={{ transform: "translateY(0.3em)" }}>
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { INTRO_REVEAL_EVENT, introIsPlaying } from "../IntroLoader";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, TextPlugin, ScrambleTextPlugin);

/*
 * All scroll and intro choreography for the page. Sections stay server
 * components and opt in with `data-anim="…"` hooks:
 *
 *   pop       sticker that springs in, then floats (and drifts with the cursor in the hero)
 *   draw      hand-drawn line/arrow revealed left→right;  draw-y: top→bottom
 *   heading   title whose letters bounce up into place
 *   reveal    block that fades up;  stagger: container whose children fade up in turn
 *   card      project card dropped onto the page;  tape: its washi tape strips
 *   counter   number that counts up;  wiggle: cursor that keeps nudging;  spin: slow rotation
 *   …plus one-off hooks for the hero, skills marquee, banner, terminal and timeline.
 *
 * Everything lives inside a reduced-motion media query, so users who opt out
 * get the static design.
 */

const SCRAMBLE_CHARS = "01<>/[]{}#*_";

const all = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T & HTMLElement>(selector));

/** Hook elements outside the hero, which has its own intro timeline. */
const outsideHero = (value: string) => all(`[data-anim="${value}"]`).filter((el) => !el.closest("#top"));

const onEnter = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

function draw(targets: gsap.TweenTarget, from: string, vars: gsap.TweenVars = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: from, autoAlpha: 0 },
    // Clear the clip afterwards so artwork that bleeds past its box isn't cut off.
    { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.1, ease: "power2.inOut", clearProps: "clipPath", ...vars },
  );
}

/** Gentle idle bobbing for stickers; uses yPercent so it composes with x/y parallax. */
function float(el: Element) {
  gsap.to(el, {
    yPercent: gsap.utils.random(-7, 7),
    rotation: gsap.utils.random(-3, 3),
    duration: gsap.utils.random(2.4, 4.2),
    delay: gsap.utils.random(0, 1.5),
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

function heroIntro() {
  const hero = document.querySelector("#top");
  if (!hero) return;
  const q = (value: string) => all(`[data-anim="${value}"]`, hero);
  const [nameBox] = q("name");
  const [headline] = q("headline");

  // Containers whose children animate individually become visible straight away.
  gsap.set([...q("socials"), ...q("cta"), nameBox, headline], { autoAlpha: 1 });

  const nameChars = nameBox ? SplitText.create(nameBox.querySelector("h1")!, { type: "chars" }).chars : [];
  const headlineWords = headline ? SplitText.create(headline, { type: "words" }).words : [];
  const [underline] = all('[data-anim="myname"] [data-anim="draw"]', hero);
  const lines = q("draw").filter((el) => el !== underline);

  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });
  tl.from(q("nav"), { yPercent: -180, rotation: -4, autoAlpha: 0, duration: 1.2, ease: "back.out(1.4)" })
    .from(all('[data-anim="socials"] > li', hero), { y: -90, autoAlpha: 0, stagger: 0.08, ease: "back.out(2.2)" }, "<0.2")
    .add(draw(lines, "inset(0% 100% 0% 0%)", { duration: 1.3, stagger: 0.12 }), "<0.1")
    .from(q("myname"), { y: 30, rotation: -6, autoAlpha: 0, duration: 0.8 }, "<0.2")
    .add(draw(underline, "inset(0% 100% 0% 0%)", { duration: 0.6 }), "-=0.3")
    .from(nameBox, { scale: 0.7, autoAlpha: 0, duration: 0.7, ease: "expo.out" }, "<")
    .from(nameBox?.querySelectorAll(":scope > span") ?? [], { scale: 0, stagger: 0.06, duration: 0.4, ease: "back.out(3)" }, "<0.2")
    .from(
      nameChars,
      {
        yPercent: () => gsap.utils.random(-140, 140),
        rotation: () => gsap.utils.random(-45, 45),
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "back.out(2.4)",
      },
      "<",
    )
    .from(q("tagline"), { x: -40, autoAlpha: 0, duration: 0.8 }, "-=0.5")
    .from(
      headlineWords,
      { y: 70, rotationX: -80, autoAlpha: 0, filter: "blur(8px)", stagger: 0.05, duration: 0.9, transformOrigin: "50% 100%" },
      "<0.1",
    )
    .from(all('[data-anim="cta"] > *', hero), { y: 50, scale: 0.7, autoAlpha: 0, stagger: 0.12, ease: "back.out(2)" }, "-=0.6")
    .from(
      q("pop"),
      {
        scale: 0,
        rotation: () => gsap.utils.random(-70, 70),
        autoAlpha: 0,
        stagger: { each: 0.07, from: "random" },
        duration: 0.9,
        ease: "back.out(1.8)",
      },
      "-=1.4",
    );

  q("pop").forEach(float);
  q("pulse").forEach((el) =>
    gsap.to(el, { scale: 1.3, duration: 0.8, ease: "sine.inOut", repeat: -1, yoyo: true, transformOrigin: "50% 50%" }),
  );

  // Stickers drift towards the cursor, each at its own depth.
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const drifters = q("pop").map((el, i) => ({
    x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }),
    y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3" }),
    depth: 18 + (i % 4) * 12,
  }));
  const onMove = (e: PointerEvent) => {
    const nx = e.clientX / window.innerWidth - 0.5;
    const ny = e.clientY / window.innerHeight - 0.5;
    drifters.forEach((d) => {
      d.x(nx * d.depth);
      d.y(ny * d.depth);
    });
  };
  window.addEventListener("pointermove", onMove);
  return () => window.removeEventListener("pointermove", onMove);
}

function skillsMarquee() {
  all('[data-anim="marquee"]').forEach((track) => {
    const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 24, repeat: -1 });
    // Scrolling speeds the band up and flips it to follow the scroll direction.
    ScrollTrigger.create({
      onUpdate(self) {
        const boost = gsap.utils.clamp(1, 7, 1 + Math.abs(self.getVelocity()) / 350);
        loop.timeScale(self.direction * boost);
        gsap.to(loop, { timeScale: self.direction, duration: 1, ease: "power2.out", overwrite: true });
      },
    });
  });
}

function scrollReveals() {
  outsideHero("heading").forEach((el) => {
    const { chars } = SplitText.create(el, { type: "words,chars" });
    gsap.from(chars, {
      yPercent: 120,
      rotation: () => gsap.utils.random(-25, 25),
      autoAlpha: 0,
      stagger: 0.025,
      duration: 0.8,
      ease: "back.out(2)",
      scrollTrigger: onEnter(el),
    });
  });

  const reveals = outsideHero("reveal");
  gsap.set(reveals, { y: 70, autoAlpha: 0 });
  ScrollTrigger.batch(reveals, {
    start: "top 88%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 1, ease: "power4.out" }),
  });

  outsideHero("stagger").forEach((el) => {
    gsap.from(el.children, {
      y: 60,
      autoAlpha: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: onEnter(el),
    });
  });

  outsideHero("pop").forEach((el) => {
    gsap.from(el, {
      scale: 0,
      rotation: gsap.utils.random(-80, 80),
      autoAlpha: 0,
      duration: 1,
      ease: "back.out(1.8)",
      scrollTrigger: onEnter(el, "top 92%"),
    });
    // Parallax: stickers sit "above" the page, so they scroll a little faster.
    gsap.to(el, {
      y: gsap.utils.random(-70, -20),
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    float(el);
  });

  outsideHero("draw").forEach((el) => draw(el, "inset(0% 100% 0% 0%)", { scrollTrigger: onEnter(el, "top 90%") }));
  outsideHero("draw-y").forEach((el) => draw(el, "inset(0% 0% 100% 0%)", { scrollTrigger: onEnter(el, "top 90%") }));

  outsideHero("counter").forEach((el) => {
    gsap.from(el, {
      textContent: 0,
      snap: { textContent: 1 },
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: onEnter(el),
    });
  });

  outsideHero("wiggle").forEach((el) => {
    gsap.to(el, { x: 10, y: -8, rotation: -8, duration: 0.9, ease: "sine.inOut", repeat: -1, yoyo: true });
  });

  outsideHero("spin").forEach((el) => {
    gsap.to(el, { rotation: 360, duration: 9, ease: "none", repeat: -1 });
  });
}

function projectCards() {
  outsideHero("card").forEach((card, i) => {
    const tl = gsap.timeline({ scrollTrigger: onEnter(card, "top 88%") });
    tl.from(card, {
      y: 160,
      rotation: i % 2 ? 8 : -8,
      scale: 0.9,
      autoAlpha: 0,
      duration: 1.2,
      ease: "power4.out",
    }).from(
      all('[data-anim="tape"]', card),
      { scale: 1.8, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "back.out(2.5)" },
      "-=0.55",
    );
  });
}

function banner() {
  outsideHero("zoom").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.86, rotation: -1.5 },
      { scale: 1, rotation: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "center 55%", scrub: 1 } },
    );
  });
  outsideHero("banner").forEach((el) => {
    const { chars } = SplitText.create(el, { type: "chars" });
    gsap.from(chars, {
      rotationX: -100,
      yPercent: 70,
      autoAlpha: 0,
      transformOrigin: "50% 100%",
      stagger: { each: 0.035, from: "center" },
      duration: 0.9,
      ease: "back.out(1.6)",
      scrollTrigger: onEnter(el, "top 80%"),
    });
  });
}

function terminal() {
  all('[data-anim="terminal"]').forEach((term) => {
    const cmd = term.querySelector('[data-term="cmd"]');
    const lines = all('[data-term="line"]', term);
    const fullCommand = cmd?.textContent ?? "";
    gsap.set(cmd, { text: "" });

    const tl = gsap.timeline({ scrollTrigger: onEnter(term, "top 75%") });
    tl.from(term, { y: 90, scale: 0.92, autoAlpha: 0, duration: 1, ease: "power4.out" }).to(cmd, {
      text: fullCommand,
      duration: fullCommand.length * 0.055,
      ease: "none",
    });
    lines.forEach((line) => {
      const value = line.querySelector('[data-term="value"]');
      tl.from(line, { autoAlpha: 0, x: -24, duration: 0.35, ease: "power2.out" }, "+=0.15").to(
        value,
        { duration: 0.9, scrambleText: { text: value?.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.5 } },
        "<",
      );
    });
  });
}

function experienceTimeline() {
  outsideHero("cells").forEach((el) => {
    gsap.from(el.children, {
      scale: 0,
      autoAlpha: 0,
      stagger: { each: 0.05, from: "random" },
      duration: 0.6,
      ease: "back.out(2)",
      scrollTrigger: onEnter(el, "top 75%"),
    });
  });
  outsideHero("timeline").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 55%", scrub: 1 },
      },
    );
  });
  outsideHero("dot").forEach((el) => {
    gsap.from(el, { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(2.5)", scrollTrigger: onEnter(el, "top 75%") });
  });
}

export function PageAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", (context) => {
      // Hold the hero intro until the intro loader starts lifting, so it plays in view.
      let cleanupHero: (() => void) | undefined;
      const playHero = context.add("playHero", () => {
        cleanupHero = heroIntro();
      });
      const onReveal = () => playHero();
      if (introIsPlaying()) window.addEventListener(INTRO_REVEAL_EVENT, onReveal, { once: true });
      else playHero();
      skillsMarquee();
      scrollReveals();
      projectCards();
      banner();
      terminal();
      experienceTimeline();

      // Lazy images and webfonts can shift layout after the first measure.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => {
        cleanupHero?.();
        window.removeEventListener(INTRO_REVEAL_EVENT, onReveal);
        window.removeEventListener("load", refresh);
      };
    });
  });

  return null;
}

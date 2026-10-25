"use client";

import { useEffect } from "react";

/** How long the mouse must be still before Pusheen falls asleep. */
const IDLE_MS = 500;

const CURSORS = ["/cursors/pusheen-typing.cur", "/cursors/pusheen-sleeping.cur"];

/*
 * Pusheen cursor: typing on her laptop while the mouse moves, asleep once it
 * rests. The cursors themselves are native CSS cursors (see globals.css), so
 * they track the pointer with no lag; this only flips classes on <html>.
 *
 * Cursor art: "Pusheen the cat with laptop" by bunivielle, via cursors-4u.com,
 * licensed CC BY 4.0.
 */
export function CatCursor() {
  useEffect(() => {
    // Touch screens have no cursor to replace.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    // Warm the cache so the first switch doesn't flash the default arrow.
    CURSORS.forEach((src) => (new Image().src = src));

    let timer: number | undefined;
    let sleeping = true;
    const setSleeping = (value: boolean) => {
      if (value === sleeping) return;
      sleeping = value;
      root.classList.toggle("cat-sleeping", value);
    };

    const onMove = () => {
      setSleeping(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setSleeping(true), IDLE_MS);
    };

    root.classList.add("cat-cursor", "cat-sleeping");
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", onMove);
      root.classList.remove("cat-cursor", "cat-sleeping");
    };
  }, []);

  return null;
}

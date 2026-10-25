"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

const spring = { stiffness: 220, damping: 16, mass: 0.5 };

/** Pulls its child towards the cursor and springs back on leave. */
export function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileTap={reduce ? undefined : { scale: 0.93 }}
    >
      {children}
    </motion.div>
  );
}

/** Tilts its child in 3D to follow the cursor, like a card picked up off the desk. */
export function TiltCard({ children, className = "", max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className={className} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, rotateY }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        whileHover={reduce ? undefined : { scale: 1.025 }}
        transition={{ type: "spring", ...spring }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Highlighter-yellow reading progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[5px] origin-left border-b-2 border-black bg-sun"
      style={{ scaleX }}
    />
  );
}

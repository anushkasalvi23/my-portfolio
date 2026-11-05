"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Project, ProjectStatus } from "@/data/portfolio";
import { TiltCard } from "./motion/Interactive";
import { ProjectCard } from "./sections/Projects";

type Filter = "All" | ProjectStatus;
const filters: Filter[] = ["All", "Completed", "In progress"];

/** Filterable grid of every project; cards drop in like the landing page's. */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const shown = filter === "All" ? projects : projects.filter((p) => p.status === filter);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.status === f).length);

  return (
    <div>
      <div role="group" aria-label="Filter projects by status" className="flex flex-wrap justify-center gap-4 sm:gap-5">
        {filters.map((f) => {
          const on = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`flex h-[58px] items-center gap-3 border-4 border-black px-6 text-[22px] font-medium text-black transition-[transform,box-shadow,background-color] duration-200 sm:h-[66px] sm:text-[26px] ${
                on
                  ? "translate-x-[3px] translate-y-[3px] bg-sun shadow-[2px_2px_0px_0px_#000]"
                  : "bg-white shadow-[6px_6px_0px_0px_#000] hover:-translate-y-0.5"
              }`}
            >
              {f}
              <span className="grid h-[30px] min-w-[30px] place-items-center rounded-full border-2 border-black bg-white px-1.5 font-dm-mono text-[16px]">
                {count(f)}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        layout={!reduce}
        className="mx-auto mt-20 grid max-w-[1205px] justify-items-center gap-x-[133px] gap-y-24 xl:mt-[100px] xl:grid-cols-2 xl:gap-y-[116px]"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <motion.div
              key={project.title}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 140, rotate: i % 2 ? 7 : -7, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.85, rotate: i % 2 ? 4 : -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
              className="w-full max-w-[536px]"
            >
              <TiltCard>
                <ProjectCard project={project} />
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

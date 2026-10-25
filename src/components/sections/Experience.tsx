import { experience } from "@/data/portfolio";
import { at, Fill, PIN, pin, Rotated, Smiley, Sticker } from "../primitives";

// [left, top, width, height, color] within the "grid blocks" layer.
const blocks: [number, number, number, number, string][] = [
  [806.85, 817.16, 80.226, 80.226, "rgba(255,227,172,0.48)"],
  [403.42, 817.16, 80.226, 80.226, "rgba(217,171,82,0.2)"],
  [483.65, 495.06, 80.226, 79.08, "rgba(217,171,82,0.15)"],
  [1048.67, 333.51, 80.226, 79.08, "rgba(217,171,82,0.25)"],
  [403.28, 253.29, 80.226, 79.08, "rgba(217,171,82,0.15)"],
  [403.28, 495.06, 80.226, 79.08, "rgba(217,171,82,0.15)"],
  [323.2, 817.16, 80.226, 80.226, "rgba(217,171,82,0.2)"],
  [323.2, 897.39, 80.226, 81.372, "rgba(217,171,82,0.2)"],
  [161.6, 736.94, 80.226, 80.226, "rgba(217,171,82,0.2)"],
  // "top" group at (888.22, 0)
  [968.45, 91.69, 80.226, 80.226, "#fff6d2"],
  [887.34, 11, 80.226, 79.506, "#fff6d2"],
  [887.34, 91.25, 80.226, 80.029, "#fff6d2"],
  // "top left" group at (74.5, 84.81)
  [161.6, 170.77, 81.372, 82.518, "rgba(217,171,82,0.2)"],
  [80.23, 90.54, 81.372, 80.226, "rgba(217,171,82,0.2)"],
  [0, 91.69, 81.372, 80.226, "rgba(217,171,82,0.2)"],
  [80.23, 170.77, 81.372, 82.518, "rgba(217,171,82,0.2)"],
  [403.43, 10.31, 81.372, 80.226, "rgba(217,171,82,0.25)"],
  [161.6, 332.37, 80.226, 81.372, "rgba(217,171,82,0.2)"],
  [1130.05, 736.93, 80.226, 80.226, "rgba(217,171,82,0.15)"],
  [1210.27, 817.16, 80.226, 80.226, "rgba(217,171,82,0.15)"],
];

/** Faint graph-paper background with a few tinted cells. */
function GraphPaper() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 h-[1024px] w-[1440px]" style={at(5, 0)}>
      <div className="absolute top-[-231.65px] left-[-50.62px] h-[1533.008px] w-[1775.062px] opacity-9">
        <Rotated box={[1775.062, 1533.008]} inner={[1533.008, 1775.062]} transform="rotate(-90deg)">
          <Fill src="/figma/grid-hori-lines.svg" inset="0 -2.06% 0 0" />
        </Rotated>
        <div className="absolute top-[182.8px] left-[46.64px] h-[1167.406px] w-[1533.008px]">
          <Fill src="/figma/grid-verti-lines.svg" />
        </div>
      </div>
      <div data-anim="cells" className="absolute top-[-30.85px] left-[-3.28px] h-[978.76px] w-[1290.496px] opacity-50">
        {blocks.map(([left, top, width, height, color], i) => (
          <span key={i} className="absolute" style={{ left, top, width, height, backgroundColor: color }} />
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="relative pt-20 xl:h-[1029px] xl:pt-0">
      <div className="flex items-center gap-4 px-4 sm:px-8 xl:contents">
        <h2
          data-anim="heading"
          className={`text-[36px] leading-[normal] font-medium whitespace-nowrap text-black md:text-[49px] ${PIN}`}
          style={pin(76, 119)}
        >
          Where I’ve Worked
        </h2>
        <Smiley className="absolute" style={at(558, 119)} />
      </div>
      <Sticker desktopOnly font="handlee" color="#ffc9f0" className="absolute h-[65px] w-[313px] items-center justify-center overflow-clip" style={at(929, 111)}>
        My Experience Journey
      </Sticker>
      <Rotated
        box={[117.116, 98.698]}
        inner={[107.755, 48.7]}
        transform="rotate(-32.26deg) scaleY(-1)"
        desktopOnly
        anim="draw"
        className="pointer-events-none absolute z-10"
        style={at(831, 173)}
      >
        <Fill src="/figma/arrow-experience.svg" />
      </Rotated>

      <div className="relative mt-10 overflow-clip bg-white px-4 py-16 sm:px-8 xl:absolute xl:inset-x-0 xl:top-[218px] xl:mt-0 xl:h-[811px] xl:px-0 xl:pt-[106px] xl:pb-0">
        <GraphPaper />
        <ol className="relative mx-auto flex max-w-[1298px] flex-col gap-12 xl:translate-x-[12px] xl:gap-0">
          {experience.map((job, i) => (
            <li
              key={job.company}
              data-anim="reveal"
              className={`grid gap-6 xl:grid-cols-[minmax(0,1fr)_48px_688px] xl:gap-0 ${i === 0 ? "xl:h-[400px]" : ""}`}
            >
              <div className="flex flex-col gap-[14px] whitespace-nowrap max-sm:whitespace-normal">
                <h3 className="text-[30px] leading-none font-bold tracking-[-0.6px] text-ink sm:text-[40px]">{job.company}</h3>
                <p className="text-[20px] leading-none font-medium tracking-[-0.36px] text-[#797979] sm:text-[24px]">
                  {job.period} · <span className="text-[#222020]">{job.location}</span>
                </p>
              </div>
              <div className="relative hidden xl:block">
                {i === 0 && (
                  <Rotated
                    box={[3, 429]}
                    inner={[429, 3]}
                    transform="rotate(89.93deg)"
                    anim="timeline"
                    className="absolute top-0 left-[22.75px]"
                  >
                    <Fill src="/figma/timeline-line.svg" />
                  </Rotated>
                )}
                <span data-anim="dot" className="relative block size-[48px]">
                  <Fill src={job.dot} inset="-2.08%" />
                </span>
              </div>
              <div className="flex flex-col gap-[14px] xl:pl-[137px]">
                <h4 className="text-[30px] leading-none font-medium tracking-[-0.6px] text-ink sm:text-[40px]">{job.role}</h4>
                <ol className="list-decimal text-[20px] leading-[normal] tracking-[-0.375px] text-[#232323] sm:text-[25px] xl:w-[551px]">
                  {job.points.map((point) => (
                    <li key={point} className="ms-[30px] sm:ms-[37.5px]">
                      {point}
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

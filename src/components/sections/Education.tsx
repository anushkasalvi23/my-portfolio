import { education } from "@/data/portfolio";
import { at, Fill, PIN, pin, Rotated, SelectionHandles, Smiley, Starburst, Sticker, SunSticker } from "../primitives";

/** Hand-drawn table rules; coordinates are relative to the 864×657 table area. */
function SketchLines() {
  const vertical = (src: string, left: number, top: number, length: number) => (
    <Rotated
      box={[2, length]}
      inner={[length, 2]}
      transform="rotate(-90deg)"
      desktopOnly
      anim="draw-y"
      className="pointer-events-none absolute"
      style={{ left, top }}
    >
      <Fill src={src} />
    </Rotated>
  );
  const horizontal = (src: string, left: number, top: number) => (
    <div aria-hidden data-anim="draw" className="pointer-events-none absolute hidden h-[2px] w-[849px] xl:block" style={{ left, top }}>
      <Fill src={src} />
    </div>
  );
  return (
    <>
      {vertical("/figma/edu-line-right.svg", 813, 0, 650.704)}
      {vertical("/figma/edu-line-left.svg", 43, 7, 650)}
      {horizontal("/figma/edu-line-top.svg", 15, 59)}
      {horizontal("/figma/edu-line-row.svg", 14, 349)}
      {horizontal("/figma/edu-line-row.svg", 0, 619)}
    </>
  );
}

function ScoreBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="relative mt-[10px] w-fit">
      <p className="flex h-[52.35px] items-center border-5 border-black bg-rose px-[18px] font-inter text-[20px] leading-[1.4] text-ink drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)] sm:text-[25px]">
        {label}:&nbsp;<strong className="font-bold">{value}</strong>
      </p>
      <SelectionHandles />
    </div>
  );
}

export function Education() {
  return (
    <section className="relative px-4 pt-20 pb-16 sm:px-8 xl:h-[892px] xl:p-0">
      <div className="flex items-center gap-4 xl:contents">
        <h2
          data-anim="heading"
          className={`text-[36px] leading-[normal] font-medium whitespace-nowrap text-black md:text-[48px] ${PIN}`}
          style={pin(101, 66)}
        >
          Where I Learned It
        </h2>
        <Smiley className="absolute" style={at(546, 69)} />
      </div>

      <Sticker desktopOnly font="handlee" color="#ffc9f0" className="absolute h-[65px] w-[313px] items-center justify-center overflow-clip" style={at(87, 218)}>
        My Academic Journey
      </Sticker>
      <Rotated
        box={[118.246, 89.378]}
        inner={[107.755, 48.7]}
        transform="rotate(-155.22deg)"
        desktopOnly
        anim="draw"
        className="pointer-events-none absolute"
        style={at(358, 281)}
      >
        <Fill src="/figma/arrow-academic.svg" />
      </Rotated>
      <SunSticker variant="blue" className="absolute" style={at(148, 451)} />
      <Starburst className="hidden xl:block" style={{ right: -64, top: 576 }} />

      <div className={`relative mt-10 xl:mt-0 xl:h-[657px] xl:w-[864px] ${PIN}`} style={pin(510, 179)}>
        <SketchLines />
        <ol data-anim="stagger" className="flex flex-col gap-10 xl:gap-[91px] xl:pt-[82px] xl:pl-[76px]">
          {education.map((item, i) => (
            <li
              key={item.school}
              className={`flex flex-col gap-6 border-black max-xl:border-t-2 max-xl:pt-8 sm:flex-row sm:items-center sm:gap-[37px] ${
                i === 0 ? "xl:h-[193px]" : "xl:h-[186px]"
              }`}
            >
              <span
                className="flex h-[101px] w-[113px] shrink-0 transition-transform duration-300 hover:-rotate-6 hover:scale-105 items-center justify-center rounded-[6px] border-2 font-handlee text-[48px] leading-[1.5] tracking-[-1.056px] text-black"
                style={{ backgroundColor: item.badge.bg, borderColor: item.badge.border }}
              >
                {i + 1}
              </span>
              <div className="max-w-[566px]">
                <h3 className="text-[24px] leading-[1.4] font-medium text-ink sm:text-[30px]">{item.school}</h3>
                <p className="mt-[12px] font-inter text-[18px] leading-[1.4] text-ink sm:text-[23px]">{item.degree}</p>
                <ScoreBadge label={item.scoreLabel} value={item.score} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

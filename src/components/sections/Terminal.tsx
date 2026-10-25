import Image from "next/image";
import { links } from "@/data/portfolio";
import { at, CurlyArrow, Fill, PIN, pin, Rotated, Sticker } from "../primitives";

// The design frame for this section starts at x=1, so x values are offset by one.
const X = (x: number) => x + 1;

const status = [
  { key: "building", color: "#ffc4de", value: "[ real-time voice cloning ]" },
  { key: "learning", color: "#6bdce8", value: "[ deep learning ]" },
  { key: "open to", color: "#f2817a", value: "[ internships, freelance ]" },
];

const techStickers = [
  { label: "Python", color: "#bae6ff", box: [163, 100, 139, 63], pad: [31, 8] },
  { label: "Text-to-Speech", color: "#ffbdb9", box: [1127, 100, 221, 69], pad: [11, 15] },
  { label: "TensorFlow", color: "#f5caf9", box: [137, 554, 165, 52], pad: [20.83, 6] },
  { label: "PyTorch", color: "#b1ffcd", box: [1134, 560, 145, 52], pad: [22, 6] },
] as const;

function TerminalWindow() {
  return (
    <div
      data-anim="terminal"
      className={`relative w-full max-w-[708px] rounded-[12px] bg-[#141414] px-5 pt-[100px] pb-14 shadow-[0px_8px_14px_-4px_rgba(0,0,0,0.25)] sm:px-[34px] xl:h-[349px] xl:w-[708px] xl:pt-[134px] xl:pb-0 ${PIN}`}
      style={pin(X(364), 191)}
    >
      <div
        aria-hidden
        className="absolute top-0 -left-px h-[66px] w-[calc(100%+2px)] rounded-t-[12px] border-2 border-white shadow-[0px_-5px_4px_0px_rgba(0,0,0,0.11)]"
      />
      <Image
        src="/figma/terminal-dots.svg"
        alt=""
        width={77.841}
        height={18.223}
        className="absolute top-[24px] left-[70px] h-[18.223px] w-[77.841px] max-w-none"
      />
      <pre className="overflow-x-auto font-mono text-[13px] leading-[0.995] whitespace-pre text-sun sm:text-[22px] xl:overflow-visible xl:text-[29px]">
        <span data-term="cmd" className="block text-[16px] sm:text-[24px] xl:text-[30px]">
          $ anushka --status
        </span>
        <span className="mt-[9px] block">
          {status.map((line) => (
            <span key={line.key} data-term="line" className="mb-[6px] block">
              <span style={{ color: line.color }}>{line.key}:</span> <span data-term="value">{line.value}</span>
            </span>
          ))}
          <span aria-hidden className="animate-blink">
            ▍
          </span>
        </span>
      </pre>
      <div data-anim="pop" className="absolute top-[304px] left-[666px] hidden xl:block">
        <Rotated box={[83.014, 72.324]} inner={[69.791, 56.1]} transform="rotate(15.34deg) skewX(-0.92deg)">
          <div className="size-full rounded-[13px] bg-[rgba(254,254,254,0.93)] shadow-[1px_6px_11px_0px_rgba(0,0,0,0.3)]" />
        </Rotated>
        <Rotated
          box={[65.507, 57.039]}
          inner={[53.412, 39.258]}
          transform="rotate(23.69deg) skewX(-1.32deg)"
          className="absolute top-[9.64px] left-[9.96px]"
        >
          <div className="absolute" style={{ inset: "11.54% 8.33%" }}>
            <Fill src="/figma/icon-code.svg" inset="-6.62% -4.49%" />
          </div>
        </Rotated>
      </div>
    </div>
  );
}

export function Terminal() {
  return (
    <section className="relative flex flex-col items-center gap-10 bg-white px-4 py-16 sm:px-8 xl:block xl:h-[669px] xl:p-0">
      {techStickers.map(({ label, color, box, pad }) => (
        <Sticker
          key={label}
          desktopOnly
          color={color}
          className="absolute"
          style={{ ...at(X(box[0]), box[1]), width: box[2], height: box[3], paddingLeft: pad[0], paddingTop: pad[1] }}
        >
          {label}
        </Sticker>
      ))}
      <Rotated
        box={[86.82, 78.67]}
        inner={[83.81, 34.03]}
        transform="rotate(-141.77deg) scaleX(-1)"
        desktopOnly
        anim="draw"
        className="pointer-events-none absolute"
        style={at(X(270.07), 182.97)}
      >
        <Fill src="/figma/squiggle-arrow-python.svg" inset="0 0 -11.75% -1.19%" />
      </Rotated>
      <CurlyArrow transform="rotate(141.77deg)" className="absolute" style={at(X(1079), 172)} />
      <CurlyArrow transform="rotate(-38.23deg)" className="absolute" style={at(X(256), 427)} />
      <CurlyArrow transform="rotate(-141.77deg) scaleY(-1)" className="absolute" style={at(X(1104), 429)} />

      <div className="flex items-center gap-6 xl:contents">
        <p
          data-anim="reveal"
          className={`relative font-scribble text-[40px] leading-[normal] whitespace-nowrap text-black sm:text-[48px] ${PIN}`}
          style={pin(X(587), 74)}
        >
          Check it out
          <Image
            src="/figma/underline-check-it-out.svg"
            alt=""
            width={165.893}
            height={18.02}
            data-anim="draw"
            className="absolute top-[66px] left-[18px] h-[18.02px] w-[165.893px] max-w-none max-sm:hidden"
          />
        </p>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-anim="reveal"
          className={`relative block h-[74px] w-[76px] shrink-0 transition-transform duration-200 hover:-translate-y-1 ${PIN}`}
          style={pin(X(815), 72)}
        >
          <Fill src="/figma/github-circle-shadow.svg" inset="0 -5.26% -10.81% -5.26%" />
          <span className="absolute top-[2.31px] left-[3.56px] h-[68.219px] w-[70.063px]">
            <Fill src="/figma/github-circle-bg.svg" />
          </span>
          <Image
            src="/figma/icon-github.png"
            alt=""
            width={51.063}
            height={55.5}
            className="absolute top-[11.56px] left-[14.25px] h-[55.5px] w-[51.063px] object-contain"
          />
        </a>
        <div data-anim="wiggle" className="absolute hidden h-[35px] w-[31px] xl:block" style={at(X(906), 132)}>
          <Fill src="/figma/cursor-small.svg" inset="-8.7% -12.08% -9.95% -6.81%" />
        </div>
      </div>

      <TerminalWindow />
    </section>
  );
}

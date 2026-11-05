import type { Metadata } from "next";
import Image from "next/image";
import { emailAddress, links, location, openTo } from "@/data/portfolio";
import { ContactForm } from "@/components/ContactForm";
import { Fill, Rotated, Smiley } from "@/components/primitives";
import { PageIntro, SitePage } from "@/components/SitePage";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Anushka Salvi about projects, internships or freelance work.",
};

/** "https://github.com/x/" → "github.com/x" */
const pretty = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { label: "Email", value: emailAddress, href: links.email, icon: "/figma/icon-email.png", color: "#bae6ff", external: false },
  { label: "LinkedIn", value: pretty(links.linkedin), href: links.linkedin, icon: "/figma/icon-linkedin.png", color: "#ff6258", external: true },
  { label: "GitHub", value: pretty(links.github), href: links.github, icon: "/figma/icon-github.png", color: "#ffdc58", external: true },
  { label: "LeetCode", value: pretty(links.leetcode), href: links.leetcode, icon: "/figma/icon-leetcode.png", color: "#b1ffcd", external: true },
].filter((c) => c.href && c.href !== "#");

function Channels() {
  return (
    <ul data-anim="stagger" className="flex flex-col gap-5">
      {channels.map((c) => (
        <li key={c.label}>
          <a
            href={c.href}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-5 border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] transition-[transform,box-shadow] duration-200 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] sm:p-5"
          >
            <span
              className="grid size-[64px] shrink-0 place-items-center rounded-full border-3 border-black transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-110 group-hover:-rotate-12"
              style={{ backgroundColor: c.color }}
            >
              <Image src={c.icon} alt="" width={36} height={36} className="size-[36px] object-contain" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-dm-mono text-[15px] tracking-[0.06em] text-black/70 uppercase">{c.label}</span>
              <span className="block truncate text-[20px] font-bold text-black sm:text-[24px]">{c.value}</span>
            </span>
            <span className="relative size-[38px] shrink-0 bg-black shadow-[4px_4px_0px_0px_#8e8f87]">
              <Image
                src="/figma/icon-arrow-up-right.svg"
                alt=""
                width={24.359}
                height={24.584}
                className="absolute top-[7px] left-[7px] h-[24.584px] w-[24.359px] max-w-none transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

const status = [
  { key: "open to", color: "#f2817a", value: `[ ${openTo.toLowerCase()} ]` },
  { key: "based in", color: "#6bdce8", value: `[ ${location} ]` },
  { key: "reach me", color: "#ffc4de", value: "[ email, LinkedIn ]" },
];

/** Small version of the landing page's terminal window. */
function Availability() {
  return (
    <div data-anim="reveal" className="relative overflow-hidden rounded-[12px] bg-[#141414] px-6 pt-[86px] pb-8 shadow-[0px_8px_14px_-4px_rgba(0,0,0,0.25)]">
      <div aria-hidden className="absolute top-0 -left-px h-[56px] w-[calc(100%+2px)] rounded-t-[12px] border-2 border-white" />
      <Image src="/figma/terminal-dots.svg" alt="" width={77.841} height={18.223} className="absolute top-[19px] left-[28px] h-[18.223px] w-[77.841px] max-w-none" />
      <pre className="overflow-x-auto font-mono text-[15px] leading-[1.3] whitespace-pre text-sun sm:text-[19px]">
        <span className="block text-[17px] sm:text-[21px]">$ anushka --availability</span>
        {status.map((line) => (
          <span key={line.key} className="mt-1 block">
            <span style={{ color: line.color }}>{line.key}:</span> {line.value}
          </span>
        ))}
        <span aria-hidden className="animate-blink">
          ▍
        </span>
      </pre>
    </div>
  );
}

export default function ContactPage() {
  return (
    <SitePage active="contact">
      <PageIntro
        kicker="say hi!"
        title="Contact"
        subtitle="Got a project, an internship, or a good problem? Send me a message and let’s build something."
        sticker={{ label: "Open to work", color: "#b1ffcd" }}
      />
      <section className="relative px-4 pb-24 sm:px-8 xl:px-0 xl:pb-[120px]">
        <div className="mx-auto grid max-w-[1235px] items-start gap-16 xl:grid-cols-[440px_minmax(0,1fr)] xl:gap-[80px]">
          <div className="flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-4">
                <h2 data-anim="heading" className="text-[36px] leading-[normal] font-medium text-black md:text-[44px]">
                  Find me here
                </h2>
                <Smiley />
              </div>
              <div className="mt-8">
                <Channels />
              </div>
            </div>
            <Availability />
          </div>
          <div data-anim="reveal" className="relative">
            <ContactForm email={emailAddress} />
            <Rotated
              box={[76.486, 89.147]}
              inner={[38.552, 81.233]}
              transform="rotate(32.89deg)"
              desktopOnly
              anim="draw"
              className="pointer-events-none absolute -top-[70px] -right-[30px]"
            >
              <Fill src="/figma/accent-lines.svg" />
            </Rotated>
          </div>
        </div>
      </section>
    </SitePage>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { SelectionHandles } from "./primitives";

const topics = ["Full-stack app", "Database", "UI/UX design", "AI & ML", "Internship", "Something else"];

const field =
  "w-full border-4 border-black bg-cream px-5 font-inter text-[20px] text-ink shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] outline-none transition-[background-color,box-shadow] duration-200 placeholder:text-black/40 focus:bg-white focus:shadow-[6px_6px_0px_0px_#ffdc58] sm:text-[22px]";
const label = "mb-3 block text-[22px] font-medium text-black sm:text-[24px]";

/**
 * There's no backend yet, so submitting composes the message in the visitor's
 * own mail app, addressed and pre-filled.
 */
export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const subject = `${topic}: hello from ${name}`;
    const body = `${message}\n\n${name}\n${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative border-6 border-black bg-white px-6 pt-9 pb-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,0.4)] sm:px-[44px] sm:shadow-[21px_21px_0px_0px_rgba(0,0,0,0.4)]"
    >
      <h2 className="text-[30px] leading-[normal] font-medium text-black sm:text-[40px]">Send me a message</h2>
      <p className="mt-2 font-scribble text-[32px] leading-none text-black/70">I read every one of them</p>

      <div className="mt-9 grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Your name
          </label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Jane Doe" className={`${field} h-[62px]`} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>
            Your email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className={`${field} h-[62px]`}
          />
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className={label}>What’s it about?</legend>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic, i) => (
            <label
              key={topic}
              className="cursor-pointer rounded-[40px] border-3 border-black bg-white px-5 py-2 text-[18px] font-medium text-black transition-colors duration-150 select-none hover:bg-sun/40 has-checked:bg-sun has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-black sm:text-[20px]"
            >
              <input type="radio" name="topic" value={topic} defaultChecked={i === 0} className="sr-only" />
              {topic}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="cf-message" className={label}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project, timeline, or the role…"
          className={`${field} resize-y py-4`}
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="flex h-[76px] items-center justify-center rounded-[92px] border-[6px] border-black bg-sky px-10 text-[22px] font-bold whitespace-nowrap text-black transition-transform duration-200 hover:-translate-y-1 active:scale-95 sm:h-[86px] sm:border-8 sm:text-[27px]"
          style={{ transform: "rotate(0.54deg)" }}
        >
          Send message
        </button>
        <p role="status" className="max-w-[360px] text-[18px] leading-[1.35] font-medium text-black">
          {sent ? (
            <span className="relative inline-block border-3 border-black bg-[#b1ffcd] px-4 py-2">
              Your email app should open now. If it didn’t, write to <a href={`mailto:${email}`} className="underline">{email}</a>
              <SelectionHandles size={10} />
            </span>
          ) : (
            "Opens your email app with everything filled in."
          )}
        </p>
      </div>
    </form>
  );
}

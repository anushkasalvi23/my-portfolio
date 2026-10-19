import type { Metadata } from "next";
import {
  DM_Mono,
  Handjet,
  Handlee,
  Inter,
  JetBrains_Mono,
  Just_Me_Again_Down_Here,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const handjet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"],
  axes: ["ELGR", "ELSH"],
});

const handlee = Handlee({
  variable: "--font-handlee",
  subsets: ["latin"],
  weight: "400",
});

const justMe = Just_Me_Again_Down_Here({
  variable: "--font-just-me",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anushka Salvi — Software Developer & Designer",
  description:
    "Portfolio of Anushka Salvi: full-stack development, databases, UI/UX design, and AI/ML.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [spaceGrotesk, inter, handjet, handlee, justMe, dmMono, jetbrainsMono]
    .map((font) => font.variable)
    .join(" ");

  return (
    <html lang="en" className={`${fonts} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

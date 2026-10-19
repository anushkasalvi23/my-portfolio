// Content for the portfolio page. Links marked "#" were not specified in the
// Figma design — replace them with the real URLs.

export const links = {
  linkedin: "#",
  github: "#",
  leetcode: "#",
  email: "mailto:hello@example.com",
  resume: "#",
};

/** Shown in the "good at" grid; the design lists 6 even though 4 cards are featured. */
export const projectCount = 6;

export const skills = ["Web", "Database", "AI", "ML", "App", "Design"];

export const services = [
  {
    title: "Full-Stack Development",
    description: "Building responsive, production-ready apps with the MERN stack.",
    icon: { src: "/figma/icon-fullstack.svg", width: 42.57, height: 37, left: 11, top: 14 },
    accent: "#ffdc58",
    footer: "rgba(255,220,88,0.49)",
  },
  {
    title: "Database Development",
    description: "Modeling application data and schemas for scalability",
    icon: { src: "/figma/icon-database.svg", width: 48, height: 54.776, left: 8, top: 5 },
    accent: "#c5a1ff",
    footer: "rgba(197,161,255,0.36)",
  },
  {
    title: "UI/UX Design",
    description: "Turning Figma wireframes into polished, high-fidelity interfaces for production apps.",
    icon: { src: "/figma/icon-uiux.svg", width: 30, height: 44.347, left: 17, top: 10 },
    accent: "#ff6258",
    footer: "rgba(255,98,88,0.52)",
  },
  {
    title: "AI & ML",
    description: "Building AIML-powered systems that turn complex data into intelligent, automated solutions.",
    icon: { src: "/figma/icon-aiml.svg", width: 45.727, height: 38.667, left: 9, top: 13 },
    accent: "#61bcff",
    footer: "rgba(173,220,255,0.44)",
  },
];

export const education = [
  {
    school: "Vishwakarma Institute of Technology",
    degree: "B.Tech, Computer Science and Engineering (Artificial Intelligence)",
    scoreLabel: "CGPA",
    score: "9.4/10",
    badge: { bg: "#ffe68c", border: "#eecd56" },
  },
  {
    school: "Government Polytechnic Pune",
    degree: "Diploma in Computer Engineering",
    scoreLabel: "Percentage",
    score: "93%",
    badge: { bg: "#ffc9f0", border: "#f3abcb" },
  },
];

export const experience = [
  {
    company: "Lumenith Technology",
    period: "Oct 2025 – Feb 2026",
    location: "Pune",
    role: "Graphic Designer Intern",
    dot: "/figma/timeline-dot-yellow.svg",
    points: [
      "Designed wireframes and high-fidelity UI screens in Figma for the LearnComplexity LMS, keeping layouts consistent and easy to use.",
      "Worked with the design and marketing teams to align product interfaces with brand guidelines, user needs and platform goals.",
    ],
  },
  {
    company: "Linkcode Technologies",
    period: "Jun 2024 – Jul 2024",
    location: "Pune",
    role: "Software Development Intern",
    dot: "/figma/timeline-dot-dark.svg",
    points: [
      "Developed a responsive MERN full-stack application from Figma wireframes with secure authentication.",
      "Built RESTful APIs, designed MongoDB schemas, and collaborated via GitHub for version control.",
    ],
  },
];

export type ProjectStatus = "Completed" | "In progress";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  href: string;
  repo: string;
  /** Screenshot placement inside the 536×366 media area of the card, in design px. */
  image: { src: string; left: number; top: number; width: number; height: number; border: number; crop?: string };
  tallBorder?: boolean;
};

export const projects: Project[] = [
  {
    title: "AI-Based Doc Summarizer",
    description: "Turn PDFs, Word files, and images into summaries, entity cards, and sentiment insights.",
    tags: ["ML", "RAG", "LLM"],
    status: "Completed",
    href: "#",
    repo: "#",
    image: { src: "/figma/project-doc-summarizer.png", left: 28, top: 48, width: 475, height: 295, border: 4 },
  },
  {
    title: "AI Teaching Assistant",
    description: "Helps students ask questions naturally and get level-based answers.",
    tags: ["ML", "RAG", "LLM"],
    status: "Completed",
    href: "#",
    repo: "#",
    image: {
      src: "/figma/project-ai-teaching-assistant.png",
      left: 35.59,
      top: 45.02,
      width: 463.766,
      height: 293.125,
      border: 4.416,
      crop: "left-[0.12%] top-[0.1%] h-[99.75%] w-[115.61%]",
    },
    tallBorder: true,
  },
  {
    title: "Milk Adulteration System",
    // Copy is as provided in the design (it duplicates the Doc Summarizer text).
    description: "Turn PDFs, Word files, and images into summaries, entity cards, and sentiment insights.",
    tags: ["ML", "RAG", "LLM"],
    status: "In progress",
    href: "#",
    repo: "#",
    image: {
      src: "/figma/project-milk-adulteration.png",
      left: 36,
      top: 32,
      width: 463,
      height: 324,
      border: 5,
      crop: "left-[-0.03%] top-0 h-full w-[144.07%]",
    },
  },
  {
    title: "Voice Cloning System",
    description: "A real-time voice cloning system that learns vocal characteristics and generates natural speech.",
    tags: ["ML", "RAG", "LLM"],
    status: "In progress",
    href: "#",
    repo: "#",
    image: { src: "/figma/project-voice-cloning.png", left: 35.59, top: 45.02, width: 463.766, height: 293.125, border: 4.416 },
    tallBorder: true,
  },
];

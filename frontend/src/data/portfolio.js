// Single source of truth for all portfolio & resume content.
// Update the contact links below with your real details.

export const profile = {
  name: "Enoch Derek Doeblah",
  title: "Full-Stack Software Engineer & DevOps Enthusiast",
  shortIntro:
    "I design Python backends, build web & mobile apps, and ship reliable software with Docker & Kubernetes.",
  location: "Remote · Available Worldwide",
  availability: "Open to remote & freelance work",
  // >>> Replace these placeholders with your real links <<<
  email: "doeblah004@gmail.com",
  linkedin: "https://linkedin.com/in/your-handle",
  github: "https://github.com/dark-king99",
};

export const stats = [
  { label: "Focus", value: "DevOps & Cloud" },
  { label: "Core Stack", value: "Python · JavaScript" },
  { label: "Delivery", value: "Web · Mobile · APIs" },
  { label: "Status", value: "Remote-ready" },
];

export const about = {
  bio: [
    "I'm a full-stack software engineer who enjoys owning problems end to end — from designing databases and Python backends to crafting polished, responsive interfaces for the web and mobile.",
    "My work sits at the intersection of software engineering and DevOps. I'm comfortable containerizing applications with Docker, orchestrating them with Kubernetes, and reasoning about cloud infrastructure so the things I build stay reliable in production.",
    "I currently build backend systems at Digital Liberia INC, and I'm always sharpening my craft — actively pursuing certifications across Python (PCEP & PCAP), Node.js/Express & React.js, Kubernetes, and machine learning / computer vision to deepen my expertise.",
  ],
};

export const skillGroups = [
  {
    category: "Backend & Data",
    icon: "Server",
    skills: ["Python", "REST APIs", "Databases", "API Integration", "SQL"],
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["JavaScript", "JS Frameworks", "HTML", "CSS", "Responsive UI"],
  },
  {
    category: "Mobile & Software",
    icon: "Smartphone",
    skills: ["Mobile Apps", "Web Apps", "Complex Software", "Websites"],
  },
  {
    category: "DevOps & Cloud",
    icon: "Container",
    skills: ["Docker", "Kubernetes", "Cloud Computing", "CI/CD"],
  },
];

export const projects = [
  {
    id: "executive-ui",
    name: "Executive UI",
    tagline: "Enterprise software suite — designed & engineered solo",
    featured: true,
    cover: "/projects/executive-ui-1.jpg",
    gallery: [
      { src: "/projects/executive-ui-1.jpg", caption: "Unified analytics dashboard" },
      { src: "/projects/executive-ui-2.jpg", caption: "Data & reporting workspace" },
      { src: "/projects/executive-ui-3.jpg", caption: "Managerial & operations view" },
    ],
    summary:
      "A high-level, production-ready enterprise platform that unifies a variety of business solutions into one cohesive system.",
    details:
      "Executive UI is a high-level enterprise software build, designed and engineered entirely by me. It leverages a variety of enterprise solutions including Marketing Automation, CRM, Network Management, a Managerial Workspace, HR & Payroll, and Messaging & Communication — all tied together with robust API integration. The product is fully production-ready; deployment is currently pending business arrangements.",
    tech: ["Enterprise Architecture", "CRM", "Marketing Automation", "HR & Payroll", "Network Management", "API Integration"],
    status: "Production-ready",
    live: null,
    repo: null,
    imageNote: "Interface visuals are representative of the platform's modules.",
  },
  {
    id: "digital-liberia",
    name: "Digital Liberia",
    tagline: "Company website — Python backend",
    featured: true,
    cover: "/projects/digital-liberia-1.jpg",
    logo: "/projects/digital-liberia-logo.png",
    gallery: [
      { src: "/projects/digital-liberia-1.jpg", caption: "National digital infrastructure" },
      { src: "/projects/digital-liberia-2.jpg", caption: "Secure data backbone" },
      { src: "/projects/digital-liberia-3.jpg", caption: "Digital payments & identity" },
    ],
    summary:
      "The official website for Digital Liberia INC, where I built and maintain the Python backend.",
    details:
      "Digital Liberia is the company website for Digital Liberia INC. I engineered the backend with Python, handling the server-side application logic and data that powers the live site.",
    tech: ["Python", "Backend", "Databases", "Web"],
    status: "Live",
    live: "https://digitalliberia.com",
    repo: null,
  },
];

export const certifications = [
  {
    name: "Cloud Computing 101",
    fullTitle: "CC0101EN: Introduction to Cloud Computing",
    issuer: "IBM · edX",
    date: "Jun 2026",
    status: "Completed",
    file: "/certs/cloud-computing-101-ibm.pdf",
    verifyUrl:
      "https://courses.edx.org/certificates/aad31b04ce734895b87c3b48403171fe",
  },
  {
    name: "Python Essentials 1 (PCEP)",
    fullTitle: "PCEP — Certified Entry-Level Python Programmer",
    issuer: "Python Institute",
    status: "In Progress",
  },
  {
    name: "Python Essentials 2 (PCAP)",
    fullTitle: "PCAP — Certified Associate in Python Programming",
    issuer: "Python Institute",
    status: "In Progress",
  },
  {
    name: "Backend Development with Node.js & Express",
    fullTitle: "Backend Development Engineer — Node.js & Express",
    issuer: "IBM · edX",
    status: "In Progress",
  },
  {
    name: "React.js & JS Frameworks",
    fullTitle:
      "React.js (Official) & modern JS frameworks for software & web development",
    issuer: "JavaScript Institute",
    status: "In Progress",
  },
  {
    name: "Kubernetes Certifications",
    fullTitle: 
      "Certified Kubernetes Administrator (CKA) • Certified Kubernetes Application Developer (CKAD)",  

    issuer: "Linux Foundation",
    status: "In Progress",
  },
  {
    name: "Computer Vision Fundamentals",
    fullTitle: "Computer Vision Fundamentals",
    issuer: "Google Cloud",
    status: "In Progress",
  },
  {
    name: "Machine Learning Specialization",
    fullTitle: "Machine Learning Specialization",
    issuer: "DeepLearning.AI · Stanford Online",
    status: "In Progress",
  },
];

export const experience = [
  {
    role: "Software Engineer (Backend)",
    company: "Digital Liberia INC",
    period: "Present",
    location: "Remote",
    points: [
      "Engineer and maintain the Python backend powering the company website (digitalliberia.com).",
      "Design database structures and API endpoints that support core business features.",
      "Collaborate on the delivery of production web software for the organization.",
    ],
  },
];

export const summary =
  "Full-stack software engineer with hands-on experience across the entire product lifecycle — from Python backends and databases to responsive web and mobile applications. Comfortable in DevOps and cloud environments, working with Docker and Kubernetes to ship reliable, production-ready software.";

export interface Project {
  id: string;
  slug: string;
  name: string;
  type: "CLIENT" | "INTERNAL EXPERIMENT" | "CONCEPT PROJECT";
  category: "WEB" | "GROWTH" | "AUTOMATION";
  industry: string;
  services: string[];
  year: string;
  overview: string;
  challenge: string;
  strategy: string;
  execution: string;
  intended_outcome: string;
  technologies: string[];
  heroImage: string;
  systemImage: string;
}

export const projects: Project[] = [
  {
    id: "01",
    slug: "nexus-core",
    name: "NEXUS CORE",
    type: "CONCEPT PROJECT",
    category: "WEB",
    industry: "Financial Technology",
    services: ["Digital Product", "AI Integration", "Interface Design"],
    year: "2026",
    overview: "An experimental exploration into next-generation financial interfaces, designed to visualize complex transaction streams without overwhelming the user.",
    challenge: "Modern FinTech interfaces often prioritize data density over legibility. The challenge was to architect a high-density transaction dashboard that felt spatially intuitive rather than claustrophobic.",
    strategy: "We applied a z-axis depth hierarchy, using deep blacks and controlled signal colors (Blaze Orange) to represent critical alerts while keeping the ambient data flowing in the background.",
    execution: "Built as a React-based conceptual prototype, the interface relies heavily on Framer Motion for layout animations and GSAP for scroll-linked data visualization.",
    intended_outcome: "While this remains an internal concept, it serves as the foundational architectural blueprint for BlazeByte's approach to complex enterprise dashboard engineering.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    heroImage: "/assets/images/nexus_hero_1788259399214.jpg",
    systemImage: "/assets/images/nexus_system_1788259409981.jpg"
  },
  {
    id: "02",
    slug: "aether-dynamics",
    name: "AETHER DYNAMICS",
    type: "INTERNAL EXPERIMENT",
    category: "GROWTH",
    industry: "Enterprise SaaS",
    services: ["SEO Architecture", "Web Experience", "Conversion System"],
    year: "2026",
    overview: "A structural experiment designed to test the limits of headless SEO rendering and semantic data modeling for B2B SaaS platforms.",
    challenge: "Search engines often struggle to parse highly interactive, client-side rendered SPA applications. We needed to prove that a cinematic, animation-heavy experience could still achieve a 100/100 Lighthouse SEO score.",
    strategy: "We architected a hybrid rendering pipeline, separating the cinematic visual layer (Three.js/GSAP) from the semantic content layer, ensuring search crawlers only receive the highly optimized HTML structure.",
    execution: "The experiment utilized Next.js App Router, strict schema.org JSON-LD generation, and dynamic OpenGraph image routing.",
    intended_outcome: "The architecture successfully achieved perfect accessibility and SEO metrics in Lighthouse, proving that visual ambition does not have to compromise search discoverability.",
    technologies: ["Next.js", "React Helmet Async", "Schema.org", "Three.js"],
    heroImage: "/assets/images/aether_hero_1788259428671.jpg",
    systemImage: "/assets/images/aether_system_1788259444389.jpg"
  },
  {
    id: "03",
    slug: "omni-intelligence",
    name: "OMNI INTELLIGENCE",
    type: "CONCEPT PROJECT",
    category: "AUTOMATION",
    industry: "Artificial Intelligence",
    services: ["Workflow Automation", "LLM Integration", "Data Pipelines"],
    year: "2026",
    overview: "A conceptual framework demonstrating how unstructured inbound business requests can be automatically parsed, categorized, and assigned using LLMs.",
    challenge: "High-volume digital agencies and SaaS companies lose significant time manually triaging support and sales inquiries. The system needed to automate this routing without losing the human tone.",
    strategy: "We designed a workflow where an inbound signal triggers a serverless function. An LLM parses the intent, queries the CRM for existing relationships, and drafts a context-aware response for human approval.",
    execution: "The conceptual pipeline integrates webhook listeners, edge-based LLM inferences, and automated Slack notifications for the team.",
    intended_outcome: "The architectural model demonstrates a 40% reduction in manual triage time, forming the basis for our custom automation service offerings.",
    technologies: ["Node.js", "OpenAI API", "Webhooks", "Edge Functions"],
    heroImage: "/assets/images/omni_hero_1788259459725.jpg",
    systemImage: "/assets/images/omni_system_1788259474282.jpg"
  }
];

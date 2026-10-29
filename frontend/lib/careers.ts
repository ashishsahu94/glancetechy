// lib/careers.ts - EDIT JOB OPENINGS AND PERKS HERE (placeholder values).
// Add or remove items; the page updates by itself. Empty list shows a "no openings" message.

export type Job = {
  slug: string;
  title: string;
  /** small tags shown under the title */
  tags: string[];
  /** details page content (placeholder - edit freely) */
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export const jobs: Job[] = [
   {
    slug: "e-tender-executive",
    title: "E-Tender Executive / Tender Bidder",
    tags: ["Tendering", "On-site", "Full-time"],
    location: "Lucknow, India",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Find suitable government and private tenders, prepare tender documents, manage online bid submissions and coordinate the complete tendering process on e-procurement portals.",
    responsibilities: [
      "Search and identify relevant tenders on government and private tender websites",
      "Register and manage company accounts on e-tendering portals",
      "Review tender notices, NITs, eligibility criteria, technical specifications and BOQs",
      "Prepare technical bids, financial bids and supporting documents",
      "Upload documents and submit online tenders before the deadline",
      "Handle EMD, tender fee, bid security and performance security documentation",
      "Manage Digital Signature Certificates (DSC) and portal login credentials securely",
      "Prepare and maintain company documents such as GST, PAN, registration, turnover and experience certificates",
      "Track tender status, corrigendums, amendments, pre-bid meetings and submission deadlines",
      "Coordinate with the accounts, sales, technical and management teams",
      "Monitor bid opening results, technical evaluations, financial comparisons and award notices",
      "Handle reverse auctions, online bidding and clarification requests where applicable",
      "Maintain a database of submitted, pending, rejected and awarded tenders",
      "Support post-award documentation, purchase orders, agreements and contract compliance",
    ],
    requirements: [
      "1-3 years of experience in tendering or bidding (preferred)",
      "Knowledge of the complete tendering and bidding process",
      "Understanding of technical and financial bid preparation",
      "Knowledge of EMD, GST, BOQ, DSC and tender eligibility requirements",
      "Good command of MS Excel, Word, PDF tools and document management",
      "Strong document verification, deadline management and coordination skills",
      "Attention to detail and ability to handle multiple tenders at the same time",
      "Graduate in any discipline (a diploma or degree in commerce, business administration or engineering is preferred)",
    ],
    niceToHave: [
      "Experience with CPPP and GeM (Government e-Marketplace)",
      "State government e-procurement portals and IREPS (Indian Railways)",
      "Defence, PSU and government department tender portals",
      "Private e-tendering platforms such as SAP Ariba",
    ],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    tags: ["Marketing", "Remote", "Full-time"],
    location: "Remote, India",
    type: "Full-time",
    experience: "2+ years",
    summary: "Grow our clients' organic traffic and local rankings with practical, data-driven SEO.",
    responsibilities: [
      "Run technical, on-page and off-page SEO for client websites",
      "Keyword research and content planning",
      "Manage Google Business Profile and local SEO",
      "Share monthly reports with clear next steps",
    ],
    requirements: [
      "2+ years of hands-on SEO experience",
      "Good with Search Console, Analytics and tools like Ahrefs or Semrush",
      "Understanding of local SEO and link building",
      "Clear written English",
    ],
    niceToHave: ["Experience with AI search (GEO)", "Basic HTML knowledge", "Content writing skills"],
  },
  {
    slug: "digital-marketing-executive",
    title: "Digital Marketing Executive",
    tags: ["Marketing", "Remote", "Full-time"],
    location: "Remote (India)",
    type: "Full-time",
    experience: "1+ year",
    summary: "Plan and run paid and social campaigns that bring real leads for our clients.",
    responsibilities: [
      "Set up and optimise Google Ads and Meta Ads campaigns",
      "Plan and schedule social media content",
      "Track results and improve cost per lead",
      "Coordinate with designers and writers",
    ],
    requirements: [
      "1+ year in digital or performance marketing",
      "Hands-on with Google Ads and Meta Ads Manager",
      "Basic analytics and reporting skills",
      "Self-driven and reliable while working remotely",
    ],
    niceToHave: ["Email marketing tools", "Basic Canva or video editing", "Agency experience"],
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    tags: ["Content", "Remote", "Part-time"],
    location: "Remote (India)",
    type: "Part-time",
    experience: "1+ year",
    summary: "Write clear blogs, website copy and service pages that rank and convert.",
    responsibilities: [
      "Write SEO blogs, landing pages and website copy",
      "Research topics and keywords before writing",
      "Edit and proofread before delivery",
      "Meet deadlines and apply client feedback",
    ],
    requirements: [
      "1+ year of professional writing experience",
      "Strong English grammar and a simple, clear style",
      "Basic SEO knowledge",
      "Portfolio or writing samples",
    ],
    niceToHave: ["Hindi writing", "Technical or marketing niche knowledge", "Basic WordPress"],
  },
];

export type Perk = { icon: "globe" | "flag" | "sparkles"; title: string; text: string };

export const perks: Perk[] = [
  { icon: "globe", title: "Flexible work", text: "Remote and hybrid roles" },
  { icon: "flag", title: "Real ownership", text: "Own your work end to end" },
  { icon: "sparkles", title: "Craft over noise", text: "Quality work, simple process" },
];

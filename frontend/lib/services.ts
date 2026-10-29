
export type ServiceArt =
  | "seo"
  | "speed"
  | "ppc"
  | "social"
  | "email"
  | "content"
  | "ecommerce"
  | "uiux"
  | "geo"
  | "performance";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  art: ServiceArt;
};


export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design & Development",
    tagline:
      "Websites designed around your business, your customers and your goals.",
    description:
      "We design and develop websites that reflect your brand and make it easier for customers to understand your services. From responsive layouts to reliable functionality, we focus on creating a website that works smoothly across devices and supports your business as it grows.",
    features: [
      "Custom website design",
      "Responsive layouts for desktop, tablet and mobile",
      "User-friendly navigation and page structure",
      "SEO-friendly website foundations",
      "Website speed and performance improvements",
      "Website launch and ongoing support",
    ],
    bestFor:
      "Businesses launching a new website, refreshing an outdated design or creating a better experience for their customers.",
    art: "speed",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization (SEO)",
    tagline:
      "Help the right customers find your business through search.",
    description:
      "We improve the way your website appears in search results by focusing on useful content, technical health and relevant search terms. Our SEO work is built around your business goals, helping potential customers discover your services and find the information they need.",
    features: [
      "Keyword and search intent research",
      "On-page SEO and content optimization",
      "Technical SEO and indexing checks",
      "Local SEO and Google Business Profile optimization",
      "Internal linking and backlink strategy",
      "Search performance and traffic reporting",
    ],
    bestFor:
      "Businesses that want to improve organic search visibility, attract relevant visitors and generate more enquiries over time.",
    art: "seo",
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    tagline:
      "Create a consistent social presence that connects with your audience.",
    description:
      "We help businesses communicate their brand across social media with thoughtful content, clear messaging and a consistent visual style. From content planning to campaign management, the focus is on building genuine engagement and keeping your audience connected with your business.",
    features: [
      "Social media strategy and audience research",
      "Monthly content planning",
      "Post, reel and story design",
      "Captions and content creation",
      "Community engagement support",
      "Campaign monitoring and performance reports",
    ],
    bestFor:
      "Businesses that want to build brand awareness, connect with potential customers and maintain an active social media presence.",
    art: "social",
  },
  {
    slug: "ppc",
    title: "Pay Per Click (PPC) Advertising",
    tagline:
      "Reach potential customers with focused, measurable ad campaigns.",
    description:
      "We plan and manage paid advertising campaigns around your audience, budget and business objectives. From keyword selection and ad copy to conversion tracking, we work to make campaign performance easier to understand and identify opportunities for improvement.",
    features: [
      "Google Ads campaign setup",
      "Meta Ads campaign management",
      "Keyword and audience targeting",
      "Ad copy and creative planning",
      "Landing page and conversion tracking recommendations",
      "Campaign optimization and budget reporting",
    ],
    bestFor:
      "Businesses looking to generate enquiries, reach specific audiences or promote products and services through paid advertising.",
    art: "ppc",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    tagline:
      "Send useful emails that keep your customers connected to your brand.",
    description:
      "We help businesses communicate with subscribers through relevant email campaigns and automated messages. From newsletters to welcome sequences, we focus on clear writing, thoughtful timing and useful content that supports customer relationships.",
    features: [
      "Email campaign planning",
      "Subscriber segmentation",
      "Newsletter design and copywriting",
      "Welcome and follow-up email automation",
      "Subject line and content testing",
      "Delivery, engagement and campaign reporting",
    ],
    bestFor:
      "Businesses that want to stay in touch with customers, nurture leads and encourage repeat purchases or enquiries.",
    art: "email",
  },
  {
    slug: "content-writing",
    title: "Content Writing & Copywriting",
    tagline:
      "Clear, useful content that explains your value and speaks to your audience.",
    description:
      "We write website content, landing pages and articles that communicate your ideas in a natural, easy-to-understand way. Every piece is shaped around your brand voice, your audience and the questions your customers need answered.",
    features: [
      "Website page content",
      "Landing page copywriting",
      "Blog posts and informative articles",
      "SEO-focused content planning",
      "Brand messaging and tone of voice",
      "Editing and proofreading",
    ],
    bestFor:
      "Businesses that need clearer website messaging, helpful blog content or consistent communication across their digital channels.",
    art: "content",
  },
  {
    slug: "ecommerce-development",
    title: "E-commerce Development",
    tagline:
      "Create an online store that makes shopping simple for your customers.",
    description:
      "We build online stores that help customers browse products, understand their options and complete purchases with confidence. From product pages and checkout flows to payment integration and store management, we focus on making your e-commerce website practical for both shoppers and your team.",
    features: [
      "Custom online store design",
      "Responsive product and category pages",
      "Shopping cart and checkout setup",
      "Payment gateway integration",
      "Product and inventory management",
      "E-commerce SEO and performance improvements",
    ],
    bestFor:
      "Retail businesses, growing brands and entrepreneurs who want to sell products online or improve an existing store.",
    art: "ecommerce",
  },
  {
    slug: "figma-uiux-design",
    title: "Figma UI/UX Design",
    tagline:
      "Thoughtful interfaces that make digital products easier to use.",
    description:
      "We design website interfaces, mobile app screens and dashboards in Figma with a focus on usability, clear visual hierarchy and consistent design. From early wireframes to interactive prototypes, we help you review the experience and refine the design before development begins.",
    features: [
      "Website UI/UX design",
      "Wireframes and user flows",
      "Interactive Figma prototypes",
      "Mobile app interface design",
      "Reusable components and design systems",
      "Responsive desktop, tablet and mobile layouts",
    ],
    bestFor:
      "Startups, SaaS teams and businesses that need a new interface, a design prototype or a more consistent digital product experience.",
    art: "uiux",
  },
  {
    slug: "geo-ai-search",
    title: "GEO & AI Search Optimization",
    tagline:
      "Make your brand and expertise easier for search systems to understand.",
    description:
      "We help businesses organize their website content so search engines and AI-powered discovery tools can better understand their services, expertise and brand information. The work focuses on useful content, clear site structure and consistent business details rather than promises of guaranteed AI citations.",
    features: [
      "AI search visibility assessment",
      "Content structure and clarity improvements",
      "Brand and business information consistency",
      "Structured data review",
      "Expertise-led content recommendations",
      "Search visibility monitoring",
    ],
    bestFor:
      "Businesses looking to strengthen their online presence as people discover information through traditional search engines and AI-powered tools.",
    art: "geo",
  },
   {
    slug: "wordpress-design-development",
    title: "WordPress Design & Development",
    tagline:
      "WordPress websites you can manage yourself, built to be fast and secure.",
    description:
      "We design and build WordPress websites that look like your brand and are easy for your team to update. From a clean custom theme to forms, blog and SEO basics, we set everything up properly, so you can edit pages and publish content without needing a developer for every change.",
    features: [
      "Custom WordPress theme design",
      "Responsive layouts for every device",
      "Blog, forms and page editing set up for you",
      "Speed, security and backup setup",
      "SEO-friendly structure and clean URLs",
      "Migration, fixes and training",
    ],
    bestFor:
      "Businesses that want to edit their own website, bloggers and publishers, and companies with an old WordPress site that needs a fresh start.",
    art: "speed",
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline:
      "Make marketing decisions with clearer goals and measurable results.",
    description:
      "We plan and improve digital campaigns around meaningful business outcomes such as qualified enquiries, sales and customer acquisition. By combining audience research, campaign data and conversion tracking, we help businesses understand what is working and where improvements may be needed.",
    features: [
      "Digital campaign planning",
      "Audience research and targeting",
      "Conversion tracking and analytics setup",
      "Landing page improvement recommendations",
      "Campaign testing and optimization",
      "Performance reporting and budget analysis",
    ],
    bestFor:
      "Businesses that want to measure their marketing activity more clearly and improve the efficiency of their advertising campaigns.",
    art: "performance",
  },
];



export const processSteps = [
  {
    title: "Discover",
    text: "We start by understanding your business, your audience and what you want to achieve. This helps us shape a solution that fits your needs.",
  },
  {
    title: "Plan",
    text: "We outline the project scope, key deliverables, timeline and pricing so you know what to expect before work begins.",
  },
  {
    title: "Design & Develop",
    text: "We bring the plan to life through thoughtful design and development, sharing progress along the way and refining the work based on your feedback.",
  },
  {
    title: "Launch & Improve",
    text: "Before launch, we check the website and its key features. Once it's live, we can help you improve performance, user experience and your online presence as your business grows.",
  },
];

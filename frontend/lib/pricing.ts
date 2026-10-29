// lib/pricing.ts - EDIT PRICES AND FEATURES HERE (placeholder values).
// "monthly" = price per month, "annual" = price per month when billed yearly.

export type Plan = {
  id: string;
  name: string;
  description: string;
  monthly: number;
  annual: number;
  unit: string;
  cta: string;
  featured?: boolean;
  /** shown first with a tick, e.g. "Everything in Starter" */
  includes?: string;
  features: string[];
};

export const CURRENCY = "₹";

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Best for new businesses that want a clean website and a strong start online.",
    monthly: 9999,
    annual: 7999,
    unit: "per project / month",
    cta: "Get started",
    features: [
      "Up to 5-page responsive website",
      "Basic on-page SEO setup",
      "Contact form and WhatsApp button",
      "Google Business Profile setup",
      "Monthly performance summary",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Best for businesses that want steady traffic, leads and regular marketing.",
    monthly: 24999,
    annual: 19999,
    unit: "per project / month",
    cta: "Get started",
    featured: true,
    includes: "Everything in Starter",
    features: [
      "Ongoing SEO and blog content",
      "Social media management",
      "Google and Meta ads management",
      "Conversion tracking and reports",
      "Priority support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Best for brands that want a full digital team working on growth every month.",
    monthly: 49999,
    annual: 39999,
    unit: "per project / month",
    cta: "Get started",
    includes: "Everything in Growth",
    features: [
      "E-commerce or custom web development",
      "Email marketing and automation",
      "GEO and AI search optimization",
      "Figma UI/UX design support",
      "Dedicated account manager",
    ],
  },
];

export const enterprise = {
  title: "Get custom pricing",
  text: "If you manage a large website or store, multiple brands, or need custom integrations, our team can build a plan around your needs.",
  cta: "Contact sales",
};

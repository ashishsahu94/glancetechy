
export type FieldType =
  | "text" | "textarea" | "url" | "color" | "date" | "select" | "boolean"
  | "image" | "paragraphs" | "number" | "relation" | "faqs";

export type ResourceKey =
  | "projects" | "posts" | "testimonials"
  | "countries" | "states" | "cities";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  max?: number;
  help?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  relation?: ResourceKey;
};


export type ResourceConfig = {
  key: ResourceKey;
  group: "content" | "areas";
  label: string;
  singular: string;
  newLabel: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  badge?: { field: string; text: string };
  deleteWarning?: string;
  defaults: Record<string, unknown>;
  fields: Field[];
};

/** Automatically generate a URL-friendly slug. */
export const generateSlug = (value: string): string =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Public website routes for each resource. */
export const RESOURCE_ROUTES: Partial<Record<ResourceKey, string>> = {
  posts: "/blog",
  countries: "/countries",
  states: "/states",
  cities: "/cities",
};

/** Build the complete public URL. Pass the site origin from the form. */
export const getResourceUrl = (
  resource: ResourceKey,
  name: string,
  origin: string,
  slugValue?: string,
): string => {
  const route = RESOURCE_ROUTES[resource] ?? `/${resource}`;
  const slug = generateSlug(slugValue?.trim() || name);

  if (!slug) return `${origin.replace(/\/+$/, "")}${route}`;

  return `${origin.replace(/\/+$/, "")}${route}/${slug}`;
};

export const RESOURCE_KEYS: ResourceKey[] = [
  "projects", "posts", "testimonials", "countries", "states", "cities",
];

export const isResource = (k: string): k is ResourceKey =>
  (RESOURCE_KEYS as string[]).includes(k);

export const GROUP_LABELS: Record<ResourceConfig["group"], string> = {
  content: "Website Content",
  areas: "Agency Locations",
};

const areaFields: Field[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    max: 255,
  },
  {
    name: "slug",
    label: "URL Name (slug)",
    type: "text",
    max: 100,
    placeholder: "uttar-pradesh",
    help: "Generated automatically from the name. You can also edit it manually. Maximum 100 characters.",
  },
  {
    name: "short_description",
    label: "Short Description",
    type: "textarea",
    help: "Short text about this location that will be displayed on the page.",
  },
  {
    name: "focus_keyword",
    label: "Focus Keyword (optional)",
    type: "text",
    max: 255,
    placeholder: "hotels in uttar pradesh",
    help: "Main keyword you want this page to rank for on Google. Use one short phrase only.",
  },
  {
    name: "meta_title",
    label: "SEO Title (optional)",
    type: "text",
    max: 255,
    help: "Title displayed in Google. It will be generated automatically if left empty.",
  },
  {
    name: "status",
    label: "Show on Website",
    type: "boolean",
    help: "Turn this off to hide this location from the website.",
  },
];

const areaDefaults = { status: true, sort_order: "0" };
const areaWarning =
  "All states and cities inside it will also be permanently deleted.";

export const configs: Record<ResourceKey, ResourceConfig> = {
  projects: {
    key: "projects",
    group: "content",
    label: "Projects",
    singular: "Project",
    newLabel: "New Project",
    titleField: "title",
    subtitleField: "category",
    imageField: "img",
    badge: { field: "featured", text: "On Homepage" },
    defaults: { bg: "#1a1038", featured: false },
    fields: [
      { name: "title", label: "Project Name", type: "text", required: true, max: 100 },
      { name: "category", label: "Category", type: "text", required: true, max: 100, placeholder: "Web Development" },
      { name: "href", label: "Live Website URL", type: "url", required: true, placeholder: "https://..." },
      { name: "img", label: "Project Image", type: "image", required: true, help: "A wide landscape image works best (JPG, PNG, WEBP, maximum 5 MB)." },
      { name: "description", label: "Description", type: "textarea", max: 1500, help: "A few lines about the project. Shown in the popup when a visitor clicks the project (maximum 1500 characters)." },
      { name: "bg", label: "Background Color", type: "color", help: "This color is shown before the image loads." },
      { name: "featured", label: "Show on Homepage", type: "boolean", help: "Only the first 4 featured projects are shown on the homepage." },
    ],
  },

  posts: {
    key: "posts",
    group: "content",
    label: "Blog Posts",
    singular: "Post",
    newLabel: "New Post",
    titleField: "title",
    subtitleField: "category",
    imageField: "image",
    defaults: { art: "seo" },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 140 },
      {
        name: "slug",
        label: "URL Name (slug)",
        type: "text",
        max: 80,
        placeholder: "seo-vs-google-ads-roi",
        help: "Generated automatically from the title. You can also edit it manually.",
      },
      { name: "category", label: "Category", type: "text", required: true, max: 80 },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "excerpt", label: "Short Summary", type: "textarea", required: true, max: 300 },
      { name: "image", label: "Cover Image (optional)", type: "image", help: "If not provided, the selected cover design below will be displayed." },
      {
        name: "art",
        label: "Cover Design",
        type: "select",
        options: [
          { value: "seo", label: "SEO (Chart)" },
          { value: "speed", label: "Speed (Gauge)" },
          { value: "ppc", label: "PPC (Target)" },
          { value: "social", label: "Social (Network)" },
          { value: "email", label: "Email (Envelope)" },
          { value: "content", label: "Content (Document)" },
        ],
      },
      { name: "content", label: "Article Content", type: "paragraphs", required: true, help: "Leave one blank line between each paragraph." },
      { name: "faqs", label: "FAQ (optional)", type: "faqs", max: 6000, help: "Questions and answers specific to this article. They appear at the end of the post and are also added to Google as FAQ rich results." },
      { name: "focus_keyword", label: "Focus Keyword (optional)", type: "text", max: 255, placeholder: "seo tips for small business", help: "Main keyword you want this blog post to rank for on Google. Use one short phrase only." },
      { name: "meta_title", label: "SEO Title (optional)", type: "text", max: 255, help: "Title displayed in Google. It will be generated automatically from the post title if left empty." },
      { name: "meta_description", label: "SEO Description (optional)", type: "textarea", help: "Title description displayed in Google (around 150 characters). If left empty, the short summary is used." },
    ],
  },

  testimonials: {
    key: "testimonials",
    group: "content",
    label: "Customer Reviews",
    singular: "Review",
    newLabel: "New Review",
    titleField: "name",
    subtitleField: "role",
    imageField: "avatar",
    defaults: {},
    fields: [
      { name: "name", label: "Customer Name", type: "text", required: true, max: 80 },
      { name: "role", label: "Role / Company", type: "text", required: true, max: 100, placeholder: "Founder, Trendy Store" },
      {
        name: "source", label: "Review Source", type: "select",
        help: "Where this review was given. A small badge (Google, Freelancer...) is shown on the review card.",
        options: [
          { value: "", label: "— No badge —" },
          { value: "google", label: "Google" },
          { value: "freelancer", label: "Freelancer.com" },
          { value: "upwork", label: "Upwork" },
          { value: "fiverr", label: "Fiverr" },
          { value: "clutch", label: "Clutch" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "facebook", label: "Facebook" },
          { value: "whatsapp", label: "WhatsApp" },
          { value: "direct", label: "Direct client" },
        ],
      },
      { name: "source_url", label: "Review Link (optional)", type: "url", max: 500, placeholder: "https://...", help: "Link to the original review (for example the Google review). Long reviews show a \"Read more\" link that opens this page." },
      { name: "quote", label: "Review", type: "textarea", required: true, max: 500 },
      { name: "avatar", label: "Photo (optional)", type: "image", help: "If not provided, the first letter of the name will be displayed." },
    ],
  },

  countries: {
    key: "countries",
    group: "areas",
    label: "Countries",
    singular: "Country",
    newLabel: "New Country",
    titleField: "name",
    subtitleField: "summary",
    badge: { field: "inactive", text: "Hidden" },
    deleteWarning: areaWarning,
    defaults: areaDefaults,
    fields: areaFields,
  },

  states: {
    key: "states",
    group: "areas",
    label: "States",
    singular: "State",
    newLabel: "New State",
    titleField: "name",
    subtitleField: "summary",
    badge: { field: "inactive", text: "Hidden" },
    deleteWarning: "All cities inside it will also be permanently deleted.",
    defaults: areaDefaults,
    fields: [
      { name: "country_id", label: "Country", type: "relation", relation: "countries", required: true },
      ...areaFields,
    ],
  },

  cities: {
    key: "cities",
    group: "areas",
    label: "Cities",
    singular: "City",
    newLabel: "New City",
    titleField: "name",
    subtitleField: "summary",
    badge: { field: "inactive", text: "Hidden" },
    defaults: areaDefaults,
    fields: [
      { name: "state_id", label: "State", type: "relation", relation: "states", required: true },
      ...areaFields,
    ],
  },
};

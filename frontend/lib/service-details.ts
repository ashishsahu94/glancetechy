// Extra content for each service's own page (app/services/[slug]).
// Basic info (title, features...) stays in lib/services.ts.

export type ServiceDetail = {
  /** short page title for Google (the site name is added automatically) */
  seoTitle: string;
  /** meta description, keep under about 155 characters */
  seoDescription: string;
  /** typical delivery time, shown in the hero */
  timeline: string;
  /** who this service is a good fit for */
  whoFor: string[];
  /** two long-form blocks of useful, human text (good for SEO) */
  sections: { title: string; paras: string[] }[];
  intro: string[];
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "website-design": {
    seoTitle: "Website Design & Development Services",
    seoDescription: "Custom, mobile-friendly website design and development for businesses. Fast, SEO-ready sites that turn visitors into enquiries. Get a free quote.",
    timeline: "3 to 6 weeks for most business websites",
    whoFor: [
      "Businesses launching their first website",
      "Companies whose current site looks dated or loads slowly",
      "Service providers who want more calls and enquiries from Google",
      "Brands going through a rebrand or a new launch",
    ],
    sections: [
      { title: "Why a good website still matters", paras: [
        "Most people check a business online before they call, visit or buy. If your website is slow, confusing or hard to use on a phone, many of them leave within seconds and go to a competitor. A good website quietly does part of the selling for you, day and night.",
        "It also supports everything else you do. Your Google ranking, your ads and your social posts all send people to the same place, so that place has to work.",
      ] },
      { title: "How we build websites", paras: [
        "We start with your customers, not with colours. We ask who visits, what they want to know and what you want them to do next. Then we plan the pages, write clear headings and design every screen for phones first.",
        "We keep the code light, compress images and test on real devices so pages open fast. Page titles, headings and links are set up properly from the start, so search engines can understand the site without expensive rework later.",
      ] },
    ],
    intro: [
      "Your website is often the first thing a customer sees. We design it to look good, load fast and make the next step obvious, whether that is a call, a booking or a purchase.",
      "We build every site mobile-first, with clean code and a structure search engines can read. You can edit text and images yourself after launch.",
    ],
    benefits: [
      { title: "Made for conversions", text: "Every page has one clear goal and a clear button to reach it." },
      { title: "Fast on every device", text: "Optimised images and lean code keep pages quick, even on slow networks." },
      { title: "Ready for SEO", text: "Clean headings, meta tags and URLs are set up from day one." },
    ],
    steps: [
      { title: "Brief & sitemap", text: "We agree on goals, pages and content." },
      { title: "Design", text: "You review layouts for desktop and mobile before we build." },
      { title: "Development", text: "We build, test on real devices and connect forms and analytics." },
      { title: "Launch & training", text: "We go live and show you how to manage the site." },
    ],
    faqs: [
      { q: "How long does a website take?", a: "A typical business website takes 3 to 6 weeks, depending on pages and how quickly content is shared." },
      { q: "Will I be able to edit the site myself?", a: "Yes. We set it up so you can change text, images and blog posts without coding." },
      { q: "Do you provide hosting and support?", a: "We can guide you on hosting and offer support after launch. Ask us for the current plans." },
      { q: "Do you design in Figma before building?", a: "Yes, for most projects. You see and approve the design before development starts, so changes are quick and cheap." },
      { q: "What do you need from me to start?", a: "Your logo, any existing text and photos, and a few websites you like. If you do not have content ready, we can help write it." },
    ],
  },
  seo: {
    seoTitle: "SEO Services for Business Growth",
    seoDescription: "Practical SEO services: technical fixes, local SEO, content and link building. Get found on Google by people already searching for you. Free site review.",
    timeline: "First improvements in 4 to 6 weeks, steady growth over 3 to 6 months",
    whoFor: [
      "Local businesses that want to show up in Google Maps",
      "Websites with a good design but very little traffic",
      "Online stores that depend too much on paid ads",
      "Companies that lost rankings after a redesign",
    ],
    sections: [
      { title: "What SEO actually is", paras: [
        "SEO means making it easy for Google to understand your site and easy for people to trust it. When someone searches for what you sell, you want to be one of the first results they see. That traffic is not paid per click, so it gets cheaper the longer it works.",
        "It is not a trick. It is a mix of fixing technical problems, writing pages that answer real questions and earning mentions from other good websites.",
      ] },
      { title: "How we work on your rankings", paras: [
        "We begin with an audit so we know what is really holding you back. Sometimes it is a slow site or broken pages. Sometimes it is thin content or missing local details. We fix the biggest problems first.",
        "Then we publish helpful content, improve your Google Business Profile for local searches and build links the slow, honest way. Every month you get a simple report in plain language: what we did, what changed and what comes next.",
      ] },
    ],
    intro: [
      "SEO brings people to your site at the moment they are searching for what you sell. It takes patience, but the traffic keeps coming without paying for every click.",
      "We start with research, fix technical problems, improve your pages and build trust with quality links. You get a plain-language report every month.",
    ],
    benefits: [
      { title: "Steady organic traffic", text: "Rankings that keep working month after month." },
      { title: "Local visibility", text: "Show up in Google Maps and local searches near you." },
      { title: "Honest reporting", text: "Clear numbers on rankings, traffic and enquiries." },
    ],
    steps: [
      { title: "Audit", text: "We check your site, competitors and keywords." },
      { title: "Fix & optimise", text: "Technical issues and on-page changes come first." },
      { title: "Content & links", text: "We publish useful content and earn quality links." },
      { title: "Report & refine", text: "We review results each month and adjust the plan." },
    ],
    faqs: [
      { q: "How long before I see results?", a: "Most sites see movement in 3 to 4 months. Competitive keywords can take longer." },
      { q: "Can you guarantee first position?", a: "No one honestly can. We focus on steady growth in traffic and enquiries." },
      { q: "Do I need a new website for SEO?", a: "Not always. We review your current site first and tell you what really needs to change." },
      { q: "Do you do local SEO for Google Maps?", a: "Yes. We improve your Google Business Profile, local pages, reviews and citations so you appear for searches near you." },
      { q: "Why does SEO take so long?", a: "Google needs time to find, test and trust changes. Quick fixes show up earlier, while competitive keywords build over several months." },
    ],
  },
  "social-media": {
    seoTitle: "Social Media Marketing Services",
    seoDescription: "Social media marketing that builds your brand and a real community. Content calendars, designs, posting, replies and paid campaigns on Instagram, Facebook and LinkedIn.",
    timeline: "Content plan ready in 1 to 2 weeks, results build over 2 to 3 months",
    whoFor: [
      "Brands that post rarely or without a plan",
      "Local businesses that want enquiries from Instagram and Facebook",
      "Founders with no time to manage their pages",
      "Companies launching a new product or offer",
    ],
    sections: [
      { title: "Social media is about showing up", paras: [
        "People rarely buy the first time they see you. They buy after seeing you a few times, learning what you stand for and starting to trust you. That is why regular, useful posting beats a burst of posts every few months.",
        "Good social media also gives you something to talk about with customers: answers, offers, behind-the-scenes and reviews.",
      ] },
      { title: "How we run your pages", paras: [
        "We agree on your platforms, audience and tone, then plan a month of content you can approve. Posts, reels and stories are designed in your brand style and scheduled, so your pages stay active.",
        "We also reply to comments and messages, because a quick, friendly answer often decides whether a stranger becomes a customer. If you want to reach new people faster, we can add paid campaigns on top.",
      ] },
    ],
    intro: [
      "Social media works when you show up regularly with content your audience cares about. We take care of the planning, design and posting so you stay consistent.",
      "We also reply to comments and messages, and can run paid campaigns to reach new people.",
    ],
    benefits: [
      { title: "Consistent presence", text: "A monthly calendar keeps your pages active." },
      { title: "On-brand design", text: "Posts, reels and stories that look like you." },
      { title: "Real engagement", text: "Active community management, not just posting." },
    ],
    steps: [
      { title: "Strategy", text: "We pick platforms and define your audience and tone." },
      { title: "Calendar", text: "You approve a month of content before it goes live." },
      { title: "Create & publish", text: "We design, write and schedule every post." },
      { title: "Engage & report", text: "We manage replies and share monthly results." },
    ],
    faqs: [
      { q: "Which platforms do you cover?", a: "Instagram, Facebook, LinkedIn and others, based on where your customers are." },
      { q: "Do I approve posts first?", a: "Yes. You see the calendar and designs before anything is published." },
      { q: "Do you run paid social ads too?", a: "Yes, as part of this service or together with our PPC service." },
      { q: "How many posts do you make each month?", a: "It depends on the plan and the platform. A common start is 12 to 20 posts plus stories, and we adjust to your goals." },
      { q: "Do you create reels and short videos?", a: "Yes, simple reels and short videos can be part of the plan. Tell us what you need and we will confirm what is included." },
    ],
  },
  ppc: {
    seoTitle: "PPC & Google Ads Management",
    seoDescription: "Google Ads and PPC management that brings enquiries fast. Keyword research, ad copy, conversion tracking and weekly optimisation. Your account, your control.",
    timeline: "Campaigns live in 1 to 2 weeks, optimised every week",
    whoFor: [
      "Businesses that need enquiries now, not in six months",
      "Companies spending on ads without knowing what works",
      "New launches and seasonal offers",
      "Online stores that want more sales from search and shopping ads",
    ],
    sections: [
      { title: "Ads that can pay for themselves", paras: [
        "PPC puts you in front of people at the moment they search for what you sell, and you only pay when someone clicks. That makes it one of the easiest channels to measure. The risk is wasting budget on the wrong keywords or on visitors who never planned to buy.",
      ] },
      { title: "How we manage your budget", paras: [
        "We start with keyword and competitor research, then build focused campaigns instead of one big mixed one. Conversion tracking goes in before launch, so we know which clicks turn into calls and form fills.",
        "After launch we check the account every week. We cut wasteful keywords, test new ad copy and improve your landing page where visitors drop off. You get clear numbers: spend, leads and cost per lead.",
      ] },
    ],
    intro: [
      "Paid ads put you in front of ready-to-buy customers quickly. The key is spending the budget on the right keywords and audiences, and tracking what each lead costs.",
      "We set up, run and improve your campaigns every week. Ad accounts stay in your name, so you always have full control.",
    ],
    benefits: [
      { title: "Fast results", text: "Campaigns can bring enquiries within days of launch." },
      { title: "Budget control", text: "You decide the spend and see where every rupee goes." },
      { title: "Measurable ROI", text: "Conversion tracking shows exactly which ads work." },
    ],
    steps: [
      { title: "Research", text: "We study keywords, audience and competitors." },
      { title: "Set up", text: "Campaigns, ad copy and tracking are built and approved by you." },
      { title: "Launch", text: "Ads go live with a controlled starting budget." },
      { title: "Optimise", text: "Weekly improvements lower cost and raise results." },
    ],
    faqs: [
      { q: "What budget do I need?", a: "It depends on your market. We suggest a realistic starting budget after a free review." },
      { q: "Who owns the ad account?", a: "You do. We only manage it on your behalf." },
      { q: "Do you charge a share of ad spend?", a: "Please contact us for current pricing and how management fees are set." },
      { q: "Is PPC better than SEO?", a: "They do different jobs. PPC is fast and paid, SEO is slower but cheaper over time. Many businesses use both." },
      { q: "Do you manage Facebook and Instagram ads?", a: "Yes. We run them as part of PPC or performance marketing, depending on your goals." },
    ],
  },
  "email-marketing": {
    seoTitle: "Email Marketing Services",
    seoDescription: "Email marketing that brings customers back: list building, newsletters, automated flows and reporting. Clear emails that reach the inbox and get clicked.",
    timeline: "Set up in 2 to 3 weeks, automations keep working after that",
    whoFor: [
      "Online stores with abandoned carts",
      "Service businesses with a customer list they never email",
      "Brands launching offers or events",
      "Companies that want to stay in touch with past customers",
    ],
    sections: [
      { title: "Why email still works", paras: [
        "Email reaches people who already know you. You own the list, no algorithm decides who sees it, and one good email can bring back a customer for the cost of a few minutes of work.",
      ] },
      { title: "What we set up for you", paras: [
        "We clean and organise your list, design a simple template in your brand style and write emails that say one thing clearly. Then we set up automations: a welcome email, a follow-up after an enquiry, a reminder for abandoned carts.",
        "We also check sender settings such as SPF and DKIM so your emails have the best chance of reaching the inbox. Each month we look at opens, clicks and replies, and test small changes to improve them.",
      ] },
    ],
    intro: [
      "Email is one of the cheapest ways to bring customers back. We help you collect subscribers and send messages that are useful, timely and easy to act on.",
      "From a welcome email to automated flows, every message has one goal and is tested and measured.",
    ],
    benefits: [
      { title: "Repeat customers", text: "Stay in touch with people who already know you." },
      { title: "Automation", text: "Welcome, follow-up and reminder emails run on their own." },
      { title: "Inbox delivery", text: "We check your setup so emails land in the inbox, not spam." },
    ],
    steps: [
      { title: "List & goals", text: "We organise contacts and set a clear aim." },
      { title: "Design & copy", text: "Emails are written and designed in your brand style." },
      { title: "Automate", text: "Key flows are set up and tested." },
      { title: "Test & report", text: "A/B tests and monthly reports guide improvements." },
    ],
    faqs: [
      { q: "Which email tools do you use?", a: "We work with popular tools such as Mailchimp and similar platforms. We can use yours too." },
      { q: "Can you build my list?", a: "Yes. We add sign-up forms and offers that grow your list the right way." },
      { q: "How often should I send emails?", a: "Usually once or twice a month for newsletters, plus automations. We tailor it to your audience." },
      { q: "Will my emails go to spam?", a: "We set up proper authentication (SPF, DKIM, DMARC), clean your list and follow good sending habits. No one can promise 100% inbox delivery, but this gives you the best chance." },
      { q: "Do I need a big list to start?", a: "No. A small, interested list works better than a big cold one. We help you grow it with sign-up forms and useful offers." },
    ],
  },
  "content-writing": {
    seoTitle: "Content Writing & Copywriting Services",
    seoDescription: "SEO content writing and copywriting for websites, blogs and ads. Clear, original words in your brand voice that help you rank and convince visitors to act.",
    timeline: "Most pages and blog posts in 3 to 7 days after the outline is approved",
    whoFor: [
      "Businesses with a new website and no text",
      "Blogs that need regular, useful posts",
      "Founders who find writing slow or hard",
      "Brands that want one consistent voice everywhere",
    ],
    sections: [
      { title: "Words do the selling", paras: [
        "Visitors read before they buy. If your pages are vague, full of buzzwords or hard to follow, people leave. Clear writing explains what you do, who it is for and why you are a good choice, in the time it takes to scroll.",
      ] },
      { title: "Writing for people and for search", paras: [
        "We research what your customers search for and what they really want to know. Then we write in simple, direct language and structure it with clear headings, so it is easy to read and easy for Google to understand.",
        "You approve the outline first, so there are no surprises. We write, edit and proofread each piece, then adjust it after your feedback.",
      ] },
    ],
    intro: [
      "Good content explains what you do in simple words and gives people a reason to act. We write in your voice and keep every line clear and useful.",
      "Our writing is also built for search, so the right people can find it.",
    ],
    benefits: [
      { title: "Clear messaging", text: "Visitors understand what you offer in seconds." },
      { title: "Search-friendly", text: "Keywords and structure that help you rank." },
      { title: "Your voice", text: "Copy that sounds like your brand, not a template." },
    ],
    steps: [
      { title: "Brief", text: "We learn your audience, tone and goals." },
      { title: "Outline", text: "You approve the structure before we write." },
      { title: "Write & edit", text: "We draft, edit and proofread every piece." },
      { title: "Revise & deliver", text: "We apply your feedback and hand over final files." },
    ],
    faqs: [
      { q: "Do you write original content?", a: "Yes. Everything is written for you and checked for originality." },
      { q: "How many revisions are included?", a: "We include revisions until the copy matches your brief. Ask us for details." },
      { q: "Can you write in Hindi or other languages?", a: "Please contact us with your language and we will confirm what we can offer." },
      { q: "Do you write blogs regularly?", a: "Yes. We can plan a monthly blog calendar based on keywords and the questions your customers ask." },
      { q: "Will it sound like us?", a: "Yes. We ask for examples of your tone and past writing, and match it." },
    ],
  },
  "ecommerce-development": {
    seoTitle: "E-commerce Website Development",
    seoDescription: "E-commerce website development with secure checkout, payment gateways and easy product management. Fast online stores built to sell on mobile and desktop.",
    timeline: "4 to 8 weeks depending on products and integrations",
    whoFor: [
      "Shops moving from Instagram or WhatsApp orders to a proper store",
      "Brands that want to sell online in India or abroad",
      "Existing stores with slow pages or abandoned carts",
      "Wholesalers and small manufacturers going digital",
    ],
    sections: [
      { title: "A store that makes buying easy", paras: [
        "Online shoppers are impatient. If search is poor, photos load slowly or checkout asks for too much, they close the tab. Every extra step costs you sales.",
      ] },
      { title: "What goes into our stores", paras: [
        "We design clean category and product pages, a short cart and a simple checkout. We connect payment gateways, shipping and tax details, and test the full order flow on real devices before launch.",
        "Product pages get proper titles, descriptions and structured data so they can show up well in Google. And you can add products, change prices and manage stock yourself.",
      ] },
    ],
    intro: [
      "An online store has to make buying easy. We design clear product pages, a simple cart and a safe checkout, so shoppers can find what they want and pay without friction.",
      "We also set up product and inventory management so you can add items, update prices and track orders on your own.",
    ],
    benefits: [
      { title: "Built to convert", text: "Clean product pages and a short checkout path." },
      { title: "Secure payments", text: "Trusted payment gateways set up and tested." },
      { title: "Easy to manage", text: "Add products, stock and offers without a developer." },
    ],
    steps: [
      { title: "Plan the store", text: "We agree on catalogue, categories and payment needs." },
      { title: "Design", text: "You review store pages on desktop and mobile." },
      { title: "Build & integrate", text: "Cart, checkout, payments and shipping are connected and tested." },
      { title: "Launch & grow", text: "We go live, train your team and improve with sales data." },
    ],
    faqs: [
      { q: "Which payment gateways can you add?", a: "We integrate popular gateways. Tell us what you prefer and we will confirm it is supported." },
      { q: "Can I manage products myself?", a: "Yes. You can add products, change prices and update stock from a simple dashboard." },
      { q: "Will the store be mobile friendly?", a: "Yes. Every store is built mobile-first and tested on real devices." },
      { q: "Can you move my existing store?", a: "Yes. We can migrate products, customers and orders, and we take care of old URLs so you keep your search rankings." },
      { q: "Can I accept UPI, cards and cash on delivery?", a: "Payment options depend on the gateway. Tell us what your customers use and we will confirm it before we start." },
    ],
  },
  "figma-uiux-design": {
    seoTitle: "Figma UI/UX Design Services",
    seoDescription: "UI/UX design in Figma for websites, mobile apps and dashboards. User research, wireframes, clickable prototypes and developer-ready design files.",
    timeline: "2 to 5 weeks depending on the number of screens",
    whoFor: [
      "Startups building the first version of an app",
      "Teams that have developers but no designer",
      "Businesses with a confusing or outdated interface",
      "Founders who want to test an idea before paying for development",
    ],
    sections: [
      { title: "Design before development", paras: [
        "Fixing a design in Figma costs a fraction of fixing it after it is coded. A prototype lets you, your team and a few real users click through the idea and find problems early.",
      ] },
      { title: "Our design process", paras: [
        "We begin by understanding your users and what they are trying to do. We sketch flows and wireframes first, so the structure is right before we think about colours. Then we design the screens, build a reusable component library and prepare a clickable prototype.",
        "At handoff your developers get organised Figma files with spacing, styles and states, so what gets built matches what you approved.",
      ] },
    ],
    intro: [
      "Good design starts with understanding the people who will use your product. We map their journey, sketch wireframes and turn them into clear, consistent screens in Figma.",
      "You can click through an interactive prototype before any code is written, which saves time and cost later.",
    ],
    benefits: [
      { title: "Clear user flows", text: "People find what they need without thinking." },
      { title: "Test before building", text: "Interactive prototypes let you check ideas early." },
      { title: "Consistent system", text: "Reusable components keep every screen on-brand." },
    ],
    steps: [
      { title: "Research", text: "We study your users, goals and competitors." },
      { title: "Wireframes", text: "We sketch structure and flow before visuals." },
      { title: "Visual design", text: "We create polished screens and a component library." },
      { title: "Prototype & handoff", text: "You get a clickable prototype and developer-ready Figma files." },
    ],
    faqs: [
      { q: "Do I get the Figma files?", a: "Yes. You receive the Figma files so your team can use and edit them." },
      { q: "Can you design mobile apps too?", a: "Yes. We design websites, mobile apps and dashboards." },
      { q: "Can you work with my developers?", a: "Yes. We prepare files and specs that are easy for developers to follow." },
      { q: "How many screens are included?", a: "It depends on the project. We scope the screens together and give you a clear estimate before we start." },
      { q: "Do you do user testing?", a: "We can run simple usability tests on the prototype with a few real users. Ask us if you want it included." },
    ],
  },
  "wordpress-design-development": {
    seoTitle: "WordPress Website Design & Development",
    seoDescription: "Custom WordPress website design and development: fast, secure, SEO-ready sites you can edit yourself. Themes, plugins, WooCommerce, migration and support.",
    timeline: "3 to 6 weeks for most business websites",
    whoFor: [
      "Businesses that want to edit their own pages, blogs and images",
      "Companies with an old WordPress site that is slow, outdated or hacked",
      "Bloggers and publishers who post new content regularly",
      "Shops that want to start selling online with WooCommerce",
    ],
    sections: [
      { title: "Why many businesses choose WordPress", paras: [
        "WordPress lets you manage your own website without calling a developer for every small change. You can edit pages, add blog posts, change images and update offers yourself, from a simple dashboard.",
        "It also grows with you. You can start with a simple five-page website today and add a blog, a booking form or an online store later, without rebuilding everything.",
      ] },
      { title: "How we build WordPress websites", paras: [
        "We do not just install a ready-made theme and change the colours. We design the pages around your business first, then build a clean, lightweight theme so the site loads fast on phones and slow networks.",
        "We keep plugins to a minimum, because every extra plugin can slow the site down or open a security gap. We also set up security, backups and basic SEO (page titles, headings, clean URLs and a sitemap) before launch, and show you how to manage the site yourself.",
      ] },
    ],
    intro: [
      "A WordPress website gives you full control over your content, with a design made for your brand and your customers.",
      "We design it, build it, make it fast and secure, and teach you how to use it. If you already have a WordPress site that is slow or messy, we can clean it up instead of starting over.",
    ],
    benefits: [
      { title: "Edit it yourself", text: "Change text, images and blog posts without a developer." },
      { title: "Fast and secure", text: "Lean code, few plugins, regular backups and security basics." },
      { title: "Grows with you", text: "Add a blog, forms or an online store whenever you need." },
    ],
    steps: [
      { title: "Plan & design", text: "We agree on pages and goals, and you approve the design." },
      { title: "Build the theme", text: "We develop a custom, lightweight theme for desktop and mobile." },
      { title: "Set up & secure", text: "Plugins, forms, SEO basics, backups and security are configured and tested." },
      { title: "Launch & train", text: "We go live and show you how to manage your site." },
    ],
    faqs: [
      { q: "Is WordPress good for SEO?", a: "Yes, when it is built well. We set up clean URLs, proper headings, fast loading and a sitemap, so search engines can understand your site." },
      { q: "Will you use a ready-made theme or build a custom one?", a: "We build a custom design around your brand. We can use a lightweight base to save time, but it is not a copy of a template." },
      { q: "Can you fix or speed up my existing WordPress site?", a: "Yes. We review your site first, then fix slow pages, remove unneeded plugins, clean up errors and tighten security." },
      { q: "Can you move my website to WordPress?", a: "Yes. We can migrate your content and pages, and we set up redirects so you do not lose your search rankings." },
      { q: "Do you provide maintenance after launch?", a: "We can help with updates, backups and fixes after launch. Ask us for the current support options." },
    ],
  },
  "geo-ai-search": {
    seoTitle: "GEO & AI Search Optimization",
    seoDescription: "Be found and cited in AI search. GEO services for AI answers and Google: content structure, structured data and consistent brand signals.",
    timeline: "Review in 1 to 2 weeks, improvements build over 2 to 4 months",
    whoFor: [
      "Brands that want to be named when people ask AI tools for recommendations",
      "Businesses with solid SEO who want to stay ahead",
      "Experts and agencies that publish useful guides",
      "Companies whose details differ from site to site",
    ],
    sections: [
      { title: "A new way people find answers", paras: [
        "People now ask AI tools questions that used to go to Google: who is a good web agency, how much does a website cost, what should I look for. These tools pull from content they can understand and trust. If your site is vague, or your details are inconsistent, you are easy to skip.",
      ] },
      { title: "What we actually do", paras: [
        "We check how your brand appears today and where information is missing or conflicting. Then we improve how pages are structured, with clear headings, direct answers and structured data, and we make your name, services and contact details consistent across the web.",
        "We cannot control what an AI says. What we can do is make your business easier to understand and easier to trust, which helps normal SEO too.",
      ] },
    ],
    intro: [
      "More people now get answers from AI-powered search tools. GEO helps your business be understood, trusted and mentioned when they ask about your field.",
      "We improve how your content is structured, keep your brand details consistent everywhere, and add structured data so machines can read your site clearly.",
    ],
    benefits: [
      { title: "Future-ready visibility", text: "Prepare for both classic and AI-powered search." },
      { title: "Clear brand signals", text: "Consistent information builds trust with search systems." },
      { title: "Better content", text: "Pages that answer real questions directly." },
    ],
    steps: [
      { title: "Visibility review", text: "We check how your brand appears in search today." },
      { title: "Structure & data", text: "We improve content structure and structured data." },
      { title: "Content upgrades", text: "We strengthen pages that answer your customers' questions." },
      { title: "Monitor", text: "We track visibility and adjust over time." },
    ],
    faqs: [
      { q: "Is GEO different from SEO?", a: "They overlap. SEO focuses on search rankings, GEO also focuses on how AI tools understand and present your brand." },
      { q: "Can you guarantee AI mentions?", a: "No. No one controls AI answers. We improve the signals that make your business easier to understand and cite." },
      { q: "Do I need SEO first?", a: "A solid SEO base helps. We review your site and tell you where to start." },
      { q: "What does GEO stand for?", a: "Generative Engine Optimization: making your content easy for AI search tools to understand and cite, alongside normal search." },
      { q: "How do you measure results?", a: "We track brand mentions, how you appear for sample questions in AI tools, and organic traffic over time. AI answers change often, so we look at trends, not single results." },
    ],
  },
  "performance-marketing": {
    seoTitle: "Performance Marketing Services",
    seoDescription: "Performance marketing across Google, Meta and landing pages, with conversion tracking and clear ROI reporting. Know your cost per lead and scale what works.",
    timeline: "Set up in 1 to 2 weeks, first insights after 3 to 4 weeks of data",
    whoFor: [
      "Businesses that want to know exactly what each lead costs",
      "Brands scaling ad spend that need better tracking",
      "Companies with good traffic but low conversion",
      "Online stores focused on return on ad spend",
    ],
    sections: [
      { title: "From spend to results", paras: [
        "Performance marketing connects every ad rupee to an outcome: a lead, a call or a sale. That means tracking properly, testing honestly and cutting what does not work.",
      ] },
      { title: "How we work", paras: [
        "We start with your goal and the numbers that define success, then set up conversion tracking so we can see them. Next we build audiences, ads and landing pages and launch with a controlled budget to learn what works.",
        "Once we see winners, we scale them step by step and keep testing new ideas. Regular reports show spend, results, cost per result and what we plan next.",
      ] },
    ],
    intro: [
      "Performance marketing ties every rupee of ad spend to a result you can measure, such as a lead, a call or a sale.",
      "We plan campaigns around your audience, set up conversion tracking and improve landing pages, then review the numbers with you regularly.",
    ],
    benefits: [
      { title: "Measured results", text: "Know the cost of every lead and sale." },
      { title: "Smarter spend", text: "Budget moves toward what performs best." },
      { title: "Better landing pages", text: "More visitors turn into enquiries." },
    ],
    steps: [
      { title: "Goals & tracking", text: "We define success and set up conversion tracking." },
      { title: "Campaign build", text: "Audiences, ads and landing pages are prepared." },
      { title: "Launch & test", text: "We test creatives and audiences with a controlled budget." },
      { title: "Scale & report", text: "We scale winners and report ROI clearly." },
    ],
    faqs: [
      { q: "How is this different from PPC?", a: "PPC is one channel. Performance marketing looks at the whole funnel, including tracking and landing pages." },
      { q: "What reports will I get?", a: "Regular reports on spend, leads or sales, cost per result and next steps." },
      { q: "Can I set my own budget?", a: "Yes. You control the budget and we advise how to use it." },
      { q: "How long before I see results?", a: "You can see early signals in a couple of weeks. Reliable patterns usually need 3 to 4 weeks of data." },
      { q: "Do you work with small budgets?", a: "Yes. We suggest a realistic plan and tell you honestly if a budget is too small to learn from." },
    ],
  },
};

// lib/legal.ts - content of the Terms, Privacy and Cookie pages.
// Edit the text here; the pages render it automatically.
import { SITE } from "./site";

export type LegalBlock = string | { list: string[] };
export type LegalSection = { title: string; body: LegalBlock[] };
export type LegalDoc = {
  slug: "terms" | "privacy" | "cookies" | "disclaimer";
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const UPDATED = "7 October 2026";
const contactBlock = `Email: ${SITE.email} | Phone: ${SITE.phone} | Address: ${SITE.address}`;

export const TERMS: LegalDoc = {
  slug: "terms",
  title: "Terms of Use",
  description: `The terms that apply when you use the ${SITE.name} website and our services.`,
  updated: UPDATED,
  intro: `Welcome to ${SITE.name}. By visiting ${SITE.url} or using our services, you agree to these Terms of Use. Please read them carefully. If you do not agree, please do not use the website.`,
  sections: [
    {
      title: "1. About us",
      body: [
        `${SITE.name} ("we", "us", "our") is a digital agency based in ${SITE.address}. We provide website design and development, SEO, paid advertising, social media and email marketing, and content services.`,
      ],
    },
    {
      title: "2. Use of the website",
      body: [
        "You may use this website for lawful purposes only. You agree not to:",
        {
          list: [
            "use the site in a way that breaks any applicable law or regulation;",
            "attempt to gain unauthorised access to the site, its servers or the admin area;",
            "send spam, malware or harmful code through the site or the contact form;",
            "copy, scrape or resell our content without written permission;",
            "impersonate any person or misrepresent your relationship with us.",
          ],
        },
      ],
    },
    {
      title: "3. Our services",
      body: [
        "Information on this website is a general description of our services. The scope, timeline, price and deliverables of any project are agreed in a written proposal, quotation or contract between you and us. If that document conflicts with these Terms, the signed proposal or contract applies to that project.",
      ],
    },
    {
      title: "4. Quotes, payments and refunds",
      body: [
        {
          list: [
            "Quotes are valid for 15 days unless stated otherwise.",
            "Work usually starts after the agreed advance payment is received.",
            "Invoices must be paid within the period written on the invoice. Late payment may pause the work.",
            "Fees for work already completed, and third-party costs already paid on your behalf (domains, hosting, licences, ad spend), are non-refundable.",
          ],
        },
      ],
    },
    {
      title: "5. Intellectual property",
      body: [
        `All content on this website, including text, logos, graphics and code, belongs to ${SITE.name} or its licensors and is protected by copyright and other laws.`,
        "For client projects, ownership of the final deliverables passes to you after full payment. We may keep the right to reuse general know-how, and to show non-confidential work in our portfolio unless you ask us in writing not to.",
      ],
    },
    {
      title: "6. Your content and responsibilities",
      body: [
        "You are responsible for the text, images, logos and other material you give us, and you confirm that you have the right to use them. You are also responsible for the legal compliance of your own business, products and claims.",
      ],
    },
    {
      title: "7. No guarantee of results",
      body: [
        "We work hard to deliver good results, but outcomes such as search rankings, traffic, leads or sales depend on many factors outside our control, including search engine and platform changes. We do not guarantee any specific ranking or revenue.",
      ],
    },
    {
      title: "8. Third-party links and services",
      body: [
        "This website may link to third-party websites and tools (for example WhatsApp, social media or client websites). We do not control them and are not responsible for their content or policies.",
      ],
    },
    {
      title: "9. Limitation of liability",
      body: [
        `To the fullest extent permitted by law, ${SITE.name} is not liable for any indirect, incidental or consequential loss, loss of profit or loss of data arising from the use of this website or our services. Our total liability for any claim is limited to the amount you paid us for the service that caused the claim.`,
      ],
    },
    {
      title: "10. Changes to these terms",
      body: [
        "We may update these Terms from time to time. The updated version will be published on this page with a new date. Continued use of the website means you accept the changes.",
      ],
    },
    {
      title: "11. Governing law",
      body: [
        "These Terms are governed by the laws of India. Courts at Lucknow, Uttar Pradesh will have jurisdiction over any dispute, unless the law requires otherwise.",
      ],
    },
    {
      title: "12. Contact us",
      body: ["Questions about these Terms? Contact us:", contactBlock],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your personal information.`,
  updated: UPDATED,
  intro: `Your privacy matters to us. This policy explains what personal information ${SITE.name} collects through ${SITE.url}, why we collect it, and the choices you have. We follow the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 (India).`,
  sections: [
    {
      title: "1. Information we collect",
      body: [
        "We collect only what we need:",
        {
          list: [
            "Information you give us: your name, email address, phone number, agency or website, the service you are interested in, your budget range and your message, when you fill in the contact form or contact us on WhatsApp, phone or email.",
            "Technical information: basic data your browser sends automatically, such as IP address, browser type, device type and pages requested. This is kept in our server logs for security and troubleshooting.",
            "Admin login data: for our own team only, a login token is stored in the browser to keep the admin area signed in.",
          ],
        },
      ],
    },
    {
      title: "2. How we use your information",
      body: [
        {
          list: [
            "to reply to your enquiry and prepare a proposal or quotation;",
            "to provide, manage and improve our services and this website;",
            "to send project updates and, if you agree, news or offers (you can unsubscribe at any time);",
            "to protect the website against spam, fraud and abuse;",
            "to meet legal and accounting obligations.",
          ],
        },
      ],
    },
    {
      title: "3. Legal basis and consent",
      body: [
        "We process your personal data with your consent (for example when you submit the contact form), to carry out a contract with you, or where the law requires or permits it. You may withdraw consent at any time by writing to us.",
      ],
    },
    {
      title: "4. Who we share it with",
      body: [
        "We do not sell your personal information. We share it only with:",
        {
          list: [
            "service providers who help us run the business, such as hosting, email delivery and communication tools, who may process data only on our instructions;",
            "professional advisers, courts or government authorities when we are legally required to do so.",
          ],
        },
      ],
    },
    {
      title: "5. Data retention",
      body: [
        "We keep enquiry details only for as long as needed to respond and to follow up on a possible project, and client records for as long as required for the project, accounting and legal reasons. After that we delete or anonymise the data.",
      ],
    },
    {
      title: "6. Security",
      body: [
        "We use reasonable technical and organisational measures such as HTTPS, access control and regular updates to protect your data. No online system is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      title: "7. Your rights",
      body: [
        "Subject to applicable law, you may ask us to:",
        {
          list: [
            "tell you what personal data we hold about you;",
            "correct or update inaccurate data;",
            "delete your data;",
            "stop using your data for marketing.",
          ],
        },
        "To use these rights, email us. We will respond within a reasonable time.",
      ],
    },
    {
      title: "8. Children",
      body: [
        "Our website and services are meant for businesses and adults. We do not knowingly collect personal data from children under 18.",
      ],
    },
    {
      title: "9. Cookies",
      body: [
        "Please see our Cookie Policy for details about cookies and similar technologies.",
      ],
    },
    {
      title: "10. Changes to this policy",
      body: [
        "We may update this policy from time to time. The latest version is always on this page, with the date it was last updated.",
      ],
    },
    {
      title: "11. Contact us",
      body: ["For any privacy question or request, contact us:", contactBlock],
    },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  description: `How ${SITE.name} uses cookies and similar technologies on this website.`,
  updated: UPDATED,
  intro: `This page explains what cookies are and how ${SITE.name} uses them and similar technologies on ${SITE.url}.`,
  sections: [
    {
      title: "1. What are cookies?",
      body: [
        "Cookies are small text files that a website stores on your device. Similar technologies, such as the browser's local storage, work in a comparable way. They help a website remember information about your visit.",
      ],
    },
    {
      title: "2. What we use",
      body: [
        "At the moment our public website does not use advertising or tracking cookies, and we do not run third-party analytics on it. We only use:",
        {
          list: [
            "Strictly necessary storage: when our team signs in to the admin area, a login token is stored in the browser's local storage so the session stays active. It is not used for tracking and is not shared.",
            "Technical data: our web server keeps standard logs (such as IP address and pages requested) for security and to keep the website working.",
          ],
        },
      ],
    },
    {
      title: "3. Third-party content",
      body: [
        "If you click a link to a third-party service, for example WhatsApp or one of our social media profiles, that service may set its own cookies. We do not control them. Please read the cookie policy of that service.",
      ],
    },
    {
      title: "4. If we add analytics or advertising later",
      body: [
        "If we start using cookies for analytics, advertising or marketing, we will update this page and ask for your consent before they are set, as required by law.",
      ],
    },
    {
      title: "5. How to control cookies",
      body: [
        "You can block or delete cookies and site data in your browser settings at any time. Blocking strictly necessary storage will not affect the public pages of this website.",
        {
          list: [
            "Chrome: Settings > Privacy and security > Cookies and other site data",
            "Firefox: Settings > Privacy & Security > Cookies and Site Data",
            "Safari: Settings > Privacy > Manage Website Data",
            "Edge: Settings > Cookies and site permissions",
          ],
        },
      ],
    },
    {
      title: "6. Changes to this policy",
      body: [
        "We may update this Cookie Policy when our use of cookies changes. The date at the top shows when it was last updated.",
      ],
    },
    {
      title: "7. Contact us",
      body: ["Questions about cookies? Contact us:", contactBlock],
    },
  ],
};

export const DISCLAIMER: LegalDoc = {
  slug: "disclaimer",
  title: "Disclaimer",
  description: `Important information about the content, advice and results described on the ${SITE.name} website.`,
  updated: UPDATED,
  intro: `The information on ${SITE.url} is provided by ${SITE.name} for general information only. Please read this Disclaimer together with our Terms of Use and Privacy Policy.`,
  sections: [
    {
      title: "1. General information only",
      body: [
        "The pages, blog posts, guides and examples on this website explain our services and share general ideas about web design, development, SEO and digital marketing. They are not a promise, a quotation or an offer. Anything about a specific project, such as scope, price, timeline or deliverables, is agreed only in a written proposal or contract between you and us.",
      ],
    },
    {
      title: "2. No guaranteed results",
      body: [
        "Website traffic, search rankings, leads, sales and advertising results depend on many things we do not control, such as search engine and social media algorithms, competition, your market, your budget and how quickly changes are approved. We work carefully and honestly, but we cannot guarantee any particular ranking, number of visitors, enquiries or revenue.",
        "Examples, case studies and client results shown on this website describe what happened for those clients. Your results may be different.",
      ],
    },
    {
      title: "3. Not professional advice",
      body: [
        "Content on this website, including our blog, is not legal, financial, tax or investment advice. If you need advice on a legal, financial or regulatory matter (for example data protection, advertising rules or taxes), please speak to a qualified professional.",
      ],
    },
    {
      title: "4. Accuracy of information",
      body: [
        "We try to keep this website correct and up to date, but search engines, platforms and technology change quickly. Some pages may contain mistakes, or information that is no longer current. We do not give any warranty that the content is complete, accurate or suitable for your situation. Please check important details with us before you make a decision.",
      ],
    },
    {
      title: "5. Client reviews and testimonials",
      body: [
        "Reviews and testimonials on this website are opinions shared by our clients. The label on a review (for example Google or Freelancer) shows where the client posted it, and some reviews are shortened for space. They show individual experiences and are not a guarantee that you will have the same experience or result.",
      ],
    },
    {
      title: "6. Locations and service areas",
      body: [
        "Our service area pages describe the countries, states and cities where we can work with clients. A page for a place does not mean we have an office there. We are based in Lucknow, India, and most projects are delivered online. Availability, response times and pricing may differ by location.",
      ],
    },
    {
      title: "7. Third-party links, tools and trademarks",
      body: [
        "This website may link to third-party websites and services, such as social media profiles, review platforms and tools. We do not control them and are not responsible for their content, privacy practices or availability. A link is not an endorsement.",
        "Names, logos and trademarks of other companies (such as Google, Meta, WordPress, Angular and Shopify) belong to their owners. We use them only to say which platforms we work with or where a review came from. It does not mean we are affiliated with or endorsed by those companies.",
      ],
    },
    {
      title: "8. Limitation of liability",
      body: [
        `To the extent allowed by law, ${SITE.name} is not liable for any loss or damage (including loss of profit, data or business) that results from using this website or relying on its content. Nothing in this Disclaimer limits any right or liability that cannot be limited by law.`,
      ],
    },
    {
      title: "9. Changes to this Disclaimer",
      body: [
        "We may update this Disclaimer from time to time. The date at the top shows when it was last changed. By continuing to use the website you accept the current version.",
      ],
    },
    {
      title: "10. Contact us",
      body: ["Questions about this Disclaimer? Contact us:", contactBlock],
    },
  ],
};

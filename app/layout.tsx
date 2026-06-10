import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "boxicons/css/boxicons.min.css";
import "swiper/css";
import "swiper/css/navigation";

import "../public/assets/css/animate.min.css";
import "../public/assets/css/jquery.fancybox.min.css";
import "../public/assets/css/daterangepicker.css";
import "../public/assets/css/style.css";
import "./globals.css";

import BootstrapClient from "../components/BootstrapClient";
import RecaptchaProvider from "../components/RecaptchaProvider";
import SiteLayoutClient from "../components/SiteLayoutClient";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.glancetechy.com"),
  title: {
    default: "GlanceTechy | Web Design, Development & SEO Agency",
    template: "%s | GlanceTechy",
  },
  description:
    "GlanceTechy is a full-service digital agency offering website design, web development, SEO, and Figma UI/UX design for startups and businesses worldwide. Let's build something exceptional.",
  keywords: [
    "web design agency",
    "web development company",
    "SEO services",
    "Figma UI UX design",
    "custom website development",
    "digital agency",
    "responsive web design",
    "ecommerce development",
    "Next.js development",
    "React development",
    "hire web developer",
    "affordable web design",
    "website redesign services",
    "GlanceTechy",
  ],
  authors: [{ name: "GlanceTechy", url: "https://www.glancetechy.com" }],
  creator: "GlanceTechy",
  publisher: "GlanceTechy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.glancetechy.com",
    siteName: "GlanceTechy",
    title: "GlanceTechy | Web Design, Development & SEO Agency",
    description:
      "Full-service digital agency offering website design, web development, SEO, and Figma UI/UX design for startups and businesses worldwide.",
    images: [
      {
        url: "/assets/images/og-image.jpg", // create a 1200x630 branded image
        width: 1200,
        height: 630,
        alt: "GlanceTechy — Web Design & Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlanceTechy | Web Design, Development & SEO Agency",
    description:
      "Full-service digital agency: website design, web development, SEO & Figma UI/UX design for businesses worldwide.",
    images: ["/assets/images/og-image.jpg"],
    creator: "@glancetechy", // update with your handle
  },
  alternates: {
    canonical: "https://www.glancetechy.com",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "GlanceTechy",
              "url": "https://www.glancetechy.com",
              "logo": "https://www.glancetechy.com/assets/images/logo.png",
              "description":
                "GlanceTechy is a full-service digital agency offering website design, web development, SEO, and Figma UI/UX design for businesses worldwide.",
              "areaServed": "Worldwide",
              "serviceType": [
                "Website Design",
                "Web Development",
                "SEO Services",
                "Figma UI/UX Design",
                "E-commerce Development"
              ],
              "sameAs": [
                "https://www.linkedin.com/company/glancetechy",
                "https://twitter.com/glancetechy",
                "https://www.instagram.com/glancetechy"
              ]
            }),
          }}
        />
      </head>
      <body className="tt-magic-cursor min-h-full flex flex-col">
        <BootstrapClient />

        <div id="magic-cursor">
          <div id="ball"></div>
        </div>

        <div id="scroll-percentage">
          <span id="scroll-percentage-value">0%</span>
          <svg
            className="arrow"
            width="22"
            height="25"
            viewBox="0 0 24 23"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0.556131 11.4439L11.8139 0.186067L13.9214 2.29352L13.9422 20.6852L9.70638 20.7061L9.76793 8.22168L3.6064 14.4941L0.556131 11.4439Z" />
            <path d="M23.1276 11.4999L16.0288 4.40105L15.9991 10.4203L20.1031 14.5243L23.1276 11.4999Z" />
          </svg>
        </div>

        <RecaptchaProvider>
        <SiteLayoutClient>
          {children}
        </SiteLayoutClient>
      </RecaptchaProvider>

        <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery-ui.js" strategy="afterInteractive" />
        <Script src="/assets/js/moment.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/daterangepicker.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/circletype.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.marquee.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.fancybox.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HideOnAdmin from "@/components/layout/HideOnAdmin";
import RevealObserver from "@/components/ui/RevealObserver";
import PageLoader from "@/components/layout/PageLoader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glancetechy.com"),

  title: {
    default:
      "GlanceTechy | Website Design & Development Agency",
    template: "%s | GlanceTechy",
  },

  description:
    "GlanceTechy helps businesses build a strong online presence with custom website design, web development, UI/UX design, SEO and digital marketing services.",


  keywords: [
    "GlanceTechy",
    "website design agency",
    "website development agency",
    "custom web development services",
    "UI/UX design services",
    "SEO services for businesses",
    "digital marketing services",
    "WordPress website development",
    "responsive website design",
    "website design agency in Lucknow",
    "web development services in India",
    "digital marketing services",
  ],
  authors: [
    {
      name: "GlanceTechy",
      url: "https://glancetechy.com",
    },
  ],

  creator: "GlanceTechy",
  publisher: "GlanceTechy",


  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GlanceTechy",

    title:
      "GlanceTechy | Websites Designed for Business Growth",

    description:
      "From website design and development to SEO and digital marketing, GlanceTechy helps businesses create better online experiences and reach more customers.",

    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "GlanceTechy - Website Design, Development & Digital Marketing",
      },
    ],
  },
  

  twitter: {
    card: "summary_large_image",

    title:
      "GlanceTechy | Web Design, Development & SEO",

    description:
      "Looking for a better online presence? GlanceTechy offers website design, custom development, UI/UX and digital marketing solutions for businesses.",

    images: ["/og-image.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.webp",
  },

  verification: {
    google: "wxcvXzgkG5dcNie0K9QRgDQdkz7bu40-lbZSIqYZQmg",
  },

  other: {
    "google-adsense-account": "ca-pub-2134508653978543",
  },

  category: "technology",

 
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {/* Enables the scroll-reveal styles only when JavaScript is available */}
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <HideOnAdmin>
          <PageLoader />
          <Header />
        </HideOnAdmin>

        {children}
        <RevealObserver />
          
        <HideOnAdmin>
          <Footer />
          <WhatsAppButton />
        </HideOnAdmin>
        
      <GoogleAnalytics gaId="G-ZPBRSVG9QK" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://glancetechy.com/#organization",
              name: "GlanceTechy",
              url: "https://glancetechy.com",
              logo: "https://glancetechy.com/assets/all_logo/logo-on-light.svg",
              description:
                "GlanceTechy is a digital agency in Lucknow, India offering website design and development, SEO, PPC, social media and digital marketing services.",
              email: "glancetechy@gmail.com",
              telephone: "+91 91988 59019",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lucknow",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/in/glancetechy/",
                "https://www.instagram.com/glancetechy/",
                "https://www.facebook.com/GlanceTechy/",
                "https://x.com/GlanceTechy/"
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://glancetechy.com/#website",
              url: "https://glancetechy.com",
              name: "GlanceTechy",
              publisher: { "@id": "https://glancetechy.com/#organization" },
            },
          ],
        }),
        }}
      />
    </body>
    </html>
  );
}
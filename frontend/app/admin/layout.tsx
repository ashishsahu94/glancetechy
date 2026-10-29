import type { Metadata } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";

// English text in the admin panel
const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  display: "swap",
});

export const metadata: Metadata = { title: "Admin Panel", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={hindi.className}>{children}</div>;
}
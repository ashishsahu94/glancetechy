"use client";
// components/HideOnAdmin.tsx
// Navbar, Footer, WhatsAppButton, PageLoader ko isme wrap karo, taaki /admin pe na dikhein.
import { usePathname } from "next/navigation";

export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}

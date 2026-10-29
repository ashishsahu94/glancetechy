import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { COOKIES } from "@/lib/legal";

export const metadata: Metadata = {
  title: COOKIES.title,
  description: COOKIES.description,
  alternates: { canonical: "/cookies/" },
};

export default function Page() {
  return <LegalPage doc={COOKIES} />;
}

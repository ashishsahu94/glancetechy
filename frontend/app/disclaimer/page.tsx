import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { DISCLAIMER } from "@/lib/legal";

export const metadata: Metadata = {
  title: DISCLAIMER.title,
  description: DISCLAIMER.description,
  alternates: { canonical: "/disclaimer/" },
};

export default function Page() {
  return <LegalPage doc={DISCLAIMER} />;
}

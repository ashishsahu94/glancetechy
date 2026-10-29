import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/lib/legal";

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.description,
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return <LegalPage doc={PRIVACY} />;
}

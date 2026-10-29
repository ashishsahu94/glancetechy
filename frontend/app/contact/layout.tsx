import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Start Your Project",
  description:
    "Have a question or a project in mind? Fill out the short form below and we will get back to you within one business day.",
  alternates: { canonical: "/contact/" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
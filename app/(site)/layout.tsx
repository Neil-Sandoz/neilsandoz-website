import type { Metadata } from "next";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { JsonLd } from "../components/JsonLd";

const SITE_URL = "https://neilsandoz.com";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Neil Sandoz — Film Editor",
  url: SITE_URL,
  description:
    "Portfolio of Neil Sandoz, a film editor and storyteller based in Austin, Texas.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/work?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd schema={websiteSchema} />
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}

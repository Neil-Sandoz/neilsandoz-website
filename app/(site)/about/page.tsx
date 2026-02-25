import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ScrollReveal } from "../../components/ScrollReveal";
import { ExternalLinkIcon } from "../../components/icons";
import { getAboutContent, getSiteSettings } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { ContactForm } from "../../components/ContactForm";
import { JsonLd } from "../../components/JsonLd";

export const metadata: Metadata = {
  title: "About Neil Sandoz — Film Editor, Director & Creative Partner",
  description:
    "Neil Sandoz is a film editor and storyteller based in Austin, Texas. 15+ years crafting documentary, commercial, and nonprofit films across the globe. Available for freelance and full-time work.",
  openGraph: {
    title: "About Neil Sandoz — Film Editor, Director & Creative Partner",
    description:
      "Film editor and storyteller based in Austin, Texas. 15+ years crafting documentary, commercial, and nonprofit films across the globe.",
    url: "https://neilsandoz.com/about",
  },
};

// Static fallbacks
const STATIC_CONTACT = {
  email: "hello@neilsandoz.com",
  phone: "512-801-1314",
  location: "Austin, Texas",
  resumeUrl: "/Neil Sandoz_Editor_Resume_2026.pdf",
  forennMusicUrl: "https://forennmusic.com",
};

const STATIC_BIO_PARAGRAPHS = [
  "I'm an editor who loves using creativity to help people communicate what really matters to them. I find energy and joy in partnering with others who are doing meaningful work, the kind of work with a story worth telling, and helping shape that story into something clear, honest, and compelling.",
  "Since 2010, I've been using cameras and computers as my primary tools, working across commercial, documentary, and nonprofit spaces. I bring deep creative instincts paired with the structure of someone who knows how to lead teams, be on teams, manage projects, and constantly deliver work that connects.",
  "For the past nine years, I've lived and worked in Nairobi, Kenya, producing films and leading creative teams across cultures and contexts. I've recently relocated back to my home state of Texas, settling in Austin. Giddy up!",
];

const STATIC_PULL_QUOTE =
  "I believe connection is the thread that runs through every good story.";
const STATIC_PULL_QUOTE_SUB =
  "If you're looking to connect your story to an audience in a meaningful way, I'd love to create something with you.";

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    getAboutContent(),
    getSiteSettings(),
  ]);

  const profilePhotoUrl = about?.profilePhoto
    ? urlForImage(about.profilePhoto)?.width(900).height(984).url() ?? "/ns-profile-photo.png"
    : "/ns-profile-photo.png";

  const contactEmail = settings?.contactEmail ?? STATIC_CONTACT.email;
  const contactPhone = settings?.contactPhone ?? STATIC_CONTACT.phone;
  const contactLocation = settings?.location ?? STATIC_CONTACT.location;
  const forennMusicUrl = settings?.forennMusicUrl ?? STATIC_CONTACT.forennMusicUrl;
  const resumeUrl = STATIC_CONTACT.resumeUrl;

  const heading = about?.heading ?? "Hey, I'm Neil.";
  const pullQuote = about?.pullQuote ?? STATIC_PULL_QUOTE;
  const pullQuoteSubtext = about?.pullQuoteSubtext ?? STATIC_PULL_QUOTE_SUB;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Neil Sandoz",
    jobTitle: "Film Editor",
    url: "https://neilsandoz.com",
    email: "mailto:hello@neilsandoz.com",
    telephone: "+15128011314",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Austin",
      addressRegion: "TX",
      addressCountry: "US",
    },
    knowsAbout: [
      "Film Editing",
      "Documentary Filmmaking",
      "Commercial Video Production",
      "Nonprofit Storytelling",
      "Motion Design",
      "Color Grading",
      "Sound Design",
    ],
    sameAs: ["https://forennmusic.com"],
  };

  return (
    <>
      <JsonLd schema={personSchema} />
    <div className="px-6 pb-24 pt-[94px] md:px-[50px]">
      <ScrollReveal>
        <div className="grid grid-cols-1 gap-16 py-12 md:grid-cols-2 md:gap-[64px]">
          {/* Left column — photo + contact */}
          <div className="reveal flex flex-col gap-10">
            <div className="relative h-[492px] w-full overflow-hidden bg-muted/20">
              <Image
                src={profilePhotoUrl}
                alt={about?.profilePhoto?.alt ?? "Neil Sandoz"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col gap-6">
              <h2
                className="text-[48px] leading-tight tracking-[-0.64px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get in touch.
              </h2>
              <ul className="flex flex-col gap-2 text-lg leading-[30.6px]">
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="underline underline-offset-4 transition-colors hover:opacity-80"
                  >
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:+1${contactPhone.replace(/\D/g, "")}`}
                    className="transition-colors hover:opacity-80"
                  >
                    {contactPhone}
                  </a>
                </li>
                <li>{contactLocation}</li>
                <li>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors hover:opacity-80"
                  >
                    Resume
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={forennMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline underline-offset-4 transition-colors hover:opacity-80"
                  >
                    Forenn Music
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column — bio */}
          <div
            className="reveal flex flex-col gap-6"
            style={{ transitionDelay: "100ms" }}
          >
            <h1
              className="text-[56px] leading-[1.2] tracking-[-1.626px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {heading}
            </h1>
            <div className="flex flex-col gap-6 text-lg leading-[30.6px]">
              {about?.bioBlocks ? (
                <PortableText
                  value={about.bioBlocks}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                    },
                    marks: {
                      link: ({ children, value }) => (
                        <a
                          href={value?.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 transition-colors hover:opacity-80"
                        >
                          {children}
                        </a>
                      ),
                    },
                  }}
                />
              ) : (
                <>
                  {STATIC_BIO_PARAGRAPHS.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <p>
                    Life is anchored by my sweet wife and our wild little boys. I
                    also make music with close friends through{" "}
                    <a
                      href={forennMusicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 transition-colors hover:opacity-80"
                    >
                      Forenn
                    </a>
                    , and I love basketball, making things with my hands, and being
                    outside.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Pull quote */}
      <ScrollReveal>
        <section className="reveal border-t border-border py-20">
          <blockquote className="mx-auto max-w-[848px] text-center">
            <p
              className="text-[36px] leading-[1.2] tracking-[-1.626px] sm:text-[48px] md:text-[56px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {pullQuote}
            </p>
            <p className="mt-6 text-xl">{pullQuoteSubtext}</p>
          </blockquote>
        </section>
      </ScrollReveal>

      {/* Contact form */}
      <ScrollReveal>
        <section id="contact" className="reveal scroll-mt-24 pt-8">
          <h2
            className="mb-8 text-[48px] tracking-[-0.64px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Send a message.
          </h2>
          <ContactForm />
        </section>
      </ScrollReveal>
    </div>
    </>
  );
}

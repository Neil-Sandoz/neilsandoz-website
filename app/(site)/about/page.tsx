import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ScrollReveal } from "../../components/ScrollReveal";
import { ExternalLinkIcon } from "../../components/icons";
import { getAboutContent, getSiteSettings } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { JsonLd } from "../../components/JsonLd";

export const dynamic = "force-dynamic";

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

const STATIC_CONTACT = {
  email: "hello@neilsandoz.com",
  phone: "512-801-1314",
  location: "Austin, Texas",
  resumeUrl: "/Neil Sandoz_Editor_Resume_2026.pdf",
  forennMusicUrl: "https://forennmusic.com",
};

const STATIC_BIO_PARAGRAPHS = [
  "I'm an editor who loves using creativity to help people communicate what really matters to them. I find energy and joy in partnering with others who are doing meaningful work, the kind of work with a story worth telling, and helping shape that story into something clear, honest, and compelling.",
  "Since 2010, I've been telling stories and working across commercial, documentary, and nonprofit spaces. I bring deep creative instincts paired with the structure of someone who knows how to lead teams, be on teams, manage projects, and constantly deliver work that connects.",
  "For the past nine years, I've lived and worked in Nairobi, Kenya, producing films and leading creative teams across cultures and contexts. I've recently relocated back to my home state of Texas, settling in Austin. Giddy up!",
];

const FORENN_URL = "https://www.forennmusic.com/";

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
    sameAs: [
      "https://forennmusic.com",
      "https://www.linkedin.com/in/neilsandoz",
      "https://instagram.com/neilsandoz",
    ],
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
              <div id="contact" className="flex flex-col gap-6 scroll-mt-28">
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

                {/* Social links */}
                <div className="flex items-center gap-5 pt-1">
                  <a
                    href="https://www.linkedin.com/in/neilsandoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Neil Sandoz on LinkedIn"
                    className="transition-opacity hover:opacity-60"
                  >
                    <LinkedInIcon className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com/neilsandoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Neil Sandoz on Instagram"
                    className="transition-opacity hover:opacity-60"
                  >
                    <InstagramIcon className="h-6 w-6" />
                  </a>
                </div>
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
                      also make music with close friends. We&rsquo;re called{" "}
                      <a
                        href={FORENN_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 transition-colors hover:opacity-80"
                      >
                        Forenn
                      </a>
                      . I also really like basketball, making things with my hands,
                      and being outside.
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
                I believe{" "}
                <em>
                  <strong>connection</strong>
                </em>{" "}
                is the thread that runs through every{" "}
                <span className="whitespace-nowrap">good story.</span>
              </p>
              <p className="mt-6 text-xl">
                If you&rsquo;re looking to connect your story to an audience in a{" "}
                <em>meaningful</em> way, I&rsquo;d love to create something with you.
              </p>
            </blockquote>
          </section>
        </ScrollReveal>
      </div>
    </>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

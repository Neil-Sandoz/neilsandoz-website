export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ScrollReveal } from "@/app/components/ScrollReveal";
import { ExternalLinkIcon } from "@/app/components/icons";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAdjacentProjects,
} from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { VideoEmbed } from "@/app/components/VideoEmbed";
import { MediaGallery } from "@/app/components/MediaGallery";
import { JsonLd } from "@/app/components/JsonLd";
import { CaseStudyKeyNav } from "@/app/components/CaseStudyKeyNav";
import { PROJECTS } from "@/app/data/projects";
import type {
  SanitySection,
  SanityTextSection,
  SanityVideoEmbed,
  SanityLinkList,
  SanityImageGallery,
} from "@/lib/sanity/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const SITE_URL = "https://neilsandoz.com";

  const project = await getProjectBySlug(slug);
  if (project) {
    const thumbnailUrl = project.thumbnail
      ? urlForImage(project.thumbnail)?.width(1200).height(630).url()
      : null;
    return {
      title: `${project.title} — Neil Sandoz | Film Editor`,
      description: project.shortDescription,
      openGraph: {
        title: `${project.title} — Neil Sandoz | Film Editor`,
        description: project.shortDescription,
        url: `${SITE_URL}/work/${slug}`,
        ...(thumbnailUrl && {
          images: [{ url: thumbnailUrl, width: 1200, height: 630, alt: project.title }],
        }),
      },
      twitter: {
        card: "summary_large_image",
        ...(thumbnailUrl && { images: [thumbnailUrl] }),
      },
    };
  }

  const staticProject = PROJECTS.find((p) => p.slug === slug);
  if (!staticProject) return { title: "Project — Neil Sandoz" };
  return {
    title: `${staticProject.title} — Neil Sandoz | Film Editor`,
    description: staticProject.shortDescription,
    openGraph: {
      title: `${staticProject.title} — Neil Sandoz | Film Editor`,
      description: staticProject.shortDescription,
      url: `${SITE_URL}/work/${slug}`,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;

  // ── Try Sanity ──────────────────────────────────────────────────────────────
  const sanityProject = await getProjectBySlug(slug);

  if (sanityProject) {
    const { prev, next } = await getAdjacentProjects(sanityProject.order);

    const heroImageUrl = sanityProject.heroImage
      ? urlForImage(sanityProject.heroImage)?.width(1600).url() ?? "/ns-profile-photo.png"
      : sanityProject.thumbnail
        ? urlForImage(sanityProject.thumbnail)?.width(1600).url() ?? "/ns-profile-photo.png"
        : "/ns-profile-photo.png";

    const thumbnailUrl = sanityProject.thumbnail
      ? urlForImage(sanityProject.thumbnail)?.width(1200).height(630).url()
      : heroImageUrl;

    const SITE_URL = "https://neilsandoz.com";
    const pageUrl = `${SITE_URL}/work/${sanityProject.slug.current}`;

    const videoSections = (sanityProject.sections ?? []).filter(
      (s): s is SanityVideoEmbed => s._type === "videoEmbed"
    );

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Work", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: sanityProject.title, item: pageUrl },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: sanityProject.title,
        description: sanityProject.shortDescription,
        url: pageUrl,
        creator: {
          "@type": "Person",
          name: "Neil Sandoz",
          url: SITE_URL,
        },
        locationCreated: sanityProject.location,
        ...(thumbnailUrl && { thumbnailUrl }),
      },
      ...videoSections.map((v) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${sanityProject.title} — ${v.label}`,
        description: sanityProject.shortDescription,
        contentUrl: v.url,
        ...(thumbnailUrl && { thumbnailUrl }),
        creator: { "@type": "Person", name: "Neil Sandoz" },
      })),
    ];

    return (
      <>
      <JsonLd schema={schemas} />
      <ScrollReveal className="pb-24 pt-[94px]">
        <div className="reveal relative h-[50vh] w-full overflow-hidden bg-muted/30">
          <Image
            src={heroImageUrl}
            alt={sanityProject.heroImage?.alt ?? sanityProject.thumbnail?.alt ?? sanityProject.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="px-6 pt-12 md:px-[50px]">
          <ProjectHeader project={sanityProject} />

          {/* Render sections in the order Neil arranged them */}
          {sanityProject.sections?.map((section, i) => (
            <SectionRenderer
              key={section._key}
              section={section}
              index={i}
              projectTitle={sanityProject.title}
            />
          ))}

          <PrevNextNav
            prev={prev ? { slug: prev.slug.current, title: prev.title } : null}
            next={next ? { slug: next.slug.current, title: next.title } : null}
          />
        </div>
      </ScrollReveal>
      <CaseStudyKeyNav
        prevSlug={prev?.slug.current ?? null}
        nextSlug={next?.slug.current ?? null}
      />
      </>
    );
  }

  // ── Fall back to static data ─────────────────────────────────────────────
  const staticProject = PROJECTS.find((p) => p.slug === slug);
  if (!staticProject) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const staticPrev = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const staticNext = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <>
    <ScrollReveal className="pb-24 pt-[94px]">
      <div className="reveal relative h-[50vh] w-full overflow-hidden bg-muted/30">
        <Image
          src={staticProject.thumbnail ?? "/ns-profile-photo.png"}
          alt={staticProject.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="px-6 pt-12 md:px-[50px]">
        <div className="reveal flex flex-col gap-3">
          <h1 className="font-black text-[32px] uppercase tracking-[-1.44px] sm:text-[48px]">
            {staticProject.title}
          </h1>
          <div
            className="flex flex-col gap-1 text-sm uppercase tracking-[0.28px] text-accent-red"
            style={{ fontFamily: "var(--font-azeret), monospace" }}
          >
            <span>{staticProject.location}</span>
            <span>{staticProject.role}</span>
          </div>
        </div>

        <div
          className="reveal mt-10 max-w-[848px]"
          style={{ transitionDelay: "100ms" }}
        >
          <p className="whitespace-pre-line text-lg leading-[30.6px]">
            {staticProject.body}
          </p>
        </div>

        {staticProject.videoLinks.map((link, i) => (
          <div
            key={i}
            className="reveal mt-12"
            style={{ transitionDelay: `${120 + i * 40}ms` }}
          >
            <p
              className="mb-3 text-sm uppercase tracking-[0.28px] text-muted"
              style={{ fontFamily: "var(--font-azeret), monospace" }}
            >
              {link.label}
            </p>
            <VideoEmbed url={link.url} title={link.label} />
          </div>
        ))}

        {staticProject.pressLinks.length > 0 && (
          <div className="reveal mt-6 flex flex-wrap gap-4" style={{ transitionDelay: "200ms" }}>
            {staticProject.pressLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-lg underline underline-offset-4 transition-colors hover:opacity-80"
              >
                {link.label}
                <ExternalLinkIcon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}

        <PrevNextNav
          prev={staticPrev ? { slug: staticPrev.slug, title: staticPrev.title } : null}
          next={staticNext ? { slug: staticNext.slug, title: staticNext.title } : null}
        />
      </div>
    </ScrollReveal>
    <CaseStudyKeyNav
      prevSlug={staticPrev?.slug ?? null}
      nextSlug={staticNext?.slug ?? null}
    />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllProjectSlugs();
    if (slugs.length > 0) return slugs.map((slug) => ({ slug }));
  } catch {}
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

// ── Section renderer ──────────────────────────────────────────────────────────

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p>{children}</p>,
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-black tracking-tight">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold tracking-tight">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-2 border-accent-red pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
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
};

function SectionRenderer({
  section,
  index,
  projectTitle,
}: {
  section: SanitySection;
  index: number;
  projectTitle: string;
}) {
  const delay = `${80 + index * 40}ms`;

  switch (section._type) {
    case "textSection":
      return <TextSectionBlock section={section} delay={delay} />;
    case "videoEmbed":
      return <VideoEmbedBlock section={section} delay={delay} />;
    case "linkList":
      return <LinkListBlock section={section} delay={delay} />;
    case "imageGallery":
      return <ImageGalleryBlock section={section} delay={delay} projectTitle={projectTitle} />;
    default:
      return null;
  }
}

function TextSectionBlock({ section, delay }: { section: SanityTextSection; delay: string }) {
  return (
    <div className="reveal mt-10 max-w-[848px]" style={{ transitionDelay: delay }}>
      {section.heading && (
        <h2 className="mb-4 text-sm uppercase tracking-[0.28px] text-muted" style={{ fontFamily: "var(--font-azeret), monospace" }}>
          {section.heading}
        </h2>
      )}
      <div className="flex flex-col gap-6 text-lg leading-[30.6px]">
        <PortableText value={section.content} components={portableTextComponents} />
      </div>
    </div>
  );
}

function VideoEmbedBlock({ section, delay }: { section: SanityVideoEmbed; delay: string }) {
  return (
    <div className="reveal mt-12" style={{ transitionDelay: delay }}>
      <p
        className="mb-3 text-sm uppercase tracking-[0.28px] text-muted"
        style={{ fontFamily: "var(--font-azeret), monospace" }}
      >
        {section.label}
      </p>
      <VideoEmbed url={section.url} title={section.label} />
    </div>
  );
}

function LinkListBlock({ section, delay }: { section: SanityLinkList; delay: string }) {
  return (
    <div className="reveal mt-10" style={{ transitionDelay: delay }}>
      {section.heading && (
        <h2 className="mb-4 text-sm uppercase tracking-[0.28px] text-muted" style={{ fontFamily: "var(--font-azeret), monospace" }}>
          {section.heading}
        </h2>
      )}
      <div className="flex flex-wrap gap-4">
        {section.links.map((link) => (
          <a
            key={link._key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-lg underline underline-offset-4 transition-colors hover:opacity-80"
          >
            {link.label}
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ImageGalleryBlock({
  section,
  delay,
  projectTitle,
}: {
  section: SanityImageGallery;
  delay: string;
  projectTitle: string;
}) {
  return (
    <div className="reveal mt-12" style={{ transitionDelay: delay }}>
      <MediaGallery
        items={section.images.map((img, i) => ({
          ...img,
          _type: "galleryImage" as const,
          alt: img.alt || `${projectTitle} — image ${i + 1}`,
        }))}
        heading={section.heading}
      />
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProjectHeader({
  project,
}: {
  project: { title: string; location?: string; role?: string };
}) {
  return (
    <div className="reveal flex flex-col gap-3">
      <h1 className="font-black text-[32px] uppercase tracking-[-1.44px] sm:text-[48px]">
        {project.title}
      </h1>
      <div
        className="flex flex-col gap-1 text-sm uppercase tracking-[0.28px] text-accent-red"
        style={{ fontFamily: "var(--font-azeret), monospace" }}
      >
        {project.location && <span>{project.location}</span>}
        {project.role && <span>{project.role}</span>}
      </div>
    </div>
  );
}

function PrevNextNav({
  prev,
  next,
}: {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}) {
  return (
    <nav
      className="reveal mt-16 flex items-center justify-between border-t border-border pt-10"
      style={{ transitionDelay: "250ms" }}
      aria-label="Case study navigation"
    >
      {prev ? (
        <Link
          href={`/work/${prev.slug}`}
          className="inline-flex items-center gap-3 font-black text-lg uppercase tracking-[-0.36px] transition-colors hover:opacity-80"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Previous
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/work/${next.slug}`}
          className="inline-flex items-center gap-3 font-black text-lg uppercase tracking-[-0.36px] transition-colors hover:opacity-80"
        >
          Next
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

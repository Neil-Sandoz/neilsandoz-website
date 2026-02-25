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
      : "/ns-profile-photo.png";

    const thumbnailUrl = sanityProject.thumbnail
      ? urlForImage(sanityProject.thumbnail)?.width(1200).height(630).url()
      : heroImageUrl;

    const SITE_URL = "https://neilsandoz.com";
    const pageUrl = `${SITE_URL}/work/${sanityProject.slug.current}`;

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
      // VideoObject for each video link
      ...(sanityProject.videoLinks ?? []).map((link) => ({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${sanityProject.title} — ${link.label}`,
        description: sanityProject.shortDescription,
        contentUrl: link.url,
        ...(thumbnailUrl && { thumbnailUrl }),
        creator: { "@type": "Person", name: "Neil Sandoz" },
      })),
    ];

    return (
      <>
      <JsonLd schema={schemas} />
      <ScrollReveal className="pb-24 pt-[94px]">
        <div className="reveal relative aspect-video w-full overflow-hidden bg-muted/30">
          <Image
            src={heroImageUrl}
            alt={sanityProject.heroImage?.alt ?? sanityProject.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        <div className="px-6 pt-12 md:px-[50px]">
          <ProjectHeader project={sanityProject} />

          <div
            className="reveal mt-10 max-w-[848px]"
            style={{ transitionDelay: "100ms" }}
          >
            {sanityProject.body ? (
              <div className="flex flex-col gap-6 text-lg leading-[30.6px]">
                <PortableText
                  value={sanityProject.body}
                  components={{
                    block: {
                      normal: ({ children }) => <p>{children}</p>,
                      h3: ({ children }) => (
                        <h3 className="text-2xl font-black tracking-tight">{children}</h3>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-2 border-accent-red pl-4 italic">
                          {children}
                        </blockquote>
                      ),
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
              </div>
            ) : null}
          </div>

          <VideoEmbeds links={sanityProject.videoLinks} />
          <VideoLinks links={sanityProject.videoLinks} delay="150ms" />
          <PressLinks links={sanityProject.pressLinks} delay="200ms" />
          {sanityProject.mediaGallery && sanityProject.mediaGallery.length > 0 && (
            <MediaGallery items={sanityProject.mediaGallery} />
          )}
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
      <div className="reveal relative aspect-video w-full overflow-hidden bg-muted/30">
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

        <VideoEmbeds
          links={staticProject.videoLinks.map((l, i) => ({ ...l, _key: String(i) }))}
        />
        <VideoLinks
          links={staticProject.videoLinks.map((l, i) => ({ ...l, _key: String(i) }))}
          delay="150ms"
        />
        <PressLinks
          links={staticProject.pressLinks.map((l, i) => ({ ...l, _key: String(i) }))}
          delay="200ms"
        />
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
  // Try Sanity slugs, fall back to static
  try {
    const slugs = await getAllProjectSlugs();
    if (slugs.length > 0) return slugs.map((slug) => ({ slug }));
  } catch {}
  return PROJECTS.map((p) => ({ slug: p.slug }));
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

function VideoEmbeds({
  links,
}: {
  links?: { _key: string; label: string; url: string }[];
}) {
  if (!links?.length) return null;
  return (
    <div className="reveal mt-12 flex flex-col gap-8" style={{ transitionDelay: "120ms" }}>
      {links.map((link) => (
        <div key={link._key}>
          <p
            className="mb-3 text-sm uppercase tracking-[0.28px] text-muted"
            style={{ fontFamily: "var(--font-azeret), monospace" }}
          >
            {link.label}
          </p>
          <VideoEmbed url={link.url} title={link.label} />
        </div>
      ))}
    </div>
  );
}

function VideoLinks({
  links,
  delay,
}: {
  links?: { _key: string; label: string; url: string }[];
  delay: string;
}) {
  if (!links?.length) return null;
  return (
    <div
      className="reveal mt-12 flex flex-wrap gap-4"
      style={{ transitionDelay: delay }}
    >
      {links.map((link) => (
        <a
          key={link._key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-bold uppercase tracking-[0.35px] transition-colors hover:bg-foreground hover:text-background"
          style={{ fontFamily: "var(--font-display-sans)" }}
        >
          <PlayIcon className="h-4 w-4" />
          {link.label}
        </a>
      ))}
    </div>
  );
}

function PressLinks({
  links,
  delay,
}: {
  links?: { _key: string; label: string; url: string }[];
  delay: string;
}) {
  if (!links?.length) return null;
  return (
    <div
      className="reveal mt-6 flex flex-wrap gap-4"
      style={{ transitionDelay: delay }}
    >
      {links.map((link) => (
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
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

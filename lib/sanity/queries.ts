import { client } from "./client";
import type {
  SanityProject,
  SanityProjectSummary,
  SanitySiteSettings,
  SanityAboutContent,
} from "./types";

// ─── Project fields used on home page cards ─────────────────────────────────
const PROJECT_SUMMARY_FIELDS = `
  _id,
  title,
  slug,
  order,
  location,
  role,
  shortDescription,
  thumbnail { ..., asset-> }
`;

// ─── Full project fields used on case study pages ───────────────────────────
const PROJECT_FULL_FIELDS = `
  _id,
  title,
  slug,
  order,
  location,
  role,
  shortDescription,
  heroImage { ..., asset-> },
  thumbnail { ..., asset-> },
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "link" => { href }
    }
  },
  videoLinks[]{ _key, label, url },
  pressLinks[]{ _key, label, url },
  mediaGallery[]{
    ...,
    _type == "galleryImage" => { ..., asset-> },
    _type == "galleryVideo" => { url, caption }
  }
`;

export async function getAllProjects(): Promise<SanityProjectSummary[]> {
  return client.fetch<SanityProjectSummary[]>(
    `*[_type == "project"] | order(order asc) { ${PROJECT_SUMMARY_FIELDS} }`,
    {},
    { next: { tags: ["project"] } }
  );
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  return client.fetch<SanityProject | null>(
    `*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FULL_FIELDS} }`,
    { slug },
    { next: { tags: ["project"] } }
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`,
    {},
    { next: { tags: ["project"] } }
  );
  return results.map((r) => r.slug.current);
}

export async function getAdjacentProjects(
  currentOrder: number
): Promise<{ prev: SanityProjectSummary | null; next: SanityProjectSummary | null }> {
  const [prev, next] = await Promise.all([
    client.fetch<SanityProjectSummary | null>(
      `*[_type == "project" && order < $order] | order(order desc)[0] { ${PROJECT_SUMMARY_FIELDS} }`,
      { order: currentOrder },
      { next: { tags: ["project"] } }
    ),
    client.fetch<SanityProjectSummary | null>(
      `*[_type == "project" && order > $order] | order(order asc)[0] { ${PROJECT_SUMMARY_FIELDS} }`,
      { order: currentOrder },
      { next: { tags: ["project"] } }
    ),
  ]);
  return { prev: prev ?? null, next: next ?? null };
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return client.fetch<SanitySiteSettings | null>(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}

export async function getAboutContent(): Promise<SanityAboutContent | null> {
  return client.fetch<SanityAboutContent | null>(
    `*[_type == "aboutContent"][0]{
      _id,
      heading,
      profilePhoto { ..., asset-> },
      bioBlocks[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => { href }
        }
      },
      pullQuote,
      pullQuoteSubtext
    }`,
    {},
    { next: { tags: ["aboutContent"] } }
  );
}

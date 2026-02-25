import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImageAsset {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityVideoLink {
  _key: string;
  label: string;
  url: string;
}

export interface SanityPressLink {
  _key: string;
  label: string;
  url: string;
}

export interface SanityGalleryImage {
  _key: string;
  _type: "galleryImage";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt: string;
  caption?: string;
}

export interface SanityGalleryVideo {
  _key: string;
  _type: "galleryVideo";
  url: string;
  caption?: string;
}

export interface SanityProject {
  _id: string;
  _type: "project";
  title: string;
  slug: SanitySlug;
  order: number;
  location?: string;
  role?: string;
  thumbnail?: SanityImageAsset;
  heroImage?: SanityImageAsset;
  shortDescription?: string;
  body?: PortableTextBlock[];
  videoLinks?: SanityVideoLink[];
  pressLinks?: SanityPressLink[];
  mediaGallery?: (SanityGalleryImage | SanityGalleryVideo)[];
}

export interface SanityProjectSummary {
  _id: string;
  title: string;
  slug: SanitySlug;
  order: number;
  location?: string;
  role?: string;
  thumbnail?: SanityImageAsset;
  shortDescription?: string;
}

export interface SanitySiteSettings {
  _id: string;
  heroVideoUrl?: string;
  heroFallbackImage?: SanityImageAsset;
  editReelUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  forennMusicUrl?: string;
  resumePdf?: { asset: { _ref: string; url: string } };
}

export interface SanityAboutContent {
  _id: string;
  heading?: string;
  profilePhoto?: SanityImageAsset;
  bioBlocks?: PortableTextBlock[];
  pullQuote?: string;
  pullQuoteSubtext?: string;
}

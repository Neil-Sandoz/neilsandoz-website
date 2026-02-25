import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Returns a responsive srcset-ready URL for a Sanity image.
 * Usage: urlForImage(project.thumbnail).width(800).url()
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!source) return null;
  return builder.image(source).auto("format").fit("max");
}

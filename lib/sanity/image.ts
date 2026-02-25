import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Returns a responsive srcset-ready URL for a Sanity image.
 * Usage: urlForImage(project.thumbnail).width(800).url()
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any | undefined | null) {
  if (!source) return null;
  return builder.image(source).auto("format").fit("max");
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { VideoEmbed } from "./VideoEmbed";
import type { SanityGalleryImage, SanityGalleryVideo } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

type GalleryItem = SanityGalleryImage | SanityGalleryVideo;

interface MediaGalleryProps {
  items: GalleryItem[];
}

function isImageItem(item: GalleryItem): item is SanityGalleryImage {
  return item._type === "galleryImage";
}

export function MediaGallery({ items }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const imageItems = items.filter(isImageItem);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null && i < imageItems.length - 1 ? i + 1 : i
    );
  }, [imageItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  if (!items.length) return null;

  const videoItems = items.filter((i): i is SanityGalleryVideo => i._type === "galleryVideo");

  return (
    <section className="mt-16">
      <h2
        className="mb-6 text-sm uppercase tracking-[0.28px] text-muted"
        style={{ fontFamily: "var(--font-azeret), monospace" }}
      >
        Gallery
      </h2>

      {/* Photo grid */}
      {imageItems.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {imageItems.map((item, i) => {
            const src =
              urlForImage(item)?.width(800).height(600).url() ?? "/ns-profile-photo.png";
            return (
              <button
                key={item._key}
                type="button"
                onClick={() => openLightbox(i)}
                className="group relative aspect-[4/3] w-full overflow-hidden bg-muted/20 focus-visible:outline-2 focus-visible:outline-foreground"
                aria-label={`Open ${item.alt ?? "gallery image"} in lightbox`}
              >
                <Image
                  src={src}
                  alt={item.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Video items */}
      {videoItems.length > 0 && (
        <div className="mt-8 flex flex-col gap-8">
          {videoItems.map((item) => (
            <div key={item._key}>
              {item.caption && (
                <p
                  className="mb-3 text-sm uppercase tracking-[0.28px] text-muted"
                  style={{ fontFamily: "var(--font-azeret), monospace" }}
                >
                  {item.caption}
                </p>
              )}
              <VideoEmbed url={item.url} title={item.caption ?? "Video"} />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && imageItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            type="button"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center text-white/80 transition-colors hover:text-white"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <CloseIcon className="h-6 w-6" />
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              type="button"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={
                urlForImage(imageItems[lightboxIndex])
                  ?.width(1400)
                  .url() ?? "/ns-profile-photo.png"
              }
              alt={imageItems[lightboxIndex].alt ?? ""}
              width={1400}
              height={900}
              className="h-auto max-h-[85vh] w-auto object-contain"
              sizes="90vw"
              priority
            />
            {imageItems[lightboxIndex].caption && (
              <p
                className="mt-3 text-center text-sm text-white/60"
                style={{ fontFamily: "var(--font-azeret), monospace" }}
              >
                {imageItems[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next */}
          {lightboxIndex < imageItems.length - 1 && (
            <button
              type="button"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-white/70 transition-colors hover:text-white"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/50">
            {lightboxIndex + 1} / {imageItems.length}
          </p>
        </div>
      )}
    </section>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

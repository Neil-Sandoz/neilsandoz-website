"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  /** Self-hosted MP4 URL (preferred). If a YouTube URL is passed it's ignored
   *  client-side — Neil should upload an MP4 to Sanity or /public for the loop. */
  src: string;
  /** Displayed while the video loads or if src is unavailable. */
  poster: string;
  /** Alt text for the poster image (accessibility). */
  posterAlt?: string;
}

export function HeroVideo({ src, poster, posterAlt = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const isMP4 =
    src.endsWith(".mp4") ||
    src.includes(".mp4?") ||
    src.includes("sanity.io"); // Sanity asset URLs

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("canplay", onCanPlay);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  if (!isMP4) return null; // YouTube links fall back to static image in parent

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      aria-label={posterAlt}
      className="absolute inset-0 h-full w-full object-cover grayscale"
      style={{
        opacity: videoReady ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

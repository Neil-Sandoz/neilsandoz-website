"use client";

import { useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  posterAlt?: string;
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
  } catch {}
  return null;
}

function isMP4(url: string) {
  return (
    url.endsWith(".mp4") ||
    url.includes(".mp4?") ||
    url.includes("sanity.io")
  );
}

export function HeroVideo({ src, poster, posterAlt = "" }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  const youtubeId = extractYouTubeId(src);
  const mp4 = isMP4(src);

  // MP4: fade in when canplay fires
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !mp4) return;
    const onCanPlay = () => setVideoReady(true);
    video.addEventListener("canplay", onCanPlay);
    return () => video.removeEventListener("canplay", onCanPlay);
  }, [mp4]);

  // YouTube iframe: fade in after a short delay (iframe load event is unreliable cross-origin)
  useEffect(() => {
    if (!youtubeId) return;
    const t = setTimeout(() => setIframeReady(true), 1500);
    return () => clearTimeout(t);
  }, [youtubeId]);

  if (mp4) {
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
        style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.8s ease" }}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  if (youtubeId) {
    // YouTube iframe background — must be scaled to always cover the container.
    // The iframe is 16:9; we over-scale it and center it to avoid letterboxing.
    const embedUrl = [
      `https://www.youtube-nocookie.com/embed/${youtubeId}`,
      "?autoplay=1",
      "&mute=1",
      "&loop=1",
      `&playlist=${youtubeId}`,
      "&controls=0",
      "&showinfo=0",
      "&rel=0",
      "&modestbranding=1",
      "&playsinline=1",
      "&enablejsapi=0",
    ].join("");

    return (
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden grayscale"
        style={{ opacity: iframeReady ? 1 : 0, transition: "opacity 0.8s ease" }}
        aria-hidden
      >
        <iframe
          src={embedUrl}
          title="Hero background video"
          allow="autoplay; encrypted-media"
          className="absolute"
          style={{
            // Oversizing trick: keep 16:9 but ensure it covers 100% of either dimension
            width: "calc(100% + 400px)",
            height: "calc(100% + 225px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            minWidth: "177.78vh", // 16/9 * 100vh
            minHeight: "56.25vw", // 9/16 * 100vw
          }}
        />
      </div>
    );
  }

  return null;
}

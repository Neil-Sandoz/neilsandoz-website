"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  youtubeUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
  } catch {}
  return null;
}

export function VideoModal({ youtubeUrl, isOpen, onClose, title = "Video" }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoId = extractYouTubeId(youtubeUrl);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto w-full max-w-4xl bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm open:flex open:flex-col"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label={title}
    >
      <div className="relative w-full bg-black">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          aria-label="Close video"
        >
          Close
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
          </svg>
        </button>
        <div className="relative aspect-video w-full">
          {isOpen && (
            <iframe
              src={embedUrl}
              title={title}
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </div>
    </dialog>
  );
}

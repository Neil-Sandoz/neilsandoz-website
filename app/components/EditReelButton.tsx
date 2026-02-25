"use client";

import { useState } from "react";
import { VideoModal } from "./VideoModal";

interface EditReelButtonProps {
  reelUrl: string;
}

export function EditReelButton({ reelUrl }: EditReelButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.35px] text-white transition-colors hover:opacity-80"
        style={{ fontFamily: "var(--font-display-sans)" }}
      >
        View Edit Reel
        <PlayCircleIcon className="h-6 w-6" />
      </button>
      <VideoModal
        youtubeUrl={reelUrl}
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Neil Sandoz — Edit Reel"
      />
    </>
  );
}

function PlayCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
    </svg>
  );
}

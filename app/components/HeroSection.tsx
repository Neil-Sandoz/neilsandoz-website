import Image from "next/image";
import { Button } from "./Button";
import { HeroVideo } from "./HeroVideo";
import type { SanitySiteSettings } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

const FALLBACK_EDIT_REEL = "https://youtu.be/rRqMH-W_4YY";
const FALLBACK_HERO_VIDEO = "https://youtu.be/LDzrmm2YoGg";

interface HeroSectionProps {
  settings: SanitySiteSettings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const editReelUrl = settings?.editReelUrl || FALLBACK_EDIT_REEL;
  const fallbackImageUrl =
    settings?.heroFallbackImage
      ? urlForImage(settings.heroFallbackImage)?.width(1600).url() ?? "/ns-profile-photo.png"
      : "/ns-profile-photo.png";

  const heroVideoUrl = settings?.heroVideoUrl ?? FALLBACK_HERO_VIDEO;

  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-foreground pb-20 pt-[94px]">
      {/* Background: static poster sits underneath; video (MP4 or YouTube) fades in over it */}
      <div className="absolute inset-0">
        <Image
          src={fallbackImageUrl}
          alt=""
          fill
          className="object-cover grayscale"
          priority
          sizes="100vw"
        />
        <HeroVideo src={heroVideoUrl} poster={fallbackImageUrl} />
        <div className="absolute inset-0 bg-black/52" aria-hidden />
      </div>

      <div className="relative z-10 flex w-full max-w-[860px] flex-col gap-10 px-6 text-white md:px-[50px]">
        <h1
          className="text-[36px] leading-[1.05] tracking-[-1.626px] sm:text-[56px] md:text-[76px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="block animate-fade-up animate-delay-100">
            I help people
          </span>
          <span className="block animate-fade-up animate-delay-200">
            and brands tell
          </span>
          <span className="block animate-fade-up animate-delay-300">
            meaningful stories through film
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-4 animate-fade-up animate-delay-500">
          <Button
            href="/about#contact"
            variant="primary"
            className="min-w-[210px] rounded-[20px]"
          >
            Get In Touch
          </Button>
          <a
            href={editReelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.35px] text-white transition-colors hover:opacity-80"
            style={{ fontFamily: "var(--font-display-sans)" }}
          >
            View Edit Reel
            <PlayCircleIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
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

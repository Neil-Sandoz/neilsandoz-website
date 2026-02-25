import Image from "next/image";
import { Button } from "./Button";
import { HeroVideo } from "./HeroVideo";
import { EditReelButton } from "./EditReelButton";
import type { SanitySiteSettings } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

const FALLBACK_EDIT_REEL = "https://youtu.be/rRqMH-W_4YY";
const FALLBACK_HERO_VIDEO = "https://youtu.be/LDzrmm2YoGg";
const FALLBACK_HERO_IMAGE = "/BTS_Agu-sweat.jpg";

interface HeroSectionProps {
  settings: SanitySiteSettings | null;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const editReelUrl = settings?.editReelUrl || FALLBACK_EDIT_REEL;
  const fallbackImageUrl =
    settings?.heroFallbackImage
      ? urlForImage(settings.heroFallbackImage)?.width(1600).url() ?? FALLBACK_HERO_IMAGE
      : FALLBACK_HERO_IMAGE;

  const heroVideoUrl = settings?.heroVideoUrl ?? FALLBACK_HERO_VIDEO;

  return (
    <section className="relative flex min-h-[85vh] items-end overflow-hidden bg-foreground pb-20 pt-[94px]">
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
            I edit and shape
          </span>
          <span className="block animate-fade-up animate-delay-200">
            meaningful stories
          </span>
          <span className="block animate-fade-up animate-delay-300">
            that connect.
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
          <EditReelButton reelUrl={editReelUrl} />
        </div>
      </div>
    </section>
  );
}

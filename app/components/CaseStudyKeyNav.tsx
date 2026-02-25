"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CaseStudyKeyNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

/**
 * Invisible client component that adds keyboard arrow navigation to case study pages.
 * ArrowLeft → previous case study, ArrowRight → next case study.
 */
export function CaseStudyKeyNav({ prevSlug, nextSlug }: CaseStudyKeyNavProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when focus is inside a text input or textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowLeft" && prevSlug) {
        router.push(`/work/${prevSlug}`);
      } else if (e.key === "ArrowRight" && nextSlug) {
        router.push(`/work/${nextSlug}`);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlug, nextSlug, router]);

  return null;
}

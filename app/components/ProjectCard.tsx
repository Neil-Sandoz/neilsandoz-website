import Link from "next/link";
import Image from "next/image";
import type { SanityProjectSummary } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

interface ProjectCardProps {
  project: SanityProjectSummary;
  /** Plain URL used in place of a Sanity thumbnail (static/fallback data). */
  staticThumbnailUrl?: string;
}

export function ProjectCard({ project, staticThumbnailUrl }: ProjectCardProps) {
  const thumbnailUrl =
    staticThumbnailUrl ??
    (project.thumbnail
      ? urlForImage(project.thumbnail)?.width(800).height(450).url() ?? "/ns-profile-photo.png"
      : "/ns-profile-photo.png");

  return (
    <Link
      href={`/work/${project.slug.current}`}
      className="group block transition-colors hover:opacity-95"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30">
        <Image
          src={thumbnailUrl}
          alt={project.thumbnail?.alt ?? project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-black text-2xl uppercase tracking-[-0.48px]">
          {project.title}
        </h3>
        <p
          className="text-sm uppercase tracking-[0.28px] text-accent-red"
          style={{ fontFamily: "var(--font-azeret), monospace" }}
        >
          {project.location}
        </p>
        <p className="text-base leading-relaxed">{project.shortDescription}</p>
      </div>
    </Link>
  );
}

import { ScrollReveal } from "./ScrollReveal";
import { ProjectCard } from "./ProjectCard";
import type { SanityProjectSummary } from "@/lib/sanity/types";
import { PROJECTS } from "@/app/data/projects";

interface SelectedWorkProps {
  projects: SanityProjectSummary[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  // Fall back to static data if Sanity hasn't been seeded yet
  const hasSanityData = projects.length > 0;

  return (
    <ScrollReveal id="selected-work" className="px-6 pb-24 pt-16 md:px-[50px] scroll-mt-24">
      <div className="mb-12 reveal">
        <h2
          className="text-[48px] leading-tight tracking-[-0.64px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Selected Work
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-[70px] md:grid-cols-2">
        {hasSanityData
          ? projects.map((project, i) => (
              <div
                key={project._id}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          : PROJECTS.map((project, i) => (
              <div
                key={project.slug}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <ProjectCard
                  project={{
                    _id: project.slug,
                    title: project.title,
                    slug: { _type: "slug", current: project.slug },
                    order: i + 1,
                    location: project.location,
                    role: project.role,
                    shortDescription: project.shortDescription,
                  }}
                  staticThumbnailUrl={project.thumbnail}
                />
              </div>
            ))}
      </div>
    </ScrollReveal>
  );
}

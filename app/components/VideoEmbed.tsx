interface VideoEmbedProps {
  url: string;
  title?: string;
}

function parseVideoUrl(url: string): { embedUrl: string; platform: string } | null {
  try {
    const u = new URL(url);

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    const ytMatch =
      u.hostname.includes("youtube.com")
        ? u.searchParams.get("v")
        : u.hostname === "youtu.be"
          ? u.pathname.slice(1).split("?")[0]
          : null;

    if (ytMatch) {
      return {
        platform: "youtube",
        // Privacy-enhanced mode (youtube-nocookie.com) + rel=0 to suppress related videos
        embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch}?rel=0&modestbranding=1`,
      };
    }

    // Vimeo: vimeo.com/ID or vimeo.com/ID/hash
    if (u.hostname.includes("vimeo.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      const id = parts[0];
      const hash = parts[1];
      const embedUrl = hash
        ? `https://player.vimeo.com/video/${id}?h=${hash}`
        : `https://player.vimeo.com/video/${id}`;
      return { platform: "vimeo", embedUrl };
    }

    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const parsed = parseVideoUrl(url);

  if (!parsed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 transition-colors hover:opacity-80"
      >
        {title}
      </a>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      <iframe
        src={parsed.embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon } from "./icons";

const RESUME_URL = "/Neil Sandoz_Editor_Resume_2026.pdf";

export function Footer() {
  return (
    <footer className="bg-background px-6 pb-4 pt-24 md:px-[50px]">
      <div className="mb-3 flex justify-center overflow-hidden">
        <Image
          src="/Neil-Sandoz.svg"
          alt="Neil Sandoz"
          width={1415}
          height={208}
          className="h-auto w-full"
        />
      </div>
      <div
        className="flex flex-col items-center gap-4 py-3 text-sm uppercase tracking-[0.35px] md:flex-row md:items-end md:justify-between"
        style={{ fontFamily: "var(--font-azeret), monospace" }}
      >
        <span className="text-foreground/90 md:w-[300px]">
          Editor + Austin & Worldwide
        </span>
        <nav
          className="flex gap-8"
          style={{ fontFamily: "var(--font-display-sans)" }}
        >
          <Link href="/" className="transition-colors hover:opacity-80">
            Work
          </Link>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
          >
            Resumé
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
          <Link href="/about" className="transition-colors hover:opacity-80">
            About
          </Link>
        </nav>
        <span className="text-right text-muted md:w-[300px]">
          Site by All Manner of Us
        </span>
      </div>
    </footer>
  );
}

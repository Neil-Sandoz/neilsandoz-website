"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "/#selected-work" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  function handleWorkClick(e: React.MouseEvent) {
    if (isHome) {
      e.preventDefault();
      document.getElementById("selected-work")?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      router.push("/#selected-work");
    }
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        transparent
          ? "border-white/20 bg-transparent text-white"
          : "border-border bg-background text-foreground"
      }`}
    >
      <div className="flex h-[94px] items-center justify-between px-6 md:px-[50px]">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/NS.gif"
            alt="NS"
            width={48}
            height={34}
            className={`h-[34px] w-auto ${transparent ? "brightness-100" : "brightness-0"}`}
            style={{ transition: "filter 0.3s" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/ns-monogram.svg";
            }}
          />
          <span
            className="hidden text-sm uppercase tracking-[0.35px] sm:inline"
            style={{ fontFamily: "var(--font-azeret), monospace" }}
          >
            Editor + Austin & Worldwide
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Work" ? (
              <a
                key="Work"
                href="/#selected-work"
                onClick={handleWorkClick}
                className={`text-xl tracking-[-0.4px] transition-colors hover:opacity-80 ${
                  isHome ? "underline underline-offset-4" : ""
                }`}
              >
                Work
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`text-xl tracking-[-0.4px] transition-colors hover:opacity-80 ${
                  pathname === link.href ? "underline underline-offset-4" : ""
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              transparent ? "bg-white" : "bg-foreground"
            } ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              transparent ? "bg-white" : "bg-foreground"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              transparent ? "bg-white" : "bg-foreground"
            } ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-48 border-border/20" : "max-h-0 border-transparent"
        } ${transparent ? "bg-black/80" : "bg-background"}`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          <a
            href="/#selected-work"
            onClick={handleWorkClick}
            className={`text-xl tracking-[-0.4px] transition-colors hover:opacity-80 ${
              isHome ? "underline underline-offset-4" : ""
            }`}
          >
            Work
          </a>
          <Link
            href="/about"
            className={`text-xl tracking-[-0.4px] transition-colors hover:opacity-80 ${
              pathname === "/about" ? "underline underline-offset-4" : ""
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const EXIT_DURATION_MS = 250;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPhase("exit");
  }, [pathname]);

  useEffect(() => {
    if (phase !== "exit") return;

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      window.scrollTo(0, 0);
      setPhase("enter");
    }, EXIT_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [phase, children]);

  useEffect(() => {
    if (phase === "enter") {
      const timeout = setTimeout(() => setPhase("idle"), 450);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  const animationClass =
    phase === "exit" ? "page-exit" : phase === "enter" ? "page-enter" : "";

  return <div className={animationClass}>{displayChildren}</div>;
}

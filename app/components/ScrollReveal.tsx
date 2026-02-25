"use client";

import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const elements = wrapper.querySelectorAll<HTMLElement>(".reveal");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const show = () => el.classList.add("is-visible");
          if (delay > 0) {
            setTimeout(show, delay);
          } else {
            show();
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [delay]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}

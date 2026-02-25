"use client";

import { useRef, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "./Button";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      // Honeypot — real users leave this blank; bots fill it
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      turnstileToken: turnstileToken ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      formRef.current?.reset();
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-green">
          <CheckIcon className="h-6 w-6 text-foreground" />
        </div>
        <p
          className="text-[32px] leading-tight tracking-[-0.64px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Thanks! Neil will be in touch.
        </p>
        <button
          onClick={() => setState("idle")}
          className="text-base underline underline-offset-4 transition-colors hover:opacity-70"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — visually hidden, never filled by real users */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-base font-black uppercase tracking-[-0.32px]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="h-[52px] w-full border border-border bg-transparent px-4 text-foreground outline-none transition-colors focus:border-foreground disabled:opacity-50"
          required
          disabled={state === "submitting"}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-base font-black uppercase tracking-[-0.32px]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="h-[52px] w-full border border-border bg-transparent px-4 text-foreground outline-none transition-colors focus:border-foreground disabled:opacity-50"
          required
          disabled={state === "submitting"}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-base font-black uppercase tracking-[-0.32px]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="h-[172px] w-full border border-border bg-transparent px-4 py-3 text-foreground outline-none transition-colors focus:border-foreground disabled:opacity-50"
          required
          disabled={state === "submitting"}
        />
      </div>

      {/* Cloudflare Turnstile — only render when site key is configured */}
      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={setTurnstileToken}
          onError={() => setTurnstileToken(null)}
          onExpire={() => setTurnstileToken(null)}
          options={{ theme: "light" }}
        />
      )}

      {state === "error" && errorMsg && (
        <p className="text-sm text-red-600" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        className="w-full rounded-none"
        disabled={state === "submitting" || (!!siteKey && !turnstileToken)}
      >
        {state === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

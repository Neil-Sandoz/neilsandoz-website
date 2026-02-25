import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@sanity/client";

// ── Sanity write client (server-side only) ───────────────────────────────────
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// ── In-memory rate limiter (per IP, resets on cold start) ───────────────────
// For production with Vercel, this works per-region; good enough for a
// portfolio contact form without needing Redis.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// ── Turnstile verification ───────────────────────────────────────────────────
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If Turnstile isn't configured yet, skip (dev convenience)
    return true;
  }
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    }
  );
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

// ── Sanitize input ───────────────────────────────────────────────────────────
function sanitize(value: unknown, maxLength = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // 1. Rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // 2. Honeypot — reject bots that fill the hidden field
  if (body.website) {
    return NextResponse.json({ ok: true }); // silently succeed
  }

  // 3. Turnstile verification
  const turnstileToken = sanitize(body.turnstileToken);
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return NextResponse.json(
      { error: "Human verification failed. Please try again." },
      { status: 400 }
    );
  }

  // 4. Validate fields
  const name = sanitize(body.name, 200);
  const email = sanitize(body.email, 200);
  const message = sanitize(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // 5. Save to Sanity
  try {
    await sanity.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      read: false,
    });
  } catch (err) {
    console.error("[contact] Sanity save failed:", err);
    // Don't block the email send if Sanity fails
  }

  // 6. Send email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    try {
      await resend.emails.send({
        from: "Neil Sandoz Portfolio <noreply@neilsandoz.com>",
        to: "hello@neilsandoz.com",
        replyTo: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 24px;">
            <h2 style="margin: 0 0 16px;">New contact form submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 80px;">Name</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td>
                <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <p style="margin: 24px 0 0; color: #888; font-size: 12px;">
              Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT
            </p>
          </div>
        `,
      });
    } catch (err) {
      console.error("[contact] Resend send failed:", err);
      // Still return success — submission is saved in Sanity
    }
  }

  return NextResponse.json({ ok: true });
}

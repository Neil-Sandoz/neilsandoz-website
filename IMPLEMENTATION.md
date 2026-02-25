# Neil Sandoz Portfolio — Implementation Guide

## Quick Reference

| Item | Value |
|------|-------|
| Client | Neil Sandoz — Film Editor, Austin TX |
| Site | neilsandoz.com |
| Stack | Next.js 15 (App Router) + React 19 + Tailwind v4 + TypeScript |
| CMS | Sanity.io (free tier, embedded Studio at `/studio`) |
| Email | Resend (free tier, 100/day) |
| Spam | Cloudflare Turnstile (free) + honeypot + rate limiting |
| Hosting | Vercel (free tier) |
| Repo | Public GitHub |
| Contact | hello@neilsandoz.com · 512-801-1314 |

---

## Model Strategy

Use this guide to decide which model to use at each phase. **Default to Cursor Auto** for speed and cost. Switch up when the task demands it.

| Model | Best For | Cost |
|-------|----------|------|
| **Cursor Auto** | Scaffolding, installs, simple components, repetitive edits, running commands, file creation | $ |
| **Sonnet 4.6** | Component implementation, styling, Sanity integration, moderate-complexity logic | $$ |
| **Opus 4.6** | Architecture decisions, complex debugging, nuanced content/SEO, reviewing coherence, tricky state logic | $$$ |
| **GPT 5.3 Codex** | Large code generation passes, bulk component creation, schema writing | $$ |

### Per-Phase Model Recommendations

Marked with 🛑 where you should **stop and switch models** before continuing.

---

### Model switch checklist (when to stop, what to switch to, what’s next)

Use this list when working through the doc. At each 🛑: **stop**, **review** the work so far, **switch** to the model listed, then **tell the agent** to continue from the “Resume with” line.

| # | Section | STOP — You should… | Switch to | Resume with |
|---|--------|---------------------|-----------|-------------|
| 1 | **1.4 Core Layout Components** | Pause after 1.3 (Design Tokens). Review tokens/CSS. | **Sonnet 4.6** | *“Continue from Phase 1.4 — Core Layout Components (Header, Footer, PageTransition, ScrollReveal, Button).”* |
| 2 | **1.8 Responsive & Polish Pass** | Pause after 1.7 (Case Study template). Review all static pages. | **Sonnet 4.6** | *“Continue from Phase 1.8 — Responsive & polish pass for all pages.”* |
| 3 | **2.2 Schema Definitions** | Pause after 2.1 (Sanity project setup). Review project/config. | **Opus 4.6** | *“Continue from Phase 2.2 — Define all Sanity schemas (project, siteSettings, aboutContent, contactSubmission).”* |
| 4 | **2.4 Data Fetching Layer** | Pause after 2.3 (Studio embedding). Review Studio. | **Sonnet 4.6** | *“Continue from Phase 2.4 — Sanity client, GROQ queries, image URL helper.”* |
| 5 | **3.1 Contact Form Backend** | Pause after Phase 2 checkpoint. Review CMS-driven site. | **Sonnet 4.6** | *“Continue from Phase 3.1 — Contact form backend (honeypot, Turnstile, Resend, save to Sanity).”* |
| 6 | **3.5 Media Gallery (Case Studies)** | Pause after 3.4 (Video embeds). Review hero video + embeds. | **Sonnet 4.6** | *“Continue from Phase 3.5 — MediaGallery component for BTS photos/videos.”* |
| 7 | **4.1 Metadata & Open Graph** | Pause after Phase 3 checkpoint. Review contact form + media. | **Opus 4.6** | *“Continue from Phase 4.1 — Metadata and Open Graph for all pages.”* |

**After each “Resume with” block:** the agent continues through that section and the following sections that use the same model, until the next 🛑 or end of phase.

---

## Phase 1 — Scaffold & Core (Static Site)

### 1.1 Project Init
**Model: Cursor Auto**

```
Tasks:
- [x] npx create-next-app@latest with App Router, TypeScript, Tailwind v4, ESLint
- [x] Clean out boilerplate (default page, styles, etc.)
- [x] Verify dev server runs
```

### 1.2 Font Setup
**Model: Cursor Auto**

```
Tasks:
- [x] Register Tropiline fonts via @font-face in globals.css
      - Tropiline-Regular.otf → --font-display
      - TropilineSans-Bold.otf → --font-display-sans
      (Load only the weights we use to keep bundle tight)
- [x] Setup Inter (Regular 400, Black 900) via next/font/google → --font-sans
- [x] Setup Azeret Mono (Regular 400) via next/font/google → --font-mono
- [x] Apply font variables to <html> in layout.tsx
- [x] Map variables in @theme inline block in globals.css
```

### 1.3 Design Tokens & Global CSS
**Model: Cursor Auto**

```
Tasks:
- [x] Define :root CSS variables:
      --background: #e8dfd3
      --foreground: #0a0a0a
      --accent: #00c884
      --accent-hover: #00b070
      --accent-red: #c84630
      --border: #0a0a0a
      --muted: #a09888
- [x] Mirror in @theme inline for Tailwind (bg-background, text-foreground, etc.)
- [x] html { scroll-behavior: smooth }
- [x] body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale }
- [x] Page transition keyframes (page-enter, page-exit)
      - Exit: opacity 1→0, translateY(0→-8px), 250ms ease
      - Enter: opacity 0→1, translateY(12px→0), 450ms cubic-bezier(0.22, 1, 0.36, 1)
- [x] fadeUp keyframe: opacity 0→1, translateY(20px→0), 0.7s ease
- [x] Stagger delay utilities: animate-delay-100 through animate-delay-600
- [x] .reveal / .reveal.is-visible / .reveal-slow classes
- [x] animation-fill-mode: both on all animation classes
```

### 1.4 Core Layout Components
**Model: Sonnet 4.6** 🛑  
**→ STOP:** Review 1.1–1.3. Switch to **Sonnet 4.6**, then say: *"Continue from Phase 1.4 — Core Layout Components."*

These components carry the "smooth" feel of the whole site. Worth the upgrade.

```
Tasks:
- [x] layout.tsx — fonts on <html>, <Header/>, <PageTransition>{children}</PageTransition>, <Footer/>
- [x] Header.tsx — fixed, scroll-aware, transparent over hero on /
      - NS monogram logo + "EDITOR + AUSTIN & WORLDWIDE" subtitle
      - Nav links: Work, Resumé (external PDF, new tab), About
      - Process hidden for now
      - Scroll listener with { passive: true }
      - transition-all duration-300 on background/border
- [x] Footer.tsx — large Neil-Sandoz.svg wordmark, 3-column layout:
      - Left: "EDITOR + AUSTIN & WORLDWIDE"
      - Center: Work, Resumé, About nav links
      - Right: "SITE BY ALL MANNER OF US"
- [x] PageTransition.tsx — usePathname(), exit→swap→enter, scrollTo(0,0)
- [x] ScrollReveal.tsx — IntersectionObserver on .reveal, add .is-visible once
- [x] Button.tsx — primary (green bg), secondary (black border), variants with transition-colors
```

### 1.5 Home Page (Static)
**Model: Sonnet 4.6**

```
Tasks:
- [x] HeroSection — full-viewport hero
      - Background: fallback image (from Figma/placeholder) for now
      - B&W desaturation + 52% black overlay (CSS: mix-blend-mode + bg opacity)
      - Heading: "I help people and brands tell meaningful stories through film"
        (Tropiline Regular, 76px, staggered fadeUp)
      - CTA row:
        - "Get In Touch" → scrolls to /about contact form (green pill button)
        - "View Edit Reel" → https://youtu.be/rRqMH-W_4YY (new tab, with play icon)
- [x] SelectedWork section
      - "Selected Work" heading + "View All Work" outline button
      - 2-column grid, 70px gap
      - 7 ProjectCard components (hardcoded for now):
        - 16:9 thumbnail (placeholder images)
        - Title (Inter Black, 24px, uppercase)
        - Location (Azeret Mono, 14px, accent-red, uppercase)
        - Short description (Inter Regular, 16px)
      - Cards link to /work/[slug]
```

### 1.6 About Page (Static)
**Model: Sonnet 4.6**

```
Tasks:
- [x] 2-column layout (64px gap, 50px padding)
- [x] Left column:
      - Profile photo (ns-profile-photo.png) in 492px-tall container, object-cover
      - "Get in touch." heading (Tropiline, 48px)
      - hello@neilsandoz.com (underlined link)
      - Austin, Texas
      - Resume (link to PDF, new tab)
      - Forenn Music (link to forennmusic.com, new tab)
- [x] Right column:
      - "Hey, I'm Neil." heading (Tropiline, 56px)
      - 4 bio paragraphs (Inter Regular, 18px, 30.6px line-height)
      - Forenn link inline in last paragraph
- [x] Pull quote section (centered, full-width):
      - "I believe connection is the thread that runs through every good story."
        (Tropiline, 56px)
      - Subtext (Inter Regular, 20px)
- [x] Contact form:
      - "Send a message." heading (Tropiline, 48px)
      - Name, Email, Message fields (black border, transparent bg)
      - Labels: Inter Black, 16px, uppercase
      - Submit: full-width black button, "SEND MESSAGE" (TropilineSans Bold)
      - (Spam protection wired in Phase 3)
```

### 1.7 Case Study Page (Static Template)
**Model: Cursor Auto**

```
Tasks:
- [x] Full-width hero image (aspect ~16:9)
- [x] Title (Inter Black, 48px, uppercase)
- [x] Location + Role (accent-red, 14px, uppercase)
- [x] Body text (Inter Regular, 18px, max-width ~848px)
- [x] Prev/Next navigation (Inter Black, with arrow icons)
- [x] Hardcode "Before You Believe" as the example
```

### 1.8 Responsive & Polish Pass
**Model: Sonnet 4.6** 🛑  
**→ STOP:** Review static pages (1.5–1.7). Switch to **Sonnet 4.6**, then say: *"Continue from Phase 1.8 — Responsive & polish pass."*

```
Tasks:
- [x] Mobile breakpoints for all pages (header hamburger or simplified nav)
- [x] Hero text sizing for mobile
- [x] Single-column grid on mobile for work cards
- [x] Footer stacking on mobile
- [x] Test all scroll reveal animations
- [x] Test page transitions between routes
- [x] Verify no layout shift (CLS) on load
```

**✅ Phase 1 Checkpoint:** Static site with all 3 page templates, smooth animations, responsive. No CMS yet.

---

## Phase 2 — Sanity Integration

### 2.1 Sanity Project Setup
**Model: Cursor Auto**

```
Tasks:
- [ ] Create Sanity project at sanity.io/manage (free plan)
- [ ] npm install sanity next-sanity @sanity/image-url @sanity/vision
- [ ] Create sanity.config.ts at project root
- [ ] Create sanity.cli.ts
- [ ] Setup environment variables (in .env.local, later in Vercel):
      NEXT_PUBLIC_SANITY_PROJECT_ID
      NEXT_PUBLIC_SANITY_DATASET
      SANITY_API_TOKEN (for write operations — contact submissions)
```

### 2.2 Schema Definitions
**Model: Opus 4.6** 🛑  
**→ STOP:** Review 2.1 (Sanity setup). Switch to **Opus 4.6**, then say: *"Continue from Phase 2.2 — Define all Sanity schemas."*

Schema design drives the entire CMS experience for Neil. Worth careful thought.

```
Tasks:
- [ ] schemas/project.ts
      - title (string, required)
      - slug (slug, from title)
      - location (string) — e.g. "Nairobi, Kenya"
      - role (string) — e.g. "Director, Camera Operator, Editor"
      - thumbnail (image with hotspot)
      - heroImage (image with hotspot)
      - shortDescription (text, max 200 chars — for home page cards)
      - body (array of block content — portable text for full case study)
      - mediaGallery (array of objects):
        - type: 'image' → image with caption
        - type: 'video' → url (string) + caption
      - videoLinks (array of { url, label })
      - pressLinks (array of { url, label })
      - order (number — sort position on home grid)

- [ ] schemas/siteSettings.ts (singleton)
      - heroVideoUrl (url — YouTube/MP4 for hero background)
      - heroFallbackImage (image)
      - editReelUrl (url)
      - contactEmail (string)
      - contactPhone (string)
      - location (string)
      - forennMusicUrl (url)
      - resumePdf (file — so Neil can update from Studio)

- [ ] schemas/aboutContent.ts (singleton)
      - heading (string — "Hey, I'm Neil.")
      - profilePhoto (image with hotspot)
      - bioBlocks (array of block content — portable text)
      - pullQuote (text)
      - pullQuoteSubtext (text)

- [ ] schemas/contactSubmission.ts
      - name (string, readOnly)
      - email (string, readOnly)
      - message (text, readOnly)
      - submittedAt (datetime, readOnly)
      - read (boolean — Neil toggles this)
      - (Custom desk structure: show unread count, sort by newest)

- [ ] schemas/index.ts — export all schemas
- [ ] Register schemas in sanity.config.ts
```

### 2.3 Sanity Studio Embedding
**Model: Cursor Auto**

```
Tasks:
- [ ] Create app/studio/[[...tool]]/page.tsx (catch-all route for Studio)
- [ ] Configure Studio with custom desk structure:
      - "Projects" (list, ordered by `order` field)
      - "Site Settings" (singleton editor)
      - "About Page" (singleton editor)
      - "Contact Submissions" (list, sorted newest first, unread badge)
- [ ] Add Studio route to Next.js config (exclude from middleware if any)
```

### 2.4 Data Fetching Layer
**Model: Sonnet 4.6** 🛑  
**→ STOP:** Review 2.3 (Studio embedding). Switch to **Sonnet 4.6**, then say: *"Continue from Phase 2.4 — Sanity client, GROQ queries, image helper."*

```
Tasks:
- [ ] lib/sanity/client.ts — Sanity client config
- [ ] lib/sanity/queries.ts — GROQ queries:
      - getAllProjects() — for home page grid
      - getProjectBySlug(slug) — for case study page
      - getAdjacentProjects(currentOrder) — for prev/next nav
      - getSiteSettings() — singleton
      - getAboutContent() — singleton
- [ ] lib/sanity/image.ts — image URL builder helper
```

### 2.5 Wire Pages to Sanity
**Model: Sonnet 4.6**

```
Tasks:
- [ ] Update Home page to fetch from Sanity (server component)
- [ ] Update About page to fetch from Sanity
- [ ] Update Case Study page to fetch from Sanity
- [ ] Dynamic route generation: generateStaticParams for /work/[slug]
- [ ] Handle missing/draft content gracefully (404, preview mode)
```

### 2.6 Seed Content
**Model: Cursor Auto**

```
Tasks:
- [ ] Create seed script or manually enter via Studio:
      - All 7 case studies with full content from the brief
      - Site settings (hero video URL, edit reel URL, contact info)
      - About page content (bio from Figma)
- [ ] Upload thumbnail images (from Figma exports or video stills)
```

**✅ Phase 2 Checkpoint:** Fully CMS-driven site. Neil can log into /studio and manage all content.

---

## Phase 3 — Contact Form, Media & Hero Video

### 3.1 Contact Form Backend
**Model: Sonnet 4.6** 🛑  
**→ STOP:** Review Phase 2 checkpoint. Switch to **Sonnet 4.6**, then say: *"Continue from Phase 3.1 — Contact form backend."*

```
Tasks:
- [ ] npm install resend
- [ ] Create app/api/contact/route.ts (or server action):
      1. Validate honeypot field (reject if filled)
      2. Verify Cloudflare Turnstile token server-side
      3. Rate limit check (IP-based, e.g. 3 submissions per 15 min)
      4. Validate fields (name, email, message — basic sanitization)
      5. Save to Sanity as contactSubmission document
      6. Send email via Resend to hello@neilsandoz.com
      7. Return success/error response
- [ ] Environment variables:
      RESEND_API_KEY
      TURNSTILE_SECRET_KEY
      NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

### 3.2 Contact Form Frontend
**Model: Cursor Auto**

```
Tasks:
- [ ] Add hidden honeypot input (tabindex -1, aria-hidden, autocomplete off)
- [ ] Integrate @marsidev/react-turnstile (or Turnstile script directly)
- [ ] Form state: idle → submitting → success → error
- [ ] Disable button during submission
- [ ] Success message: "Thanks, Neil will be in touch!"
- [ ] Error handling with user-friendly messages
```

### 3.3 Hero Video
**Model: Cursor Auto**

```
Tasks:
- [ ] Preferred: self-hosted MP4 approach
      - Neil uploads optimized MP4 to Sanity (or public/)
      - <video autoPlay muted loop playsInline poster={fallbackImage}>
      - CSS: opacity transition on load for smooth appearance
      - B&W filter + overlay applied via CSS (same as static hero)
- [ ] Fallback: if no video URL in settings, show static image
- [ ] Mobile consideration: may want to skip video on low-bandwidth
      (use <source> with media query or JS check)
```

### 3.4 Video Embeds (Case Studies)
**Model: Cursor Auto**

```
Tasks:
- [ ] VideoEmbed component:
      - Parse YouTube URLs → embed URL with privacy-enhanced mode
      - Parse Vimeo URLs → embed URL
      - Responsive 16:9 iframe wrapper
      - Lazy load with loading="lazy"
- [ ] Support multiple videos per case study
```

### 3.5 Media Gallery (Case Studies)
**Model: Sonnet 4.6** 🛑  
**→ STOP:** Review 3.1–3.4 (contact form, hero video, embeds). Switch to **Sonnet 4.6**, then say: *"Continue from Phase 3.5 — MediaGallery component."*

```
Tasks:
- [ ] MediaGallery component:
      - Grid layout for BTS photos/stills
      - Lightbox on click (simple CSS/JS, no heavy lib)
      - Video items rendered as VideoEmbed
      - Images via Sanity image pipeline (responsive sizes, WebP)
- [ ] Integrate into case study page template
```

**✅ Phase 3 Checkpoint:** Contact form works end-to-end with spam protection. Videos play. Gallery works.

---

## Phase 4 — SEO, Agentic Search & Launch

### 4.1 Metadata & Open Graph
**Model: Opus 4.6** 🛑  
**→ STOP:** Review Phase 3 checkpoint. Switch to **Opus 4.6**, then say: *"Continue from Phase 4.1 — Metadata and Open Graph."*

SEO copy and structured data need precision. This is how Neil gets found.

```
Tasks:
- [ ] Root layout metadata:
      - Default title: "Neil Sandoz — Film Editor | Austin, TX"
      - Default description targeting key search terms
      - Theme color, icons
- [ ] Per-page metadata (using generateMetadata):
      - Home: "Neil Sandoz — Film Editor & Storyteller | Austin, Texas"
      - About: "About Neil Sandoz — Film Editor, Director & Creative Partner"
      - Case study: "{title} — Neil Sandoz | Film Editor" + project description
- [ ] Open Graph tags on all pages:
      - og:title, og:description, og:image, og:url, og:type
      - twitter:card, twitter:title, twitter:description, twitter:image
- [ ] OG image strategy:
      - Default: branded OG image with Neil's name/title
      - Case studies: project thumbnail as OG image
```

### 4.2 Structured Data (JSON-LD)
**Model: Opus 4.6**

```
Tasks:
- [ ] WebSite schema (root layout)
- [ ] Person schema (About page):
      - name, jobTitle, address (Austin, TX), email, telephone
      - sameAs: [forennmusic.com, any social links]
      - knowsAbout: ["Film Editing", "Documentary", "Commercial Video", ...]
- [ ] CreativeWork schema (each case study):
      - name, description, creator (Person ref), locationCreated
- [ ] VideoObject schema (case studies with video):
      - name, description, thumbnailUrl, uploadDate, contentUrl
- [ ] BreadcrumbList (all pages)
```

### 4.3 Technical SEO
**Model: Cursor Auto**

```
Tasks:
- [ ] app/sitemap.ts — dynamic sitemap from Sanity projects
- [ ] app/robots.ts — allow all, point to sitemap
- [ ] public/llms.txt — plain-text AI-readable summary:
      "Neil Sandoz is a film editor based in Austin, Texas.
       He specializes in documentary, commercial, and nonprofit filmmaking.
       He is available for freelance and full-time editing work.
       Contact: hello@neilsandoz.com | 512-801-1314
       Portfolio: neilsandoz.com"
- [ ] Canonical URLs on all pages
- [ ] Proper heading hierarchy (single h1 per page)
- [ ] Image alt text from Sanity (required field on all images)
- [ ] Semantic HTML throughout (<article>, <section>, <nav>, etc.)
```

### 4.4 Performance Audit
**Model: Cursor Auto**

```
Tasks:
- [ ] Run Lighthouse, target 90+ on all metrics
- [ ] Verify LCP image has priority prop
- [ ] Verify no CLS from font loading
- [ ] Check bundle size (no heavy deps)
- [ ] Test on mobile (3G throttle)
```

### 4.5 Deployment
**Model: Cursor Auto**

```
Tasks:
- [ ] git init, push to GitHub (public repo)
- [ ] Connect to Vercel
- [ ] Set environment variables in Vercel:
      NEXT_PUBLIC_SANITY_PROJECT_ID
      NEXT_PUBLIC_SANITY_DATASET
      SANITY_API_TOKEN
      RESEND_API_KEY
      TURNSTILE_SECRET_KEY
      NEXT_PUBLIC_TURNSTILE_SITE_KEY
- [ ] Configure custom domain (neilsandoz.com)
- [ ] Verify HTTPS, redirects (www → non-www)
- [ ] Test all pages on production
- [ ] Submit sitemap to Google Search Console
```

**✅ Phase 4 Checkpoint:** Site is live, SEO-optimized, AI-discoverable, and Neil can manage everything from /studio.

---

## Design Reference

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| background | `#e8dfd3` | Warm beige page bg |
| foreground | `#0a0a0a` | Near-black text |
| accent | `#00c884` | Green CTA buttons |
| accent-hover | `#00b070` | Green hover state |
| accent-red | `#c84630` | Terracotta — locations, roles |
| border | `#0a0a0a` | Form fields, outline buttons |
| muted | `#a09888` | Secondary text (estimated) |

### Typography
| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| Hero heading | Tropiline | Regular | 76px | -1.626px |
| Section heading | Tropiline | Regular | 48–56px | -0.64 to -1.626px |
| Card title | Inter | Black (900) | 24px | -0.48px |
| Body text | Inter | Regular (400) | 16–18px | — |
| Meta/labels | Azeret Mono | Regular | 14px | 0.28–0.35px |
| Buttons/UI | Tropiline Sans | Bold | 14px | 0.35px, uppercase |
| Nav links | Inter | Regular | 20px | -0.4px |

### Easing
| Use | Value |
|-----|-------|
| General enter | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Playful hover | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Fade/exit | `ease` or `ease-in-out` |

### Layout
- Page padding: 50px horizontal
- Work grid: 2 columns, 70px gap
- About grid: 2 columns, 64px gap
- Card thumbnails: 16:9 aspect ratio
- Nav height: 94px
- Footer: large SVG wordmark + 3-column bottom bar

---

## Case Studies Data

### 1. Open Your Eyes
- **Location:** Nairobi, Kenya
- **Role:** Director, Camera Operator, Editor, Project Manager, Sound Design, Color
- **Trailer:** https://youtu.be/zudyjGIrVZI?si=W1VDCL9bh9G_icMV
- **Press:** https://culturecustodian.com/neil-sandozs-open-your-eyes-documentary-underscores-the-reparative-effect-of-grassroots-targeted-sports/
- **Note:** Film in festival circulation — full doc cannot be shared publicly

### 2. Uchi – School of Fish
- **Location:** Remote - Houston & Austin, Texas
- **Role:** Editor, Motion Design, Sound Design, Music Supervision
- **Videos:**
  - https://vimeo.com/1147821185/98d0487a11
  - https://youtu.be/h1UfC4jy9V4
  - https://youtu.be/l9BEA1bDZjk
  - https://youtu.be/oD1GO5CfppE

### 3. The Golden People
- **Location:** Aswan, Egypt
- **Role:** Director, Camera Operator, Editor
- **Video:** https://youtu.be/8V2VTcmkoP4?si=DKVlywdzsJi5x6O1

### 4. Before You Believe
- **Location:** Remote - Houston, Texas
- **Role:** Editor
- **Video:** https://vimeo.com/1136198575

### 5. The Pan-African Academy of Christian Surgeons
- **Location:** Mandritsara, Madagascar
- **Role:** Project Manager, Director, Camera Operator, Editor, Script Writing
- **Videos:**
  - https://www.youtube.com/watch?v=NFXt4Od6x8o
  - https://www.youtube.com/watch?v=H0iI4f7QoPY

### 6. The Fork in the Road
- **Location:** Addis Ababa & Soddo, Ethiopia
- **Role:** Director, Camera Operator, Editor, Project Manager, Communications Coordinator, Script Writing, Custom Music Coordination
- **Video:** https://youtu.be/-exgXL3CnAo?si=9Hs4we5wWMKr7AuP

### 7. WellSky Brand Promo
- **Location:** Remote - Houston, TX
- **Role:** Editor, Animator, Music Coordinator
- **Video:** https://vimeo.com/385106794/a4bf200b87

---

## Key Links
- **Hero background video:** https://youtu.be/LDzrmm2YoGg
- **Edit reel:** https://youtu.be/rRqMH-W_4YY
- **Forenn Music:** https://forennmusic.com
- **Resume:** /Neil Sandoz_Editor_Resume_2026.pdf (hosted on site)
- **Figma designs:** https://www.figma.com/design/TCZNBTEwjwD3BEPN4TzSMO/Neil-Sandoz

---

## Notes
- Process page: hidden from nav for now, can be added as a route later
- Pattern Post: Neil may rebrand his editing business under this name — worth noting for future SEO pivots
- Hero video: self-hosted MP4 preferred over YouTube embed for seamless autoplay loop. Neil provides or we convert from YouTube source.
- Contact form submissions are stored in Sanity AND emailed via Resend — Neil sees them in both Studio and inbox
- All Sanity/Resend/Turnstile API keys go in Vercel environment variables only — never in the repo

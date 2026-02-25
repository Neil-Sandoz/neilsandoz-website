import type { Metadata } from "next";
import { Inter, Azeret_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  weight: ["400"],
});

const SITE_URL = "https://neilsandoz.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neil Sandoz — Film Editor | Austin, TX",
    template: "%s | Neil Sandoz",
  },
  description:
    "Film editor and storyteller based in Austin, Texas. Specializing in documentary, commercial, and nonprofit filmmaking worldwide. Available for freelance and full-time editing work.",
  keywords: [
    "film editor",
    "video editor",
    "Austin Texas",
    "documentary editor",
    "commercial editor",
    "freelance film editor",
    "Neil Sandoz",
    "Pattern Post",
  ],
  authors: [{ name: "Neil Sandoz", url: SITE_URL }],
  creator: "Neil Sandoz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Neil Sandoz — Film Editor",
    title: "Neil Sandoz — Film Editor & Storyteller | Austin, TX",
    description:
      "Film editor and storyteller based in Austin, Texas. Specializing in documentary, commercial, and nonprofit filmmaking worldwide.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Neil Sandoz — Film Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neil Sandoz — Film Editor & Storyteller | Austin, TX",
    description:
      "Film editor and storyteller based in Austin, Texas. Specializing in documentary, commercial, and nonprofit filmmaking worldwide.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${azeretMono.variable}`}>
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { HeroSection } from "../components/HeroSection";
import { SelectedWork } from "../components/SelectedWork";
import { getAllProjects, getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Neil Sandoz — Film Editor & Storyteller | Austin, Texas",
  description:
    "Film editor and storyteller based in Austin, Texas. Crafting documentary, commercial, and nonprofit films that connect stories to audiences worldwide.",
  openGraph: {
    title: "Neil Sandoz — Film Editor & Storyteller | Austin, Texas",
    description:
      "Film editor and storyteller based in Austin, Texas. Crafting documentary, commercial, and nonprofit films that connect stories to audiences worldwide.",
    url: "https://neilsandoz.com",
  },
};

export default async function Home() {
  const [projects, settings] = await Promise.all([
    getAllProjects(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <SelectedWork projects={projects} />
    </>
  );
}

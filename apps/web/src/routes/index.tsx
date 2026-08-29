import { metadata_homePage_description, metadata_homePage_title } from "@repo/i18n/messages";
import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/features/home/components";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${metadata_homePage_title()} | Lucas Castro` },
      { name: "description", content: metadata_homePage_description() },
      { property: "og:title", content: `${metadata_homePage_title()} | Lucas Castro` },
      { property: "og:description", content: metadata_homePage_description() },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <HeroSection />;
}

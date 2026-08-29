import { createFileRoute } from "@tanstack/react-router";
import profileData from "@/data/profile.json";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const baseUrl = profileData.website;

        const content = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});

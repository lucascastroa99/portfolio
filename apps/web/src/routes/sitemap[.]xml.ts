import { createFileRoute } from "@tanstack/react-router";
import profileData from "@/data/profile.json";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const baseUrl = profileData.website;
        const now = new Date().toISOString().split("T")[0];

        const pages = [
          "",
          "/about",
          "/experience",
          "/education",
          "/contact",
          "/legal/privacy-policy",
          "/legal/terms-of-service",
        ];

        const urls = pages
          .map(
            (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});

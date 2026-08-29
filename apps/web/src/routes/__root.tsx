import { getLocale } from "@repo/i18n/runtime";
import { useIsMobile } from "@repo/shared/hooks/use-mobile";
import { AppLayout } from "@repo/ui/components/app-layout";
import { ErrorPage } from "@repo/ui/components/error-page";
import { NotFound } from "@repo/ui/components/not-found";
import { ProgressProvider } from "@repo/ui/providers/progress-provider";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import { Toaster } from "@repo/ui/shadcn/sonner";
import { TooltipProvider } from "@repo/ui/shadcn/tooltip";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Outlet, Scripts, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import profileData from "@/data/profile.json";
import { RouterAdapter } from "@/libraries/router-adapter";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "Lucas Castro | Full Stack Developer",
      },
      {
        name: "description",
        content:
          "Full Stack Developer specializing in modern web technologies. Creating scalable and high-performance applications.",
      },
      {
        name: "keywords",
        content:
          "Full Stack Developer, React, Vue, Angular, Node.js, Python, .NET, Web Development, Frontend, Backend",
      },
      { name: "author", content: "Lucas Castro" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Lucas Castro | Full Stack Developer" },
      {
        property: "og:description",
        content: "Full Stack Developer specializing in modern web technologies.",
      },
      { property: "og:image", content: "https://github.com/lucascastroa99.png" },
      { property: "og:url", content: profileData.website },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@lucascastroa99" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      {
        rel: "canonical",
        href: profileData.website,
      },
    ],
    scripts: [
      {
        defer: true,
        src: "https://cloud.umami.is/script.js",
        "data-website-id": import.meta.env.VITE_UMAMI_WEBSITE_ID,
        "data-auto-track": "true",
        "data-exclude-hash": "true",
        "data-do-not-track": "true",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Lucas Castro",
          url: profileData.website,
          image: "https://github.com/lucascastroa99.png",
          jobTitle: "Full Stack Developer",
          sameAs: ["https://github.com/lucascastroa99", "https://linkedin.com/in/lucascastroa99"],
          knowsAbout: [
            "React",
            "Vue.js",
            "Angular",
            "Node.js",
            "Python",
            ".NET",
            "TypeScript",
            "Full Stack Development",
          ],
        }),
      },
    ],
  }),
  component: RootDocument,
  notFoundComponent: () => <NotFound />,
  errorComponent: ({ error, reset }) => <ErrorPage error={error} reset={reset} />,
});

function RootDocument() {
  const locale = getLocale();
  const isMobile = useIsMobile();
  const router = useRouter();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <ProgressProvider>
            <RouterAdapter router={router} />
            <TooltipProvider>
              <AppLayout>
                <Outlet />
              </AppLayout>
            </TooltipProvider>
            <Toaster />
          </ProgressProvider>
        </ThemeProvider>
        {import.meta.env.DEV && !isMobile && (
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
}

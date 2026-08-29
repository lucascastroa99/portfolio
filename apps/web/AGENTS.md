# AGENTS.md — Web

## Scope

Rules and architecture specific to apps/web. See the root AGENTS.md for repository-wide conventions.

## Context

SSR-first TanStack Start frontend for Lucas Castro's personal portfolio. Runs on port 3030 (`VITE_WEB_APP_PORT`, default 3030) and deploys as a Cloudflare Worker (`portfolio-web`). Bilingual (pt/en) via Paraglide JS, data-driven from static JSON (`profile.json` + `resume.json`). Solo project — no team, no backend API.

## Architecture

```
src/
├── config/                    # Environment variables (@t3-oss/env-core)
│   ├── env.client.ts          # Client: VITE_UMAMI_WEBSITE_ID
│   └── env.server.ts          # Server: VITE_WEB_APP_PORT (3030), VITE_WEB_DEVTOOLS_PORT (5030)
├── data/                      # Static JSON — typed, no API
│   ├── profile.json           # Personal: name, location, phone, email, github, linkedin, position (LocalizedString)
│   ├── resume.json            # Resume: summary, 6 experience, 1 project, 2 education, 1 certification, 7 skill groups, 2 languages (bilingual en/pt)
│   ├── types.ts               # LocalizedString, LocalizedArray, DateRange, ResumeData, PersonalData, etc.
│   └── index.ts               # Barrel: export { resume, personal }
├── features/                  # Feature modules — each with components/index.ts
│   ├── home/components/       # HeroSection (memoji + greeting + typewriter + CTAs) + Typewriter (ClientOnly + typewriter-effect + TECHNOLOGY_LABELS)
│   ├── about/components/      # ProfileCard (avatar+summary+badges) + SkillCategories (Iconify icons + SKILL_CATEGORIES) + LanguagesSection
│   ├── experience/components/ # ExperienceTimeline (Timeline + Card, formatDate/getDuration, renderWithBold) + ProjectsGrid
│   ├── education/components/  # EducationTimeline + CertificationsGrid
│   ├── contact/components/    # ContactInfo (Umami trackContactLink) + SocialLinks (SOCIAL_LINKS + TallyLink theme/locale-aware)
│   └── shared/components/     # PageContainer + PageHeader + Timeline/TimelineItem (pure CSS, no data deps)
├── libraries/                 # Infrastructure wiring
│   └── router-adapter.tsx     # RouterAdapter: bridges TanStack Router onBeforeNavigate/onResolved → ProgressProvider start/stop
├── routes/                    # TanStack Router file-based routes (createFileRoute)
│   ├── __root.tsx             # RootDocument: SEO (charset/viewport/keywords/author/robots), OG/Twitter, favicons/manifest, canonical/profile URL, JSON-LD Person, Umami script, ThemeProvider→ProgressProvider→RouterAdapter→TooltipProvider→AppLayout→Outlet, TanStackDevtools (dev, non-mobile)
│   ├── index.tsx              # / → HeroSection (no pendingComponent)
│   ├── about.tsx              # /about → ProfileCard + SkillCategories + LanguagesSection (+ AboutSkeleton)
│   ├── experience.tsx         # /experience → ExperienceTimeline + ProjectsGrid (+ ExperienceSkeleton)
│   ├── education.tsx          # /education → EducationTimeline + CertificationsGrid (+ EducationSkeleton)
│   ├── contact.tsx            # /contact → ContactInfo + SocialLinks (+ ContactSkeleton)
│   ├── legal/privacy-policy.tsx + legal/terms-of-service.tsx  # /legal/* → prose via i18n (no skeleton)
│   ├── sitemap[.]xml.ts       # /sitemap.xml → server GET: 7 URLs, priority 1.0/0.8, monthly, 86400s cache (baseUrl from profile.json)
│   └── robots[.]txt.ts        # /robots.txt → server GET: Allow: /, Sitemap ref from profile.json, 86400s cache
├── router.tsx                 # getRouter(): createTanStackRouter({routeTree, scrollRestoration, defaultPreload: "intent"})
├── server.ts                  # Cloudflare Worker entry: paraglideMiddleware(req, () => handler.fetch(req)) — avoids i18n redirect loops
├── routeTree.gen.ts           # Auto-generated (ssr: true) — do not edit
└── styles.css                 # @repo/ui/globals.css + tailwindcss + tw-animate-css + @repo/ui/base.css, @source @repo/ui

components/                    # Exists but empty — no app-level shared components outside features/
```

**Key patterns:**
- **SSR-first (Cloudflare):** `vite.config.ts` plugins `cloudflare({viteEnvironment:{name:"ssr"}})` + `tanstackStart()` + `tailwindcss()`; `server.ts` Worker `fetch` wraps `paraglideMiddleware`; `wrangler.jsonc` (`portfolio-web`, `nodejs_compat`, `2025-09-24`) + `publicDir: ../../packages/assets/public`.
- **File-based routing + SEO:** Every page `head()` uses `metadata_*` i18n messages (`title | Lucas Castro`, `description`, `og:title/description`); `__root` holds profile-based canonical/OG/Twitter/favicon/manifest + JSON-LD `Person` schema (name, url, sameAs, knowsAbout) + Umami script (`VITE_UMAMI_WEBSITE_ID`, `data-do-not-track`, `data-exclude-hash`).
- **Data-driven static:** `import { resume, personal } from "@/data"` at module level; no `useQuery`/`useMutation`; `local(value, locale)` resolves `LocalizedString/LocalizedArray`; `formatDate`/`getDuration` via `Temporal`.
- **Skeletons:** 4 routes (`about`, `contact`, `education`, `experience`) expose `pendingComponent` with `@repo/ui/shadcn/skeleton`; home + legal have none.
- **SSR safety:** `Typewriter` DOM-mutating lib wrapped in `<ClientOnly fallback>`; no `window`/`document` at module level; TallyLink mounts theme-aware form via `useEffect`.
- **Progress:** `RouterAdapter` subscribes to `onBeforeNavigate`/`onResolved` to drive `@repo/ui/providers/progress-provider`.
- **No server state lib:** Query/nuqs/Zustand removed. Future blog/content will use `createServerFn` + direct DB calls, not TanStack Query.

## Rules

- **SSR compatibility:** All components must be SSR-safe. No `window`/`document` at module level — use `useEffect` or browser guards. Wrap DOM libs (e.g. `typewriter-effect`) in `<ClientOnly>`.
- **Server functions:** Use `createServerFn({ method: 'GET' })` for future data fetching. Always validate input with Zod. Current data is static JSON — no server function needed.
- **Path aliases:** Use `@/` for `src/` imports. Use `#components/`, `#hooks/` only inside `@repo/ui`. Never relative `../../`.
- **State management:** No Zustand, no nuqs, no TanStack Query. Client state via `useState`/`useContext` + `@repo/shared` hooks. URL state via TanStack Router `search` params. Re-add libs only when a feature requires them.
- **Component structure:** One component per file. Co-locate types/styles with the component. Every feature `components/` must have `index.ts` barrel.
- **Error boundaries:** Wrap feature routes in `<ErrorBoundary>` via `@repo/ui/components/error-page`. Root already provides `errorComponent` + `notFoundComponent`.
- **Styling:** TailwindCSS 4 + `tw-animate-css` + `@repo/ui` tokens; `class` attribute toggles light/dark via `ThemeProvider`.

## Related

- Parent: ../AGENTS.md
- README: ./README.md

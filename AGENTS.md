# AGENTS.md — Portfolio

## Scope

Repository-wide architecture, conventions, and rules for the Portfolio monorepo. All child AGENTS.md files inherit from this.

## Context

Lucas Castro's personal developer portfolio — a bilingual (pt/en), SSR-first TanStack Start (React 19) web app deployed as a Cloudflare Worker. Thin monorepo: one deployable app (web) + six shared packages. Solo project by Lucas Castro (@lucascastroa99) — no team.

**Users:** Recruiters, hiring managers, peers, and the author himself.
**Data:** Static, typed JSON (`apps/web/src/data/profile.json` + `resume.json`) rendered through feature modules — no database, no backend API.
**Out of scope (current):** CMS, blog, backend API, auth, multi-tenancy, microservices. Future blog/content will use direct server-function DB calls without TanStack Query.

## Architecture

```
apps/
└── web/                        SSR-first TanStack Start (React 19, Vite 8, port 3030, Cloudflare Worker)
     src/
     ├── config/                env.client.ts / env.server.ts (@t3-oss/env-core)
     ├── data/                  profile.json + resume.json + types.ts (bilingual, typed)
     ├── features/              home / about / experience / education / contact + shared (page-layout, timeline)
     ├── libraries/             router-adapter.tsx (progress bar)
     ├── providers/             (none — static JSON, no QueryProvider)
     └── routes/                __root.tsx + index + about + experience + education + contact
                               + legal/{privacy-policy,terms-of-service} + sitemap.xml + robots.txt

packages/
├── ui/                         Radix + Base UI + 53 shadcn/ui primitives + app shell (header/footer/mobile-menu/language-selector/download-resume/theme-toggle/navigation-links/render-bold) + providers/{theme,progress} + styles/{globals,base}.css
├── i18n/                       Paraglide JS — messages/{pt,en}.json + paraglide/ (generated, committed) + project.inlang/
├── assets/                     images/{en.svg,es.svg,pt.svg,symbol.webp,tally-logo.png} + public/{favicons,manifest.json,documents/*.pdf}
├── shared/                     hooks/{use-debounce,use-fullscreen,use-mobile,use-file-upload,use-locale-change} + utilities/{temporal,currency,format,date,locale,analytics,head} + constants/{navigation,languages,social-links,tally,skill-categories,technology,validation}
├── env/                        schemas/web.schema.ts (webServerSchema + webClientSchema, Zod)
└── biome-config/               base.json (Biome 2.5.9, 100 cols, organizeImports)
```

**Dependency flow:** `apps → packages → packages`. Apps never depend on other apps. Packages never depend on apps.

```
web → @repo/ui → @repo/assets, @repo/shared, @repo/i18n
web → @repo/shared, @repo/i18n, @repo/env, @repo/assets (direct)
all apps/packages → @repo/biome-config
```

See each child AGENTS.md for module-specific architecture details.

## Rules

### Naming

- `kebab-case` for files and folders
- `PascalCase` for React components
- `camelCase` for variables, functions, instances
- `SCREAMING_SNAKE_CASE` for constants
- Suffix patterns: `*.schema.ts`, `*.types.ts`, `*.constants.ts`
- Hooks: `use-*.ts`
- Avoid vague names: `utils.ts`, `helpers.ts`, `common.ts`

### TypeScript

- `strict: true` always
- Prefer `unknown` over `any`
- No `@ts-ignore` or `@ts-expect-error` without justification
- Prefer `as const` over `enum`
- Zod schemas for runtime validation
- Explicit function return types

### Imports

- Use path aliases (`@/` → `apps/web/src/*`, `#components/*` → `packages/ui/src/components/*.tsx`) — never relative paths (resolved via `tsconfigPaths: true` in `vite.config.ts`)
- Every folder with exports must have an `index.ts`
- No deep internal imports into packages

### Code Style

- Small functions, single responsibility
- Early returns over nested conditionals
- Immutable patterns preferred
- No magic strings or numbers — extract to constants
- Comments explain WHY, not WHAT

### State Management

Current portfolio is **static JSON-driven** — no API, no URL-state, no client-store libraries. Infra is intentionally minimal:

| State Category | Tool | Status |
|----------------|------|--------|
| Server state | Static `profile.json` + `resume.json` imported at module level | No TanStack Query — removed. Future blog/content will use direct server-function DB calls, not Query |
| Client state | React `useState` / `useContext` + `@repo/shared` hooks | No Zustand installed — intentionally omitted for static portfolio |
| URL state | TanStack Router native `search` params | No nuqs installed — removed; re-add only if URL-shareable filters require it |

- Future server state must not be duplicated into client stores — derive via selectors/`useMemo` when Query is reintroduced
- When/if nuqs is re-added, consumers must be wrapped in `<Suspense>` via `NuqsSuspense`
- Each future Zustand store must be scoped per feature — no mega-stores

### Security

- No secrets in client code — env vars never appear in frontend bundles
- Centralized environment variable validation — never access `process.env` ad-hoc
- Structured logging — no stack traces to clients

### Shared Code Organization

- `features/shared/` is forbidden in frontend apps — no cross-feature shared folders
- **Hooks** → `packages/shared/src/hooks/` (import from `@repo/shared/hooks/*`)
- **Components** → `packages/ui/src/components/` (import from `@repo/ui`)
- Never duplicate a component or hook across apps — promote to the correct package

### Git Ignore

Root `.gitignore` contains all shared ignore patterns (dependencies, build outputs, env files, monorepo tooling, editor/OS). Child `.gitignore` files must only contain entries unique to that module. Before adding an entry to a child `.gitignore`, verify it is not already in the root — if it is, it applies everywhere.

**Root-owned categories:**
- **Dependencies:** `node_modules`, `.pnp`, `.pnp.js`
- **Environment variables:** `.env*` (negate `!.env.example` locally if needed)
- **Build outputs:** `dist`, `dist-ssr`, `build`, `out/`, `.next/`
- **Testing:** `coverage`
- **Monorepo tooling:** `.turbo`, `.vercel`, `.wrangler`
- **Framework caches:** `.tanstack`, `.nitro`, `.vinxi`, `.output`, `__unconfig*`
- **Debug & logs:** `npm-debug.log*`, `yarn-debug.log*`, `yarn-error.log*`, `pnpm-debug.log*`, `*.log`
- **Editor & OS:** `.vscode/*` (negate `!.vscode/extensions.json`), `.idea`, `.DS_Store`, `*.suo`, `*.ntvs*`, `*.njsproj`, `*.sln`, `*.sw?`
- **Misc:** `*.pem`, `*.local`

**Rule:** Never duplicate a root-owned entry in a child `.gitignore`. If a module needs to un-ignore something that root ignores, use `!pattern` in the module's file.

### Git & CI/CD

- Conventional Commits: `type(scope): description`
- Types: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `style`
- Scopes: `web`, `ui`, `i18n`, `shared`, `assets`, `env`, `biome`, `deps`, `docs`
- Run `pnpm biome:check` and `pnpm typescript:check` before committing
- No direct pushes to `main` — PRs with review

## Decisions

- **2026-07-24** — TanStack Start for web SSR over Next.js. File-based routing with Vinxi server, deeper React integration. Tradeoff: newer framework, smaller ecosystem.
- **2026-07-24** — shadcn/ui over Radix alone or Material UI. Own the component code, full customization. Tradeoff: maintenance burden vs. ready-made component libraries.
- **2026-07-24** — Turborepo for monorepo orchestration. Remote caching, incremental builds, pnpm workspace integration. Tradeoff: external dependency vs. native pnpm workspaces alone.
- **2026-07-24** — pnpm over npm/yarn. Strict dependency isolation, efficient disk usage, native workspace support. Tradeoff: occasional compatibility issues with packages expecting npm layout.
- **2026-07-29** — Eliminated shared `frontend.schema.ts`. Each frontend app now owns its own client env schema in `packages/env/src/schemas/{app}.schema.ts`. No cross-app schema sharing for client env vars. Frontend env vars use `VITE_{APP}_APP_PORT`, `VITE_{APP}_DEVTOOLS_PORT`, `VITE_{APP}_APP_URL` pattern. All `.env.*` variants (`.env`, `.env.example`, `.env.production`, `.env.docker`) must have identical structure.
- **2026-08-29** — Removed `VITE_EXTERNAL_API_URL`. Portfolio is static JSON-driven, no external API. Re-add only when a CMS/backend exists.
- **2026-08-29** — Removed TanStack Query, nuqs, and Zustand. Static portfolio has no server/URL/client-store libraries. Future blog/content will use direct server-function DB calls, not Query. Tradeoff: re-install is one `pnpm add` if needed.
- **2026-08-29 (superseded)** — Canonical URL migrated Vercel → Cloudflare Workers. `portfolio-web` Worker is the deployment target. `VITE_WEB_APP_URL` defaults to the Workers URL; `profile.json` website and `__root.tsx` SEO canonical/og:url follow it. Vercel URL kept as legacy redirect if needed.
- **2026-08-29** — Superseding the previous URL configuration decision, `VITE_WEB_APP_URL` was removed. Canonical metadata, sitemap URLs, and `robots.txt` now derive from `profile.json.website` as the single source of truth.
- **2026-08-29** — Cloudflare Workers via `wrangler` + `@cloudflare/vite-plugin` (`viteEnvironment ssr`) for SSR edge deployment.
- **2026-08-29** — Umami cookieless analytics (`cloud.umami.is/script.js`, `data-do-not-track`, `data-exclude-hash`) over Google Analytics. Privacy-first, no cookies.
- **2026-08-29** — Paraglide JS with Portuguese as source language (`pt.json` truth), compiled to `src/paraglide` with committed output for CI.
- **2026-08-29** — TailwindCSS 4 + `tw-animate-css` + `@repo/ui/globals.css` token system for theming (`class` attribute light/dark).
- **2026-08-29** — Data-driven resume via static typed JSON (`profile.json` + `resume.json`) with `LocalizedString/LocalizedArray` + `local(locale)` helper. No DB/API. Tradeoff: deploy to update CV.
- **2026-08-29** — Solo authorship clarified. Repository is owned and maintained solely by Lucas Castro (@lucascastroa99). License changed `Proprietary → MIT`.
- **2026-08-29** — Conventional Commit scopes expanded `web,ui,i18n,deps → web,ui,i18n,shared,assets,env,biome,deps,docs`.

## Related

- Children:
  - [Web](apps/web/AGENTS.md)
  - [UI](packages/ui/AGENTS.md)
  - [i18n](packages/i18n/AGENTS.md)
  - [Assets](packages/assets/AGENTS.md)
  - [Biome Config](packages/biome-config/AGENTS.md)
  - [Shared](packages/shared/AGENTS.md)
  - [Env](packages/env/AGENTS.md)
- README: [./README.md](README.md)

<!-- last-sync: 2137ebf @ 2026-08-29T17:22:38Z -->

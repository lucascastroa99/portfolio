# Portfolio — Lucas Castro

Bilingual (pt/en), SSR-first personal developer portfolio built with TanStack Start (React 19) and deployed as a Cloudflare Worker.

## Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [⚙️ Configuration](#️-configuration)
- [▶️ Usage](#️-usage)
- [🏗️ Project Structure](#️-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)
- [Learn More](#learn-more)

## ✨ Features

- **SSR-first** on Cloudflare Workers (Vite 8 + `@cloudflare/vite-plugin`, `wrangler`)
- **Bilingual pt/en** with [Paraglide JS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs) — Portuguese is source of truth, committed generated output
- **5 portfolio sections + 2 legal pages**: home, about, experience, education, contact + privacy-policy/terms-of-service + `sitemap.xml`/`robots.txt`
- **Data-driven** content from typed JSON (`profile.json` + `resume.json`) with `LocalizedString`/`LocalizedArray` + `local(locale)` helper — no DB/API
- **Dark/light theming** via `class` attribute + `ThemeProvider`, responsive via `useIsMobile` (768px)
- **SEO**: Open Graph/Twitter, canonical, JSON-LD `Person` schema, favicons/manifest, dynamic `sitemap.xml`/`robots.txt`
- **Privacy-first analytics** via [Umami Cloud](https://umami.is) (`cloud.umami.is/script.js`, `data-do-not-track`, `data-exclude-hash`, custom `contact-link-click` events)
- **Shared UI library** — 53 shadcn/ui primitives (Radix + Base UI) + app shell (header/footer/mobile-menu/language-selector/download-resume/theme-toggle/navigation-links/render-bold)
- **Typewriter hero** (`typewriter-effect` wrapped in `<ClientOnly>` for SSR safety) cycling `TECHNOLOGY_LABELS`
- **Zod-validated env** via `@t3-oss/env-core` + `@repo/env` schemas

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TanStack Start 1.168, TanStack Router (file-based), Vite 8 |
| **Styling** | TailwindCSS 4, `tw-animate-css`, Class Variance Authority, `tailwind-merge` |
| **UI** | Radix UI 1.6, Base UI 1.7, 53 shadcn/ui primitives, `lucide-react`, `@iconify-icon/react` |
| **Monorepo** | pnpm 11.20 workspaces (catalog strict), Turborepo 2.10 |
| **i18n** | Inlang / Paraglide JS 2.25 (pt source) |
| **Analytics** | Umami Cloud (cookieless) |
| **Deploy** | Cloudflare Workers (`wrangler` 4.127, `@cloudflare/vite-plugin`) |
| **Lint/Types** | Biome 2.5, TypeScript 7 strict |
| **Validation** | Zod 4.5 + `@t3-oss/env-core` 0.13 |
| **Animation** | `typewriter-effect` 2.22, `@bprogress/react`, `embla-carousel` |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 24
- **pnpm** ≥ 11.20.0

### Installation

```bash
# Clone the repository
git clone https://github.com/lucascastroa99/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## ⚙️ Configuration

Environment variables are validated at startup via Zod schemas in `packages/env` (`schemas/web.schema.ts`) using `@t3-oss/env-core`. Each app has its own `.env` file — see `apps/web/.env.example`.

| Variable | Where | Required | Default | Description |
|----------|-------|----------|---------|-------------|
| `VITE_UMAMI_WEBSITE_ID` | web client | Yes | — | Umami Cloud website ID (`cloud.umami.is/script.js` `data-website-id`) |
| `VITE_WEB_APP_PORT` | web server | No | `3030` | Vite dev server port (read in `vite.config.ts` via `serverEnv`) |
| `VITE_WEB_DEVTOOLS_PORT` | web server | No | `5030` | TanStack devtools port |

> After editing `packages/i18n/src/messages/*.json`, run `pnpm --filter=@repo/i18n compile` — `src/paraglide/` is committed generated output.

## ▶️ Usage

The dev command starts the web dev server:

```bash
pnpm dev
```

| Service | URL | Type |
|---------|-----|------|
| Web | `http://localhost:3030` | SSR (TanStack Start on Cloudflare Workers) |

### Common Tasks

```bash
# i18n compilation (after editing messages)
pnpm --filter=@repo/i18n compile

# Lint and format
pnpm biome:check

# Type check all packages
pnpm typescript:check

# Production build + deploy
pnpm deploy:web   # turbo build + wrangler deploy (portfolio-web Worker)
```

## 🏗️ Project Structure

```
Portfolio
├── apps/
│   └── web/              → TanStack Start (SSR, Vite 8, port 3030, Cloudflare Worker)
│        src/
│        ├── config/       env.client.ts / env.server.ts (@t3-oss/env-core)
│        ├── data/         profile.json + resume.json + types.ts (bilingual typed)
│        ├── features/     home / about / experience / education / contact + shared (page-layout, timeline)
│        ├── libraries/    router-adapter.tsx (progress bar)
│        ├── routes/       __root.tsx + index + about + experience + education + contact + legal/{privacy-policy,terms-of-service} + sitemap.xml + robots.txt
│        ├── router.tsx    createTanStackRouter (scrollRestoration, preload intent)
│        ├── server.ts     Cloudflare fetch → paraglideMiddleware → TanStack Start handler
│        └── styles.css    @repo/ui/globals.css + tailwindcss + tw-animate
├── packages/
│   ├── ui/               → Radix + Base UI + 53 shadcn/ui primitives + app shell (header/footer/mobile-menu/language-selector/download-resume/theme-toggle/navigation-links/render-bold) + providers/{theme,progress} + styles/{globals,base}.css
│   ├── i18n/             → Paraglide JS (pt source) — messages/{pt,en}.json + paraglide/ (generated) + project.inlang/
│   ├── assets/           → images/{en.svg,es.svg,pt.svg,symbol.webp,tally-logo.png} + public/{favicons,manifest.json,documents/*.pdf}
│   ├── shared/           → hooks/{use-debounce,use-fullscreen,use-mobile,use-file-upload,use-locale-change} + utilities/{temporal,currency,format,date,locale,analytics,head} + constants/{navigation,languages,social-links,tally,skill-categories,technology,validation}
│   ├── env/              → schemas/web.schema.ts (webServerSchema + webClientSchema, Zod)
│   └── biome-config/     → base.json (Biome 2.5, 100 cols, organizeImports)
```

See [AGENTS.md](AGENTS.md) for full architecture, rules, and decisions.

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the conventions in [AGENTS.md](AGENTS.md)
3. Run `pnpm biome:check` and `pnpm typescript:check` before committing
4. Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`
5. Open a pull request for review — no direct pushes to `main`

**Scopes:** `web`, `ui`, `i18n`, `shared`, `assets`, `env`, `biome`, `deps`, `docs`

## 📄 License

MIT — see [LICENSE](LICENSE).

## 👤 Author

**Lucas Castro** ([@lucascastroa99](https://github.com/lucascastroa99)) — [lucascastro.a99@gmail.com](mailto:lucascastro.a99@gmail.com)

Solo project — owned and maintained by the author.

---

## Learn More

Full architecture, conventions, and decision history: see [AGENTS.md](AGENTS.md).

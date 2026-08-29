# AGENTS.md — i18n

## Scope

Rules and architecture specific to packages/i18n. See the root AGENTS.md for repository-wide conventions.

## Context

Inlang / Paraglide JS (2.25) i18n package. Provides runtime messages and SSR middleware for the web app (and transitively ui via language-selector). Portuguese is the source language; English is translated.

## Architecture

```
src/
├── messages/              # Source messages (pt.json, en.json) — $schema: https://inlang.com/schema/inlang-message-format
│   ├── pt.json            # Source of truth (Portuguese) — 120+ keys
│   └── en.json            # English translation — must stay in sync with pt.json keys
├── project.inlang/        # Inlang project config (settings.json — sourceLanguage: pt)
└── paraglide/             # Generated output (DO NOT EDIT) — committed for CI
    ├── messages/          # Per-key modules (common_backtohome2.js, metadata_homePage_title1.js, pages_home_greetingPrefix.js, etc.)
    ├── runtime.js / server.js / registry.js / messages.js  # Runtime + SSR middleware
    └── *.d.ts            # Type declarations
```

**Scripts:**

| Command | Effect |
|---------|--------|
| `pnpm --filter=@repo/i18n compile` | `paraglide-js compile --project ./src/project.inlang --outdir ./src/paraglide --emit-ts-declarations` |
| `pnpm --filter=@repo/i18n watch` | Same with `--watch` |

**Dependency flow:**
```
web → @repo/i18n
ui → @repo/i18n (via language-selector, theme-aware)
```

**Message key conventions (actual keys — not placeholders):**

- **Common:** `common_backToHome`, `common_lastUpdated`, `common_savePreferences`, `common_cancel`, `common_save`
- **Metadata (per-page SEO):** `metadata_homePage_title`, `metadata_aboutPage_title`, `metadata_experiencePage_title`, `metadata_educationPage_title`, `metadata_contactPage_title`, `metadata_privacyPolicy_title`, `metadata_termsOfService_title` + `_description`
- **Header:** `components_headerBody_home/about/experience/education/contact/language/theme/resume/light/dark/...` + `components_footer_termsOfService/privacyPolicy/madeWith/author` + `components_notFound_*` + `components_error_*`
- **Pages:** `pages_home_greetingPrefix/typing/presentation/aboutMe/contactMe`, `pages_about_title/languages`, `pages_experience_title/professional/present/projects`, `pages_education_title/academic/certifications/score`, `pages_contact_title/subtitle/social/info_*`, `pages_privacyPolicy_*`, `pages_termsOfService_*`
- **Interpolation:** `{variable}` syntax; plural `{count, plural, ...}` where present
- **No HTML** in messages — formatting (e.g. `renderWithBold`) happens in components

## Rules

- **Never edit `src/paraglide/`** — it is generated output.
- **Always compile after changing messages:** `pnpm --filter=@repo/i18n compile` (or `watch`).
- **Commit generated output** — CI needs `src/paraglide/` without running compile.
- **Source language is Portuguese** — `pt.json` is truth; `en.json` must have identical keys.

**Import paths:**

| Path | Provides |
|------|----------|
| `@repo/i18n/messages` | Compiled message functions (e.g. `metadata_homePage_title()`) |
| `@repo/i18n/runtime` | `getLocale()`, `setLocale()` (used by `useLocaleChange`) |
| `@repo/i18n/server` | `paraglideMiddleware` (used in `apps/web/src/server.ts`) |

## Related

- Parent: ../AGENTS.md

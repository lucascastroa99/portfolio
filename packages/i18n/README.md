# @repo/i18n

Inlang / Paraglide JS (2.25) internationalization — Portuguese source, English translation, committed generated output.

## Structure

```
src/
├── messages/   pt.json, en.json  (source — pt is truth)
├── project.inlang/  settings.json
└── paraglide/  generated output (DO NOT EDIT, committed for CI)
```

## Installation

```bash
pnpm install
pnpm --filter=@repo/i18n compile
```

## Scripts

| Command | Effect |
|---------|--------|
| `pnpm --filter=@repo/i18n compile` | `paraglide-js compile --project ./src/project.inlang --outdir ./src/paraglide --emit-ts-declarations` |
| `pnpm --filter=@repo/i18n watch` | Same with `--watch` |

## Usage

```ts
import { pages_home_greetingPrefix } from "@repo/i18n/messages";
import { getLocale, setLocale } from "@repo/i18n/runtime";
import { paraglideMiddleware } from "@repo/i18n/server";

// Runtime
const locale = getLocale(); // "pt" | "en"
pages_home_greetingPrefix(); // localized string

// Server (apps/web/src/server.ts)
return paraglideMiddleware(req, () => handler.fetch(req));
```

## Message Keys

- `common_*` — shared UI (backToHome, cancel, save, etc.)
- `metadata_*Page_*` — per-page SEO title/description
- `components_headerBody_*` / `components_footer_*` / `components_error_*` / `components_notFound_*`
- `pages_home_*`, `pages_about_*`, `pages_experience_*`, `pages_education_*`, `pages_contact_*`, `pages_privacyPolicy_*`, `pages_termsOfService_*`

Interpolation: `{variable}`, plural: `{count, plural, ...}`. No HTML in messages.

## Rules

- Never edit `src/paraglide/` — generated.
- Always compile after editing `messages/*.json` and commit the output.
- `pt.json` is source of truth — `en.json` must have identical keys.

See [AGENTS.md](./AGENTS.md) for full conventions.

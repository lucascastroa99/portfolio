# @repo/shared

Centralized dependency hub + framework-agnostic hooks, utilities, and constants.

## Installation

```bash
pnpm install
```

Private `workspace:*` package. Only install point for `temporal-polyfill` — other packages must import via `@repo/shared`.

## Exports

| Import | What's Available |
|--------|-----------------|
| `@repo/shared/constants/*` | `navigation.ts` (`NAV_ITEMS`), `languages.ts` (`LANGUAGES_ARRAY`), `social-links.ts` (`SOCIAL_LINKS`, `TALLY_FORMS`), `skill-categories.ts` (`SKILL_CATEGORIES`), `technology.ts` (`TECHNOLOGY_LABELS`), `validation.ts` |
| `@repo/shared/hooks/*` | `use-debounce.ts`, `use-fullscreen.ts`, `use-mobile.ts`, `use-file-upload.ts`, `use-locale-change.ts` |
| `@repo/shared/utilities/*` | `temporal.ts` (Temporal↔Date), `currency.ts` (`formatCurrency`), `format.ts` (`formatPhone`, `formatCnpj`), `date.ts` (`formatDate`, `getDuration`), `locale.ts` (`local`), `analytics.ts` (`trackContactLink`), `head.ts` (`APP_NAME`, `withSiteTitle`) |

## Usage

```ts
import { useIsMobile } from "@repo/shared/hooks/use-mobile";
import { formatDate, getDuration } from "@repo/shared/utilities/date";
import { local } from "@repo/shared/utilities/locale";
import { trackContactLink } from "@repo/shared/utilities/analytics";
import { NAV_ITEMS } from "@repo/shared/constants/navigation";
import { SKILL_CATEGORIES } from "@repo/shared/constants/skill-categories";
```

## Key Helpers

- `plainDateToDate` / `dateToPlainDate` / `instantToDate` / `dateToInstant` — timezone-safe Temporal conversions
- `formatDate("2024-12", "pt") → "Dez 2024"` / `getDuration(start, end, locale)` — via `Temporal.PlainDate`
- `local(value, locale)` — resolves `LocalizedString|LocalizedArray` to `pt` vs `en`
- `APP_NAME = "Lucas Castro"` + `withSiteTitle(title?)`

See [AGENTS.md](./AGENTS.md) for full architecture and conventions.

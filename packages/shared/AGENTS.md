# AGENTS.md — Shared

## Scope

Rules and architecture specific to packages/shared. See the root AGENTS.md for repository-wide conventions.

## Context

Centralized dependency hub and framework-agnostic utilities for the Portfolio monorepo. Single install point for `temporal-polyfill` plus hooks, utilities, and constants consumed by `web` and `ui`.

## Architecture

```
src/
├── hooks/
│   ├── use-debounce.ts        # useDebounce<T>(value, delay) — delayed value via useEffect + setTimeout
│   ├── use-fullscreen.ts      # useFullscreen() — document.fullscreenElement wrapper (enter/exit/toggle + isFullscreen)
│   ├── use-mobile.ts          # useIsMobile() — matchMedia (max-width:767px), SSR-safe (false)
│   ├── use-file-upload.ts     # useFileUpload({maxSize, supportedFormats, maxFiles, onFileAccepted, onError}) — drag&drop, MIME map, formatFileSize, dragCounter
│   └── use-locale-change.ts   # useLocaleChange() — setLocale via @repo/i18n/runtime + useTransition (isPending)
├── utilities/
│   ├── temporal.ts            # Temporal ↔ Date: plainDateToDate, dateToPlainDate, instantToDate, dateToInstant
│   ├── currency.ts            # formatCurrency(value: number) → BRL string (pt-BR Intl.NumberFormat)
│   ├── format.ts              # formatPhone(digits), formatCnpj(digits)
│   ├── date.ts                # formatDate("YYYY-MM", locale) → "Dez 2024"/"Dec 2024"; getDuration(start,end,locale) → localized years/months via Temporal + Intl.RelativeTimeFormat
│   ├── locale.ts              # local<T extends LocalizedString|LocalizedArray>(value, locale) → string|string[] (pt vs en)
│   ├── analytics.ts           # trackContactLink(ContactLinkName), trackResumeDownload(ResumeLanguage) via window.umami (guarded window check)
│   ├── head.ts                # APP_NAME = "Lucas Castro"; withSiteTitle(title?) → {meta:[{title}]}
│   └── types.ts               # LocalizedString, LocalizedArray, DateRange (re-exported)
├── constants/
│   ├── navigation.ts          # NAV_ITEMS (5 links: /,/about,/experience,/education,/contact)
│   ├── languages.ts           # LANGUAGES_ARRAY (en-us/pt-br + Iconify flags circle-flags:us/br)
│   ├── social-links.ts        # SOCIAL_LINKS (5: github/linkedin/email/whatsapp/telegram) + TALLY_FORMS (4 variants en/pt × light/dark)
│   ├── skill-categories.ts    # SKILL_CATEGORIES (6 groups, 39 skills with Iconify icons, monotone flag)
│   ├── technology.ts          # TECHNOLOGY_LABELS (39 entries, used by typewriter)
│   ├── validation.ts          # Shared validation constants
│   └── (analytics/head/locale re-exported via utilities)
└── (no stores, no API clients)
```

**Dependency flow:**
```
web, ui → @repo/shared
```

**Export paths:**

| Import Path | What's Available |
|-------------|-----------------|
| `@repo/shared/constants/*` | `navigation.ts` (NAV_ITEMS), `languages.ts`, `social-links.ts` (SOCIAL_LINKS, TALLY_FORMS), `skill-categories.ts` (SKILL_CATEGORIES), `technology.ts` (TECHNOLOGY_LABELS), `validation.ts` |
| `@repo/shared/hooks/*` | `use-debounce.ts`, `use-fullscreen.ts`, `use-mobile.ts`, `use-file-upload.ts`, `use-locale-change.ts` |
| `@repo/shared/utilities/*` | `temporal.ts`, `currency.ts`, `format.ts`, `date.ts` (formatDate/getDuration), `locale.ts` (local), `analytics.ts`, `head.ts` (APP_NAME/withSiteTitle) |

## Rules

- **Single install point for Temporal:** No other package should depend on `temporal-polyfill` directly — import from `@repo/shared` instead.
- **No `date-fns` or native `Date`:** Use `temporal-polyfill` via `@repo/shared/utilities/{temporal,date}` for all date/time logic.
- **Validation constants are single source of truth:** Never hardcode limits elsewhere; import from `constants/validation.ts`.
- **Analytics is Umami-only:** Use `trackContactLink`/`trackResumeDownload` (window.umami guard). Don't add GA/gtag.

**Key helpers:**
- `plainDateToDate` / `dateToPlainDate` — Local date components (timezone-safe)
- `instantToDate` / `dateToInstant` — Epoch-based for DB I/O
- `formatCurrency(value)` — Number to BRL locale string
- `formatPhone(digits)` — `(XX) XXXXX-XXXX` / `(XX) XXXX-XXXX`
- `formatCnpj(digits)` — `XX.XXX.XXX/XXXX-XX`
- `formatDate("YYYY-MM", locale)` — `Dez 2024` (pt) / `Dec 2024` (en) via Temporal
- `getDuration(start, end, locale)` — localized `years, months` via `Temporal.PlainDate.until` + `Intl.RelativeTimeFormat`
- `local(value, locale)` — resolves `LocalizedString|LocalizedArray` to `pt` vs `en`
- `APP_NAME` / `withSiteTitle(title?)` — canonical app name `Lucas Castro`

## Related

- Parent: ../AGENTS.md

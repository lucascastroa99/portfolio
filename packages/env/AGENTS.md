# AGENTS.md — Env

## Scope

Rules and architecture specific to packages/env. See the root AGENTS.md for repository-wide conventions.

## Context

Centralized environment variable validation for the Portfolio monorepo. Zod-based env schemas. This package is **schema-only** — it exports Zod objects that apps pass to `createEnv` from `@t3-oss/env-core` for runtime validation. Crashes immediately on invalid/missing env vars with descriptive errors.

## Architecture

```
src/
└── schemas/
    └── web.schema.ts         # Web env vars (server + client) — no shared frontend.schema.ts
```

**Actual schema (web.schema.ts):**

```ts
export const webServerSchema = z.object({
  VITE_WEB_APP_PORT: z.coerce.number().default(3030),
  VITE_WEB_DEVTOOLS_PORT: z.coerce.number().default(5030),
});
export const webClientSchema = z.object({
  VITE_UMAMI_WEBSITE_ID: z.string(),     // Umami Cloud website ID
});
```

> `VITE_EXTERNAL_API_URL` was removed — portfolio is static JSON, no external API.

**Dependency flow:**
```
web → @repo/env (zod)
```

**Usage pattern:**
```ts
// Client-side (Vite apps) — apps/web/src/config/env.client.ts
import { webClientSchema } from "@repo/env/schemas/web.schema";
import { createEnv } from "@t3-oss/env-core";
export const env = createEnv({
  clientPrefix: "VITE_",
  client: webClientSchema.shape,
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});

// Server-side — apps/web/src/config/env.server.ts
import { webServerSchema } from "@repo/env/schemas/web.schema";
export const env = createEnv({
  server: webServerSchema.shape,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

**Key design:**
- Schemas defined here, instantiated in apps — each app calls `createEnv` from `@t3-oss/env-core`
- Each frontend app owns its own client schema (`{app}ClientSchema`) — no cross-app sharing
- Vite apps get separate server-side (`process.env`) and client-side (`import.meta.env.VITE_*`) schemas
- Zod is a direct dependency of this package
- `.env.example` must mirror these fields exactly (see `apps/web/.env.example`)

## Rules

- **Schemas are Zod objects** — no TypeBox or other validation libraries.
- **Add env vars here first** — any new `process.env.X` usage must have a corresponding schema field.
- **Keep schemas in sync with `.env.example` files** — every schema field should be documented.
- **No shared client schemas** — each frontend app defines its own client schema in its `{app}.schema.ts`.
- **No API vars until backend exists** — don't re-add `VITE_EXTERNAL_API_URL` until a CMS/API is implemented.

## Related

- Parent: ../AGENTS.md

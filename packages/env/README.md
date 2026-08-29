# @repo/env

Centralized Zod env schemas — schema-only package. Apps instantiate with `@t3-oss/env-core`.

## Structure

```
src/schemas/
└── web.schema.ts   # webServerSchema + webClientSchema
```

## Schema

```ts
export const webServerSchema = z.object({
  VITE_WEB_APP_PORT: z.coerce.number().default(3030),
  VITE_WEB_DEVTOOLS_PORT: z.coerce.number().default(5030),
});
export const webClientSchema = z.object({
  VITE_UMAMI_WEBSITE_ID: z.string(),
});
```

## Usage

```ts
// Client — apps/web/src/config/env.client.ts
import { webClientSchema } from "@repo/env/schemas/web.schema";
import { createEnv } from "@t3-oss/env-core";
export const env = createEnv({
  clientPrefix: "VITE_",
  client: webClientSchema.shape,
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});

// Server — apps/web/src/config/env.server.ts
import { webServerSchema } from "@repo/env/schemas/web.schema";
export const env = createEnv({
  server: webServerSchema.shape,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
```

## Rules

- Zod objects only — no TypeBox.
- Add vars here first — every `process.env`/`import.meta.env` usage needs a schema field.
- Keep in sync with `apps/web/.env.example`.

See [AGENTS.md](./AGENTS.md) for full conventions.

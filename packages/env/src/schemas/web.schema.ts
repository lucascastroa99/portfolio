import { z } from "zod";

export const webServerSchema = z.object({
  VITE_WEB_APP_PORT: z.coerce.number().default(3030),
  VITE_WEB_DEVTOOLS_PORT: z.coerce.number().default(5030),
});

export const webClientSchema = z.object({
  VITE_UMAMI_WEBSITE_ID: z.string(),
});

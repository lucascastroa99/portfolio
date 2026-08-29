import { webServerSchema } from "@repo/env/schemas/web.schema";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  server: webServerSchema.shape,
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

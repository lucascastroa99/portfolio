import { webClientSchema } from "@repo/env/schemas/web.schema";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: webClientSchema.shape,
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
});

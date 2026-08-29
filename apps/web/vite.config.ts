import { resolve } from "node:path";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { env as serverEnv } from "./src/config/env.server.ts";

const appPort = serverEnv.VITE_WEB_APP_PORT;

const sharedPublicDir = resolve(import.meta.dirname, "../../packages/assets/public");

function injectedHeadScriptsFallback(): Plugin {
  return {
    name: "tanstack-start-injected-head-scripts-fallback",
    resolveId(id) {
      if (id === "tanstack-start-injected-head-scripts:v") {
        return "\0tanstack-start-injected-head-scripts:v";
      }
    },
    load(id) {
      if (id === "\0tanstack-start-injected-head-scripts:v") {
        return "export const injectedHeadScripts = ''";
      }
    },
  };
}

const config = defineConfig(({ mode }) => ({
  resolve: { tsconfigPaths: true },
  publicDir: sharedPublicDir,
  server: {
    port: appPort,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    injectedHeadScriptsFallback(),
    mode === "development" && devtools(),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}));

export default config;

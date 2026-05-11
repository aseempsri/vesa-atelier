// This vite-tanstack-config package already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
//
// GitHub Pages (workflow sets GH_PAGES=1 + VITE_BASE_PATH): static prerender, no Cloudflare bundle.
const isGitHubPagesBuild = process.env.GH_PAGES === "1";

export default defineConfig({
  cloudflare: isGitHubPagesBuild ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    prerender: isGitHubPagesBuild
      ? {
          enabled: true,
          crawlLinks: true,
          failOnError: true,
        }
      : { enabled: false },
  },
  vite: {
    base: process.env.VITE_BASE_PATH ?? "/",
  },
});

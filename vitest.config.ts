import { join } from "node:path";
import {
  cloudflareTest,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vitest/config";

export default defineConfig(async () => {
  /**
   * Read migrations file to set as test-only environment variable. Used
   * in `/tests/setup.ts` to apply migrations before tests run.
   * @see https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1
   */
  const migrationsPath = join(import.meta.dirname, "drizzle/migrations");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    plugins: [
      cloudflareTest({
        wrangler: { configPath: "./wrangler.toml" },
        miniflare: {
          compatibilityFlags: ["nodejs_compat"],
          compatibilityDate: "2024-04-01",
          d1Databases: ["DB"],
          bindings: { TEST_MIGRATIONS: migrations },
        },
      }),
    ],
    test: {
      // Enable this line if you need to run D1 migrations before tests
      // setupFiles: ["./tests/setup.ts"],
      globals: true,
    },
  };
});

import path from "node:path";
import {
	defineWorkersConfig,
	readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig(async () => {
	/**
	 * Read migrations file to set as test-only environment variable. Used
	 * in `/tests/setup.ts` to apply migrations before tests run.
	 * @see https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1
	 */
	const migrationsPath = path.join(__dirname, "drizzle/migrations");
	const migrations = await readD1Migrations(migrationsPath);

	return {
		test: {
			// setupFiles: ["./tests/setup.ts"],
			globals: true,
			poolOptions: {
				workers: {
					wrangler: { configPath: "./wrangler.toml" },
					miniflare: {
						compatibilityFlags: ["nodejs_compat"],
						compatibilityDate: "2024-04-01",
						d1Databases: ["DB"],
						bindings: { TEST_MIGRATIONS: migrations },
					},
				},
			},
		},
	};
});

import { env } from "cloudflare:test";
import { testClient } from "hono/testing";
import { beforeAll, describe, expect, it, vi } from "vitest";

import app from "../src";

const client = testClient(app, env);

describe("GET /", () => {
	it("Returns landing text", async () => {
		const response = await client.index.$get();
		expect(response.status).toBe(200);

		const data = await response.text();
		expect(data).toBe("Hello, Hono!");
	});
});

describe("GET /health", () => {
	it("Returns health status", async () => {
		const response = await client.health.$get();
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toEqual({ status: "ok" });
	});
});

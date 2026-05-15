import * as Sentry from "@sentry/cloudflare";
import { type Env, Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

type Bindings = {
	CF_VERSION_METADATA: string;
	SENTRY_DSN: string;
};

const app = new Hono<{ Bindings: Bindings }>()
	.get("/", (c) => {
		return c.text("Hello, Hono!");
	})
	.get("/health", (c) => {
		return c.json({ status: "ok" });
	})
	.use("/api/*", cors());

app.onError((error, c) => {
	console.error(error);

	if (error instanceof HTTPException) {
		return c.json(
			{
				message: error.message,
				errors: error.cause,
			},
			error.status,
		);
	}

	return c.json(
		{
			message: "Something went wrong",
		},
		500,
	);
});

export default Sentry.withSentry((env: Env) => {
	const { id: versionId } = env.CF_VERSION_METADATA;

	return {
		dsn: env.SENTRY_DSN,
		release: versionId,
		// Adds request headers and IP for users, for more info visit:
		// https://docs.sentry.io/platforms/javascript/guides/cloudflare/configuration/options/#sendDefaultPii
		sendDefaultPii: true,
	};
}, app);

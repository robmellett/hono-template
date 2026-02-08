import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

const api = new Hono().get("/health", (c) => {
	return c.json({ status: "ok" });
});

const app = new Hono()
	.get("/", (c) => {
		return c.text("Hello, Hono!");
	})
	.use("/api/*", cors())
	.route("/api", api);

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

export default app;

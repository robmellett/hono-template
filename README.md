## Hono

This is a template for running a hono project on Cloudflare workers.

## Install

```shell
cp .dev.vars.example .dev.vars

pnpm install
pnpm run dev
```

## Deploy

```shell
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```shell
pnpm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Sentry

Add your Sentry DSN variable to `.dev.vars`.

- https://docs.sentry.io/platforms/javascript/guides/cloudflare/frameworks/hono/


## Testing

```shell
pnpm test
```

- https://www.npmjs.com/package/@cloudflare/vitest-pool-workers
- https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/

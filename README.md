## Hono Template

```shell
cp .dev.vars.example .dev.vars
pnpm install
pnpm run dev
```

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

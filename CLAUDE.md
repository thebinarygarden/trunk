@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The main Binary Garden site (`binarygarden.com`): a landing section, a list of projects, and the **central auth server** for the ecosystem (Better Auth, acting as an OAuth 2.1 / OpenID Connect provider for other apps such as flora.app). Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, TypeScript 5.x, pnpm, PostgreSQL.

## Commands

```bash
docker compose up -d   # local Postgres on localhost:5433 (docker-compose.yaml); pnpm dev needs it running
docker compose down    # stop it (data kept; add -v to wipe)
pnpm dev     # dev server at localhost:3000
pnpm build   # production build (output: 'standalone')
pnpm lint    # eslint (flat config in eslint.config.mjs)
```

## Structure

- `src/app/layout.tsx` - root layout; wires Flora's `ScriptPreloadTheme` and `ThemeProvider`
- `src/app/themes.ts` - Flora `lightTheme` / `darkTheme` (site palette)
- `src/components/landing/` - hero section
- `src/components/content/` - project list rendered from `projects.yaml` (read with `js-yaml` at build time)
- `src/components/navbar/` - fixed top-right nav with a Sign in / Account link and Flora's `ThemeToggleButton`

## Auth (Better Auth)

- `src/lib/auth.ts` - the `betterAuth` server config: Postgres (`pg` Pool from `DATABASE_URL`), email+password (verification required), social providers, passkeys, and the OAuth provider (`@better-auth/oauth-provider` + `jwt`). `nextCookies()` must stay the last plugin.
- `src/lib/auth-client.ts` - React client. `oauthProviderClient()` forwards the signed OAuth query on the current URL with sign-in requests so a login started by another app resumes back to it. Links between `/sign-in` and `/sign-up` must keep the query string for the same reason.
- `src/app/api/auth/[...all]/route.ts` - every auth endpoint, including `/oauth2/*`, `/jwks` and `/.well-known/openid-configuration`. Issuer is `$BETTER_AUTH_URL/api/auth`.
- `src/instrumentation.ts` - applies Better Auth migrations on server start (additive only). There is no separate migrate step.
- Pages: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, `/consent` (OAuth consent), `/account` (passkeys, sign out, shows the user id), `/admin/clients` (register OAuth clients).
- Social providers are enabled only when their `*_CLIENT_ID` env var is set. The Apple client secret JWT is minted at boot from the `.p8` key (`src/lib/apple.ts`), so it never needs manual rotation.
- Only users in `ADMIN_USER_IDS` can create or manage OAuth clients (`clientPrivileges`); by default Better Auth lets any signed-in user do it.
- Tokens are signed with **ES256**, not Better Auth's EdDSA default: backend services in other languages will verify these tokens, and every JWT library supports ES256. Changing the algorithm later mints a new key and leaves the old one published, so keep it stable. (EdDSA is the better primitive, but Spring Security's `SignatureAlgorithm` enum still has no EdDSA value, so a Spring resource server would need a hand-written decoder plus the Tink dependency. Revisit only if no consumer is Spring.)
- Access tokens are **opaque by default**. They only become verifiable JWTs (RFC 9068, `aud` = the resource) when the API is registered via the oauth provider's `resources` option; otherwise a service must call `POST /api/auth/oauth2/introspect` to validate one. Decide this per API when the first backend service appears.
- Web OAuth clients must use `https` redirect URIs on non-loopback hosts (`http://localhost` is rejected). Local development of a client app needs its own `native`-type client or an HTTPS tunnel.
- Emails go through Resend (`src/lib/email.ts`) and are deliberately not awaited (awaiting would leak whether an account exists). In dev without `RESEND_API_KEY` the links are printed to the console.
- `pnpm build` logs "You are using the default secret" because no secret exists at build time. That's expected; at runtime a missing `BETTER_AUTH_SECRET` fails fast.
- See `.env.example` for every variable.

## Styling and Flora

- UI and theming come from `@binarygarden/flora` via subpath imports (`/theme`, `/icons`, `/ui`). Check Flora before building new components here.
- Flora's `ThemeProvider` sets CSS variables (`--background`, `--on-background`, `--primary`, `--on-surface`, `--border`, ...) on `<html>`. It does **not** add a `dark` class, so don't use Tailwind `dark:` variants. Use the variables instead, e.g. `bg-(--background)`, `text-(--primary)`, `shadow-(color:--primary)`.
- `globals.css` imports `tailwindcss` then `@binarygarden/flora/styles.css`. There is no `tailwind.config.js` (Tailwind v4 is CSS-first).
- `public/svg/wifi*.svg` have no Flora equivalent yet; they're candidates to move into Flora.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yaml`) builds the multi-stage `Dockerfile` (Node 24, pnpm via corepack), pushes to `us-central1-docker.pkg.dev/binarygarden/bg-images/bg:<sha>`, and deploys the `binary-garden` Cloud Run service on port 3000.

- Postgres is the Cloud SQL instance named by the `CLOUD_SQL_INSTANCE` GitHub secret, attached with `--add-cloudsql-instances`. `DATABASE_URL` uses the Unix socket: `postgresql://USER:PASS@/DB?host=/cloudsql/PROJECT:REGION:INSTANCE`.
- Secrets come from Secret Manager via `--set-secrets` (`bg-auth-secret`, `bg-auth-database-url`, `bg-resend-api-key`, `bg-github-client-secret`, `bg-google-client-secret`, `bg-apple-private-key`). Every secret listed must exist or the deploy fails.
- Non-secret config (client ids, `ADMIN_USER_IDS`) comes from GitHub repository **variables** (`vars.*`), written to an env-vars file.
- `--no-cpu-throttling` keeps CPU allocated after a response so unawaited auth emails finish sending.

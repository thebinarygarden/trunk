@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**trunk** is the codebase that runs on `binarygarden.com` (Binary Garden is the community; trunk is its site): a landing section, a list of projects, and the **central auth server** for the ecosystem (Better Auth, acting as an OAuth 2.1 / OpenID Connect provider for other apps such as flora.app). Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.x, pnpm, PostgreSQL.

The UI is built entirely from `@binarygarden/flora` and follows the Binary Garden design language — **read `../flora/docs/DESIGN.md` before changing anything visual.** Its one rule: the trunk is black and white; color comes from the products. Here that means the page is monochrome and the only color is a project's own hue, inside its `ProductTile` and its sheet.

## Commands

```bash
docker compose up -d   # local Postgres on localhost:5433 (docker-compose.yaml); pnpm dev needs it running
docker compose down    # stop it (data kept; add -v to wipe)
pnpm dev     # dev server at localhost:3000
pnpm build   # production build (output: 'standalone')
pnpm lint    # eslint (flat config in eslint.config.mjs)
```

## Structure

- `src/app/layout.tsx` - root layout; `next/font` Hanken Grotesk + Flora's `ScriptPreloadTheme`
- `src/app/site.css` - page layout classes (there is no Tailwind; flora supplies the tokens and components)
- `src/app/page.tsx` - the landing: flora's `BGLanding` (full-screen hero, scroll-snap, no background yet). The hero carries the nav, so `SiteChrome revealAfter=".fl-hero-actions"` keeps the header hidden until the hero's buttons scroll away
- `src/components/navbar/site_chrome.tsx` - `SiteHeader` / `BGFooter` wiring, incl. `AccountButton` (flora `IconAccount`; links to `/account` signed in, `/sign-in` signed out). The landing also renders it top right over the hero (`.hero-corner`) while the header is hidden
- `src/components/content/` - project tiles + sheet, rendered from `projects.yaml` (read with `js-yaml` per request)
- `src/components/auth/` - Better Auth forms, built on flora's `Input` / `Button` / `Checkbox`

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

- **There is no Tailwind.** It was removed along with the old theme system: flora's tokens already cover spacing, type, radius, shadow and motion, so a utility layer was a second vocabulary for the same things. `globals.css` imports `@binarygarden/flora/styles.css` then `./site.css`.
- UI comes from `@binarygarden/flora` via subpath imports (`/form`, `/ui`, `/overlay`, `/navigation`, `/marketing`, `/theme`, `/icons`). **Check flora before building anything here** — and if what you need is reusable, build it in flora first.
- Page scaffolding (containers, grids, the auth card) lives in `src/app/site.css` as plain classes. One-off layout can be an inline `style` reading tokens: `style={{ display: 'grid', gap: 'var(--space-4)' }}`.
- Never hardcode a color. Always a token: `var(--accent)`, `var(--text-body)`, `var(--text-muted)`, `var(--line-1)`, `var(--danger)`. The old `--primary` / `--on-background` names are gone.
- Light/dark is `data-theme` on `<html>`, set before first paint by `ScriptPreloadTheme` and flipped by flora's `ThemeToggleButton`. There is no `dark:` variant and no theme object.
- Each project in `projects.yaml` carries a `hue` (0–360) — its one color, used by its `ProductTile` and by the `ProductScope` around its sheet.

### Working against unreleased flora

`package.json` depends on `@binarygarden/flora` from npm. To develop against the sibling `../flora` checkout:

```bash
pnpm sync:flora    # builds flora, copies its dist into node_modules (re-run after each flora edit)
pnpm unsync:flora  # restore the published version
```

It copies rather than symlinks on purpose: a symlink points outside the Turbopack root and drags flora's own React in, which breaks every hook. Nothing about this reaches production — the Docker build copies only `package.json`, `pnpm-lock.yaml` and `pnpm-workspace.yaml` and installs from the registry.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yaml`) builds the multi-stage `Dockerfile` (Node 24, pnpm via corepack), pushes to `us-central1-docker.pkg.dev/binarygarden/bg-images/trunk:<sha>`, and deploys the `trunk` Cloud Run service on port 3000.

- Postgres is the Cloud SQL instance named by the `CLOUD_SQL_INSTANCE` GitHub secret, attached with `--add-cloudsql-instances`. `DATABASE_URL` uses the Unix socket: `postgresql://USER:PASS@/DB?host=/cloudsql/PROJECT:REGION:INSTANCE`.
- Secrets come from Secret Manager via `--set-secrets` (`bg-auth-secret`, `bg-auth-database-url`, `bg-resend-api-key`, `bg-github-client-secret`, `bg-google-client-secret`, `bg-apple-private-key`). Every secret listed must exist or the deploy fails.
- Non-secret config (client ids, `ADMIN_USER_IDS`) comes from GitHub repository **variables** (`vars.*`), written to an env-vars file.
- `--no-cpu-throttling` keeps CPU allocated after a response so unawaited auth emails finish sending.

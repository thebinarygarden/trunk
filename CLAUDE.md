@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**trunk** is the codebase that runs on `binarygarden.com` (Binary Garden is the community; trunk is its site): a landing section, a list of projects, and the **central auth server** for the ecosystem (Better Auth as an OAuth 2.1 / OpenID Connect provider for other apps such as flora.app). Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.x, pnpm, PostgreSQL.

The UI is built entirely from `@binarygarden/flora` and follows the Binary Garden design language — **read `../flora/docs/DESIGN.md` before changing anything visual.** Its one rule: the trunk is black and white; color comes from the products. Here the page is monochrome and the only color is a project's own hue, inside its `ProductTile` and its sheet.

## Commands

```bash
docker compose up -d   # local Postgres on localhost:5433; pnpm dev needs it running
docker compose down    # stop it (data kept; add -v to wipe)
pnpm dev               # dev server at localhost:3000 (reads .env; see .env.example)
pnpm build             # production build (output: 'standalone'); also type-checks
pnpm lint              # eslint (flat config in eslint.config.mjs)
```

## Structure

- `src/app/layout.tsx` - root layout; `next/font` Hanken Grotesk + flora's `ScriptPreloadTheme`
- `src/app/site.css` - page layout classes (no Tailwind; flora supplies the tokens and components)
- `src/app/page.tsx` - the landing: flora's `BGLanding` (full-screen hero, scroll-snap) with `public/landing-animation-temporary.mp4` as its background, dimmed via `.landing-video`. The hero carries the nav, so `SiteChrome revealAfter=".fl-hero-actions"` keeps the header hidden until the hero's buttons scroll away
- `src/app/privacy`, `src/app/terms` - legal pages, required by Google's OAuth consent screen and linked from the footer. Keep the privacy policy in step with what `src/lib/auth.ts` stores and who it talks to
- `src/components/navbar/site_chrome.tsx` - `SiteHeader` / `BGFooter` wiring, incl. `AccountButton` (`/account` signed in, `/sign-in` signed out), also shown top right over the hero (`.hero-corner`) while the header is hidden
- `src/components/content/` - project tiles + sheet, rendered from `projects.yaml` (read with `js-yaml` per request)
- `src/components/auth/` - Better Auth forms on flora's `Input` / `Button` / `Checkbox`; `AuthCard` is the shell every auth page uses

## Auth (Better Auth)

- `src/lib/auth.ts` - server config: Postgres (`pg` Pool from `DATABASE_URL`), email+password (verification required), social providers, passkeys, and the OAuth provider (`@better-auth/oauth-provider` + `jwt`). `nextCookies()` must stay the last plugin.
- `src/lib/auth-client.ts` - React client. `oauthProviderClient()` forwards the signed OAuth query on the current URL so a login started by another app resumes back to it; links between `/sign-in` and `/sign-up` must keep the query string for the same reason.
- `src/app/api/auth/[...all]/route.ts` - every auth endpoint, incl. `/oauth2/*`, `/jwks`, `/.well-known/openid-configuration`. Issuer is `$BETTER_AUTH_URL/api/auth`.
- `src/instrumentation.ts` - applies Better Auth migrations on server start (additive only). There is no separate migrate step.
- Pages: `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, `/consent`, `/account` (passkeys, sign out, shows the user id), `/admin/clients` (register OAuth clients).
- Social providers turn on only when their `*_CLIENT_ID` is set; callbacks are `$BETTER_AUTH_URL/api/auth/callback/<provider>`. Local dev uses its own Google client (`trunk (local)`, localhost redirect) in `.env`; production uses the `trunk` client. The Apple client secret JWT is minted at boot from the `.p8` key (`src/lib/apple.ts`), so it never needs rotating.
- Only users in `ADMIN_USER_IDS` can create or manage OAuth clients (`clientPrivileges`); Better Auth's default lets any signed-in user.
- Tokens are signed with **ES256**, not the EdDSA default, because backend services (Spring first, whose `SignatureAlgorithm` has no EdDSA) must verify them. Changing it later mints a new key and leaves the old one published, so keep it stable.
- Access tokens are **opaque by default**. They become verifiable JWTs (RFC 9068, `aud` = the resource) only for APIs registered via the oauth provider's `resources` option; otherwise a service calls `POST /api/auth/oauth2/introspect`. Decide per API when the first backend service appears.
- Web OAuth clients need `https` redirect URIs on non-loopback hosts. Developing a client app locally needs its own `native`-type client or an HTTPS tunnel.
- Emails go through Resend (`src/lib/email.ts`) and are deliberately not awaited (awaiting would leak whether an account exists). Without `RESEND_API_KEY`, dev prints the links to the console and production drops them with an error log.
- `pnpm build` logging "You are using the default secret" is expected (no secret at build time); at runtime a missing `BETTER_AUTH_SECRET` fails fast.

## Styling and Flora

- **There is no Tailwind.** flora's tokens cover spacing, type, radius, shadow and motion. `globals.css` imports `@binarygarden/flora/styles.css` then `./site.css`.
- UI comes from `@binarygarden/flora` via subpath imports (`/form`, `/ui`, `/overlay`, `/navigation`, `/marketing`, `/theme`, `/icons`, `/bg`). **Check flora before building anything here**; if it's reusable, build it in flora first.
- Page scaffolding (containers, grids, the auth card, legal pages) lives in `src/app/site.css` as plain classes. One-off layout can be an inline `style` reading tokens: `style={{ display: 'grid', gap: 'var(--space-4)' }}`.
- Never hardcode a color. Always a token: `var(--accent)`, `var(--text-body)`, `var(--text-muted)`, `var(--line-1)`, `var(--danger)`.
- Light/dark is `data-theme` on `<html>`, set before first paint by `ScriptPreloadTheme` and flipped by `ThemeToggleButton`. There is no `dark:` variant and no theme object.
- Each project in `projects.yaml` carries a `hue` (0–360): its one color, used by its `ProductTile` and the `ProductScope` around its sheet.

### Working against unreleased flora

`package.json` depends on `@binarygarden/flora` from npm. To develop against the sibling `../flora` checkout:

```bash
pnpm sync:flora    # builds flora, copies its dist into node_modules (re-run after each flora edit)
pnpm unsync:flora  # restore the published version
```

It copies rather than symlinks on purpose: a symlink points outside the Turbopack root and drags flora's own React in, which breaks every hook. None of this reaches production; the Docker build installs from the registry.

## CI and deployment

- **PRs into `main`** run `.github/workflows/ci.yaml`: install, lint, build.
- **Push to `main`** runs `.github/workflows/deploy.yaml`: builds the multi-stage `Dockerfile` (Node 24, pnpm via corepack), pushes `us-central1-docker.pkg.dev/binarygarden/bg-images/trunk:<sha>`, and deploys the `trunk` Cloud Run service on port 3000.
- GitHub logs in to GCP **without a key**, via Workload Identity Federation (pool `github`, accepting only `main` of the thebinarygarden org) as `bg-cicd`. The job needs `permissions: id-token: write`.
- The service runs as `trunk-runtime` (read its own secrets + Cloud SQL Client, nothing else). `bg-cicd` only deploys; never make it the runtime identity.
- Postgres: Cloud SQL instance `trunk-db` (from the `CLOUD_SQL_INSTANCE` GitHub secret, attached with `--add-cloudsql-instances`), database `chamber_of_secrets`, user `trunk`. `DATABASE_URL` uses the Unix socket: `postgresql://trunk:PASS@/chamber_of_secrets?host=/cloudsql/binarygarden:us-central1:trunk-db`.
- Secrets come from Secret Manager via `--set-secrets`: `trunk-auth-secret`, `trunk-database-url`, `trunk-google-client-secret`. Add `trunk-resend-api-key`, `trunk-github-client-secret`, `trunk-apple-private-key` as each is created, and grant `trunk-runtime` access to it. Every secret listed must exist or the deploy fails.
- Non-secret config (client ids, `ADMIN_USER_IDS`) comes from GitHub repository **variables** (`vars.*`), written to an env-vars file.
- `--no-cpu-throttling` keeps CPU allocated after a response so unawaited auth emails finish sending.

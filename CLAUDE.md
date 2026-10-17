@AGENTS.md

# CLAUDE.md

**trunk** is the codebase behind `binarygarden.com`: the landing page, the list of projects
(`projects.yaml`), and the **central auth server** for the ecosystem (Better Auth as an
OAuth 2.1 / OpenID Connect provider that other Binary Garden apps sign in through).
Next.js App Router, pnpm, PostgreSQL.

The UI is built entirely from `@binarygarden/flora`; read `../flora/docs/DESIGN.md` before
changing anything visual. The page is monochrome; the only color is a project's own `hue`.
If something is reusable, build it in flora first.

## Commands

```bash
docker compose up -d   # local Postgres; pnpm dev needs it running
pnpm dev               # reads .env (see .env.example)
pnpm lint
pnpm build             # also type-checks
pnpm sync:flora        # develop against ../flora (copies its build in); unsync:flora restores npm
```

`sync:flora` copies rather than symlinks on purpose: a symlink drags flora's own React in
and breaks every hook. It never reaches production; Docker installs from the registry.

## Auth rules (Better Auth)

- `nextCookies()` must stay the **last** plugin in `src/lib/auth.ts`.
- A login started by another app carries a signed OAuth query on the URL. Links between
  auth pages (e.g. `/sign-in` ↔ `/sign-up`) must keep the query string, or the login can't
  resume back to that app.
- Tokens are signed with **ES256**, not the EdDSA default, because backend services
  (Spring first) can't verify EdDSA. Changing it later mints a new key; keep it stable.
- Access tokens are **opaque** unless the API is registered as a `resources` entry, which
  makes them verifiable JWTs. Otherwise services call `/api/auth/oauth2/introspect`.
- Emails (Resend) are deliberately **not awaited**: awaiting would leak whether an account
  exists. That's why Cloud Run runs with `--no-cpu-throttling`.
- Migrations are applied on server start (additive only); there is no migrate step.
- Only `ADMIN_USER_IDS` can register OAuth clients (Better Auth's default lets anyone).
- A social provider turns on when its client id is set, so its secret must exist first.
- Keep the privacy policy in step with what auth stores and which services it talks to.
- `pnpm build` warning about the default secret is expected; at runtime a missing
  `BETTER_AUTH_SECRET` fails fast.

## Styling

flora tokens and components only, no Tailwind and no hardcoded colors. Page scaffolding
lives as plain classes in `src/app/site.css`; one-offs can be an inline `style` reading
tokens.

## Infrastructure

- Push to `main` → `.github/workflows/deploy.yaml` builds the image and deploys the `trunk`
  Cloud Run service. PRs run lint + build.
- GitHub signs in to GCP **keylessly** (Workload Identity Federation, `main` of the
  thebinarygarden org only) as `bg-cicd`, which only deploys. The service **runs as
  `trunk-runtime`** (its own secrets + Cloud SQL client). Never make `bg-cicd` the runtime.
- Postgres is Cloud SQL `trunk-db`, database `chamber_of_secrets`, over the Unix socket.
- Secrets live in Secret Manager. Every secret listed in `--set-secrets` must exist and be
  readable by `trunk-runtime`, or the deploy fails; add one there only once it exists.
- Non-secret config (client ids, `ADMIN_USER_IDS`) comes from GitHub repository secrets.
  GitHub rejects names starting with `GITHUB_`, so the GitHub client id is `GH_CLIENT_ID`.

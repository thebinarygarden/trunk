# trunk

The codebase that runs on `binarygarden.com`: the Binary Garden site and central auth server. Built with Next.js, React and [Flora](https://www.npmjs.com/package/@binarygarden/flora) (`@binarygarden/flora`) for theming and UI components.

## Getting Started

Requires Node.js 24, pnpm, and Docker. The site is also the Binary Garden auth server, so it needs a PostgreSQL database; for local development that runs in Docker.

### Database
```bash
docker compose up -d     # start Postgres in the background (first run downloads the image)
docker compose down      # stop it; your data is kept
docker compose down -v   # stop it and delete all local data (fresh start)
docker compose ps        # is it running? (should say "healthy")
docker compose logs db   # Postgres logs
```
Postgres listens on `localhost:5433` (user `postgres`, password `postgres`, database `trunk`), which is what `DATABASE_URL` in `.env.example` points to. Use those details to connect with a database GUI.

### PNPM
Start the database first, then:
```bash
cp .env.example .env   # first time only; then set BETTER_AUTH_SECRET (openssl rand -base64 32)
pnpm i
pnpm dev     # start the dev server; auth tables are created on startup
pnpm build   # production build
pnpm lint    # eslint
```

To try unreleased changes from a sibling `../flora` checkout, `pnpm sync:flora` builds it and copies it into `node_modules` (re-run after each flora edit); `pnpm unsync:flora` restores the published version.

### Docker
```
docker build -t bg_image .
docker run -p 3000:3000 --env-file .env bg_image
```
Inside the container, `localhost` is the container itself: point `DATABASE_URL` at `host.docker.internal:5433`.

Regardless of how you run the service, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Content

Projects shown on the home page are defined in `projects.yaml`.

## Deployment

Pushing to `main` builds the Docker image, pushes it to Artifact Registry, and deploys it to the `trunk` Cloud Run service (`.github/workflows/deploy.yaml`).

## License

trunk is licensed under the GNU Affero General Public License, version 3 or any later
version (`AGPL-3.0-or-later`). You can use, change and sell it. If you distribute a
modified version, or run one that people use over a network, you must make its source
code available to them under the same license. The full text is in [LICENSE](LICENSE).

```
Copyright (C) 2026 Binary Garden

This program is free software: you can redistribute it and/or modify it under the terms
of the GNU Affero General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
```

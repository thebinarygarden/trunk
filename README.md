# Binary Garden

The main Binary Garden site. Built with Next.js 16, React 19, Tailwind CSS v4, and [Flora](https://www.npmjs.com/package/@binarygarden/flora) (`@binarygarden/flora`) for theming and UI components.

## Getting Started

Requires Node.js 20.9+, pnpm, and Docker. The site is also the Binary Garden auth server, so it needs a PostgreSQL database; for local development that runs in Docker.

### Database
```bash
docker compose up -d     # start Postgres in the background (first run downloads the image)
docker compose down      # stop it; your data is kept
docker compose down -v   # stop it and delete all local data (fresh start)
docker compose ps        # is it running? (should say "healthy")
docker compose logs db   # Postgres logs
```
Postgres listens on `localhost:5433` (user `postgres`, password `postgres`, database `binarygarden`), which is what `DATABASE_URL` in `.env.example` points to. Use those details to connect with a database GUI.

### PNPM
Start the database first, then:
```bash
cp .env.example .env   # first time only; then set BETTER_AUTH_SECRET (openssl rand -base64 32)
pnpm i
pnpm dev     # start the dev server; auth tables are created on startup
pnpm build   # production build
pnpm lint    # eslint
```

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

Pushing to `main` builds the Docker image, pushes it to Artifact Registry, and deploys it to the `binary-garden` Cloud Run service (`.github/workflows/deploy.yaml`).

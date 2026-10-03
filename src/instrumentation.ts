// Runs once per server start, before any request is served. Better Auth's migrations
// only ever create tables/columns, so applying them on boot is safe and keeps deploys
// free of a separate migration step.
export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;
    const { getMigrations } = await import('better-auth/db/migration');
    const { auth } = await import('@/lib/auth');
    const { runMigrations } = await getMigrations(auth.options);
    await runMigrations();
}

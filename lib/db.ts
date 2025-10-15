import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

declare global {
  // Allow global caching across hot reloads in dev
  // eslint-disable-next-line no-var
  var cachedPool: Pool | undefined;
}

export const pool = global.cachedPool || new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

if (!global.cachedPool) {
  global.cachedPool = pool;
}

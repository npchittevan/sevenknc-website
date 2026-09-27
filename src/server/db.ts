import mysql from "mysql2/promise";

/**
 * Shared MySQL connection pool.
 *
 * Connection settings come from env vars — in production they are
 * already configured on the platform; locally they live in
 * `.env.local` (XAMPP: root / no password / sevenknc).
 *
 * The pool is cached on globalThis so Next.js dev-mode hot reloads
 * don't open a new connection set on every file change.
 */

declare global {
  // eslint-disable-next-line no-var
  var __sevenkncPool: mysql.Pool | undefined;
}

export function getPool(): mysql.Pool {
  if (!globalThis.__sevenkncPool) {
    globalThis.__sevenkncPool = mysql.createPool({
      host: process.env.DB_HOST || "127.0.0.1",
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "sevenknc",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }
  return globalThis.__sevenkncPool;
}

export async function query<T = mysql.RowDataPacket[]>(
  sql: string,
  params: unknown[] = [],
): Promise<T> {
  const [rows] = await getPool().query(sql, params);
  return rows as T;
}

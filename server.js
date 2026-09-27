import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import next from "next";
import mysql from "mysql2/promise";

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// Apply schema.sql on boot. The file is fully idempotent (IF NOT EXISTS /
// WHERE NOT EXISTS), so this is safe on every start. Uses a dedicated
// connection with multipleStatements — deliberately NOT the app's shared
// pool, which stays parameterised-only.
async function ensureSchema() {
  if (!process.env.DB_HOST || !existsSync("schema.sql")) return;
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: "utf8mb4",
  });
  try {
    await conn.query(readFileSync("schema.sql", "utf8"));
    console.log("Database schema ensured (schema.sql applied)");
  } finally {
    await conn.end();
  }
}

// If the platform starts the app before the build step finishes, build inline
// instead of crashing — a slow first boot beats a crash loop.
if (!existsSync(".next/BUILD_ID")) {
  console.log("No production build found — running next build...");
  execSync("npm run build", { stdio: "inherit" });
}

try {
  await ensureSchema();
} catch (err) {
  // Don't take the whole site down over a schema hiccup — routes that
  // need the DB will surface their own errors.
  console.error("Schema bootstrap failed:", err);
}

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request, response) => handle(request, response)).listen(port, host, () => {
    console.log(`SevenKNC server listening on ${host}:${port}`);
  });
});

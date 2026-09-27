import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createServer } from "node:http";
import next from "next";

const port = process.env.PORT || 3000;
const host = "0.0.0.0";

// If the platform starts the app before the build step finishes, build inline
// instead of crashing — a slow first boot beats a crash loop.
if (!existsSync(".next/BUILD_ID")) {
  console.log("No production build found — running next build...");
  execSync("npm run build", { stdio: "inherit" });
}

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request, response) => handle(request, response)).listen(port, host, () => {
    console.log(`SevenKNC server listening on ${host}:${port}`);
  });
});

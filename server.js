import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";
const distDirectory = fileURLToPath(new URL("./dist/", import.meta.url));

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getFilePath(requestUrl) {
  const requestedPath = decodeURIComponent(requestUrl.split("?")[0]);
  const relativePath = normalize(requestedPath).replace(/^([/\\])+/, "");
  const filePath = join(distDirectory, relativePath);

  return filePath.startsWith(distDirectory) ? filePath : null;
}

const server = createServer((request, response) => {
  const filePath = getFilePath(request.url || "/");
  const requestedFile = filePath && existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(distDirectory, "index.html");

  if (!existsSync(requestedFile)) {
    response.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Build output not found. Run npm run build first.");
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(requestedFile)] || "application/octet-stream",
  });
  createReadStream(requestedFile).pipe(response);
});

server.listen(port, host, () => {
  console.log(`SevenKNC server listening on ${host}:${port}`);
});
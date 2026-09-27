import { createServer } from "node:http";
import next from "next";

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request, response) => handle(request, response)).listen(port, host, () => {
    console.log(`SevenKNC server listening on ${host}:${port}`);
  });
});

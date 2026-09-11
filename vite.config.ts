import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const previewFile = path.join(rootDir, "preview.html");
const publicPreviewFile = path.join(rootDir, "public", "preview.html");

function syncPreviewHtml() {
  fs.mkdirSync(path.dirname(publicPreviewFile), { recursive: true });
  fs.copyFileSync(previewFile, publicPreviewFile);
}

function servePreviewHtml() {
  const handler = (
    req: { url?: string },
    res: { statusCode: number; setHeader: (k: string, v: string) => void; end: (b: string) => void },
    next: () => void,
  ) => {
    const url = (req.url ?? "").split("?")[0];
    if (url === "/preview.html" || url === "/preview") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(fs.readFileSync(previewFile, "utf8"));
      return;
    }
    next();
  };

  return {
    name: "serve-preview-html",
    buildStart() {
      syncPreviewHtml();
    },
    configureServer(server: { middlewares: { use: (fn: typeof handler) => void } }) {
      syncPreviewHtml();
      server.middlewares.use(handler);
    },
    configurePreviewServer(server: { middlewares: { use: (fn: typeof handler) => void } }) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  nitro: { preset: "vercel" },
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    base: "/",
    plugins: [servePreviewHtml()],
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },
});

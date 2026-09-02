import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { sites } from "@openai/sites-vite-plugin";
import { defineConfig, type Plugin } from "vite";

function copyNextExport(): Plugin {
  return {
    name: "copy-next-export",
    async closeBundle() {
      const source = resolve(process.cwd(), "out");
      const destination = resolve(process.cwd(), "dist", "client");

      await rm(destination, { recursive: true, force: true });
      await mkdir(destination, { recursive: true });
      await cp(source, destination, { recursive: true });
    },
  };
}

export default defineConfig({
  plugins: [sites(), copyNextExport()],
  build: {
    ssr: "sites-worker.ts",
    outDir: "dist/server",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        format: "es",
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { copyFileSync, mkdirSync, existsSync, readdirSync } from "fs";

// Plugin to copy attached_assets to build output
function copyAssetsPlugin() {
  return {
    name: "copy-assets",
    closeBundle() {
      const assetsSrc = path.resolve(import.meta.dirname, "attached_assets");
      const assetsDest = path.resolve(import.meta.dirname, "dist/public/attached_assets");
      
      if (existsSync(assetsSrc)) {
        function copyRecursive(src: string, dest: string) {
          if (!existsSync(dest)) {
            mkdirSync(dest, { recursive: true });
          }
          
          const entries = readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
              copyRecursive(srcPath, destPath);
            } else {
              copyFileSync(srcPath, destPath);
            }
          }
        }
        
        copyRecursive(assetsSrc, assetsDest);
        console.log("✓ Copied attached_assets to build output");
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    copyAssetsPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

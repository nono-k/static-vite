import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

const srcDir = path.resolve(__dirname, "src");

const inputFiles = {};
fs.readdirSync(srcDir, { withFileTypes: true}).forEach((dirent) => {
  const pagePath = path.join(srcDir, dirent.name, "index.html");
  if (dirent.isDirectory() && fs.existsSync(pagePath)) {
    inputFiles[dirent.name] = pagePath;
  }
});

inputFiles["main"] = path.join(srcDir, "index.html");

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: inputFiles,
    }
  }
})
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:  resolve(__dirname, "index.html"),
        demo:  resolve(__dirname, "demo.html"),
        ajuda: resolve(__dirname, "ajuda.html"),
      },
    },
  },
});

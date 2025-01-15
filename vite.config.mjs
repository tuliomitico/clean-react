import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * https://vite.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

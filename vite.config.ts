import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ["@layerhub-io/react", "@layerhub-io/use-timer", "@layerhub-io/react-custom-scrollbar"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.layerhub.pro",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})

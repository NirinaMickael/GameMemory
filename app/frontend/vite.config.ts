import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@component":path.resolve(__dirname,"./src/components"),
       "@common/*":path.resolve(__dirname,"./src/common"),
      "@features/*":path.resolve(__dirname,"./src/features"),
    },
  },
})

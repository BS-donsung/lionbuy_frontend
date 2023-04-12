import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"

// https://vitejs.dev/config/

console.log(resolve(__dirname, "./src"))

export default defineConfig({
  plugins: [vue()],
  resolve : {
    alias : {
      "@" : resolve(__dirname, "./src")
    }
  }
})

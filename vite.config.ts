import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  alias: [
    {
      find: /\/@\//,
      replacement: path.resolve(process.cwd(), '.', 'src') + '/'
    },
    {
      find: 'vue',
      replacement: 'vue/dist/vue.esm-bundler.js'
    }
  ]
})

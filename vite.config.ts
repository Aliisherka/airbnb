import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/copy-airbnb/',
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/shared/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],
})

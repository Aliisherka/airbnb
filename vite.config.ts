import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/airbnb/',
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/shared/assets/icons')],
      symbolId: 'icon-[name]',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/app/styles" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  }
})

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/parchis-vue/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@about': fileURLToPath(new URL('./src/modules/about', import.meta.url)),
      '@board': fileURLToPath(new URL('./src/modules/board', import.meta.url)),
      '@chat': fileURLToPath(new URL('./src/modules/chat', import.meta.url)),
      '@common': fileURLToPath(new URL('./src/modules/common', import.meta.url)),
      '@debug': fileURLToPath(new URL('./src/modules/debug', import.meta.url)),
      '@dice': fileURLToPath(new URL('./src/modules/dice', import.meta.url)),
      '@game': fileURLToPath(new URL('./src/modules/game', import.meta.url)),
      '@home': fileURLToPath(new URL('./src/modules/home', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/modules/layouts', import.meta.url)),
      '@offline': fileURLToPath(new URL('./src/modules/offline', import.meta.url)),
      '@online': fileURLToPath(new URL('./src/modules/online', import.meta.url)),
      '@options': fileURLToPath(new URL('./src/modules/options', import.meta.url)),
      '@players': fileURLToPath(new URL('./src/modules/players', import.meta.url)),
      '@profiles': fileURLToPath(new URL('./src/modules/profiles', import.meta.url)),
      '@share': fileURLToPath(new URL('./src/modules/share', import.meta.url)),
      '@sounds': fileURLToPath(new URL('./src/modules/sounds', import.meta.url)),
      '@tokens': fileURLToPath(new URL('./src/modules/tokens', import.meta.url)),
    },
  },
});

import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/parchis-vue/',
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@about',
        replacement: fileURLToPath(new URL('./src/modules/about', import.meta.url)),
      },
      {
        find: '@board',
        replacement: fileURLToPath(new URL('./src/modules/board', import.meta.url)),
      },
      { find: '@chat', replacement: fileURLToPath(new URL('./src/modules/chat', import.meta.url)) },
      {
        find: '@common',
        replacement: fileURLToPath(new URL('./src/modules/common', import.meta.url)),
      },
      {
        find: '@debug',
        replacement: fileURLToPath(new URL('./src/modules/debug', import.meta.url)),
      },
      { find: '@dice', replacement: fileURLToPath(new URL('./src/modules/dice', import.meta.url)) },
      { find: '@game', replacement: fileURLToPath(new URL('./src/modules/game', import.meta.url)) },
      { find: '@home', replacement: fileURLToPath(new URL('./src/modules/home', import.meta.url)) },
      {
        find: '@layouts',
        replacement: fileURLToPath(new URL('./src/modules/layouts', import.meta.url)),
      },
      {
        find: '@offline',
        replacement: fileURLToPath(new URL('./src/modules/offline', import.meta.url)),
      },
      {
        find: '@online',
        replacement: fileURLToPath(new URL('./src/modules/online', import.meta.url)),
      },
      {
        find: '@options',
        replacement: fileURLToPath(new URL('./src/modules/options', import.meta.url)),
      },
      {
        find: '@players',
        replacement: fileURLToPath(new URL('./src/modules/players', import.meta.url)),
      },
      {
        find: '@profiles',
        replacement: fileURLToPath(new URL('./src/modules/profiles', import.meta.url)),
      },
      {
        find: '@share',
        replacement: fileURLToPath(new URL('./src/modules/share', import.meta.url)),
      },
      {
        find: '@sounds',
        replacement: fileURLToPath(new URL('./src/modules/sounds', import.meta.url)),
      },
      {
        find: '@tokens',
        replacement: fileURLToPath(new URL('./src/modules/tokens', import.meta.url)),
      },
    ],
  },
});

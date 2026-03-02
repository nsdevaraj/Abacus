import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const storageBackend = env.STORAGE_BACKEND || 'localstorage';
    const useSqlite = storageBackend === 'sqlite';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        headers: useSqlite ? {
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'credentialless',
        } : {},
      },
      plugins: [tailwindcss(), react()],
      optimizeDeps: {
        exclude: ['@sqlite.org/sqlite-wasm'],
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        // Toggle storage backend: 'localstorage' for web, 'sqlite' for app
        '__STORAGE_BACKEND__': JSON.stringify(storageBackend),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

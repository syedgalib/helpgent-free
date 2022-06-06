import react from '@vitejs/plugin-react'
import path from 'path';
import { defineConfig } from 'vite'
import projectConfig from './vite.project-config'

// https://vitejs.dev/config/
export default defineConfig( ( { command, mode } ) => {
  const config = projectConfig( mode );

  console.log( { command, mode } );

  return {
    base: '/wp-content/plugins/wpwax-customer-support-app/',
    plugins: [ react() ],
    build: {
      target: 'es2015',
      outDir: '',
      assetsDir: 'assets/dist/js',
      emptyOutDir: false,
      polyfillModulePreload: false,
      sourcemap: true,
      minify: config.minify,
      rollupOptions: {
        input: {
          public: '/assets/src/js/public/public.js',
          admin: '/assets/src/js/admin/admin.js',
        },
        output: {
          entryFileNames: config.entryFileNames,
          chunkFileNames: config.entryFileNames,
          assetFileNames: config.assetFileNames,
        },
      },
    },
    resolve: {
      alias: {
        Assets: path.resolve(__dirname, "assets/src/assets/"),
        SASS: path.resolve(__dirname, "assets/src/sass/"),
        Chatbox: path.resolve(__dirname, "assets/src/js/apps/chatbox/"),
      },
    },
    server: config.server,
  }
})

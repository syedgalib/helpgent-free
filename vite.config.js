import react from '@vitejs/plugin-react'
import path from 'path';
import { defineConfig } from 'vite'
import projectConfig from './vite.project-config'

// https://vitejs.dev/config/
export default defineConfig( ( { command, mode } ) => {
  const config = projectConfig( mode );

  console.log( { command, mode } );

  return {
    base: '/wp-content/plugins/wpwax-video-message/',
    plugins: [ react() ],
    build: {
      target: 'es2015',
      outDir: '',
      assetsDir: 'assets/js',
      emptyOutDir: false,
      polyfillModulePreload: false,
      sourcemap: true,
      minify: config.minify,
      rollupOptions: {
        input: {
          // public: '/src/js/public.js',
          admin: '/src/js/admin.js',
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
        Assets: path.resolve(__dirname, "src/assets/"),
        SASS: path.resolve(__dirname, "src/sass/"),
        Chatbox: path.resolve(__dirname, "src/js/apps/chatbox/"),
      },
    },
    server: config.server,
  }
})

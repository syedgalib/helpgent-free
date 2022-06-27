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
          // Core Module
          'core-public': '/src/modules/core/js/public/core-public.js',
          'core-admin': '/src/modules/core/js/admin/core-admin.js',

          // Messenger Module
          'messenger-public': '/src/modules/messenger/js/public/messenger-public.js',
          'messenger-admin': '/src/modules/messenger/js/admin/messenger-admin.js',

          // Chatbox Template Module
          'chatbox-template-admin': '/src/modules/chatboxTemplate/js/admin/chatbox-template-admin.js',
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
        // Global
        Components: path.resolve( __dirname, 'src/lib/components/' ),
        apiService: path.resolve( __dirname, 'src/lib/apiService/' ),

        // Core Module
        CoreModule: path.resolve( __dirname, 'src/modules/core/' ),
        CoreJS: path.resolve( __dirname, 'src/modules/core/js/' ),
        CoreCSS: path.resolve( __dirname, 'src/modules/core/sass/' ),
        CoreAssets: path.resolve( __dirname, 'src/modules/core/assets/' ),

        // Messenger Module
        MessengerModule: path.resolve( __dirname, 'src/modules/messenger/' ),
        MessengerJS: path.resolve( __dirname, 'src/modules/messenger/js/' ),
        MessengerApps: path.resolve( __dirname, 'src/modules/messenger/js/apps/' ),
        MessengerCSS: path.resolve( __dirname, 'src/modules/messenger/sass/' ),
        MessengerAssets: path.resolve( __dirname, 'src/modules/messenger/assets/' ),

        // Chatbox Template Module
        ChatboxTemplateModule: path.resolve( __dirname, 'src/modules/chatboxTemplate/' ),
        ChatboxTemplateJS: path.resolve( __dirname, 'src/modules/chatboxTemplate/js/' ),
        ChatboxTemplateApps: path.resolve( __dirname, 'src/modules/chatboxTemplate/js/apps/' ),
        ChatboxTemplateCSS: path.resolve( __dirname, 'src/modules/chatboxTemplate/sass/' ),
        ChatboxTemplateAssets: path.resolve( __dirname, 'src/modules/chatboxTemplate/assets/' ),
      },
    },
    server: config.server,
  }
})

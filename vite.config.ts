import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, './mockCodegenNativeComponent.js'),
        'react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry': path.resolve(__dirname, './mockReactNativeViewConfigRegistry.js'),
        'react-native/Libraries/Pressability/PressabilityDebug': path.resolve(__dirname, './mockPressabilityDebug.js'),
        'react-native/Libraries/Renderer/shims/ReactNative': path.resolve(__dirname, './mockReactNative.js'),
        'react-native': path.resolve(__dirname, './react-native-web-stub.js'),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

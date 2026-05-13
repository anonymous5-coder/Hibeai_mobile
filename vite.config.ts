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
      extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: [
        { find: '@', replacement: path.resolve(__dirname, '.') },
        { find: 'react-native/Libraries/Utilities/codegenNativeComponent', replacement: path.resolve(__dirname, './mockCodegenNativeComponent.js') },
        { find: 'react-native/Libraries/Renderer/shims/ReactNativeViewConfigRegistry', replacement: path.resolve(__dirname, './mockReactNativeViewConfigRegistry.js') },
        { find: 'react-native/Libraries/Pressability/PressabilityDebug', replacement: path.resolve(__dirname, './mockPressabilityDebug.js') },
        { find: 'react-native/Libraries/Renderer/shims/ReactNative', replacement: path.resolve(__dirname, './mockReactNative.js') },
        { find: /^react-native$/, replacement: path.resolve(__dirname, './react-native-web-stub.js') },
        { find: /^react-native\/(.*)/, replacement: 'react-native-web/$1' }
      ]
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

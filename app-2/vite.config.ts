import { federation } from '@module-federation/vite';
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/app-1/assets': {
        target: process.env.APP_1_URL || 'http://localhost:57146',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  base: '.',
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
    federation({
      name: 'app-2',
      remotes: {
        'app-1': {
          type: 'module',
          name: 'app-1',
          entry: 'http://localhost:57146/app-1/remoteEntry.js',
          entryGlobalName: 'app-1',
          shareScope: 'default',
        },
      },
      exposes: {},
      filename: 'remoteEntry.js',
    }),
  ],
  build: {
    target: 'chrome89',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

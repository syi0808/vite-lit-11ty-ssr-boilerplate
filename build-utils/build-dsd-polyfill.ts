import { build } from 'vite';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

const { dirname } = import.meta;

export default async function buildDsdPolyfill() {
  try {
    await build({
      configFile: false,
      resolve: {
        alias: [{ find: '@', replacement: resolve(dirname, './src') }],
      },
      css: {
        postcss: {
          plugins: [autoprefixer()],
        },
      },
      build: {
        emptyOutDir: false,
        outDir: 'lib',
        lib: { name: 'lit', entry: [resolve(dirname, './build-utils/ssr-utils/dsd-polyfill.ts')], formats: ['iife'] },
        rollupOptions: { output: { entryFileNames: '[name].js' } },
      },
    });
  } catch (error) {
    console.log('dsd polyfill build error', error);
  }
}

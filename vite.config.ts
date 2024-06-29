import autoprefixer from 'autoprefixer';
import { resolve, parse } from 'path';
import { defineConfig } from 'vite';
import tinyGlob from 'tiny-glob';
import buildSsr from './build-utils/build-ssr';
import buildDsdPolyfill from './build-utils/build-dsd-polyfill';
import { minify } from 'terser';
import inlinePostCSS from './rollup-plugin-inline-postcss';

const { dirname } = import.meta;

const tsEntrypoints = [
  './src/hydration-entrypoints/**/*.ts',
  './src/pages/*.ts',
  './src/routes/**/*.ts',
  './build-utils/ssr-utils/lit-hydrate-support.ts',
  './build-utils/ssr-utils/is-land.ts',
];

const filesPromises = tsEntrypoints.map(async (entry) => tinyGlob(entry));
const entryPoints = (await Promise.all(filesPromises)).flat().map((entryPoint) => resolve(dirname, entryPoint));

await Promise.all([buildSsr(), buildDsdPolyfill()]);

function minifyBundles() {
  return {
    name: 'minifyBundles',
    async generateBundle(_options, bundle) {
      for (let key in bundle) {
        if (bundle[key].type == 'chunk' && key.endsWith('.js')) {
          const minifyCode = await minify(bundle[key].code, { sourceMap: false });
          bundle[key].code = minifyCode.code;
        }
      }
      return bundle;
    },
  };
}

const postcssConfig = {
  plugins: [autoprefixer({ overrideBrowserslist: ['last 4 version'] })],
};

export default defineConfig({
  plugins: [minifyBundles()],
  resolve: {
    alias: [{ find: '@', replacement: resolve(dirname, './src') }],
  },
  css: {
    postcss: postcssConfig,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
    },
    outDir: 'lib',
    emptyOutDir: false,
    lib: {
      name: 'lit-chucks',
      entry: entryPoints,
      formats: ['es'],
    },
    rollupOptions: {
      plugins: [inlinePostCSS({ ...postcssConfig })],
      output: {
        entryFileNames(info) {
          if (!info.facadeModuleId) return '[name].js';

          const { dir } = parse(info.facadeModuleId.split(dirname)[1].split(/src\/|build-utils\//)[1]);

          return `${dir}/[name].js`;
        },
      },
    },
  },
});

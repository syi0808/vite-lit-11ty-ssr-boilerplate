import autoprefixer from 'autoprefixer';
import { resolve } from 'path';
import { mkdir, writeFile, rm, rmdir } from 'fs/promises';
import tinyGlob from 'tiny-glob';
import { build } from 'vite';

const { dirname } = import.meta;

export default async function buildSsr() {
  const ssrFiles = await tinyGlob('./src/components/!(*.nossr).ts');

  try {
    await mkdir(resolve(dirname, './.ssr-temp'));
    await writeFile(resolve(dirname, './.ssr-temp/ssr.js'), ssrFiles.map((path) => `import "../${path}";`).join('\n'));
  } catch (error) {}

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
      ssr: { noExternal: true },
      build: {
        ssr: true,
        outDir: 'dist-ssr',
        lib: { name: 'lit', entry: [resolve(dirname, './.ssr-temp/ssr.js')], formats: ['iife'] },
        rollupOptions: { output: { entryFileNames: '[name].js' } },
      },
    });
  } catch (error) {
    console.log('SSR build error', error);
  }

  try {
    await rm(resolve(dirname, './.ssr-temp/ssr.js'));
    await rmdir(resolve(dirname, './.ssr-temp'));
  } catch (error) {}
}

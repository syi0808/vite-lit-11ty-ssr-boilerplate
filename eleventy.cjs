const litPlugin = require('@lit-labs/eleventy-plugin-lit');
const inlineCss = require('./eleventy-helpers/shortcodes/inline-css.cjs');
const inlineJS = require('./eleventy-helpers/shortcodes/inline-js.cjs');
const minifyHTML = require('./eleventy-helpers/transforms/minify-html.cjs');

const isDEV = process.env.NODE_ENV === 'DEV';
const jsDir = 'lib';

module.exports = function (eleventyConfig) {
  eleventyConfig
    .addPassthroughCopy({ [`${jsDir}/`]: 'js/' })
    .addPassthroughCopy('site/css')
    .addPassthroughCopy('site/fonts')
    .addPassthroughCopy('site/images');

  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules: [`./dist-ssr/ssr.js`],
  });

  inlineCss(eleventyConfig, isDEV);
  inlineJS(eleventyConfig, isDEV, { jsDir });

  minifyHTML(eleventyConfig, isDEV);

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'site',
      output: 'build',
    },
  };
};

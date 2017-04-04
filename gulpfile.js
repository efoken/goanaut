/* eslint-disable global-require, import/no-extraneous-dependencies, max-len */
const gulp = require('gulp');
const hypernova = require('hypernova/server');
const merge = require('webpack-merge');
const path = require('path');
const po2json = require('gulp-po2json');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const util = require('gulp-util');
const webpack = require('webpack');

const config = require('./build/config');

let webpackConfig = require('./build/webpack.config');

gulp.task('svgstore', () => {
  gulp.src(path.join(config.paths.static, 'icons/**/*.svg'))
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin({
      plugins: [
        { removeDoctype: true },
      ],
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('goabase/templates'));
});

gulp.task('po2json', () => {
  gulp.src(path.join(config.paths.static, 'scripts/translations/*.po'))
    .pipe(po2json({ pretty: true }))
    .pipe(gulp.dest(path.join(config.paths.static, 'scripts/translations')));
});

gulp.task('build', ['svgstore'], (callback) => {
  if (config.enabled.optimize) {
    webpackConfig = merge(webpackConfig, require('./build/webpack.config.optimize'));
  }

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new util.PluginError('build', err);
    }
    util.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('hypernova', () => {
  require('babel-register')({ presets: ['airbnb'] });

  hypernova({
    devMode: true,
    port: 8001,
    getComponent: (name) => {
      const componentPath = path.join(config.paths.static, `scripts/components/${name}.jsx`);
      return require(componentPath).default; // eslint-disable-line import/no-dynamic-require
    },
  });
});

gulp.task('watch', () => {
  webpackConfig.entry = require('./build/utils/addHotMiddleware')(webpackConfig.entry);
  webpackConfig = merge(webpackConfig, require('./build/webpack.config.watch'));

  webpack(webpackConfig, (err) => {
    if (err) {
      throw new util.PluginError('watch', err);
    }
    util.log('[watch]', `${config.proxyUrl}/webpack-dev-server/index.html`);
  });
});

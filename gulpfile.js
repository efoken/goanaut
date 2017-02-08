/* eslint-disable global-require, import/no-extraneous-dependencies, max-len */
const argv = require('minimist')(process.argv.slice(2));
const gulp = require('gulp');
const merge = require('webpack-merge');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const util = require('gulp-util');
const webpack = require('webpack');

const config = require('./build/config');
let webpackConfig = require('./build/webpack.config');

gulp.task('svgstore', () => {
  gulp.src('goabase/static/icons/**/*.svg')
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(svgmin({
      plugins: [
        { removeDoctype: true },
      ],
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest('goabase/templates'));
});

gulp.task('build', ['svgstore'], (callback) => {
  if (config.enabled.optimize) {
    webpackConfig = merge(webpackConfig, require('./build/webpack.config.optimize'));
  }

  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new util.PluginError('webpack', err);
    }
    util.log('[webpack]', stats.toString());
    callback();
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

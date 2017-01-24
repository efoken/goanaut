/* eslint-disable global-require, import/no-extraneous-dependencies, max-len */
const gulp = require('gulp');
const merge = require('webpack-merge');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const util = require('gulp-util');
const webpack = require('webpack');

const publicUrl = require('./build/config').publicUrl;
const webpackConfig = require('./build/webpack.config');

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

gulp.task('webpack', (callback) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new util.PluginError('webpack', err);
    }
    util.log('[webpack]', stats.toString());
    callback();
  });
});

gulp.task('watch', () => {
  const config = merge(webpackConfig, require('./build/webpack.config.watch'));

  Object.keys(config.entry).forEach((name) => {
    config.entry[name] = Array.isArray(config.entry[name]) ? config.entry[name].slice(0) : [config.entry[name]];
    config.entry[name].push('webpack-hot-middleware/client?timeout=20000&reload=true');
  });

  webpack(config, (err) => {
    if (err) {
      throw new util.PluginError('watch', err);
    }
    util.log('[watch]', `${publicUrl}/webpack-dev-server/index.html`);
  });
});

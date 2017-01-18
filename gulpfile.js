/* eslint-disable comma-dangle, import/no-extraneous-dependencies */
const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const util = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const mergeWithConcat = require('./build/utils/mergeWithConcat');
const webpackConfig = require('./build/webpack.config');
const webpackConfigWatch = require('./build/webpack.config.watch');

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

gulp.task('webpack-dev-server', () => {
  const config = mergeWithConcat(webpackConfig, webpackConfigWatch);
  config.entry.main.unshift('webpack-dev-server/client?http://localhost:3000/', 'webpack/hot/dev-server');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    historyApiFallback: true,
  }).listen(3000, '0.0.0.0', (err) => {
    if (err) {
      throw new util.PluginError('webpack-dev-server', err);
    }
    util.log('[webpack-dev-server]', 'http://localhost:3000/webpack-dev-server/index.html');
  });
});

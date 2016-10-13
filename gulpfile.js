const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('webpack', function() {
  gulp.src([
      'goabase/static/scripts/main.js',
      'goabase/static/styles/main.scss',
    ])
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('goabase/static/bundles'));
});

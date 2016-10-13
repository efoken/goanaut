/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const CleanPlugin = require('clean-webpack-plugin');
const easyImport = require('postcss-easy-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const path = require('path');
const SvgstorePlugin = require('webpack-svgstore-plugin');
const webpack = require('webpack');

module.exports = {
  // context: path.join(__dirname, 'goabase'),
  entry: [
    './goabase/static/scripts/main.js',
    './goabase/static/styles/main.scss',
  ],
  output: {
    path: path.resolve('./goabase/static/bundles/'),
    filename: '[name]-[hash:8].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve('./static/'),
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?![/|\\]bootstrap)/,
        loaders: [`babel?presets[]=${path.resolve('./node_modules/babel-preset-airbnb')}&cacheDirectory`],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?+sourceMap',
          'postcss',
          'sass?+sourceMap',
        ]),
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
  plugins: [
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
    new CleanPlugin(['./goabase/static/bundles/']),
    new SvgstorePlugin(path.join(__dirname, 'goabase/static/icons', '**/*.svg'), '', {
      name: 'icons-[hash].svg',
      prefix: 'icon-',
      svgoOptions: {},
    }),
    new ImageminPlugin({
      optipng: {
        optimizationLevel: 7,
      },
      gifsicle: {
        optimizationLevel: 3,
      },
      pngquant: {
        quality: '65-90',
        speed: 4,
      },
      svgo: {
        removeUnknownsAndDefaults: false,
        cleanupIDs: false,
      },
      jpegtran: null,
    }),
    new ExtractTextPlugin('[name]-[hash:8].css', {
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      _: 'underscore',
      'window._': 'underscore',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_debugger: true,
        warnings: false,
      },
      comments: false,
    }),
  ],
  postcss: [
    easyImport({ extensions: ['.scss'] }),
    autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'opera 12', 'ff esr'],
    }),
  ],
  sassLoader: {
    precision: 9,
  },
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
};

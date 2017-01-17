const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const qs = require('qs');
const webpack = require('webpack');

module.exports = {
  entry: [
    './goabase/static/scripts/main.js',
    './goabase/static/styles/main.scss',
  ],
  output: {
    path: path.resolve('./goabase/static/bundles'),
    filename: '[name]-[hash:8].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules(?![/|\\]bootstrap)/,
        loader: `babel-loader?${qs.stringify({
          plugins: ['transform-decorators-legacy', 'transform-async-to-generator', 'lodash'],
          presets: [path.resolve('./node_modules/babel-preset-airbnb')],
        }, { arrayFormat: 'brackets', encode: false })}`,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
          'css?sourceMap',
          'postcss',
          'sass?sourceMap',
        ]),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
    new CleanPlugin([path.resolve('./goabase/static/bundles')], {
      root: process.cwd(),
      verbose: false,
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
      React: 'react',
      'window.React': 'react',
    }),
  ],
  postcss: [
    autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'opera 12', 'ff esr'] }),
  ],
  sassLoader: {
    precision: 9,
  },
};

const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const qs = require('qs');
const webpack = require('webpack');

const config = require('./config');

const sourceMapQueryStr = config.enabled.sourceMaps ? '+sourceMap' : '-sourceMap';
const staticFilenames = config.enabled.cacheBusting ? '[name]-[hash]' : '[name]';

const webpackConfig = {
  context: config.paths.static,
  entry: {
    main: [
      './scripts/main.js',
      './styles/main.scss',
    ],
  },
  output: {
    path: config.paths.bundles,
    filename: `${staticFilenames}.js`,
  },
  devtool: config.enabled.sourceMaps ? '#source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules(?![/|\\]bootstrap)/],
        use: `babel-loader?${qs.stringify({
          plugins: ['transform-decorators-legacy', 'transform-async-to-generator', 'lodash'],
          presets: [path.resolve('./node_modules/babel-preset-airbnb')],
        }, { arrayFormat: 'brackets', encode: false })}`,
      },
      {
        test: /\.scss$/,
        include: config.paths.static,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [`css-loader?${sourceMapQueryStr}`, 'postcss-loader', `sass-loader?${sourceMapQueryStr}`],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        include: config.paths.static,
        use: `file-loader?${qs.stringify({
          name: `[path]${staticFilenames}.[ext]`,
        })}`,
      },
    ],
  },
  resolve: {
    modules: [config.paths.static, 'node_modules'],
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new CleanPlugin([config.paths.bundles], {
      root: config.paths.root,
      verbose: false,
    }),
    new BundleTracker({
      filename: './webpack-stats.json',
    }),
    new ExtractTextPlugin({
      filename: `${staticFilenames}.css`,
      allChunks: true,
      disable: config.enabled.watcher,
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
    new webpack.LoaderOptionsPlugin({
      minimize: config.env.production,
      debug: config.enabled.watcher,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      options: {
        context: config.paths.static,
        output: { path: config.paths.bundles },
        postcss: [
          autoprefixer({ browsers: config.browsers }),
        ],
        sassLoader: {
          precision: 9,
        },
      },
    }),
  ],
};

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

module.exports = webpackConfig;

const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const CleanPlugin = require('clean-webpack-plugin');
const easyImport = require('postcss-easy-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'goabase'),
    entry: [
        './static/scripts/main.js',
        './static/styles/main.scss',
    ],
    output: {
        path: path.resolve('./goabase/static/bundles/'),
        filename: '[name]-[hash:8].js',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                include: path.resolve('./static/'),
                loader: 'eslint-loader',
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules(?![/|\\]bootstrap)/,
                loaders: [`babel?presets[]=${path.resolve('./node_modules/babel-preset-es2015')}&cacheDirectory`],
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
        extensions: ['', '.js', '.json'],
        modulesDirectories: ['node_modules'],
    },
    plugins: [
        new BundleTracker({
            filename: './webpack-stats.json'
        }),
        new CleanPlugin(['./goabase/static/bundles/']),
        new ExtractTextPlugin('[name]-[hash:8].css', {
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_debugger: true,
                warnings: false,
            },
            comments: false,
        }),
    ],
    postcss() {
        return {
            plugins: [
                easyImport({extensions: ['.scss']}),
                autoprefixer({
                    browsers: ['> 1%', 'last 2 versions', 'opera 12', 'ff esr'],
                }),
            ],
        };
    },
    eslint() {
        return {
            failOnWarning: false,
            failOnError: true,
        };
    },
};

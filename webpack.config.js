const autoprefixer = require('autoprefixer');
const BundleTracker = require('webpack-bundle-tracker');
const Clean = require('clean-webpack-plugin');
const easyImport = require('postcss-easy-import');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const precss = require('precss');
const sugarss = require('sugarss');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'goabase'),
    entry: [
        './static/scripts/main.js',
        './static/styles/main.sss',
    ],
    output: {
        path: path.resolve('./goabase/static/bundles/'),
        filename: '[name]-[hash].js',
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
                exclude: /node_modules/,
                loaders: [`babel?presets[]=${path.resolve('./node_modules/babel-preset-es2015')}`],
            },
            {
                test: /\.[cs]ss$/,
                loader: ExtractTextPlugin.extract('style', [
                    'css?sourceMap',
                    'postcss',
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
        new Clean(['./goabase/static/bundles/']),
        new ExtractTextPlugin('[name]-[hash].css', {
            allChunks: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
    postcss() {
        return {
            plugins: [
                easyImport({extensions: ['.sss']}),
                autoprefixer({
                    browsers: ['> 1%', 'last 2 versions', 'opera 12', 'ff esr'],
                }),
                precss,
            ],
            parser: sugarss,
        };
    },
    eslint: {
        failOnWarning: false,
        failOnError: true,
    },
};

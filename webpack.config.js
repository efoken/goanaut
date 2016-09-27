// External dependencies
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const sugarss = require('sugarss');
const webpack = require('webpack');

// Internal dependencies
const config = require('./goabase/static/config');

module.exports = {
    context: path.resolve(config.context),
    entry: config.entry,
    output: {
        path: path.join(__dirname, config.output.path),
        publicPath: config.output.publicPath,
        filename: 'app.bundle.js',
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            include: path.resolve('goabase/static'),
            loader: 'eslint-loader',
        }],
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.[cs]ss$/,
                loader: 'css-loader!postcss-loader',
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }),
    ],
    postcss: () => {
        return {
            plugins: [
                autoprefixer({
                    browsers: ['last 2 versions', 'android 4', 'opera 12', 'ff esr'],
                }),
            ],
            syntax: sugarss,
        };
    },
    eslint: {
        failOnWarning: false,
        failOnError: true,
    },
};

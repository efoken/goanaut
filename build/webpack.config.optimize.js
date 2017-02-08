const cssnano = require('cssnano');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./config');

module.exports = {
  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        autoprefixer: { browsers: config.browsers },
      },
      canPrint: true,
    }),
  ],
};

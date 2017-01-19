const webpack = require('webpack');

const config = require('./config');

module.exports = {
  output: {
    pathinfo: true,
    publicPath: `${config.publicUrl}/static/bundles/`,
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

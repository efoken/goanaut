const webpack = require('webpack');

module.exports = {
  output: {
    pathinfo: true,
    publicPath: 'http://localhost:3000/static/bundles/',
  },
  debug: true,
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

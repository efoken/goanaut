const webpack = require('webpack');

module.exports = {
  output: {
    pathinfo: true,
    publicPath: 'http://localhost:3000/static/bundles/',
  },
  devtool: '#cheap-module-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

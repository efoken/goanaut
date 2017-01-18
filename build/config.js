const path = require('path');

const isProduction = false;
const rootPath = process.cwd();

module.exports = {
  paths: {
    root: rootPath,
    bundles: path.join(rootPath, 'goabase/static/bundles'),
    static: path.join(rootPath, 'goabase/static'),
  },
  enabled: {
    cacheBusting: isProduction,
    devServer: process.argv[2] === 'webpack-dev-server',
    sourceMaps: !isProduction,
  },
};

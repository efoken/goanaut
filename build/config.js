const argv = require('minimist')(process.argv.slice(2));
const merge = require('webpack-merge');
const path = require('path');

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();

const config = {
  publicUrl: 'http://localhost:3000',
  paths: {
    root: rootPath,
    bundles: path.join(rootPath, 'goabase/static/bundles'),
    static: path.join(rootPath, 'goabase/static'),
  },
  enabled: {
    cacheBusting: isProduction,
    sourceMaps: !isProduction,
    watcher: process.argv[2] === 'watch',
  },
};

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
});

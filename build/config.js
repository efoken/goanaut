const argv = require('minimist')(process.argv.slice(2));
const merge = require('webpack-merge');
const path = require('path');

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const rootPath = process.cwd();

const config = {
  proxyUrl: 'http://localhost:3000',
  paths: {
    root: rootPath,
    bundles: path.join(rootPath, 'goabase/static/bundles'),
    public: path.join(rootPath, 'public'),
    static: path.join(rootPath, 'goabase/static'),
  },
  enabled: {
    cacheBusting: isProduction,
    optimize: isProduction,
    sourceMaps: !isProduction,
    watcher: process.argv[2] === 'watch',
  },
  watch: [],
  browsers: ['> 1%', 'last 2 versions', 'opera 12', 'ff esr'],
};

module.exports = merge(config, {
  env: Object.assign({ production: isProduction, development: !isProduction }, argv.env),
});

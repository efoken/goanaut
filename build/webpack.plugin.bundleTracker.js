const fs = require('fs');
const merge = require('lodash/merge');
const mkdirp = require('mkdirp');
const path = require('path');
const stripAnsi = require('strip-ansi');

const BUNDLE_LOG_TIME = false;
const BUNDLE_OUTPUT_FILENAME = 'webpack-stats.json';

module.exports = class {
  constructor(options) {
    this.contents = {};
    this.options = options || {};
    this.options.filename = this.options.filename || BUNDLE_OUTPUT_FILENAME;
    if (this.options.logTime === undefined) {
      this.options.logTime = BUNDLE_LOG_TIME;
    }
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('failed-module', (fail) => {
        const output = {
          status: 'error',
          error: fail.error.name || 'unknown-error',
        };
        if (fail.error.module !== undefined) {
          output.file = fail.error.module.userRequest;
        }
        if (fail.error.error !== undefined) {
          output.message = stripAnsi(fail.error.error.codeFrame);
        }
        this.writeOutput(compiler, output);
      });
    });

    compiler.plugin('compile', () => {
      this.writeOutput(compiler, { status: 'compiling' });
    });

    compiler.plugin('done', (stats) => {
      if (stats.compilation.errors.length > 0) {
        const error = stats.compilation.errors[0];
        this.writeOutput(compiler, {
          status: 'error',
          error: error.name || 'unknown-error',
          message: stripAnsi(error.message),
        });
        return;
      }

      const chunks = {};
      stats.compilation.chunks.forEach((chunk) => {
        const files = chunk.files.map((file) => {
          const f = { name: file };
          if (compiler.options.output.publicPath) {
            f.publicPath = compiler.options.output.publicPath + file;
          }
          if (compiler.options.output.path) {
            f.path = path.join(compiler.options.output.path, file);
          }
          return f;
        });
        chunks[chunk.name] = files;
      });

      const output = {
        status: 'done',
        chunks,
      };
      if (this.options.logTime === true) {
        output.startTime = stats.startTime;
        output.endTime = stats.endTime;
      }
      this.writeOutput(compiler, output);
    });
  }

  writeOutput(compiler, contents) {
    const outputDir = this.options.path || '.';
    const outputFilename = path.join(outputDir, this.options.filename || BUNDLE_OUTPUT_FILENAME);
    if (compiler.options.output.publicPath) {
      contents.publicPath = compiler.options.output.publicPath; // eslint-disable-line
    }
    mkdirp.sync(path.dirname(outputFilename));

    this.contents = merge(this.contents, contents);
    fs.writeFileSync(
      outputFilename,
      JSON.stringify(this.contents, null, this.options.indent),
    );
  }
};

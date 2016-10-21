const argv = require('yargs')
  .option('p', {
    alias: 'port',
    description: 'Specify the server\'s port',
    default: 8001,
  })
  .option('a', {
    alias: 'address',
    description: 'Specify the server\'s address',
    default: '127.0.0.1',
  })
  .help('h')
  .alias('h', 'help')
  .strict()
  .argv;
const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const path = require('path');
const reactRender = require('react-render');

// Ensure support for loading files that contain ES6+7 & JSX
require('babel-register')({
  presets: [path.resolve('./node_modules/babel-preset-airbnb')],
});

const app = express();
const server = http.Server(app);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('React render server');
});

app.post('/render', (req, res) => {
  reactRender(req.body, (err, markup) => {
    if (err) {
      res.json({
        error: {
          type: err.constructor.name,
          message: err.message,
          stack: err.stack,
        },
        markup: null,
      });
    } else {
      res.json({
        error: null,
        markup: markup,
      });
    }
  });
});

server.listen(argv.port, argv.address, () => {
  console.log(`React render server listening at http://${argv.address}:${argv.port}`);
});

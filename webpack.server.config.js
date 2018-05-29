const path = require('path');
const sharedConfig = require('./webpack.shared.config.js');

const serverConfig = {
  target: 'node',
  entry: {server: path.join(__dirname, 'src', 'server', 'index.js')}
};

module.exports = Object.assign({}, serverConfig, sharedConfig);

const path = require('path');
const sharedConfig = require('./webpack.shared.config.js');

const clientConfig = {
  entry: {client: path.join(__dirname, 'src', 'client', 'index.js')}
};

module.exports = Object.assign({}, clientConfig, sharedConfig);

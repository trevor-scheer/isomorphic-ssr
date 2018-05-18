const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    server: path.join(__dirname, 'src', 'server', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  }
};

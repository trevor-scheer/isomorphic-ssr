const path = require('path');
const webpack = require('webpack');
const removeImports = require('babel-plugin-remove-imports');

console.warn(removeImports);
console.warn(removeImports(/\.scss$/));
module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {server: path.join(__dirname, 'src', 'server', 'index.js')},
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
            presets: ['env', 'react'],
            plugins: [removeImports(/\.scss$/)]
          }
        }
      }
    ]
  }
};

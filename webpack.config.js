var path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR,
      publicPath: '/dist'
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          include: SRC_DIR,
          loader: 'babel-loader',      
          query: {
            presets: ['@babel/react', '@babel/env']
          }
        }
      ]
    }
  };
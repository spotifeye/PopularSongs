const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  entry: ['./react-client/src/index.jsx'],
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});

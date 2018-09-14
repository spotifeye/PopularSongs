var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/react-client/src');
var DIST_DIR = path.join(__dirname, '/react-client/dist');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR,
      publicPath: '/react-client/dist'
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
        }// },
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: 'css-loader',
        //     //publicPath: '/react-client/dist'
        //     publicPath: '/dist'
        //   })
        // }
      ]
    }// },
    // plugins: [
    //   //new webpack.HotModuleReplacementPlugin(),
    //   //new webpack.NamedModulesPlugin(),
    //   new ExtractTextPlugin({
    //     filename: 'app.css',
    //     disabled: false,
    //     allChunks: true
    //   })
    // ]
  };
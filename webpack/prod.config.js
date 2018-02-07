const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].bundle.[chunkhash].js',
  },


  plugins: [
    // Extract imported CSS into own file
    new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
    // Minify JS
      new webpack.optimize.UglifyJsPlugin({
      	warnings: false,        
      	compress: true,
      	sourceMap: true,
      	minimize:true
      
    }),
    // Minify CSS
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ],
});
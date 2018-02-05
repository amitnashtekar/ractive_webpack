const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    path.resolve(__dirname, './src/main'),
  ],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      { test: /\.scss/,
        
         loader: ExtractTextPlugin.extract('css-loader!sass-loader') },
      
      { test: /\.json/, loader: 'json-loader' },
      { test: /\.html/, loader: 'ractive-loader' }
    ]
  },   
  plugins: [ 
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
     new ExtractTextPlugin({
    filename: 'bundle.css',
    allChunks: true
    })   
  ],
  resolve: {
    alias: {
      pubsub: 'aurelia-event-aggregator',
      Ractive: 'ractive'
    }
  }
};

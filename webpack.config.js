const ExtractTextPlugin = require('extract-text-webpack-plugin');
var querystring = require('querystring')
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

        rules: [
        {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
            { test: /\.json/, loader: 'json-loader' },
      { test: /\.html/, loader: 'ractive-loader' },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {                  
                    sourceMap: true
                }
            }, 
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
              }
            },
                   {
          loader: 'sass-resources-loader',
          query: {
                resources: [
                  path.resolve(__dirname, './src/instances/optussd/sass/settings/_colours.scss')
                  
                ],
              }
        }
          ]
        })
      }
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

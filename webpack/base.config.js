console.log('svsdngfngfnnhnhg');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
console.log('mypath',path.resolve(__dirname, '../node_modules/foundation-sites/scss/foundation/components'));
module.exports = {
    entry: [
        path.resolve(__dirname, '../src/main')
    ],

    module: {
        rules: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.html/,
                loader: 'ractive-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader'
                            
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'sass-resources-loader',
                            query: {
                                resources: [
                                	
                                   // path.resolve(__dirname, '../node_modules/foundation-sites/scss/foundation/components/*.scss'),
                                  //  path.resolve(__dirname, '../src/instances/optussd/sass/settings/_fonts.scss'),
                                  path.resolve(__dirname, '../node_modules/foundation-sites/scss/normalize.scss'),
                                   
                                    path.resolve(__dirname, '../src/instances/optussd/sass/settings/_colours.scss'),
                                   // path.resolve(__dirname, '../src/instances/optussd/sass/settings/_base.scss')


                                     //path.resolve(__dirname, '../src/instances/optussd/sass/*.scss')
                                    

                                ],
                            }
                        }
                    ]
                })
            }
        ],
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV',
        ]),
         new ExtractTextPlugin('[name].bundle.[chunkhash].css')
    ],
};

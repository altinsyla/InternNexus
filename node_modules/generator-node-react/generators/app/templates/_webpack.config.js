var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

 module.exports = {
     entry: './views/index.js',
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015','react']
                 }
             },
             {
                    test: /\.css/,
                    use: ['style-loader', 'css-loader'],
            }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map',
     plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
 };
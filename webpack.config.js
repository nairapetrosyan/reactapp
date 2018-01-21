const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");



const webpack = require('webpack')
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './source/AddTodo.js',
    output: {
        path:'/',
        filename: 'bundle.js',
    },
    
    devServer: {
        inline: true,
        hot: true,
        port: 8000
    },
    module: {
       rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }, //{
            //test: /\.less$/,
            /*use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]*/
            
        //}
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Home',
            inject: true,
            template: './public/index.html'
        }),
         new webpack.NamedModulesPlugin(),
         new webpack.HotModuleReplacementPlugin()
    ]
};

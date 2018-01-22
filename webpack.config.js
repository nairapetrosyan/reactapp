const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');


module.exports = {
    entry: './source/components/AddTodo.js',
    output: {
        path: path.join(__dirname, './build'),
        filename: 'bundle.js',
    },
    devServer: {
        hot: true,
    },
    module: {
       rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
        title: 'Todo',
        inject: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};
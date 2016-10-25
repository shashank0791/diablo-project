'use strict';

let webpack = require('webpack');
let BowerWebpackPlugin = require('bower-webpack-plugin');

const path = require('path');
const buildPath = path.join(__dirname, '/dist/assets');
const appPath = path.join(__dirname, '/app');
const defaultPort = 3000;

module.exports = {
  port: defaultPort,
  debug: true,
  devtool: 'eval',
  entry: appPath,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  output: {
    path: buildPath,
    publicPath: './assets/',
    filename:'bundle.js'
  },
  watch: true,
  devServer: {
    contentBase: './app/',
    historyApiFallback: true,
    hot: true,
    port: defaultPort,
    publicPath: '/assets/',
    noInfo: false
  },
  module: {
     preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: appPath,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ],
    resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${appPath}/actions/`,
      components: `${appPath}/components/`,
      sources: `${appPath}/sources/`,
      stores: `${appPath}/stores/`,
      styles: `${appPath}/styles/`
    }
  }
  }
};
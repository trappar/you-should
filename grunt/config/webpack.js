/*eslint-disable */
var merge = require('../module/merge');
var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var settings = {
  module: {
    loaders: [
      {test: /\.js$/, include: /assets\/js/, loader: 'babel-loader'},
      {test: /\.jsx$/, loader: 'babel-loader'}
    ]
  },
  entry: './assets/js/index.js',
  output: {
    path: path.resolve('web'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  devtool: 'cheap-inline-source-map',
  progress: false,
  stats: {
    children: false,
    assets: false,
    cached: false,
    modules: true,
    reasons: false,
    timings: false,
    version: false
  },
  cache: true,
  failOnError: false
};

module.exports = {
  dev: settings,
  prod: merge(settings, {
    devtool: false,
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false,
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      })
    ]
  })
};
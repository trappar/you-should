/* eslint-disable no-var */
var merge = require('webpack-merge');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = merge({
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style' },
          { loader: 'css', options: 'sourceMap' },
          { loader: 'postcss', options: 'sourceMap' },
          { loader: 'sass', options: { sourceMap: 'inline' } },
        ]
      },
      {
        test: /\.js$/i,
        include: /assets\/js/,
        use: 'babel',
      },
    ]
  },
  entry: {
    app: [
      'react-hot-loader/patch'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer];
        },
        context: __dirname
      }
    })
  ],
  devtool: 'eval',
  devServer: {
    publicPath: 'http://localhost:8080/',
    hot: true,
    stats: 'minimal',
    historyApiFallback: true,
    compress: true
  }
}, require('./webpack.config.default'));
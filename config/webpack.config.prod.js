/* eslint-disable no-var */
var merge = require('webpack-merge');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var autoprefixer = require('autoprefixer');
var clean = require('postcss-clean');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge({
  module: {
    rules: [
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract({
          loader: [
            { loader: 'css' },
            { loader: 'postcss' },
            { loader: 'sass' },
          ]
        }),
      },
      {
        test: /\.js$/i,
        include: /assets\/js/,
        use: {
          loader: 'babel',
          options: {
            babelrc: false,
            presets: [
              ["es2015", { modules: false, loose: true }],
              "stage-0",
              "react",
            ],
            plugins: [
              "transform-decorators-legacy"
            ]
          }
        },
      },
    ]
  },
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function() {
          return [autoprefixer, clean({processImport: false})];
        }
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin("[name].[hash:8].css"),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/dist/',
    }),
  ],
}, require('./webpack.config.default'));
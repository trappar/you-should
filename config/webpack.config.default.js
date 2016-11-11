/* eslint-disable no-var */
var path = require('path');
var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

var fileLoaderOptions = { hash: 'sha512', digest: 'hex', name: 'assets/[hash].[ext]' };

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          { loader: 'file', options: fileLoaderOptions },
          { loader: 'image-webpack', options: { bypassOnDebug: true, optimizationLevel: 7, interlaced: false } }
        ]
      },
      {
        test: /\.(woff2?|ttf|eot)$/i,
        use: [
          { loader: 'file', options: fileLoaderOptions }
        ]
      }
    ]
  },
  entry: {
    app: [
      'babel-polyfill',
      'whatwg-fetch',
      './assets/js/index.js'
    ],
    style: './assets/style/main.scss',
  },
  output: {
    path: path.resolve('web/dist'),
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'Tether': 'tether',
      'window.Tether': 'tether'
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
    })
  ],
  stats: 'minimal'
};

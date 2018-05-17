/**
 * Created by yangfch3.
 * Date: 2018/5/15
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: path.posix.join('static', 'js/[name].[chunkhash].js'),
    chunkFilename: path.posix.join('static', 'js/[name].[chunkhash].js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: chunk => (
            chunk.resource &&
            /\.js$/.test(chunk.resource) &&
            /node_modules/.test(chunk.resource)
          ),
          chunks: 'initial',
          name: 'vendors'
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    new HtmlWebpackPlugin({
      title: 'Demo1',
      filename: 'page1.html',
      template: 'static/frame.html',
      chunks: ['common-style', 'runtime', 'async-vendors', 'vendors', 'page1'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Demo2',
      filename: 'page2.html',
      template: 'static/frame.html',
      chunks: ['common-style', 'runtime', 'async-vendors', 'vendors', 'page2'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*', 'frame.html']
      }
    ]),
    new MiniCssExtractPlugin({
      filename: path.posix.join('static', 'css/[name].[contenthash].css'),
      chunkFilename: path.posix.join('static', 'css/[name].[contenthash].css')
    })
  ]
})

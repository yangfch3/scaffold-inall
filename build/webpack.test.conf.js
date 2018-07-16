/**
 * Created by yangfch3.
 * Date: 2018/7/16
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function recursiveIssuer (m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: '#source-map',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
    publicPath: '/public/' // 改为正式环境静态资源的地址
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        page1Styles: {
          name: 'page1',
          test: (m, c, entry = 'page1') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        page2Styles: {
          name: 'page2',
          test: (m, c, entry = 'page2') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  plugins: [
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    new HtmlWebpackPlugin({
      title: 'Demo1',
      template: 'static/frame.html',
      filename: 'page1.html',
      chunks: ['runtime~page1', 'page1'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Demo2',
      template: 'static/frame.html',
      filename: 'page2.html',
      chunks: ['runtime~page2', 'page2'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: './',
        ignore: ['.*', 'frame.html']
      }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[contenthash].css'
    })
  ]
})

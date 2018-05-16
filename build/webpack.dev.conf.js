/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const HOST = process.env.HOST || 'localhost'
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3001

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    // 单页应用避免 404 的路由重写
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //   ],
    // },
    hot: true,
    host: HOST,
    port: PORT,
    open: true,
    publicPath: '/',
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Demo1',
      filename: 'page1.html',
      template: 'static/frame.html',
      chunks: ['page1']
    }),
    new HtmlWebpackPlugin({
      title: 'Demo2',
      filename: 'page2.html',
      template: 'static/frame.html',
      chunks: ['page2']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
})

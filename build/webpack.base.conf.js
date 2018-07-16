/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  context: resolve('../'),
  entry: {
    page1: ['./src/demo1.js'],
    page2: ['./src/demo2.js']
  },
  output: {
    path: resolve('../public'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/public/'
  },
  resolve: {
    alias: {
      '@': resolve('../src')
    }
  },
  module: {
    rules: [{
      test: /\.art$/,
      loader: 'art-template-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('../src'), resolve('../test'), resolve('node_modules/webpack-dev-server/client')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 4000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.s?[ac]ss$/,
      use: [{
        loader: (process.env.NODE_ENV || '').trim() !== 'development' ? MiniCssExtractPlugin.loader : 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          minimize: (process.env.NODE_ENV || '').trim() === 'production',
          sourceMap: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    setImmediate: false
  }
}

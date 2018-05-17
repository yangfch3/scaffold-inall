/**
 * Created by yangfch3.
 * Date: 2018/5/14
 */
const path = require('path')
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

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    page1: ['./src/demo1.js'],
    page2: ['./src/demo2.js']
    // vendors: '' 第三方库集中打包
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
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve('src')
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
        limit: 10000,
        name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.s?[ac]ss$/,
      use: [{
        loader: process.env.NODE_ENV.trim() !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
      }, {
        loader: 'css-loader',
        options: {
          minimize: process.env.NODE_ENV.trim() === 'production',
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

var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin') // webpack提供的插件，将编译的css文件单独提出来成为独立的文件，而不是打包到js文件中。
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true // 此处设置为true：就是css文件可以提取出来，生成单独的文件
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false, // 配置生成sourcemap
  output: {
    path: config.build.assetsRoot, // 去查看这个文件。 ../config/index中
    filename: utils.assetsPath('js/[name].[chunkhash].js'), // 传入参数定义接收到return值，哈希值是根据文件内容计算来的，当更改代码重新打包时会重新计算，生成新的哈希值。多次生成的文件可以共存在目录下，不会起冲突。
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩js代码用的
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css') // static/css/[name].[hash].css。生成的目录也是dist目录。
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index, // 生成的文件名。查看config/index.js
      template: 'index.html',
      inject: true,
      minify: {  // 压缩html
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({ // 把第三方库打包到一个vendor.js中
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to // 将webpack运行时和模块清单提取到自己的文件中，
    // prevent vendor hash from being updated whenever app bundle is updated // 当应用程序包被更新时，防止vendor哈希被更新
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // 更新项目时，app的哈希会变化。但是vendor依赖的库没有变化，哈希是不用变化的。
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
